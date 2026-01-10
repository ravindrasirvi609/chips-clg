"use client";
import React, { useState } from "react";
import {
    Clock,
    MapPin,
    CalendarDays,
    Users,
    Mic2,
    Coffee,
    GraduationCap,
    Presentation,
} from "lucide-react";

interface Session {
    time: string;
    title: string;
    type: "plenary" | "registration" | "inauguration" | "lunch" | "poster";
    speaker?: string;
    speakerDesignation?: string;
    topic?: string;
    chairperson1?: { name: string; designation: string };
    chairperson2?: { name: string; designation: string };
    venue?: string;
}

interface DaySchedule {
    day: number;
    date: string;
    title: string;
    sessions: Session[];
}

const scheduleData: DaySchedule[] = [
    {
        day: 1,
        date: "Day 1",
        title: "Scientific Sessions & Inauguration",
        sessions: [
            {
                time: "09:00 AM",
                title: "Arrival of Guests & Delegates",
                type: "registration",
                venue: "Main Entrance",
            },
            {
                time: "09:00 AM - 11:00 AM",
                title: "Registrations",
                type: "registration",
                venue: "Registration Desk",
            },
            {
                time: "11:00 AM - 11:45 AM",
                title: "Inauguration",
                type: "inauguration",
                venue: "Open Auditorium",
            },
            {
                time: "12:00 PM - 12:45 PM",
                title: "Plenary Session – 01",
                type: "plenary",
                speaker: "Prof. Dr. Mohd Zulkefeli",
                speakerDesignation: "Director, Quality, IMU University",
                topic:
                    "Evaluation of Macrocyclic Polyamines Complexes: Multiple Functions from Enzyme Model Ligand to Multifunctional Supramolecular Complexes",
                chairperson1: {
                    name: "Dr. T. E. Gopala Krishna Murthy",
                    designation: "Professor and Principal, Bapatla College of Pharmacy",
                },
                chairperson2: {
                    name: "Dr. A. Narendra Babu",
                    designation: "Professor and Principal, Sir C.R.R. College of Pharmacy",
                },
                venue: "Open Auditorium",
            },
            {
                time: "12:45 PM - 01:45 PM",
                title: "Lunch Break",
                type: "lunch",
                venue: "Food Court",
            },
            {
                time: "01:45 PM - 02:45 PM",
                title: "Plenary Session – 02",
                type: "plenary",
                speaker: "Dr. Chin Swee Yee",
                speakerDesignation:
                    "Programme Director of MAPC, School of Pharmacy, IMU University",
                topic:
                    "Structure-Property Relationship of Universal Surfactants for Water, Oils and Carbondioxide",
                chairperson1: {
                    name: "Dr. B. Pamula Reddy",
                    designation: "Professor and Principal, Nirmala College of Pharmacy",
                },
                chairperson2: {
                    name: "Dr. Sachin. R. Patil",
                    designation: "Professor, Sarojini College of Pharmacy",
                },
                venue: "Open Auditorium",
            },
            {
                time: "02:45 PM - 03:45 PM",
                title: "Plenary Session – 03",
                type: "plenary",
                speaker: "Dr. Vasudeva Rao Avupati",
                speakerDesignation:
                    "E-Learning Lead and AI Coordinator, School of Pharmacy, IMU University",
                topic:
                    "Data-Driven Decision-Making Using AI: How to Improve Success Rates in Drug Discovery",
                chairperson1: {
                    name: "Dr. Ch. Babu Rao",
                    designation:
                        "Professor and Principal, Priyadarshini Institute of Pharmaceutical Education and Research",
                },
                chairperson2: {
                    name: "Dr. J. Venkata Suresh",
                    designation: "Professor and Principal, Jagan's College of Pharmacy, Nellore",
                },
                venue: "Open Auditorium",
            },
        ],
    },
    {
        day: 2,
        date: "Day 2",
        title: "Scientific Sessions & Presentations",
        sessions: [
            {
                time: "10:00 AM - 10:45 AM",
                title: "Plenary Session – 06",
                type: "plenary",
                speaker: "Prof. K. R. S. Samba Siva Rao",
                speakerDesignation:
                    "Vice Chancellor, Mangalayatan University, Jabalpur, Madhya Pradesh",
                topic: "xxxx",
                chairperson1: {
                    name: "Dr. P. Srinivas Babu",
                    designation: "Professor & Principal, Vignan Pharmacy College",
                },
                chairperson2: {
                    name: "Dr. Bhargav Bhushan",
                    designation: "Professor and Principal, A.M. Reddy College of Pharmacy",
                },
                venue: "Open Auditorium",
            },
            {
                time: "10:45 AM - 11:30 AM",
                title: "Plenary Session – 07",
                type: "plenary",
                speaker: "Assoc. Prof. Dr. Shazia Jamshed",
                speakerDesignation:
                    "Associate Professor, Department of Pharmacy Practice, School of Pharmacy, IMU University",
                topic:
                    "AI in Pharmacy Practice: Changing Landscape for Medication Management and Patient Care",
                chairperson1: {
                    name: "Dr. D. Narendra",
                    designation: "Professor and Principal, VJ College of Pharmacy",
                },
                chairperson2: {
                    name: "Dr. D. Nagarjuna Reddy",
                    designation: "Professor and Principal, NRK Guptha of Pharmacy, Tenali",
                },
                venue: "Open Auditorium",
            },
            {
                time: "11:30 AM - 12:15 PM",
                title: "Plenary Session – 08",
                type: "plenary",
                speaker: "Assoc. Prof. Dr. Ooi Ing Hong",
                speakerDesignation:
                    "Head of Department, Pharmaceutical Chemistry, School of Pharmacy, IMU University",
                topic:
                    "Niosomes in Drug Delivery: Fundamentals, Advances and Future Perspectives",
                chairperson1: {
                    name: "Dr. G. Suma Latha",
                    designation:
                        "Professor and Principal, Vikas Institute of Pharmaceutical Sciences, Rajahmundry",
                },
                chairperson2: {
                    name: "Dr. D. Vasudha",
                    designation:
                        "Associate Professor, Vignan Institute of Pharmaceutical Technology, Visakhapatnam",
                },
                venue: "Open Auditorium",
            },
            {
                time: "12:15 PM - 01:00 PM",
                title: "Plenary Session – 09",
                type: "plenary",
                speaker: "Assoc. Prof. Dr. Lee Choy Sin",
                speakerDesignation:
                    "Associate Dean, Research & Consultancy, School of Pharmacy, IMU University",
                topic:
                    "Bio-Based Excipients From Renewable Feed Stocks for Sustainable Drug Formulation",
                chairperson1: {
                    name: "Dr. M. Naga Bhushanam",
                    designation: "Professor and Principal, Hindu College of Pharmacy",
                },
                chairperson2: {
                    name: "Dr. G. Vijay Kumar",
                    designation:
                        "Professor, KVSR Siddhartha College of Pharmaceutical Sciences, Vijayawada",
                },
                venue: "Open Auditorium",
            },
            {
                time: "01:00 PM - 02:00 PM",
                title: "Lunch Break",
                type: "lunch",
                venue: "Food Court",
            },
            {
                time: "11:30 AM - 01:00 PM",
                title: "E-Poster/Oral Presentation Session (Parallel Sessions)",
                type: "poster",
                venue: "Room 308, 3, 4",
            },
        ],
    },
];

const getSessionIcon = (type: Session["type"]) => {
    switch (type) {
        case "plenary":
            return <Mic2 className="w-5 h-5" />;
        case "registration":
            return <Users className="w-5 h-5" />;
        case "inauguration":
            return <GraduationCap className="w-5 h-5" />;
        case "lunch":
            return <Coffee className="w-5 h-5" />;
        case "poster":
            return <Presentation className="w-5 h-5" />;
        default:
            return <Clock className="w-5 h-5" />;
    }
};

const getSessionStyles = (type: Session["type"]) => {
    switch (type) {
        case "plenary":
            return {
                bg: "bg-gradient-to-r from-primary/10 to-cyan-500/10",
                border: "border-primary/30 hover:border-primary/60",
                badge: "bg-gradient-to-r from-primary to-cyan-500 text-white",
                icon: "text-primary",
            };
        case "registration":
            return {
                bg: "bg-blue-500/5",
                border: "border-blue-400/30 hover:border-blue-400/60",
                badge: "bg-blue-500/20 text-blue-600 border border-blue-400/30",
                icon: "text-blue-500",
            };
        case "inauguration":
            return {
                bg: "bg-purple-500/5",
                border: "border-purple-400/30 hover:border-purple-400/60",
                badge: "bg-purple-500/20 text-purple-600 border border-purple-400/30",
                icon: "text-purple-500",
            };
        case "lunch":
            return {
                bg: "bg-amber-500/10",
                border: "border-amber-400/30 hover:border-amber-400/60",
                badge: "bg-amber-500 text-white",
                icon: "text-amber-500",
            };
        case "poster":
            return {
                bg: "bg-emerald-500/5",
                border: "border-emerald-400/30 hover:border-emerald-400/60",
                badge: "bg-emerald-500/20 text-emerald-600 border border-emerald-400/30",
                icon: "text-emerald-500",
            };
        default:
            return {
                bg: "bg-gray-500/5",
                border: "border-gray-400/30",
                badge: "bg-gray-500/20 text-gray-600",
                icon: "text-gray-500",
            };
    }
};

const ProgramSchedule = () => {
    const [activeDay, setActiveDay] = useState(1);

    return (
        <div className="bg-gray-50 min-h-screen relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div
                    className="absolute top-1/3 right-10 w-72 h-72 bg-cyan-400/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
                    style={{ animationDelay: "2s" }}
                ></div>
                <div
                    className="absolute bottom-10 left-1/3 w-72 h-72 bg-purple-400/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
                    style={{ animationDelay: "4s" }}
                ></div>
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                        <span className="text-primary">Program Schedule</span>
                    </h1>
                    <div className="w-24 h-1 mx-auto bg-gradient-to-r from-primary to-cyan-500 rounded-full mb-6"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Two days of inspiring scientific sessions featuring distinguished speakers
                        from IMU University, Malaysia and leading institutions across India.
                    </p>
                </div>

                {/* Day Selection Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-10">
                    {scheduleData.map((day) => (
                        <button
                            key={day.day}
                            onClick={() => setActiveDay(day.day)}
                            className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${activeDay === day.day
                                    ? "bg-gradient-to-r from-primary to-cyan-500 text-white shadow-lg shadow-primary/30 transform scale-105"
                                    : "bg-white border-2 border-gray-200 text-gray-700 hover:border-primary/50 hover:shadow-md"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <CalendarDays
                                    className={`w-5 h-5 ${activeDay === day.day ? "text-white" : "text-primary"
                                        }`}
                                />
                                <div className="text-left">
                                    <div className="text-sm opacity-80">{day.date}</div>
                                    <div className="text-base">{day.title}</div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Schedule Content */}
                <div className="space-y-4">
                    {scheduleData.map(
                        (day) =>
                            day.day === activeDay && (
                                <div key={day.day} className="space-y-4">
                                    {day.sessions.map((session, index) => {
                                        const styles = getSessionStyles(session.type);
                                        return (
                                            <div
                                                key={index}
                                                className={`${styles.bg} border-2 ${styles.border} p-6 rounded-2xl transition-all duration-300 hover:shadow-lg group`}
                                            >
                                                {/* Session Header */}
                                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                                                    <div className="flex items-center gap-4">
                                                        <div
                                                            className={`p-3 rounded-xl ${styles.bg} ${styles.icon}`}
                                                        >
                                                            {getSessionIcon(session.type)}
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                                                                <Clock className="w-4 h-4" />
                                                                <span className="font-medium">{session.time}</span>
                                                            </div>
                                                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                                                                {session.title}
                                                            </h3>
                                                        </div>
                                                    </div>
                                                    <span
                                                        className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap ${styles.badge}`}
                                                    >
                                                        {session.type.charAt(0).toUpperCase() +
                                                            session.type.slice(1)}
                                                    </span>
                                                </div>

                                                {/* Speaker Info */}
                                                {session.speaker && (
                                                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 mb-4 border border-gray-100">
                                                        <div className="flex items-start gap-3">
                                                            <div className="p-2 bg-primary/10 rounded-lg">
                                                                <Users className="w-5 h-5 text-primary" />
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-gray-900 text-lg">
                                                                    Speaker: {session.speaker}
                                                                </p>
                                                                <p className="text-gray-600 text-sm">
                                                                    {session.speakerDesignation}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Topic */}
                                                {session.topic && session.topic !== "xxxx" && (
                                                    <div className="mb-4">
                                                        <p className="text-gray-700">
                                                            <span className="font-semibold text-gray-900">
                                                                Topic of Discussion:{" "}
                                                            </span>
                                                            {session.topic}
                                                        </p>
                                                    </div>
                                                )}

                                                {/* Chairpersons */}
                                                {(session.chairperson1 || session.chairperson2) && (
                                                    <div className="grid md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
                                                        {session.chairperson1 && (
                                                            <div className="bg-white/40 rounded-lg p-3">
                                                                <p className="text-sm font-semibold text-primary mb-1">
                                                                    Chairperson 1
                                                                </p>
                                                                <p className="font-medium text-gray-900">
                                                                    {session.chairperson1.name}
                                                                </p>
                                                                <p className="text-gray-600 text-sm">
                                                                    {session.chairperson1.designation}
                                                                </p>
                                                            </div>
                                                        )}
                                                        {session.chairperson2 && (
                                                            <div className="bg-white/40 rounded-lg p-3">
                                                                <p className="text-sm font-semibold text-primary mb-1">
                                                                    Chairperson 2
                                                                </p>
                                                                <p className="font-medium text-gray-900">
                                                                    {session.chairperson2.name}
                                                                </p>
                                                                <p className="text-gray-600 text-sm">
                                                                    {session.chairperson2.designation}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Venue */}
                                                {session.venue && (
                                                    <div className="flex items-center gap-2 mt-4 text-gray-500 text-sm">
                                                        <MapPin className="w-4 h-4" />
                                                        <span>Venue: {session.venue}</span>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )
                    )}
                </div>

                {/* Footer Note */}
                <div className="mt-12 text-center">
                    <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-6 py-3 shadow-sm">
                        <CalendarDays className="w-5 h-5 text-primary" />
                        <span className="text-gray-600">
                            Schedule is subject to minor changes. Please check back for updates.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgramSchedule;
