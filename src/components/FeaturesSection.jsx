import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Clock, Award } from "lucide-react";

const FeaturesSection = ({ features }) => {
    if (!features || features.length === 0) return null;

    const icons = [ShieldCheck, Clock, Award, CheckCircle2]; // Cyclic icons if none provided

    return (
        <div className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900">Why Choose Us?</h2>
                    <p className="mt-4 text-xl text-gray-500">Delivering excellence in every project we undertake.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => {
                        const Icon = icons[index % icons.length];
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-primary-500 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Icon size={64} className="text-primary-500" />
                                </div>

                                <div className="mb-4 text-primary-600">
                                    <Icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FeaturesSection;
