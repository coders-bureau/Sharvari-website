import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import ImageUploader from '../ImageUploader'; // Assuming standard relative path from src/components/admin

const HeroSlideManager = ({ pageData, setPageData, activePage }) => {
    // Helper to get current slides or migrate from legacy format
    const getSlides = () => {
        if (pageData.heroSlides && pageData.heroSlides.length > 0) {
            return pageData.heroSlides;
        }
        // Migration logic: if no slides, convert existing heroImages to slide objects
        return (pageData.heroImages || []).map((img) => ({
            image: img,
            title: pageData.title || "",
            subtext: pageData.heroText || ""
        }));
    };

    const slides = getSlides();

    const updateSlides = (newSlides) => {
        setPageData({ ...pageData, heroSlides: newSlides });
    };

    const moveSlide = (index, direction) => {
        const newSlides = [...slides];
        if (direction === 'up' && index > 0) {
            [newSlides[index], newSlides[index - 1]] = [newSlides[index - 1], newSlides[index]];
        } else if (direction === 'down' && index < newSlides.length - 1) {
            [newSlides[index], newSlides[index + 1]] = [newSlides[index + 1], newSlides[index]];
        }
        updateSlides(newSlides);
    };

    return (
        <div className="space-y-6">
            <p className="text-sm text-gray-500 mb-4">Manage individual slides for the homepage carousel. Each slide can have its own image, title, and description.</p>

            <div className="space-y-4">
                {slides.map((slide, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative group">
                        <div className="absolute top-2 left-2 flex gap-1 z-10">
                            <button
                                onClick={() => moveSlide(index, 'up')}
                                disabled={index === 0}
                                className="p-1 bg-white border rounded shadow hover:bg-gray-100 text-gray-600 disabled:opacity-30"
                                title="Move Slide Up"
                            >
                                ▲
                            </button>
                            <button
                                onClick={() => moveSlide(index, 'down')}
                                disabled={index === slides.length - 1}
                                className="p-1 bg-white border rounded shadow hover:bg-gray-100 text-gray-600 disabled:opacity-30"
                                title="Move Slide Down"
                            >
                                ▼
                            </button>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 mt-6">
                            {/* Image Preview/Upload */}
                            <div className="w-full md:w-1/3 shrink-0">
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Slide Image</label>
                                <ImageUploader
                                    folderPath="uploads/home"
                                    currentImageUrl={slide.image}
                                    onUploadComplete={(url) => {
                                        const newSlides = [...slides];
                                        if (!newSlides[index]) newSlides[index] = {}; // Safety check
                                        newSlides[index] = { ...newSlides[index], image: url };
                                        updateSlides(newSlides);
                                    }}
                                />
                            </div>

                            {/* Text Fields */}
                            <div className="w-full md:w-2/3 space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Heading (Single Line Recommended)</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-primary-500 font-bold text-gray-800"
                                        placeholder="e.g. Sharvari Electricals"
                                        value={slide.title || ""}
                                        onChange={(e) => {
                                            const newSlides = [...slides];
                                            if (!newSlides[index]) newSlides[index] = {};
                                            newSlides[index] = { ...newSlides[index], title: e.target.value };
                                            updateSlides(newSlides);
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Description / Subtext</label>
                                    <textarea
                                        rows={2}
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-primary-500 text-sm"
                                        placeholder="Short description for this slide"
                                        value={slide.subtext || ""}
                                        onChange={(e) => {
                                            const newSlides = [...slides];
                                            if (!newSlides[index]) newSlides[index] = {};
                                            newSlides[index] = { ...newSlides[index], subtext: e.target.value };
                                            updateSlides(newSlides);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Remove Button */}
                        <button
                            onClick={() => {
                                const newSlides = slides.filter((_, i) => i !== index);
                                updateSlides(newSlides);
                            }}
                            className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                            title="Remove Slide"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Add Slide Button */}
            <button
                onClick={() => {
                    updateSlides([
                        ...slides,
                        { image: "", title: "", subtext: "" }
                    ]);
                }}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 font-medium hover:border-primary-500 hover:text-primary-600 transition-colors flex items-center justify-center gap-2"
            >
                <Plus size={20} /> Add New Slide
            </button>
            <p className="text-xs text-gray-400 text-center">Note: Changes are only applied when you click "Save Changes" at the top.</p>
        </div>
    );
};

export default HeroSlideManager;
