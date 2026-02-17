import React, { useEffect, useState } from "react";
import useFirestore from "../hooks/useFirestore";
import HeroCarousel from "../components/HeroCarousel";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import TiltCard from "../components/TiltCard";

const Clients = () => {
    const { getDocument, loading, error } = useFirestore("pages");
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const docData = await getDocument("clients");
            setData(docData);
        };
        fetchData();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>;
    if (error && error !== "Document not found") return <div className="text-center text-red-500 mt-10">Error: {error}</div>;

    const defaultData = {
        title: "Our Valued Clients",
        heroText: "Building lasting partnerships with industry leaders across the nation.",
        clientLogos: [] // Array of image URLs
    };

    const displayData = data || defaultData;
    const showHero = displayData.showHero !== false;
    const clientLogos = displayData.clientLogos || [];

    // Fallback if no logos but sections exist (legacy support or if user uses sections for logos)
    const hasLogos = clientLogos.length > 0;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
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
                        Trusted Partners
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">Organizations We Serve</h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full mb-6"></div>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
                        We are proud to have collaborated with some of the most respected names in the industry.
                    </p>
                </div>

                {hasLogos ? (
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {clientLogos.map((logo, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="h-40"
                            >
                                <TiltCard className="h-full">
                                    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 flex items-center justify-center border border-primary-100/50 group h-full relative overflow-hidden service-card-hover">
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        <img
                                            src={logo}
                                            alt={`Client ${index + 1}`}
                                            className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110 relative z-10"
                                        />
                                    </div>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </motion.div>
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
                                <Building2 className="text-gray-400" size={48} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Clients Added Yet</h3>
                            <p className="text-gray-500">Go to the Admin Panel to upload client logos.</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Clients;
