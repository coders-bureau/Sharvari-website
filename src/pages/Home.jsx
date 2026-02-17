import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFirestore from "../hooks/useFirestore";
import HeroCarousel from "../components/HeroCarousel";
import ClientMarquee from "../components/ClientMarquee";
import StatsSection from "../components/StatsSection";
import FeaturesSection from "../components/FeaturesSection";
import TiltCard from "../components/TiltCard";
import { motion } from "framer-motion";

const Home = () => {
    const { getDocument, loading, error } = useFirestore("pages");
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const docData = await getDocument("home");
            setData(docData);
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (error && error !== "Document not found") {
        return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
    }

    if (!data) {
        // Fallback if no data is found
        return (
            <div className="bg-white">
                <div className="relative bg-gray-900 text-white">
                    <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                            SHARVARI ELECTRICALS
                        </h1>
                        <p className="mt-4 text-xl text-secondary-300 font-semibold tracking-wide">
                            EPC COMPANY
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <HeroCarousel
                slides={data.heroSlides}
                images={data.heroImages || data.heroImage}
                title={data.title || "Welcome to Sharvari"}
                text={data.heroText || "Building the future, one pixel at a time."}
            />

            {/* Dynamic Content Sections (Welcome to Sharvari) */}
            <div className="space-y-0">
                {data.sections && data.sections.map((section, index) => {
                    const isReverse = section.layout === "reverse" || (section.layout !== "standard" && index % 2 === 1);
                    const isFullWidth = section.layout === "full-width";
                    const isCard = section.layout === "card";

                    if (isFullWidth) {
                        return (
                            <div key={index} className="relative py-24 bg-gray-900 text-white overflow-hidden">
                                {section.image && (
                                    <div className="absolute inset-0 z-0">
                                        <img src={section.image} alt={section.heading} className="w-full h-full object-cover opacity-30" />
                                    </div>
                                )}
                                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                                    <motion.h2
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8 }}
                                        className="text-4xl font-bold mb-6"
                                    >
                                        {section.heading}
                                    </motion.h2>
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                        className="prose prose-invert mx-auto text-lg text-gray-300 max-w-3xl"
                                        dangerouslySetInnerHTML={{ __html: section.content }}
                                    />
                                </div>
                            </div>
                        );
                    }

                    if (isCard) {
                        return (
                            <div key={index} className="py-16 bg-gray-50">
                                <div className="max-w-4xl mx-auto px-4">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5 }}
                                        className="bg-white rounded-2xl shadow-xl overflow-hidden"
                                    >
                                        {section.image && (
                                            <div className="h-64 sm:h-80 w-full relative">
                                                <img src={section.image} alt={section.heading} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                                <div className="absolute bottom-6 left-6 text-white">
                                                    <h2 className="text-3xl font-bold">{section.heading}</h2>
                                                </div>
                                            </div>
                                        )}
                                        <div className="p-8 sm:p-10">
                                            {!section.image && <h2 className="text-3xl font-bold text-gray-900 mb-6">{section.heading}</h2>}
                                            <div className="prose text-gray-600 max-w-none" dangerouslySetInnerHTML={{ __html: section.content }} />
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        );
                    }

                    // Standard (Left/Right) Layout - Modernized
                    return (
                        <div key={index} className={`relative py-24 overflow-hidden ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                            {/* Subtle Modern Background Grid - Light Mode */}
                            <div className="absolute inset-0 opacity-[0.03]"
                                style={{
                                    backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                                    backgroundSize: '50px 50px',
                                    backgroundAttachment: 'fixed'
                                }}>
                            </div>

                            {/* Light Floating Blobs */}
                            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-[100px] opacity-60 pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-100 rounded-full blur-[100px] opacity-60 pointer-events-none"></div>

                            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className={`flex flex-col md:flex-row gap-16 items-center ${isReverse ? 'md:flex-row-reverse' : ''}`}>
                                    <motion.div
                                        initial={{ opacity: 0, x: isReverse ? 50 : -50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8 }}
                                        className="flex-1 w-full perspective-1000"
                                    >
                                        {section.image && (
                                            <TiltCard className="relative group">
                                                <div className="absolute -inset-4 bg-gradient-to-tr from-primary-100 to-secondary-100 rounded-[2rem] blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
                                                <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-white/50 bg-white/40 backdrop-blur-sm p-2">
                                                    <img
                                                        src={section.image}
                                                        alt={section.heading}
                                                        className="w-full h-full object-cover rounded-xl transform transition-transform duration-700 hover:scale-[1.02]"
                                                    />

                                                    {/* Glass Overlay Shine */}
                                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                                </div>
                                            </TiltCard>
                                        )}
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: isReverse ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                        className="flex-1 space-y-8"
                                    >
                                        <div className="relative">
                                            <span className="inline-block py-1 px-3 rounded-full bg-primary-50 border border-primary-100 text-primary-600 text-xs font-bold tracking-wider uppercase mb-4">
                                                About Us
                                            </span>
                                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight">
                                                {section.heading}
                                            </h2>
                                            <div className="absolute -left-6 top-2 w-1 h-12 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full opacity-0 md:opacity-100"></div>
                                        </div>

                                        <div className="prose prose-lg text-gray-600 leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: section.content }} />

                                        <Link to="/about">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-full shadow-lg border border-gray-100 hover:shadow-xl hover:text-primary-600 transition-all flex items-center gap-2 group"
                                            >
                                                Learn More
                                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                                            </motion.button>
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Stats Section */}
            <StatsSection stats={data.stats} />

            {/* Features Section */}
            <FeaturesSection features={data.features} />

            {/* Client Marquee Section */}
            <ClientMarquee />
        </div>
    );
};

export default Home;
