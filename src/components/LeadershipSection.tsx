"use client";

import React from "react";
import { motion } from "framer-motion";
import { Crown, Star, Award } from "lucide-react";
import Image from "next/image";

// Data
const chiefPatron = {
    name: "Dr. R. Srinivas",
    title: "Chief Patron",
    image: "/Committee/R Srinivas.webp",
};

const patrons = [
    { name: "Dr. C. N. Srinivas", image: "/Committee/C N Srinivas.webp" },
    { name: "Mr. R. Gopala Krishna", image: "/Committee/Gopala Krishna.webp" },
];

const convener = {
    name: "Dr. S. Vidyadhara",
    title: "Convener",
    image: "/Committee/Vidyadhara.webp",
};

const organisingSecretary = {
    name: "Dr. V. Venkata Rao",
    title: "Organising Secretary",
    image: "/Committee/Venkata Rao.webp",
};

const mediaPartner = {
    name: "Dr. Vikram Choudhary",
    title: "Media Partner",
    image: "/Committee/vikram choudhary.png",
};

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

// Components
const LeadershipCard = ({
    name,
    title,
    isChief = false,
    image,
}: {
    name: string;
    title: string;
    isChief?: boolean;
    image?: string;
}) => (
    <motion.div
        variants={itemVariants}
        className={`relative group ${isChief ? "col-span-full md:col-span-1 lg:col-span-full" : ""}`}
    >
        <div
            className={`h-full bg-white shadow-lg ${isChief
                ? "border-amber-400/30 shadow-amber-100"
                : "border-gray-100 shadow-gray-100"
                } border rounded-3xl p-6 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] relative overflow-hidden`}
        >
            {/* Background Gradient for specific cards */}
            {isChief && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/10 to-orange-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-150"></div>
            )}

            <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
                <div className="relative">
                    <div
                        className={`w-24 h-24 rounded-full flex items-center justify-center overflow-hidden border-4 shadow-md transition-colors duration-300 ${isChief
                            ? "bg-gradient-to-br from-amber-400 to-orange-500 border-amber-50 group-hover:border-amber-200"
                            : "bg-primary/5 border-white group-hover:border-primary/20"
                            }`}
                    >
                        {image ? (
                            <Image
                                src={image}
                                alt={name}
                                width={96}
                                height={96}
                                className="w-full h-full object-cover"
                            />
                        ) : isChief ? (
                            <Crown className="w-10 h-10 text-white" />
                        ) : (
                            <Star className="w-10 h-10 text-primary" />
                        )}
                    </div>
                    {isChief && (
                        <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white p-1.5 rounded-full shadow-sm">
                            <Crown className="w-4 h-4" />
                        </div>
                    )}
                </div>

                <div className="text-center sm:text-left">
                    <span
                        className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2 inline-block ${isChief
                            ? "text-amber-700 bg-amber-100"
                            : "text-primary bg-primary/10"
                            }`}
                    >
                        {title}
                    </span>
                    <h3 className={`text-xl md:text-2xl font-bold mt-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-300 ${isChief
                            ? "text-gray-900 from-amber-600 to-orange-600"
                            : "text-gray-900 from-primary to-blue-600"
                        }`}>
                        {name}
                    </h3>
                </div>
            </div>
        </div>
    </motion.div>
);

const PatronCard = ({ name, image }: { name: string; image?: string }) => (
    <motion.div variants={itemVariants} className="group h-full">
        <div className="h-full bg-white border border-purple-100 rounded-3xl p-6 transition-all duration-500 hover:shadow-xl hover:shadow-purple-100/50 hover:-translate-y-1 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -mr-6 -mt-6 transition-transform duration-500 group-hover:scale-150"></div>

            <div className="flex items-center gap-4 relative z-10">
                <div className="w-16 h-16 rounded-full bg-purple-50 flex-shrink-0 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm group-hover:border-purple-200 transition-colors duration-300">
                    {image ? (
                        <Image
                            src={image}
                            alt={name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <Award className="w-8 h-8 text-purple-600" />
                    )}
                </div>
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-purple-600 mb-1 block">
                        Patron
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors">{name}</h3>
                </div>
            </div>
        </div>
    </motion.div>
);

const LeadershipSection = () => {
    return (
        <section className="py-20 relative overflow-hidden bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="mb-16"
                >
                    <div className="text-center mb-16">
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100 text-amber-600 font-semibold text-sm uppercase tracking-wider mb-6">
                            <Crown className="w-4 h-4" /> Leadership Team
                        </motion.div>
                        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
                            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Visionaries</span>
                        </motion.h2>
                        <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            The distinguished leaders guiding INNOVATE PHARMA 2026 towards excellence and innovation.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Chief Patron - Full Width */}
                        <LeadershipCard
                            name={chiefPatron.name}
                            title={chiefPatron.title}
                            image={chiefPatron.image}
                            isChief={true}
                        />

                        {/* Patrons */}
                        {patrons.map((patron, index) => (
                            <PatronCard key={index} name={patron.name} image={patron.image} />
                        ))}

                        {/* Convener */}
                        <LeadershipCard name={convener.name} title={convener.title} image={convener.image} />

                        {/* Organising Secretary */}
                        <LeadershipCard
                            name={organisingSecretary.name}
                            title={organisingSecretary.title}
                            image={organisingSecretary.image}
                        />

                        {/* Media Partner */}
                        <LeadershipCard
                            name={mediaPartner.name}
                            title={mediaPartner.title}
                            image={mediaPartner.image}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default LeadershipSection;
