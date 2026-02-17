import { useEffect, useState } from "react";
import useFirestore from "../hooks/useFirestore";
import { motion } from "framer-motion";

const ClientMarquee = () => {
    const { getDocument } = useFirestore("pages");
    const [logos, setLogos] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            const data = await getDocument("clients");
            if (data && data.clientLogos) {
                setLogos(data.clientLogos);
            }
        };
        fetchClients();
    }, []);

    if (logos.length === 0) return null;

    return (
        <div className="relative py-24 overflow-hidden bg-white">
            {/* Light Floating Blobs - Matching Welcome Section */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-100 rounded-full blur-[100px] opacity-40 pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-100 rounded-full blur-[100px] opacity-40 pointer-events-none"></div>

            <div className="relative z-10 text-center mb-16 px-4">
                <span className="inline-block py-1 px-3 rounded-full bg-primary-50 border border-primary-100 text-primary-600 text-xs font-bold tracking-wider uppercase mb-4">
                    Our Partners
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted By Industry Leaders</h3>
                <div className="w-24 h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full mb-6"></div>
                <p className="max-w-2xl mx-auto text-lg text-gray-500 font-light">
                    Partnering with renowned organizations to deliver engineering excellence in every project.
                </p>
            </div>

            <div className="relative flex overflow-hidden group">
                <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

                <div
                    className="flex gap-16 items-center flex-nowrap animate-marquee pause-on-hover"
                    style={{ width: "fit-content" }}
                >
                    {/* Duplicate logos 4 times to ensure enough length for seamless loop on large screens */}
                    {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
                        <div
                            key={index}
                            className="w-64 h-36 flex-shrink-0 flex items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 group/item hover:shadow-md transition-all duration-300"
                        >
                            <img
                                src={logo}
                                alt={`Client ${index}`}
                                className="max-w-full max-h-full object-contain filter grayscale group-hover/item:grayscale-0 transition-all duration-500 transform group-hover/item:scale-110"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClientMarquee;
