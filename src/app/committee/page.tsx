"use client";

import Image from "next/image";

import React from "react";
import { motion } from "framer-motion";
import { Crown, Users, Star, Award } from "lucide-react";

interface CommitteeMember {
    name: string;
    role: "Chairman" | "Co-Chairman" | "Member";
    image?: string;
}

interface Committee {
    name: string;
    members: CommitteeMember[];
}

// Leadership Data
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

// Committees Data
const committees: Committee[] = [
    {
        name: "Registration, Feedback and Helpdesk Committee",
        members: [
            { name: "Dr. A. Ramu", role: "Chairman", image: "/Committee/Dr.-A.-Ramu-Member.webp" },
            { name: "Dr. P. Vijetha", role: "Co-Chairman", image: "/Committee/Vijetha.webp" },
            { name: "Dr. D. Sandeep", role: "Member", image: "/Committee/Dr. D. sandeep.jpeg" },
            { name: "Dr. S. Ravi Chandra", role: "Member", image: "/Committee/Ravi Chandra.webp" },
            { name: "Mrs. G. Sravani", role: "Member", image: "/Committee/Sravani.jpg" },
        ],
    },
    {
        name: "Scientific Committee",
        members: [
            { name: "Dr. R. L. C. Sasidhar", role: "Chairman", image: "/Committee/Dr.-R.L.C.-Sasidhar-Member.webp" },
            { name: "Dr. P. V. S. N. Malleswara Rao", role: "Co-Chairman", image: "/Committee/Malleswara rao.webp" },
            { name: "Dr. A. Chakravarthy", role: "Member", image: "/Committee/Chakravarthi.webp" },
            { name: "Mrs. K. Haritha Pavani", role: "Member", image: "/Committee/Haritha Pavani.webp" },
            { name: "Mr. P. Prachet", role: "Member", image: "/Committee/Mr. P. Prachet.jpg" },
        ],
    },
    {
        name: "Transportation Committee",
        members: [
            { name: "Dr. K. Viswanadh", role: "Chairman", image: "/Committee/Viswanadh.webp" },
            { name: "Dr. Sk. Khadar Yazdan", role: "Co-Chairman", image: "/Committee/Yasdani.webp" },
            { name: "Dr. B. Sulochana", role: "Member", image: "/Committee/Dr.Sulochana.jpg" },
            { name: "Mrs. Sd. Rihana", role: "Member", image: "/Committee/Rihana.webp" },
            { name: "Mrs. K. Teja", role: "Member", image: "/Committee/Dr. K Teja.jpg" },
        ],
    },
    {
        name: "VIP Logistics Committee",
        members: [
            { name: "Dr. Ch. Aruna Kumar", role: "Chairman", image: "/Committee/Aruna Kumar.webp" },
            { name: "Dr. P. Mallikarjuna Rao", role: "Co-Chairman", image: "/Committee/Mallikarjuna Rao.webp" },
            { name: "Mr. N. Venkata Deepak", role: "Member", image: "/Committee/Deepak.webp" },
            { name: "Mrs. Sk. Shafiya Begum", role: "Member", image: "/Committee/Sahfiya Begum.webp" },
            { name: "Mr. S. Vikas", role: "Member", image: "/Committee/Vikas.webp" },
        ],
    },
    {
        name: "Accommodation Committee",
        members: [
            { name: "Dr. S. Siva Prasad", role: "Chairman", image: "/Committee/Siva Prasad.webp" },
            { name: "Dr. S. Kotaiah", role: "Co-Chairman", image: "/Committee/Kotaiah.webp" },
            { name: "Mrs. B. Sowjanya Lakshmi", role: "Member", image: "/Committee/Sowjanya Lakshmi.webp" },
            { name: "Mrs. V. Jhansi Rani", role: "Member", image: "/Committee/Jhansi rani.webp" },
            { name: "Mrs. V. Radha Krishnaveni", role: "Member", image: "/Committee/Radha Krishnaveni.webp" },
        ],
    },
    {
        name: "Hospitality Committee",
        members: [
            { name: "Dr. J. Subba Rao", role: "Chairman", image: "/Committee/Subba Rao.webp" },
            { name: "Dr. P. Saidulu", role: "Co-Chairman", image: "/Committee/Saidhulu.webp" },
            { name: "Dr. S. Meraj Sultana", role: "Member", image: "/Committee/Meraj Sulthana.webp" },
            { name: "Mr. Y. Ashok Kumar", role: "Member", image: "/Committee/Ashok.webp" },
            { name: "Mr. V. Edukondalu", role: "Member", image: "/Committee/Edukondalu.webp" },
        ],
    },
    {
        name: "Protocol & Entertainment Committee",
        members: [
            { name: "Dr. J. Ramesh Babu", role: "Chairman", image: "/Committee/Ramesh Babu.jpg" },
            { name: "Dr. V. Ravi", role: "Co-Chairman", image: "/Committee/V Ravi.webp" },
            { name: "Dr. M. Raghava Kalyan", role: "Member", image: "/Committee/Raghava Kalyan.webp" },
            { name: "Dr. V. Sindhu Vaishnavi", role: "Member", image: "/Committee/Sindhu vaishnavi.webp" },
            { name: "Ms. R. Sai Reshma", role: "Member", image: "/Committee/Reshma.webp" },
        ],
    },
];

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

// Leadership Card Component
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

// Patron Card Component
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

// Committee Card Component
const CommitteeCard = ({ committee }: { committee: Committee }) => (
    <motion.div
        variants={itemVariants}
        className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-lg shadow-gray-100/50 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
        <div className="bg-gradient-to-r from-gray-50 to-white px-8 py-6 border-b border-gray-100 flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-gray-100">
                <Users className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{committee.name}</h3>
        </div>

        <div className="p-6 md:p-8 bg-white flex-grow">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {committee.members.map((member, index) => (
                    <div
                        key={index}
                        className={`flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 hover:shadow-md border ${member.role === "Chairman"
                            ? "bg-amber-50/50 border-amber-100 hover:border-amber-300"
                            : member.role === "Co-Chairman"
                                ? "bg-cyan-50/50 border-cyan-100 hover:border-cyan-300"
                                : "bg-white border-gray-50 hover:border-primary/30"
                            }`}
                    >
                        <div className={`w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 shadow-sm ${member.role === "Chairman" ? "border-amber-200" :
                            member.role === "Co-Chairman" ? "border-cyan-200" : "border-gray-100"
                            }`}>
                            {member.image ? (
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                    <Users className="w-5 h-5 text-gray-400" />
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-bold text-gray-800 truncate block w-full">{member.name}</span>
                            <span
                                className={`text-[10px] uppercase tracking-wider font-bold mt-0.5 ${member.role === "Chairman"
                                    ? "text-amber-600"
                                    : member.role === "Co-Chairman"
                                        ? "text-cyan-600"
                                        : "text-gray-400"
                                    }`}
                            >
                                {member.role}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </motion.div>
);

const CommitteePage = () => {
    return (
        <div className="bg-gray-50 min-h-screen relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-10 left-10 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-1/4 right-10 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                <div className="absolute bottom-10 right-1/3 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-6000"></div>
            </div>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="max-w-7xl mx-auto relative z-10"
            >
                {/* Page Title */}
                <motion.div variants={itemVariants} className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                            Organising Committee
                        </span>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Meet the dedicated team behind INNOVATE PHARMA 2026
                    </p>
                </motion.div>

                {/* Leadership Section */}
                <motion.section variants={containerVariants} className="mb-16">
                    <motion.h2
                        variants={itemVariants}
                        className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3"
                    >
                        <Crown className="w-6 h-6 text-amber-500" />
                        <span>Leadership</span>
                    </motion.h2>

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
                        />
                    </div>
                </motion.section>

                {/* Committees Section */}
                <motion.section variants={containerVariants}>
                    <motion.h2
                        variants={itemVariants}
                        className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3"
                    >
                        <Users className="w-6 h-6 text-primary" />
                        <span>Organising Committees</span>
                    </motion.h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {committees.map((committee, index) => (
                            <CommitteeCard key={index} committee={committee} />
                        ))}
                    </div>
                </motion.section>
            </motion.div>
        </div>
    );
};

export default CommitteePage;
