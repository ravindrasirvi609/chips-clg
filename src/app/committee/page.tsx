"use client";

import React from "react";
import { motion } from "framer-motion";
import { Crown, Users, Star, Award } from "lucide-react";

interface CommitteeMember {
    name: string;
    role: "Chairman" | "Co-Chairman" | "Member";
}

interface Committee {
    name: string;
    members: CommitteeMember[];
}

// Leadership Data
const chiefPatron = {
    name: "Dr. R. Srinivas",
    title: "Chief Patron",
};

const patrons = [
    { name: "Dr. C. N. Srinivas" },
    { name: "Mr. R. Gopala Krishna" },
];

const convener = {
    name: "Dr. S. Vidyadhara",
    title: "Convener",
};

const organisingSecretary = {
    name: "Dr. V. Venkata Rao",
    title: "Organising Secretary",
};

const mediaPartner = {
    name: "Dr. Vikram Choudhary",
    title: "Media Partner",
};

// Committees Data
const committees: Committee[] = [
    {
        name: "Registration, Feedback and Helpdesk Committee",
        members: [
            { name: "Dr. A. Ramu", role: "Chairman" },
            { name: "Dr. P. Vijetha", role: "Co-Chairman" },
            { name: "Dr. D. Sandeep", role: "Member" },
            { name: "Dr. S. Ravi Chandra", role: "Member" },
            { name: "Mrs. G. Sravani", role: "Member" },
        ],
    },
    {
        name: "Scientific Committee",
        members: [
            { name: "Dr. R. L. C. Sasidhar", role: "Chairman" },
            { name: "Dr. P. V. S. N. Malleswara Rao", role: "Co-Chairman" },
            { name: "Dr. A. Chakravarthy", role: "Member" },
            { name: "Mrs. K. Haritha Pavani", role: "Member" },
            { name: "Mr. P. Prachet", role: "Member" },
        ],
    },
    {
        name: "Transportation Committee",
        members: [
            { name: "Dr. K. Viswanadh", role: "Chairman" },
            { name: "Dr. Sk. Khadar Yazdan", role: "Co-Chairman" },
            { name: "Dr. B. Sulochana", role: "Member" },
            { name: "Mrs. Sd. Rihana", role: "Member" },
            { name: "Mrs. K. Teja", role: "Member" },
        ],
    },
    {
        name: "VIP Logistics Committee",
        members: [
            { name: "Dr. Ch. Aruna Kumar", role: "Chairman" },
            { name: "Dr. P. Mallikarjuna Rao", role: "Co-Chairman" },
            { name: "Mr. N. Venkata Deepak", role: "Member" },
            { name: "Mrs. Sk. Shafiya Begum", role: "Member" },
            { name: "Mr. S. Vikas", role: "Member" },
        ],
    },
    {
        name: "Accommodation Committee",
        members: [
            { name: "Dr. S. Siva Prasad", role: "Chairman" },
            { name: "Dr. S. Kotaiah", role: "Co-Chairman" },
            { name: "Mrs. B. Sowjanya Lakshmi", role: "Member" },
            { name: "Mrs. V. Jhansi Rani", role: "Member" },
            { name: "Mrs. V. Radha Krishnaveni", role: "Member" },
        ],
    },
    {
        name: "Hospitality Committee",
        members: [
            { name: "Dr. J. Ramesh Babu", role: "Chairman" },
            { name: "Dr. P. Saidulu", role: "Co-Chairman" },
            { name: "Dr. S. Meraj Sultana", role: "Member" },
            { name: "Mr. Y. Ashok Kumar", role: "Member" },
            { name: "Mr. V. Edukondalu", role: "Member" },
        ],
    },
    {
        name: "Protocol & Entertainment Committee",
        members: [
            { name: "Dr. J. Subba Rao", role: "Chairman" },
            { name: "Dr. V. Ravi", role: "Co-Chairman" },
            { name: "Dr. M. Raghava Kalyan", role: "Member" },
            { name: "Dr. V. Sindhu Vaishnavi", role: "Member" },
            { name: "Ms. R. Sai Reshma", role: "Member" },
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
}: {
    name: string;
    title: string;
    isChief?: boolean;
}) => (
    <motion.div
        variants={itemVariants}
        className={`relative group ${isChief ? "col-span-full" : ""}`}
    >
        <div
            className={`bg-white shadow-md ${isChief
                ? "border-amber-400/30"
                : "border-gray-200"
                } border rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]`}
        >
            <div className="flex items-center gap-4">
                <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${isChief
                        ? "bg-gradient-to-br from-amber-400 to-orange-500"
                        : "bg-primary/10"
                        }`}
                >
                    {isChief ? (
                        <Crown className="w-8 h-8 text-white" />
                    ) : (
                        <Star className="w-8 h-8 text-primary" />
                    )}
                </div>
                <div>
                    <span
                        className={`text-xs font-semibold uppercase tracking-wider ${isChief ? "text-amber-500" : "text-primary"
                            }`}
                    >
                        {title}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mt-1">{name}</h3>
                </div>
            </div>
        </div>
    </motion.div>
);

// Patron Card Component
const PatronCard = ({ name }: { name: string }) => (
    <motion.div variants={itemVariants} className="group">
        <div className="bg-white border border-purple-200 rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-purple-600">
                        Patron
                    </span>
                    <h3 className="text-lg font-bold text-gray-900">{name}</h3>
                </div>
            </div>
        </div>
    </motion.div>
);

// Committee Card Component
const CommitteeCard = ({ committee }: { committee: Committee }) => (
    <motion.div
        variants={itemVariants}
        className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300"
    >
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-gray-900">{committee.name}</h3>
            </div>
        </div>
        <div className="p-4">
            <div className="space-y-3">
                {committee.members.map((member, index) => (
                    <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${member.role === "Chairman"
                            ? "bg-amber-50 border-l-2 border-amber-400"
                            : member.role === "Co-Chairman"
                                ? "bg-cyan-50 border-l-2 border-cyan-400"
                                : "bg-gray-50 border-l-2 border-gray-200"
                            }`}
                    >
                        <span className="text-gray-700 font-medium">{member.name}</span>
                        <span
                            className={`text-xs px-3 py-1 rounded-full font-semibold ${member.role === "Chairman"
                                ? "bg-amber-100 text-amber-700"
                                : member.role === "Co-Chairman"
                                    ? "bg-cyan-100 text-cyan-700"
                                    : "bg-gray-100 text-gray-500"
                                }`}
                        >
                            {member.role}
                        </span>
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
                            isChief={true}
                        />

                        {/* Patrons */}
                        {patrons.map((patron, index) => (
                            <PatronCard key={index} name={patron.name} />
                        ))}

                        {/* Convener */}
                        <LeadershipCard name={convener.name} title={convener.title} />

                        {/* Organising Secretary */}
                        <LeadershipCard
                            name={organisingSecretary.name}
                            title={organisingSecretary.title}
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
