"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Crown, Users, Star, Award, Sparkles } from "lucide-react";

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
        className={`relative group ${isChief ? "col-span-full md:col-span-1 lg:col-span-full max-w-2xl mx-auto w-full" : ""}`}
    >
        <div
            className={`h-full bg-white transition-all duration-300 relative overflow-hidden rounded-3xl group-hover:-translate-y-1
                ${isChief
                    ? "border-2 border-amber-100 shadow-xl shadow-amber-900/5 hover:shadow-2xl hover:shadow-amber-900/10"
                    : "border border-gray-100 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-indigo-500/10"
                }`}
        >
            {/* Decorative Background Blob */}
            <div className={`absolute -top-16 -right-16 w-32 h-32 rounded-full blur-2xl opacity-50 z-0 transition-colors duration-500
                ${isChief ? "bg-amber-200" : "bg-indigo-100"}`}
            />
            {isChief && <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-50 z-0" />}

            <div className={`relative z-10 flex ${isChief ? 'flex-col sm:flex-row p-8' : 'flex-col p-6'} items-center gap-6 text-center sm:text-left`}>

                {/* Image Container */}
                <div className="relative flex-shrink-0">
                    <div className={`relative rounded-full overflow-hidden shadow-inner
                        ${isChief
                            ? "w-32 h-32 ring-4 ring-amber-50 group-hover:ring-amber-100"
                            : "w-28 h-28 ring-4 ring-gray-50 group-hover:ring-indigo-50"
                        } transition-all duration-300`}>
                        {image ? (
                            <Image
                                src={image}
                                alt={name}
                                fill
                                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                            />
                        ) : (
                            <div className={`w-full h-full flex items-center justify-center ${isChief ? "bg-amber-50" : "bg-indigo-50"}`}>
                                {isChief ? <Crown className="w-10 h-10 text-amber-500" /> : <Star className="w-8 h-8 text-indigo-500" />}
                            </div>
                        )}
                    </div>

                    {/* Badge */}
                    {isChief && (
                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white p-2 rounded-full shadow-lg border-2 border-white">
                            <Crown className="w-4 h-4" />
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className={`${isChief ? "" : "flex flex-col items-center"}`}>
                    <span
                        className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2 inline-flex items-center gap-1.5
                        ${isChief
                                ? "text-amber-700 bg-amber-50 border border-amber-100"
                                : "text-indigo-600 bg-indigo-50 border border-indigo-100"
                            }`}
                    >
                        {isChief && <Crown className="w-3 h-3" />}
                        {title}
                    </span>
                    <h3 className={`font-bold transition-colors duration-300 
                        ${isChief ? "text-2xl md:text-3xl text-gray-900" : "text-xl text-gray-900 group-hover:text-indigo-700"}
                    `}>
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
        <div className="h-full bg-white border border-gray-100 rounded-3xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex flex-col items-center text-center gap-4 relative z-10">
                <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-br from-purple-100 to-white shadow-sm group-hover:shadow-md transition-all duration-300">
                    <div className="w-full h-full rounded-full overflow-hidden relative bg-white">
                        {image ? (
                            <Image
                                src={image}
                                alt={name}
                                fill
                                className="object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-purple-50">
                                <Award className="w-8 h-8 text-purple-400" />
                            </div>
                        )}
                    </div>
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
        className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-lg shadow-gray-200/40 hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300 flex flex-col h-full"
    >
        {/* Header */}
        <div className="bg-gradient-to-br from-gray-50 to-white px-8 py-6 border-b border-gray-100 flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-gray-100 group-hover:scale-105 transition-transform duration-300 group-hover:shadow-md group-hover:border-primary/20">
                <Users className="w-6 h-6 text-primary group-hover:text-blue-600 transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 leading-tight">{committee.name}</h3>
        </div>

        {/* Members */}
        <div className="p-6 bg-white flex-grow">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {committee.members.map((member, index) => {
                    const isChair = member.role === "Chairman";
                    const isCoChair = member.role === "Co-Chairman";

                    let bgClass = "bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm";
                    let ringClass = "border-gray-100";
                    let roleClass = "text-gray-500 bg-gray-50 border-gray-100";

                    if (isChair) {
                        bgClass = "bg-amber-50/30 border-amber-100 hover:border-amber-200 hover:bg-amber-50/50";
                        ringClass = "border-amber-200";
                        roleClass = "text-amber-700 bg-amber-50 border-amber-100";
                    } else if (isCoChair) {
                        bgClass = "bg-cyan-50/30 border-cyan-100 hover:border-cyan-200 hover:bg-cyan-50/50";
                        ringClass = "border-cyan-200";
                        roleClass = "text-cyan-700 bg-cyan-50 border-cyan-100";
                    }

                    return (
                        <div
                            key={index}
                            className={`flex items-center gap-3 p-3 rounded-2xl border transition-all duration-300 ${bgClass}`}
                        >
                            <div className={`w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 shadow-sm relative ${ringClass}`}>
                                {member.image ? (
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover object-top"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                        <Users className="w-5 h-5 text-gray-400" />
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col min-w-0">
                                <span className="text-sm font-bold text-gray-800 truncate block w-full leading-tight">
                                    {member.name}
                                </span>
                                <span className={`text-[10px] uppercase tracking-wider font-bold mt-1 px-2 py-0.5 rounded-full w-fit border ${roleClass}`}>
                                    {member.role}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </motion.div>
);

const CommitteePage = () => {
    return (
        <div className="bg-gray-50/50 min-h-screen relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Elegant Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full blur-3xl" />
                <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-gradient-to-bl from-teal-100/40 to-emerald-100/40 rounded-full blur-3xl" />
                <div className="absolute -bottom-[20%] left-[20%] w-[40%] h-[40%] bg-gradient-to-t from-orange-100/30 to-rose-100/30 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="max-w-7xl mx-auto relative z-10"
            >
                {/* Page Title */}
                <motion.div variants={itemVariants} className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span className="text-xs font-semibold text-gray-600 tracking-wide uppercase">The Team Behind The Vision</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-gray-900">
                        Organising{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            Committee
                        </span>
                    </h1>
                    <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Dedicated professionals working together to make INNOVATE PHARMA 2026 a grand success.
                    </p>
                </motion.div>

                {/* Leadership Section */}
                <motion.section variants={containerVariants} className="mb-24">
                    <div className="flex items-center justify-center mb-12">
                        <div className="h-px w-12 bg-gray-200" />
                        <h2 className="mx-4 text-2xl font-bold text-gray-800 uppercase tracking-widest flex items-center gap-2">
                            Leadership
                        </h2>
                        <div className="h-px w-12 bg-gray-200" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                        {/* Chief Patron - Centered in grid logic */}
                        <div className="lg:col-start-2 lg:row-start-1">
                            <LeadershipCard
                                name={chiefPatron.name}
                                title={chiefPatron.title}
                                image={chiefPatron.image}
                            />
                        </div>

                        {/* Patrons */}
                        <div className="lg:col-start-1 lg:row-start-2">
                            <PatronCard name={patrons[0].name} image={patrons[0].image} />
                        </div>
                        <div className="lg:col-start-3 lg:row-start-2">
                            <PatronCard name={patrons[1].name} image={patrons[1].image} />
                        </div>

                        {/* Convener & Org Secretary - Row 2 center */}
                        <div className="lg:col-start-1 lg:row-start-3">
                            <LeadershipCard name={convener.name} title={convener.title} image={convener.image} />
                        </div>

                        {/* Center spacer or additional layout logic could go here, but fitting into grid 
                             We have 5 items excluding Chief. 
                             Layout: 
                             [ ] [Chief] [ ]
                             [P1] [ ] [P2]
                             [Conv] [Org] [Media]
                         */}
                    </div>

                    {/* Alternative Grid handling to match the specific layout requested usually */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <LeadershipCard
                            name={organisingSecretary.name}
                            title={organisingSecretary.title}
                            image={organisingSecretary.image}
                        />
                        <LeadershipCard
                            name={mediaPartner.name}
                            title={mediaPartner.title}
                            image={mediaPartner.image}
                        />
                        {/* To balance the grid visually if needed, but 3 cols is good for standard view */}
                    </div>
                </motion.section>

                {/* Committees Section */}
                <motion.section variants={containerVariants}>
                    <div className="flex items-center justify-center mb-12">
                        <div className="h-px w-12 bg-gray-200" />
                        <h2 className="mx-4 text-2xl font-bold text-gray-800 uppercase tracking-widest flex items-center gap-2">
                            <Users className="w-6 h-6 text-blue-500" />
                            Committees
                        </h2>
                        <div className="h-px w-12 bg-gray-200" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
