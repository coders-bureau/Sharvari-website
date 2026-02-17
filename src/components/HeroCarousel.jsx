import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroCarousel = ({ slides, images, title, text }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Normalize input to a standard slide format
    // Priority: slides prop > images/title/text props
    let carouselSlides = [];

    if (slides && slides.length > 0) {
        carouselSlides = slides;
    } else {
        // Fallback for legacy usage
        const imageList = Array.isArray(images) ? images : (images ? [images] : []);
        carouselSlides = imageList.map(img => ({
            image: img,
            title: title || "",
            subtext: text || ""
        }));
    }

    const hasSlides = carouselSlides.length > 0;

    useEffect(() => {
        if (!hasSlides || carouselSlides.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselSlides.length);
        }, 6000); // Change slide every 6 seconds

        return () => clearInterval(interval);
    }, [hasSlides, carouselSlides.length]);

    if (!hasSlides) {
        // Empty state
        return (
            <div className="relative bg-gray-900 text-white min-h-[600px] flex items-center justify-center">
                <div className="absolute inset-0 bg-primary-900/20"></div>
                <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center z-10">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-lg">
                        Welcome
                    </h1>
                </div>
            </div>
        );
    }

    const nextSlide = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselSlides.length);
    const prevSlide = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselSlides.length) % carouselSlides.length);

    const currentSlide = carouselSlides[currentIndex];

    return (
        <div className="relative bg-gray-900 text-white min-h-[600px] h-[calc(100vh-80px)] overflow-hidden group">
            {/* Background Images with Ken Burns Effect */}
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                    key={`${currentIndex}-bg`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 z-0"
                >
                    <motion.img
                        src={currentSlide.image}
                        alt={`Hero Slide ${currentIndex + 1}`}
                        className="w-full h-full object-cover"
                        // Ken Burns Effect: Alternate zoom direction for variety or just zoom in
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 8, ease: "linear" }}
                    />
                    {/* Enhanced Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center z-10">
                <div className="flex items-center">
                    {/* Main Text Content */}
                    <div className="relative z-10 max-w-4xl pt-16 md:pt-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${currentIndex}-content`}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }} // Subtle exit to right
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                {currentSlide.title && (
                                    <div className="border-l-4 border-primary-500 pl-6 md:pl-8 py-2 mb-6">
                                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-md whitespace-pre-line">
                                            {currentSlide.title.split(' ').map((word, i, arr) => {
                                                const isLast = i === arr.length - 1;
                                                return (
                                                    <motion.span
                                                        key={i}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.1 * i, duration: 0.5 }}
                                                        className={`inline-block mr-3 ${isLast ? 'text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-200' : ''}`}
                                                    >
                                                        {word}
                                                    </motion.span>
                                                )
                                            })}
                                        </h1>
                                    </div>
                                )}

                                {currentSlide.subtext && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4, duration: 0.6 }}
                                        className="mt-6 text-xl md:text-2xl text-gray-200 max-w-2xl pl-8 leading-relaxed font-light drop-shadow"
                                    >
                                        {currentSlide.subtext}
                                    </motion.p>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Navigation Controls */}
            {carouselSlides.length > 1 && (
                <>
                    {/* Arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-primary-600 text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hidden md:flex z-20"
                        aria-label="Previous Slide"
                    >
                        <ChevronLeft size={32} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-primary-600 text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hidden md:flex z-20"
                        aria-label="Next Slide"
                    >
                        <ChevronRight size={32} />
                    </button>

                    {/* Indicators */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-20">
                        {carouselSlides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-1.5 rounded-full transition-all duration-500 ${index === currentIndex ? "w-12 bg-primary-500" : "w-3 bg-white/40 hover:bg-white/70"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default HeroCarousel;
