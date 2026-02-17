# Deployment & Setup Guide

## 1. Firebase Project Setup
1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. Enable **Authentication**:
   - Go to "Build" -> "Authentication".
   - Click "Get Started".
   - Enable **Email/Password** provider.
4. Enable **Firestore Database**:
   - Go to "Build" -> "Firestore Database".
   - Click "Create Database".
   - Choose a location and start in **Production mode**.

   *Note: Firebase Storage is NOT required as we are using Cloudinary.*

## 2. Cloudinary Setup (Free Image Hosting)
1. Sign up for a free account at [Cloudinary](https://cloudinary.com/).
2. Go to **Settings** (gear icon) -> **Upload**.
3. Scroll to "Upload presets" and click **Add upload preset**.
4. Set **Signing Mode** to **Unsigned**.
5. Copy the **Upload preset name**.
6. Go to **Dashboard** and copy your **Cloud Name**.

## 3. Environment Variables
1. Create a `.env` file in the root of your project.
2. Fill in the Firebase and Cloudinary details:

```env
# Firebase Config
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Cloudinary Config
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset_name
```

## 4. Creating the First Admin User
Since there is no sign-up page for security reasons, you must create the admin user manually.

1. Go to Firebase Console -> **Authentication**.
2. Click "Add user" and create an account (e.g., `admin@example.com` / `password123`).
3. Copy the **User UID** of the newly created user.
4. Go to **Firestore Database**.
5. Start a collection named `users`.
6. Add a document where the **Document ID** is the **User UID** you copied.
7. Add a field:
   - Field: `role`, Type: `string`, Value: `admin`
8. (Optional) Add field: `email`, Type: `string`, Value: `admin@example.com`

**Now you can log in at `/login` with these credentials.**

## 5. Deploying to Firebase Hosting
1. Install Firebase CLI (if not installed):
   ```bash
   npm install -g firebase-tools
   ```
2. Login to Firebase:
   ```bash
   firebase login
   ```
3. Initialize Firebase in your project root:
   ```bash
   firebase init
   ```
   - Select **Hosting** and **Firestore**.
   - Use an **existing project** (select the one you created).
   - Firestore Rules: `firestore.rules`
   - Firestore Indexes: `firestore.indexes.json` (just press enter)
   - Public directory: `dist`
   - Configure as single-page app? **Yes**
   - Set up automatic builds and deploys with GitHub? **No** (unless you want to)

4. Build the project:
   ```bash
   npm run build
   ```
5. Deploy:
   ```bash
   firebase deploy
   ```

## 6. Security Rules
Copy and paste the following into your Firebase Console -> Firestore Database -> Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper function to check if user is admin
    function isAdmin() {
      return request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
    }

    // Pages collection: Public read, Admin write
    match /pages/{pageId} {
      allow read: if true;
      allow write: if isAdmin(); // Only admins can edit content
    }

    // Settings collection: Public read, Admin write
    match /settings/{settingId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Users collection: User can read own profile
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if false; // Admins are created manually
    }
  }
}
```
This configuration:
- Allows public read access to content and settings.
- Restricts write/update access to authenticated admins only.
- Ensures users can only read their own profile data.
