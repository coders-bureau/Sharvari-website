import React, { useEffect, useState } from "react";
import useFirestore from "../hooks/useFirestore";
import HeroCarousel from "../components/HeroCarousel";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Construction, FolderOpen } from "lucide-react";
import TiltCard from "../components/TiltCard";

const Projects = () => {
    const { getDocument, loading, error } = useFirestore("pages");
    const [data, setData] = useState(null);
    const [expandedCategory, setExpandedCategory] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const docData = await getDocument("projects");
            setData(docData);
            // Open first category by default if available
            if (docData?.projectCategories?.length > 0) {
                setExpandedCategory(docData.projectCategories[0].id);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>;
    if (error && error !== "Document not found") return <div className="text-center text-red-500 mt-10">Error: {error}</div>;

    const defaultData = {
        title: "Our Major Projects",
        heroText: "Showcasing our excellence in execution across various sectors.",
        projectCategories: [] // Array of { id, title, columns: [], rows: [] }
    };

    const displayData = data || defaultData;
    const showHero = displayData.showHero !== false;
    const projectCategories = displayData.projectCategories || [];
    const hasCategories = projectCategories.length > 0;

    const toggleCategory = (id) => {
        setExpandedCategory(expandedCategory === id ? null : id);
    };

    return (
        <div className="bg-white font-sans overflow-hidden min-h-screen">
            {showHero && (
                <div className="relative z-10">
                    <HeroCarousel
                        images={displayData.heroImages || displayData.heroImage}
                        title={displayData.title}
                        text={displayData.heroText}
                        showOverlay={true}
                    />
                </div>
            )}

            {/* Shared Background Elements for Light Sections */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {/* Subtle Modern Background Grid - Light Mode */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                        backgroundSize: '50px 50px',
                        backgroundAttachment: 'fixed'
                    }}>
                </div>
                {/* Light Floating Blobs */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-primary-100 rounded-full blur-[100px] opacity-60"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-100 rounded-full blur-[100px] opacity-60"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="text-center mb-16">
                    <span className="inline-block py-1 px-3 rounded-full bg-primary-50 border border-primary-100 text-primary-600 text-xs font-bold tracking-wider uppercase mb-4">
                        Our Portfolio
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">Our Major Projects</h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full mb-6"></div>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
                        We have successfully completed numerous high-value projects across various sectors, demonstrating our commitment to quality and timely delivery.
                    </p>
                </div>

                {hasCategories ? (
                    <div className="space-y-6">
                        {projectCategories.map((category) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                key={category.id}
                                className={`rounded-2xl overflow-hidden transition-all duration-300 border ${expandedCategory === category.id
                                        ? "bg-white/80 border-primary-100 shadow-xl backdrop-blur-md"
                                        : "bg-white/60 border-white/50 shadow-sm backdrop-blur-sm hover:bg-white/80 hover:shadow-md"
                                    }`}
                            >
                                <button
                                    onClick={() => toggleCategory(category.id)}
                                    className="w-full flex justify-between items-center px-8 py-6 text-left focus:outline-none"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl transition-colors ${expandedCategory === category.id ? "bg-primary-100 text-primary-600" : "bg-gray-100 text-gray-500"
                                            }`}>
                                            <FolderOpen size={24} />
                                        </div>
                                        <h3 className={`text-xl font-bold transition-colors ${expandedCategory === category.id ? "text-primary-900" : "text-gray-800"
                                            }`}>
                                            {category.title}
                                        </h3>
                                    </div>
                                    <div className={`p-2 rounded-full transition-all duration-300 ${expandedCategory === category.id ? "bg-primary-50 text-primary-600 rotate-180" : "bg-transparent text-gray-400"
                                        }`}>
                                        <ChevronDown size={24} />
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {expandedCategory === category.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-8 pb-8 pt-2 overflow-x-auto">
                                                {category.rows && category.rows.length > 0 ? (
                                                    <div className="border border-gray-100 rounded-xl overflow-hidden bg-white/50 backdrop-blur-sm">
                                                        <table className="min-w-full divide-y divide-gray-100">
                                                            <thead className="bg-gray-50/80">
                                                                <tr>
                                                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-16">
                                                                        Sr. No.
                                                                    </th>
                                                                    {category.columns.map((col, idx) => (
                                                                        <th key={idx} className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                                            {col}
                                                                        </th>
                                                                    ))}
                                                                </tr>
                                                            </thead>
                                                            <tbody className="bg-transparent divide-y divide-gray-100">
                                                                {category.rows.map((row, rowIndex) => (
                                                                    <tr key={rowIndex} className="hover:bg-primary-50/30 transition-colors">
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                            {rowIndex + 1}
                                                                        </td>
                                                                        {category.columns.map((col, colIndex) => (
                                                                            <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-light">
                                                                                {row[col]}
                                                                            </td>
                                                                        ))}
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                ) : (
                                                    <div className="text-center py-12 text-gray-400 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                                                        No projects added to this category yet.
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    /* Fallback to legacy sections with Modern Look */
                    (displayData.sections && displayData.sections.length > 0) ? (
                        <div className="space-y-24">
                            {displayData.sections.map((section, index) => (
                                <div key={index} className={`flex flex-col md:flex-row gap-16 items-center ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
                                    {section.image && (
                                        <div className="w-full md:w-1/2 perspective-1000">
                                            <TiltCard>
                                                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/50 bg-white/40 backdrop-blur-sm p-2 group">
                                                    <img
                                                        src={section.image}
                                                        alt={section.heading}
                                                        className="rounded-xl w-full object-cover h-64 md:h-80 transform transition-transform duration-700 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                                </div>
                                            </TiltCard>
                                        </div>
                                    )}
                                    <div className={`w-full ${section.image ? "md:w-1/2" : ""} space-y-6`}>
                                        <h2 className="text-3xl font-bold text-gray-900">{section.heading}</h2>
                                        <div className="prose prose-lg text-gray-600 font-light leading-relaxed" dangerouslySetInnerHTML={{ __html: section.content }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-white/60 backdrop-blur-md rounded-3xl border border-dashed border-gray-300 shadow-sm max-w-2xl mx-auto">
                            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Construction className="text-gray-400" size={48} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Projects Added Yet</h3>
                            <p className="text-gray-500">Go to the Admin Panel to add your project categories and data.</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Projects;
