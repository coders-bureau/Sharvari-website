import { useState } from "react";
import { Loader2, Upload, X } from "lucide-react";
import toast from "react-hot-toast";

const ImageUploader = ({ currentImageUrl, onUploadComplete, folderPath = "uploads", multiple = false, acceptType = "image" }) => {
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(null);

    // Cloudinary Config - In a real app, these should be in .env, but for now we'll use constants or envs
    // User needs to set these in their .env
    const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        if (!CLOUD_NAME || !UPLOAD_PRESET) {
            toast.error("Cloudinary not configured. Please check your .env file.");
            return;
        }

        // Validation
        const imageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        const videoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
        const validTypes = acceptType === "video" ? videoTypes : acceptType === "all" ? [...imageTypes, ...videoTypes] : imageTypes;

        for (const file of files) {
            if (!validTypes.includes(file.type)) {
                toast.error(`Invalid file type: ${file.name}. Please upload ${acceptType === 'video' ? 'MP4/WEBM' : 'JPG/PNG/WebP'}.`);
                return;
            }
            // 50MB limit for video or all, 5MB for image
            const maxSize = (acceptType === "video" || acceptType === "all") ? 50 * 1024 * 1024 : 5 * 1024 * 1024;
            if (file.size > maxSize) {
                toast.error(`File too large: ${file.name}. Max size is ${maxSize / (1024 * 1024)}MB.`);
                return;
            }
        }

        // Preview (only for single upload, or show count for multiple)
        if (!multiple && files.length === 1) {
            const objectUrl = URL.createObjectURL(files[0]);
            setPreview(objectUrl);
        }

        // Upload
        uploadFiles(files);
    };

    const uploadFiles = async (files) => {
        setUploading(true);
        const uploadedUrls = [];
        let completedCount = 0;

        try {
            await Promise.all(files.map(async (file) => {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", UPLOAD_PRESET);
                formData.append("folder", folderPath);

                const endpointType = acceptType === "video" ? "video" : acceptType === "all" ? "auto" : "image";
                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${endpointType}/upload`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                if (!response.ok) {
                    throw new Error(`Upload failed for ${file.name}`);
                }

                const data = await response.json();
                uploadedUrls.push(data.secure_url);
                completedCount++;
                setProgress((completedCount / files.length) * 100);
            }));

            setUploading(false);
            if (multiple) {
                onUploadComplete(uploadedUrls); // Return array for multiple
                toast.success(`${uploadedUrls.length} images uploaded successfully!`);
            } else {
                onUploadComplete(uploadedUrls[0]); // Return single string for single
                toast.success("Image uploaded successfully!");
            }
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("One or more uploads failed. Please try again.");
            setUploading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-4">
                {!multiple && currentImageUrl && !preview && (
                    <div className="relative w-32 h-32 border rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                        {currentImageUrl.match(/\.(mp4|webm|mov|ogg)$/i) || acceptType === "video" ? (
                            <video src={currentImageUrl} className="w-full h-full object-cover" muted />
                        ) : (
                            <img src={currentImageUrl} alt="Current" className="w-full h-full object-cover" />
                        )}
                    </div>
                )}
                {!multiple && preview && (
                    <div className="relative w-32 h-32 border rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                        {acceptType === "video" ? (
                            <video src={preview} className="w-full h-full object-cover opacity-80" muted />
                        ) : (
                            <img src={preview} alt="Preview" className="w-full h-full object-cover opacity-80" />
                        )}
                        {uploading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                                <Loader2 className="animate-spin text-white" />
                            </div>
                        )}
                    </div>
                )}

                <label className={`flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-primary-500 transition-colors ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <Upload className="w-6 h-6 text-gray-500" />
                    <span className="mt-1 text-sm text-gray-500">
                        {uploading ? "Uploading..." : (multiple ? "Upload Images" : "Change Image")}
                    </span>
                    {uploading && (
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 min-w-[100px]">
                            <div className="bg-primary-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                        </div>
                    )}
                    <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept={acceptType === "video" ? "video/*" : acceptType === "all" ? "image/*,video/*" : "image/*"}
                        multiple={multiple}
                        disabled={uploading}
                    />
                </label>
            </div>
        </div>
    );
};

export default ImageUploader;
