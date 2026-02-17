// import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"; // Removed social icons
import logo from "../assets/logo.png";
import { useSiteSettings } from "../context/SiteSettingsContext";

const Footer = () => {
    const { settings } = useSiteSettings();
    return (
        <footer className="bg-gray-900 text-white py-8 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <img src={logo} alt="Sharvari Logo" className="h-10 w-auto bg-white rounded p-0.5" />
                            <div>
                                <h3 className="text-lg font-bold leading-none">SHARVARI ELECTRICALS</h3>
                                <p className="text-xs text-gray-400 font-semibold tracking-wider">EPC COMPANY</p>
                            </div>
                        </div>
                        <p className="text-gray-400">
                            Sharvari Electricals is a trusted EPC company delivering reliable power infrastructure solutions including transmission lines, substations, electrification projects, and energy services. We are committed to quality, safety, and timely project execution.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="/" className="hover:text-blue-400 transition-colors">Home</a></li>
                            <li><a href="/about" className="hover:text-blue-400 transition-colors">About Us</a></li>
                            <li><a href="/services" className="hover:text-blue-400 transition-colors">Services</a></li>
                            <li><a href="/projects" className="hover:text-blue-400 transition-colors">Projects</a></li>
                            <li><a href="/clients" className="hover:text-blue-400 transition-colors">Clients</a></li>
                            <li><a href="/contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Contact Info</h3>
                        <div className="text-gray-400">
                            {settings.email && <p>Email: {settings.email}</p>}
                            {settings.phone && <p>Phone: {settings.phone}</p>}
                            {settings.address && <p className="mt-2">{settings.address}</p>}
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
                    &copy; {new Date().getFullYear()} Sharvari Electrical. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
