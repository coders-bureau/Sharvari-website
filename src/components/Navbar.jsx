import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useSiteSettings } from "../context/SiteSettingsContext";

import logo from "../assets/logo.png";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const { settings } = useSiteSettings();
    const isTransparentRoute = ["/", "/about"].includes(location.pathname);

    // Handle scroll for transparent overlay
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        // initial check
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Services", path: "/services" },
        { name: "Projects", path: "/projects" },
        { name: "Clients", path: "/clients" },
        { name: "Contact", path: "/contact" },
    ];

    const isTransparent = isTransparentRoute && !isScrolled;

    return (
        <nav className={clsx(
            "top-0 z-50 font-sans transition-all duration-300",
            isTransparentRoute ? "fixed w-full" : "sticky",
            !isTransparent ? "bg-white shadow-md" : "bg-transparent backdrop-blur-[1px]"
        )}>
            {/* Top Bar - Collapsible
            <div className={`bg-gray-50 border-b border-gray-100 hidden md:flex items-center justify-center px-4 overflow-hidden transition-all duration-300 ease-in-out ${showTopBar ? "h-10 opacity-100" : "h-0 opacity-0"}`}>
                <div className="max-w-7xl w-full mx-auto flex justify-between items-center text-xs text-gray-500">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-1">
                            <MapPin size={12} className="text-gray-600" />
                            <span>Maharashtra, India</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {settings.email && (
                            <div className="flex items-center gap-1">
                                <Mail size={12} className="text-gray-600" />
                                <a href={`mailto:${settings.email}`} className="hover:text-primary-600 transition-colors">{settings.email}</a>
                            </div>
                        )}
                        {settings.phone && (
                            <div className="flex items-center gap-1">
                                <Phone size={12} className="text-gray-600" />
                                <a href={`tel:${settings.phone}`} className="hover:text-primary-600 transition-colors">{settings.phone}</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            */}

            {/* Main Navbar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-16 md:h-24">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center gap-2 md:gap-3">
                            <img src={logo} alt="Sharvari Logo" className={clsx("h-10 md:h-14 w-auto transition-all", isTransparent && "drop-shadow-md")} />
                            <div className="flex flex-col items-center">
                                <span className={clsx("text-lg md:text-2xl font-bold tracking-widest leading-none transition-colors", !isTransparent ? "text-primary-700" : "text-white drop-shadow-md")}>SHARVARI ELECTRICALS</span>
                                <span className={clsx("text-[0.5rem] md:text-[0.6rem] font-bold tracking-[0.3em] uppercase mt-0.5 transition-colors", !isTransparent ? "text-[#5A2283]" : "text-white drop-shadow-md")}>EPC COMPANY</span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Menu - Moved to Right */}
                    <div className="hidden md:flex items-center space-x-8 ml-auto">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={clsx(
                                    "text-base font-medium transition-colors flex items-center gap-1",
                                    !isTransparent
                                        ? (location.pathname === link.path ? "text-primary-600" : "text-gray-600 hover:text-primary-600")
                                        : (location.pathname === link.path ? "text-white drop-shadow-md" : "text-white/90 hover:text-white drop-shadow-md")
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Toggle */}
                    <div className="flex items-center gap-4 md:hidden ml-auto">
                        <div className="flex items-center">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className={clsx(
                                    "inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-colors",
                                    !isTransparent ? "text-gray-700 hover:text-primary-600 hover:bg-gray-100" : "text-white hover:bg-white/20"
                                )}
                            >
                                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${location.pathname === link.path
                                    ? "text-primary-700 bg-primary-50"
                                    : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    {/* Contact Info in Mobile Menu */}
                    <div className="px-5 py-4 border-t border-gray-100 bg-gray-50 space-y-3">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <MapPin size={16} className="text-primary-600" />
                            <span>Maharashtra, India</span>
                        </div>
                        {settings.email && (
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <Mail size={16} className="text-primary-600" />
                                <a href={`mailto:${settings.email}`} className="hover:text-primary-600 transition-colors">
                                    {settings.email}
                                </a>
                            </div>
                        )}
                        {settings.phone && (
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <Phone size={16} className="text-primary-600" />
                                <a href={`tel:${settings.phone}`} className="hover:text-primary-600 transition-colors">
                                    {settings.phone}
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
