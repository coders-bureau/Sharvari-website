import { Trash2 } from "lucide-react";
import ImageUploader from "./ImageUploader";

const SectionEditor = ({ section, index, onChange, onDelete, folderPath, allowDelete = true }) => {
    const handleChange = (field, value) => {
        onChange(index, { ...section, [field]: value });
    };

    return (
        <div className="border p-4 rounded-md bg-gray-50 mb-4 relative">
            {allowDelete && (
                <button
                    onClick={() => onDelete(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    title="Delete Section"
                >
                    <Trash2 size={20} />
                </button>
            )}

            <h4 className="font-semibold mb-2 text-gray-700">Section {index + 1}</h4>

            <div className="space-y-3">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Heading</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-primary-500"
                        value={section.heading || ""}
                        onChange={(e) => handleChange("heading", e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Content (HTML allowed)</label>
                    <textarea
                        rows={3}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-primary-500 font-mono text-sm"
                        value={section.content || ""}
                        onChange={(e) => handleChange("content", e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Layout Style</label>
                    <select
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-primary-500 bg-white"
                        value={section.layout || "standard"}
                        onChange={(e) => handleChange("layout", e.target.value)}
                    >
                        <option value="standard">Standard (Image Left)</option>
                        <option value="reverse">Reverse (Image Right)</option>
                        <option value="full-width">Full Width Parallax</option>
                        <option value="card">Card Style</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Section Image</label>
                    <ImageUploader
                        folderPath={folderPath}
                        currentImageUrl={section.image}
                        onUploadComplete={(url) => handleChange("image", url)}
                    />
                </div>
            </div>
        </div>
    );
};

export default SectionEditor;
