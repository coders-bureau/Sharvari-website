import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc, collection, addDoc, getDocs, query, orderBy, Timestamp } from "firebase/firestore";
import toast from "react-hot-toast";

const useFirestore = (defaultCollectionName) => { // Renamed for clarity
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getDocument = async (docId, collectionName = defaultCollectionName) => { // Use defaultCollectionName as default
        setLoading(true);
        try {
            const docRef = doc(db, collectionName, docId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setError(null); // Clear error on success
                return docSnap.data();
            } else {
                setError("Document not found");
                return null;
            }
        } catch (err) {
            setError(err.message);
            toast.error(`Error fetching data: ${err.message}`); // Keep toast for errors
            return null;
        } finally {
            setLoading(false);
        }
    };

    const updateDocument = async (docId, data, collectionName = defaultCollectionName) => {
        setLoading(true);
        setError(null);
        try {
            const docRef = doc(db, collectionName, docId);
            await setDoc(docRef, {
                ...data,
                updatedAt: Timestamp.now()
            }, { merge: true });
            setLoading(false);
            toast.success("Saved successfully!");
            return true;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            toast.error(`Error updating data: ${err.message}`);
            return false;
        }
    };

    const addDocument = async (data, collectionName = defaultCollectionName) => {
        setLoading(true);
        setError(null);
        try {
            const collectionRef = collection(db, collectionName);
            await addDoc(collectionRef, {
                ...data,
                createdAt: Timestamp.now()
            });
            setLoading(false);
            toast.success("Submitted successfully!");
            return true;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            toast.error(`Error submitting data: ${err.message}`);
            return false;
        }
    };

    const getCollection = async (collectionName = defaultCollectionName, sortField = "createdAt") => {
        setLoading(true);
        try {
            // Simply getting collection for now to avoid index creation issues if sortField is missing on some docs
            const q = query(collection(db, collectionName));
            // const q = query(collection(db, collectionName), orderBy(sortField, "desc")); 
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setLoading(false);
            return data;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            toast.error(`Error fetching collection: ${err.message}`);
            return [];
        }
    };

    return { getDocument, updateDocument, addDocument, getCollection, loading, error };
};

export default useFirestore;
