import React, { createContext, useContext, useState, useEffect } from "react";
import useFirestore from "../hooks/useFirestore";

const SiteSettingsContext = createContext();

export const useSiteSettings = () => {
    return useContext(SiteSettingsContext);
};

export const SiteSettingsProvider = ({ children }) => {
    const { getDocument } = useFirestore("settings");
    const [settings, setSettings] = useState({
        email: "info@sharvarielectricals.com", // Default fallback
        phone: "+91-0000000000",
        address: "Aurangabad, Maharashtra, India"
    });
    const [loading, setLoading] = useState(true);

    const fetchSettings = async () => {
        setLoading(true);
        try {
            const data = await getDocument("general");
            if (data) {
                setSettings(prev => ({ ...prev, ...data }));
            }
        } catch (error) {
            console.error("Failed to fetch site settings:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const refreshSettings = () => {
        fetchSettings();
    };

    const value = {
        settings,
        loading,
        refreshSettings
    };

    return (
        <SiteSettingsContext.Provider value={value}>
            {children}
        </SiteSettingsContext.Provider>
    );
};
