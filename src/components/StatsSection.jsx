import { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring, useMotionValue, useTransform } from "framer-motion";
import TiltCard from "./TiltCard";

// --- Animated Counter ---
const Counter = ({ value, label }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { duration: 3000 });
    const displayText = useTransform(springValue, (current) => Math.round(current));

    // Parse the numeric part and suffix (e.g., "100+" -> 100 and "+")
    const numericValue = parseInt(value.replace(/[^0-9]/g, "")) || 0;
    const suffix = value.replace(/[0-9]/g, "") || "";

    useEffect(() => {
        if (isInView) {
            motionValue.set(numericValue);
        }
    }, [isInView, numericValue, motionValue]);

    return (
        <TiltCard className="relative group perspective-1000">
            {/* Clean Glass Card - No Heavy Gradients */}
            <div ref={ref} className="relative h-full bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl flex flex-col items-center justify-center text-center transform transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">

                {/* Subtle Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>

                <div className="flex items-baseline justify-center mb-4 relative z-10">
                    <motion.span className="text-5xl md:text-6xl font-light text-white tracking-tight">
                        {displayText}
                    </motion.span>
                    <span className="text-3xl md:text-4xl text-primary-300 font-light ml-1 opacity-80">{suffix}</span>
                </div>

                <div className="h-px w-16 bg-white/20 mb-5"></div>

                <p className="text-gray-300 font-medium tracking-[0.2em] uppercase text-xs md:text-sm">
                    {label}
                </p>

                {/* Minimal Corner Accents */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-white/10 rounded-tl-2xl group-hover:border-white/30 transition-colors"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/10 rounded-br-2xl group-hover:border-white/30 transition-colors"></div>
            </div>
        </TiltCard>
    );
};

// --- Stats Section ---
const StatsSection = ({ stats }) => {
    if (!stats || stats.length === 0) return null;

    // Generate random particles
    const particles = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        size: Math.random() * 3 + 1,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: Math.random() * 20 + 15, // Slower movement
        delay: Math.random() * 5
    }));

    return (
        <section className="relative py-32 overflow-hidden bg-[#0f1115]">
            {/* Background Layers - Toned Down */}
            <div className="absolute inset-0 z-0">
                {/* Deep Dark Base */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0f1115] via-[#13151a] to-[#0f1115]"></div>

                {/* Floating Particles - White/Blue subtle */}
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute rounded-full bg-white/10 blur-[1px]"
                        style={{
                            width: p.size,
                            height: p.size,
                            left: p.left,
                            top: p.top,
                        }}
                        animate={{
                            y: [0, -60, 0],
                            opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            delay: p.delay,
                            ease: "easeInOut",
                        }}
                    />
                ))}

                {/* Subtle Grid - Lower Opacity */}
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), 
                                         linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px',
                        backgroundAttachment: 'fixed'
                    }}>
                </div>

                {/* Very Subtle Background Glows - Reduced Opacity */}
                <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-primary-900/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
                <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24 relative"
                >
                    <span className="inline-block py-1 px-4 rounded-full bg-white/5 border border-white/10 text-gray-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 hover:bg-white/10 transition-colors cursor-default">
                        Our Impact
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extralight text-white tracking-tight">
                        Engineering Excellence <span className="font-semibold text-white">By The Numbers</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <Counter key={index} value={stat.value} label={stat.label} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
