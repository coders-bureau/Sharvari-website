import { useEffect, useState } from "react";
import useFirestore from "../hooks/useFirestore";
import HeroCarousel from "../components/HeroCarousel";
import TiltCard from "../components/TiltCard"; // Import TiltCard
import { motion } from "framer-motion"; // Import motion

const Services = () => {
    const { getDocument, loading, error } = useFirestore("pages");
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const docData = await getDocument("services");
            setData(docData);
        };
        fetchData();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>;
    if (error && error !== "Document not found") return <div className="text-center text-red-500 mt-10">Error: {error}</div>;

    const defaultData = {
        title: "Our Services",
        heroText: "Leading the way in Electrical Infrastructure Development.",
        sections: [
            { heading: "EHV Transmission Lines", content: "Turnkey & EPC of EHV Transmission Lines of all types, including Design, Supply, Civil, Erection, Testing & Commissioning of projects (up to 765 kV)", image: "https://placehold.co/800x600/2563eb/FFF?text=EHV+Transmission+Lines" },
            { heading: "Sub-stations", content: "Turnkey EPC of all types of Sub-stations including Supply, Civil, Erection, Testing & Commissioning of projects (up to 765 kV)", image: "https://placehold.co/800x600/2563eb/FFF?text=Sub-stations" },
            { heading: "Railway Traction Sub-Stations", content: "Turnkey EPC of Traction Sub Stations for Railways including Supply, Civil, Erection, Testing & Commissioning of projects (up to 25/220 kV)", image: "https://placehold.co/800x600/2563eb/FFF?text=Railway+Traction" },
            { heading: "Rural Electrification", content: "Rural Electrification & Distribution Projects including infrastructure setup and grid connectivity.", image: "https://placehold.co/800x600/2563eb/FFF?text=Rural+Electrification" },
            { heading: "Maintenance Services", content: "On Site Service Contracts like Live/Hot/Cold line maintenance of EHV Lines/Sub-stations.", image: "https://placehold.co/800x600/2563eb/FFF?text=Maintenance+Services" },
            { heading: "Solar & Irrigation Projects", content: "Electrical Transmission & Sub – Station Projects of Lift Irrigation Schemes, Mega Scale Solar Power Plants.", image: "https://placehold.co/800x600/2563eb/FFF?text=Solar+%26+Irrigation" },
            { heading: "Industrial Electrification", content: "Comprehensive Industrial Electrification Projects for factories and industrial zones.", image: "https://placehold.co/800x600/2563eb/FFF?text=Industrial+Electrification" },
            { heading: "Line Upgradation", content: "Up gradation of EHV Lines to increase capacity and reliability.", image: "https://placehold.co/800x600/2563eb/FFF?text=Line+Upgradation" },
            { heading: "Harmonic Analysis", content: "Detailed Harmonic Analysis to ensure power system health and efficiency.", image: "https://placehold.co/800x600/2563eb/FFF?text=Harmonic+Analysis" },
            { heading: "Power Quality Audit", content: "Power Quality audit services to identify and resolve electrical issues.", image: "https://placehold.co/800x600/2563eb/FFF?text=Power+Quality+Audit" },
            { heading: "Energy Saving Consultant", content: "Expert consultancy for energy saving and efficiency improvements.", image: "https://placehold.co/800x600/2563eb/FFF?text=Energy+Saving" }
        ]
    };

    const displayData = data || defaultData;
    const showHero = displayData.showHero !== false;

    // Framer Motion Variants
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
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <div className="bg-white font-sans overflow-hidden">
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
                        What We Do
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">Infrastructural Development Projects</h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full mb-6"></div>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">We undertake a wide range of turnkey and EPC projects with a focus on quality, safety, and timely delivery.</p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                >
                    {displayData.sections && displayData.sections.length > 0 ? (
                        displayData.sections.map((section, index) => {
                            // Helper to find default image for this section
                            const defaultImage = defaultData.sections.find(s => s.heading === section.heading)?.image;
                            const imageToDisplay = section.image || defaultImage;

                            return (
                                <motion.div key={index} variants={itemVariants} className="h-full">
                                    <TiltCard className="h-full">
                                        <div className="group h-full bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
                                            {imageToDisplay ? (
                                                <div className="h-56 overflow-hidden relative">
                                                    <img
                                                        src={imageToDisplay}
                                                        alt={section.heading}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                                                </div>
                                            ) : (
                                                <div className="h-56 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center relative overflow-hidden">
                                                    <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
                                                    <svg className="w-16 h-16 text-primary-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                    </svg>
                                                </div>
                                            )}

                                            <div className="p-8 flex-1 flex flex-col">
                                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">{section.heading}</h3>
                                                <div className="w-12 h-1 bg-primary-200 mb-4 rounded-full group-hover:w-20 group-hover:bg-primary-500 transition-all duration-300"></div>
                                                <div className="text-gray-600 leading-relaxed text-sm whitespace-pre-wrap flex-1 font-light" dangerouslySetInnerHTML={{ __html: section.content }} />
                                            </div>
                                        </div>
                                    </TiltCard>
                                </motion.div>
                            );
                        })
                    ) : (
                        <div className="col-span-full text-center text-gray-500 py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">No services listed yet.</div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Services;
