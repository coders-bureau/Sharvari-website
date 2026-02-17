import { useEffect, useState } from "react";
import useFirestore from "../hooks/useFirestore";
import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import { useSiteSettings } from "../context/SiteSettingsContext";
import HeroCarousel from "../components/HeroCarousel";
import TiltCard from "../components/TiltCard";

const Contact = () => {
    const { getDocument, loading, error } = useFirestore("pages");
    const { settings } = useSiteSettings();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const docData = await getDocument("contact");
            setData(docData);
        };
        fetchData();
    }, []);

    if (error && error !== "Document not found") return <div className="text-center text-red-500 mt-10">Error: {error}</div>;

    const defaultData = {
        title: "Contact SHARVARI ELECTRICALS",
        heroText: "Get in touch with us for your EPC project requirements.",
        sections: []
    };

    const displayData = data || defaultData;
    const showHero = displayData.showHero !== false;

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

            {/* Top Section with Content & Floating Form */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column: Info */}
                    <div className="animate-slideUp">
                        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-sm hover:shadow-md transition-shadow duration-300">
                            <span className="inline-block py-1 px-3 rounded-full bg-primary-50 border border-primary-100 text-primary-600 text-xs font-bold tracking-wider uppercase mb-4">
                                Get In Touch
                            </span>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">We'd Love to Hear From You</h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-6"></div>
                            <p className="text-lg text-gray-600 leading-relaxed mb-8 font-light">
                                Whether you have questions, need support, or want to learn more about our EPC services, our team is here to help.
                            </p>

                            <div className="space-y-6">
                                {/* Address */}
                                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/50 transition-colors duration-300">
                                    <div className="bg-primary-50 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-primary-100">
                                        <MapPin className="h-5 w-5 text-primary-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">Our Address</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed max-w-sm font-light">
                                            {settings.address || "Plot No. 12, Gut No. 23, Opp. Hotel Sai Prasad, Beed Bypass Rd, Chhatrapati Sambhajinagar, Maharashtra 431005"}
                                        </p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/50 transition-colors duration-300">
                                    <div className="bg-primary-50 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-primary-100">
                                        <Mail className="h-5 w-5 text-primary-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">Email</h3>
                                        <p className="text-gray-600 text-sm font-light">
                                            {settings.email || "info@sharvari.com"}
                                        </p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/50 transition-colors duration-300">
                                    <div className="bg-primary-50 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-primary-100">
                                        <Phone className="h-5 w-5 text-primary-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">Phone</h3>
                                        <p className="text-gray-600 text-sm font-light">
                                            {settings.phone || "+91 123 456 7890"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Form (Floating Card with Translation) */}
                    <div className="transform lg:translate-y-12">
                        <TiltCard>
                            <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/60 animate-slideUp relative overflow-hidden" style={{ animationDelay: '0.2s' }}>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-100/50 to-transparent rounded-bl-full pointer-events-none"></div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-6 relative z-10">Send us a Message</h3>
                                <ContactForm />
                            </div>
                        </TiltCard>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Boxed Map (Sitting Behind/Below) */}
            <MapSection />
        </div>
    );
};

const MapSection = () => {
    const [mapLoaded, setMapLoaded] = useState(false);
    const [shouldLoadMap, setShouldLoadMap] = useState(false);

    useEffect(() => {
        // Delay map loading slightly to allow main thread to settle
        const timer = setTimeout(() => {
            setShouldLoadMap(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-0 mt-8 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            <div className="w-full h-[500px] bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-200 relative">
                {!mapLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                    </div>
                )}
                {shouldLoadMap && (
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.6826500755914!2d75.3271083!3d19.869117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb98654a2b0fdf%3A0xd48c1ec7e2ec810f!2sSharvari%20Electricals!5e0!3m2!1sen!2sin!4v1709234567890!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        title="Sharvari Electricals Location"
                        className={`w-full h-full transition-opacity duration-700 ${mapLoaded ? 'opacity-100 grayscale-[20%] hover:grayscale-0' : 'opacity-0'}`}
                        onLoad={() => setMapLoaded(true)}
                    ></iframe>
                )}
            </div>
        </div>
    );
};

const ContactForm = () => {
    const { addDocument, loading } = useFirestore("messages");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        message: ""
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^[0-9]{10}$/;

        if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }
        if (!mobileRegex.test(formData.mobile)) {
            newErrors.mobile = "Please enter a valid 10-digit mobile number.";
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "mobile") {
            // Only allow numbers
            if (value && !/^\d*$/.test(value)) return;
        }

        setFormData({ ...formData, [name]: value });
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (!formData.name || !formData.email || !formData.mobile || !formData.message) {
            return;
        }

        const success = await addDocument(formData, "messages");
        if (success) {
            setIsSubmitted(true);
            setFormData({ name: "", email: "", mobile: "", message: "" });
            setErrors({});

            // Allow the animation to play for 3 seconds, then reset
            setTimeout(() => {
                setIsSubmitted(false);
            }, 3000);
        }
    };

    if (isSubmitted) {
        return (
            <div className="flex flex-col items-center justify-center py-12 space-y-4 animate-fadeIn">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Thank You!</h3>
                <p className="text-gray-500 text-center">Your message has been sent successfully. <br /> We'll get back to you shortly.</p>
            </div>
        );
    }

    return (
        <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50 outline-none transition-all duration-200 bg-white/50 placeholder-gray-400"
                        placeholder="Enter your name..."
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-xl outline-none transition-all duration-200 bg-white/50 placeholder-gray-400 focus:ring focus:ring-opacity-50 ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-primary-500 focus:ring-primary-200'}`}
                        placeholder="Enter your email..."
                        required
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
                    <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-xl outline-none transition-all duration-200 bg-white/50 placeholder-gray-400 focus:ring focus:ring-opacity-50 ${errors.mobile ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-primary-500 focus:ring-primary-200'}`}
                        placeholder="Enter your 10-digit mobile number..."
                        required
                        maxLength={10}
                    />
                    {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50 outline-none transition-all duration-200 bg-white/50 placeholder-gray-400 resize-none"
                    placeholder="How can we help you?"
                    required
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl text-white font-bold text-lg bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? "Sending..." : "Send Message"}
            </button>
        </form>
    );
};

export default Contact;
