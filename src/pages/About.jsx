import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFirestore from "../hooks/useFirestore";
import HeroCarousel from "../components/HeroCarousel";
import { motion } from "framer-motion";
import { Target, Lightbulb, Users, Mail, Phone, Zap, ShieldCheck, Truck, Award, CheckCircle, Factory, HardHat } from "lucide-react";
import TiltCard from "../components/TiltCard";

const About = () => {
    const { getDocument, loading, error } = useFirestore("pages");
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const docData = await getDocument("about");
            setData(docData);
        };
        fetchData();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>;
    if (error && error !== "Document not found") return <div className="text-center text-red-500 mt-10">Error: {error}</div>;

    const defaultData = {
        title: "About SHARVARI ELECTRICALS",
        heroText: "Leading EPC Company delivering excellence in electrical engineering projects.",
        sections: [],
        teamMembers: []
    };

    const displayData = data || defaultData;
    const showHero = displayData.showHero !== false;

    // 1. About Sharvari Electricals
    const aboutSection = {
        heading: "About Sharvari Electricals",
        content: `
            <p class="mb-4">We, <strong>Sharvari Electricals</strong> have great pleasure to introduce ourselves as an Established & Reputed Electrical Engineering organization in field of Supply, Erection, Testing & Commissioning of Turnkey Electricals Projects. We started our business in the field of EHV Electrical Transmission sector in 2009.</p>
            <p>Sharvari Electricals is a firm founded & managed by young, well qualified & experienced engineers. Owing to our varied technical work in various Industrial, Private, Public, & Co-operative sectors, we have grown into reputed & reliable firm within a very short span.</p>
        `,
        image: displayData.aboutImage || "https://upload.wikimedia.org/wikipedia/commons/e/ea/Electric_transmission_power_tower.jpg"
    };

    // 2. Our Infrastructure
    const infraSection = {
        heading: "Our Infrastructure",
        content: `
            <p class="mb-4">Well-equipped 4000 Sq. Ft. office with all modern communication facilities is located in Aurangabad (M.S.), The city is well connected by Air, Rail & Road, which facilitates efficient communication & effective movement of material, manpower & machinery.</p>
            <p class="mb-4">All relevant tools, tackles & machinery is owned by us to execute the jobs seamlessly.</p>
            <p>Our team is well qualified, experienced & dedicated to execute and commissioning of the Systems.</p>
        `,
        image: displayData.infraImage1 || "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Electric_substation.jpg/1280px-Electric_substation.jpg"
    };

    // 3. Our Vision
    const visionSection = {
        heading: "Our Vision",
        content: "To be a part of electricity evolution by providing our services for improvement of human life."
    };

    // 4. Our Mission
    const missionSection = {
        heading: "Our Mission",
        content: "To become a preferred Supplier/Contractor in the field of Electrical Transmission & Distribution sector by providing a Highest quality service at optimum cost with timely completion projects to the level of Customer Delight."
    };

    // 5. Our Strength
    const strengthSection = {
        heading: "Our Strength",
        content: `
            <p class="mb-4">A good manpower acts as a catalyst in any company's success. Armed with efficient, qualified & experienced young minds, we are prepared to tackle every hurdle successfully. We have a deep belief in teamwork and if teamwork is a sport we have the sportsmanship to play it. It is just because of our teamwork that while working under tight time schedules we are able to complete projects without any cost or time overrun.</p>
            <p class="mb-4">Idea is the food for innovation. We in M/s Sharvari Electricals come up with fresh ideas every moment. We implement these ideas to innovate new landmarks in the path of our success. We have a firm belief in Devotion, Dedication, Discipline, Hard work and Teamwork without which we think success can't be achieved. M/s Sharvari Electricals has drawn up ambitious plans for the future aimed at diversifying its operations.</p>
            <p class="mb-4">Timely completion of Project is essence of every job, with 3 P in place (i.e. People, Planning & Performance) we meet project deadlines with breeze.</p>
            <p>To sum up, Sharvari Electricals is just a 09 years young firm. It has done pretty well in a short time and in near future we can give new dimensions and definitions to the electric world.</p>
        `,
        points: ["Experienced Workforce", "Timely Delivery", "Quality Assurance", "Safety First Approach"]
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <div className="bg-white overflow-hidden font-sans">
            {showHero && (
                <div className="relative z-10">
                    <HeroCarousel
                        images={(displayData.heroImages && displayData.heroImages.length > 0) ? displayData.heroImages : displayData.heroImage}
                        title={displayData.title}
                        text={displayData.heroText}
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
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-[100px] opacity-60"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-100 rounded-full blur-[100px] opacity-60"></div>
            </div>

            {/* 1. About Sharvari Electricals Section */}
            <section className="py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={sectionVariants}
                            className="lg:w-1/2 space-y-8"
                        >
                            <div className="relative">
                                <span className="inline-block py-1 px-3 rounded-full bg-primary-50 border border-primary-100 text-primary-600 text-xs font-bold tracking-wider uppercase mb-4">
                                    Who We Are
                                </span>
                                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight">
                                    {aboutSection.heading}
                                </h2>
                                <div className="absolute -left-6 top-2 w-1 h-12 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full opacity-0 md:opacity-100"></div>
                            </div>
                            <div className="prose prose-lg text-gray-600 leading-relaxed font-light text-justify" dangerouslySetInnerHTML={{ __html: aboutSection.content }} />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="lg:w-1/2 w-full perspective-1000"
                        >
                            <TiltCard className="relative group">
                                {/* Gradient removed as requested */}
                                {/* Glass Overlay Shine - Keeping Subtle Shine */}
                                <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-white/50 bg-white/40 backdrop-blur-sm p-2">
                                    <img
                                        src={aboutSection.image}
                                        alt="About Sharvari"
                                        className="w-full h-full object-cover rounded-xl transform transition-transform duration-700 hover:scale-[1.02]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                </div>

                                {/* Decorative Badge on Image */}
                                <div className="absolute -bottom-6 -left-6 bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-xl flex items-center gap-3 border border-white/50 z-20">
                                    <div className="bg-primary-100 p-2 rounded-full">
                                        <Award className="text-primary-600" size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-semibold uppercase">Excellence</p>
                                        <p className="font-bold text-gray-900">Guaranteed</p>
                                    </div>
                                </div>
                            </TiltCard>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. Our Infrastructure Section - Dark Theme */}
            <section className="py-24 relative z-10 overflow-hidden bg-[#0f1115] text-white">
                {/* Dark Background Grid */}
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), 
                                         linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px',
                        backgroundAttachment: 'fixed',
                        pointerEvents: 'none'
                    }}>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                    <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="lg:w-1/2 space-y-8"
                        >
                            <div className="relative">
                                <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-gray-300 text-xs font-bold tracking-wider uppercase mb-4 flex items-center w-fit gap-2">
                                    <Factory size={14} /> Capabilities
                                </span>
                                <h2 className="text-4xl lg:text-5xl font-bold text-white leading-[1.15] tracking-tight">
                                    {infraSection.heading}
                                </h2>
                            </div>

                            <div className="prose prose-lg prose-invert text-gray-300 leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: infraSection.content }} />

                            <div className="grid grid-cols-2 gap-6 mt-8">
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-lg hover:bg-white/10 transition-all duration-300"
                                >
                                    <div className="bg-orange-500/20 w-fit p-3 rounded-lg mb-4">
                                        <HardHat className="text-orange-400" size={24} />
                                    </div>
                                    <h4 className="font-bold text-lg text-white">Safety First</h4>
                                    <p className="text-sm text-gray-400 mt-1">Strict safety protocols followed at every site.</p>
                                </motion.div>
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-lg hover:bg-white/10 transition-all duration-300"
                                >
                                    <div className="bg-blue-500/20 w-fit p-3 rounded-lg mb-4">
                                        <Zap className="text-blue-400" size={24} />
                                    </div>
                                    <h4 className="font-bold text-lg text-white">Modern Tech</h4>
                                    <p className="text-sm text-gray-400 mt-1">Advanced machinery for precision execution.</p>
                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="lg:w-1/2 perspective-1000"
                        >
                            <div className="grid grid-cols-2 gap-6 items-center">
                                <TiltCard className="transform translate-y-8">
                                    <div className="rounded-2xl overflow-hidden shadow-lg border border-white/10 bg-white/5 backdrop-blur-sm p-1">
                                        <img src={infraSection.image} alt="Infrastructure 1" className="bg-gray-800 rounded-xl w-full h-64 object-cover opacity-90 hover:opacity-100 transition-opacity" />
                                    </div>
                                </TiltCard>
                                <TiltCard className="">
                                    <div className="rounded-2xl overflow-hidden shadow-lg border border-white/10 bg-white/5 backdrop-blur-sm p-1">
                                        <img src={displayData.infraImage2 || "https://upload.wikimedia.org/wikipedia/commons/7/77/Electricians_at_work.jpg"} alt="Infrastructure 2" className="bg-gray-800 rounded-xl w-full h-64 object-cover opacity-90 hover:opacity-100 transition-opacity" />
                                    </div>
                                </TiltCard>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3 & 4. Vision & Mission Section - Light Theme (Sandwich effect) */}
            <section className="py-24 relative z-10 bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-primary-600 font-bold tracking-wider uppercase text-xs mb-2 block">Our Philosophy</span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Our Guiding Principles</h2>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mt-4 rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                        {/* Vision Card */}
                        <TiltCard>
                            <div className="h-full bg-white/60 backdrop-blur-md rounded-3xl p-10 shadow-xl border border-white/50 flex flex-col items-center text-center group hover:bg-white/80 transition-all duration-300 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                                <div className="mb-6 bg-blue-50 p-6 rounded-full group-hover:bg-blue-100 transition-colors duration-300 shadow-sm">
                                    <Target className="text-blue-600 w-10 h-10" />
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-4">{visionSection.heading}</h3>
                                <p className="text-gray-600 text-lg leading-relaxed font-light">{visionSection.content}</p>
                            </div>
                        </TiltCard>

                        {/* Mission Card */}
                        <TiltCard>
                            <div className="h-full bg-white/60 backdrop-blur-md rounded-3xl p-10 shadow-xl border border-white/50 flex flex-col items-center text-center group hover:bg-white/80 transition-all duration-300 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
                                <div className="mb-6 bg-emerald-50 p-6 rounded-full group-hover:bg-emerald-100 transition-colors duration-300 shadow-sm">
                                    <Lightbulb className="text-emerald-600 w-10 h-10" />
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-4">{missionSection.heading}</h3>
                                <p className="text-gray-600 text-lg leading-relaxed font-light">{missionSection.content}</p>
                            </div>
                        </TiltCard>
                    </div>
                </div>
            </section>

            {/* 5. Our Strength Section - Dark Theme */}
            <section className="py-24 relative z-10 overflow-hidden bg-[#0f1115] text-white">
                {/* Dark Background Grid */}
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), 
                                         linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px',
                        backgroundAttachment: 'fixed',
                        pointerEvents: 'none'
                    }}>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                    <div className="text-center mb-16">
                        <span className="text-gray-400 font-bold tracking-wider uppercase text-xs mb-2 block">Why Choose Us</span>
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">{strengthSection.heading}</h2>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Left Column: Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-lg"
                        >
                            <div className="prose prose-lg prose-invert text-gray-300 text-justify font-light" dangerouslySetInnerHTML={{ __html: strengthSection.content }} />
                        </motion.div>

                        {/* Right Column: Feature Cards & CTA */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex flex-col gap-8"
                        >
                            <div className="grid sm:grid-cols-2 gap-6">
                                {[
                                    { title: "Experienced Workforce", icon: Users, color: "text-blue-400", bg: "bg-blue-500/20" },
                                    { title: "Timely Delivery", icon: Truck, color: "text-orange-400", bg: "bg-orange-500/20" },
                                    { title: "Quality Assurance", icon: CheckCircle, color: "text-green-400", bg: "bg-green-500/20" },
                                    { title: "Safety First Approach", icon: ShieldCheck, color: "text-red-400", bg: "bg-red-500/20" }
                                ].map((item, idx) => (
                                    <TiltCard key={idx}>
                                        <div className="p-6 rounded-xl border border-white/10 shadow-md bg-white/5 backdrop-blur-md flex flex-col gap-3 h-full hover:bg-white/10 transition-colors">
                                            <div className={`p-3 w-fit rounded-lg ${item.bg}`}>
                                                <item.icon className={item.color} size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white text-lg">{item.title}</h4>
                                                <p className="text-xs text-gray-400 mt-1">Committed to excellence.</p>
                                            </div>
                                        </div>
                                    </TiltCard>
                                ))}
                            </div>

                            <div className="mt-4 p-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 text-center shadow-lg relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-900 rounded-full blur-2xl opacity-50 -mr-12 -mt-12"></div>
                                <div className="relative z-10">
                                    <h4 className="text-2xl font-bold text-white mb-2">Ready to start a project?</h4>
                                    <p className="text-gray-400 mb-8 font-light">Let's build something great together.</p>
                                    <Link to="/contact" className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all active:scale-95 inline-flex items-center gap-2 group-hover:gap-3">
                                        Work With Us <Zap size={18} />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 6. Team Section - Light Theme */}
            {displayData.teamMembers && displayData.teamMembers.length > 0 && (
                <section className="py-24 relative z-10 bg-white border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                            }}
                        >
                            <div className="text-center mb-16">
                                <span className="text-primary-600 font-bold tracking-wider uppercase text-xs mb-2 block">Key People</span>
                                <h2 className="text-3xl font-bold text-gray-900 mt-2">Meet Our Team</h2>
                                <div className="w-20 h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mt-4 rounded-full"></div>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {displayData.teamMembers.map((member, index) => (
                                    <motion.div
                                        key={index}
                                        variants={sectionVariants}
                                        className="h-full"
                                    >
                                        <TiltCard className="h-full">
                                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group h-full flex flex-col">
                                                <div className="h-72 overflow-hidden bg-gray-100 relative">
                                                    {member.image ? (
                                                        <img
                                                            src={member.image}
                                                            alt={member.name}
                                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden">
                                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-slate-50 to-slate-100 opacity-60"></div>
                                                            <div className="relative z-10 bg-white p-4 rounded-full shadow-sm mb-4">
                                                                <Users size={32} className="text-slate-300" />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Gradient Overlay - Only show if image exists */}
                                                    {member.image && (
                                                        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90"></div>
                                                    )}

                                                    {/* Floating Text on Image - Dark text if no image, White if image */}
                                                    <div className={`absolute bottom-6 left-6 right-6 ${member.image ? 'text-white' : 'text-slate-700'}`}>
                                                        <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                                                        <p className={`${member.image ? 'text-primary-200' : 'text-primary-600'} font-medium text-sm tracking-wide uppercase`}>{member.role}</p>
                                                    </div>
                                                </div>

                                                <div className="p-6 bg-white flex-1 flex flex-col justify-center">
                                                    <div className="space-y-3">
                                                        {member.email && (
                                                            <div className="flex items-center text-sm text-gray-600 hover:text-primary-600 transition-colors group/link p-2 hover:bg-primary-50 rounded-lg cursor-pointer">
                                                                <div className="bg-primary-50 p-2 rounded-full mr-3 text-primary-600 group-hover/link:bg-white inset-shadow">
                                                                    <Mail size={16} />
                                                                </div>
                                                                <a href={`mailto:${member.email}`} className="truncate font-medium">{member.email}</a>
                                                            </div>
                                                        )}
                                                        {member.mobile && (
                                                            <div className="flex items-center text-sm text-gray-600 hover:text-primary-600 transition-colors group/link p-2 hover:bg-primary-50 rounded-lg cursor-pointer">
                                                                <div className="bg-secondary-50 p-2 rounded-full mr-3 text-secondary-600 group-hover/link:bg-white inset-shadow">
                                                                    <Phone size={16} />
                                                                </div>
                                                                <a href={`tel:${member.mobile}`} className="font-medium">{member.mobile}</a>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="h-1 bg-gradient-to-r from-primary-500 to-secondary-500 w-0 group-hover:w-full transition-all duration-500"></div>
                                            </div>
                                        </TiltCard>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default About;
