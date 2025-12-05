"use client";
import React, { useState } from "react";
import { Clock, ChevronRight, MapPin, CalendarDays, Users } from "lucide-react";

const EventScheduleTeaser = () => {
  const [activeDay, setActiveDay] = useState(1);

  const scheduleData = [
    {
      day: 1,
      title: "Day 1: Innovation & Discovery",
      events: [
        {
          time: "09:00 AM",
          title: "AI Revolution in Pharmaceutical Research",
          speaker: "Dr. Sarah Chen",
          location: "Main Auditorium",
          type: "keynote",
        },
        {
          time: "11:00 AM",
          title: "Machine Learning for Drug Discovery",
          speaker: "Panel of Experts",
          location: "Innovation Hub",
          type: "panel",
        },
        {
          time: "02:00 PM",
          title: "Quantum Computing Applications in Pharma",
          speaker: "Prof. Michael Wong",
          location: "Tech Pavilion",
          type: "keynote",
        },
      ],
    },
    {
      day: 2,
      title: "Day 2: Implementation & Future",
      events: [
        {
          time: "09:30 AM",
          title: "Hands-on AI Model Training Workshop",
          speaker: "Dr. Emma Rodriguez",
          location: "Digital Lab",
          type: "workshop",
        },
        {
          time: "01:30 PM",
          title: "The Future of Personalized Medicine",
          speaker: "Industry Leaders Panel",
          location: "Collaboration Center",
          type: "panel",
        },
        {
          time: "04:00 PM",
          title: "Healthcare Transformation: Vision 2030",
          speaker: "Prof. David Kim",
          location: "Main Auditorium",
          type: "closing",
        },
      ],
    },
  ];

  return (
    <div className="w-full bg-background relative py-20">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-40 left-[30%] w-[25vw] h-[25vw] rounded-full bg-[#00FFCC] opacity-5 blur-[100px] animate-pulse"></div>
        <div
          className="absolute bottom-20 right-[20%] w-[20vw] h-[20vw] rounded-full bg-[#CC00FF] opacity-5 blur-[100px] animate-pulse"
          style={{ animationDelay: "-7s" }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            Conference Schedule
          </h2>
          <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] rounded-full mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Two immersive days of cutting-edge presentations, interactive
            workshops, and transformative discussions in AI and pharmaceutical
            innovation.
          </p>
        </div>

        {/* Day Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {scheduleData.map((day) => (
            <button
              key={day.day}
              onClick={() => setActiveDay(day.day)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${activeDay === day.day
                  ? "bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] text-black shadow-lg transform scale-105"
                  : "bg-card border border-border/50 text-white hover:border-primary/50"
                }`}
            >
              <div className="flex items-center">
                <CalendarDays
                  className={`w-5 h-5 mr-2 ${activeDay === day.day ? "text-black" : "text-[#00FFCC]"
                    }`}
                />
                Day {day.day}
              </div>
            </button>
          ))}
        </div>

        {/* Schedule Content */}
        <div className="card rounded-2xl p-6">
          {scheduleData.map(
            (day) =>
              day.day === activeDay && (
                <div key={day.day}>
                  <h3 className="text-2xl font-bold mb-6 text-gradient">
                    {day.title}
                  </h3>
                  <div className="space-y-4">
                    {day.events.map((event, index) => (
                      <div
                        key={index}
                        className="bg-card border border-border/50 p-5 rounded-xl hover:border-primary/50 transition-all duration-300 group"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 mb-3 md:mb-0">
                            <div className="flex items-center text-[#00FFCC]">
                              <Clock className="w-5 h-5 mr-2" />
                              <span className="font-semibold">
                                {event.time}
                              </span>
                            </div>
                            <div className="hidden md:block h-4 w-px bg-gray-700"></div>
                            <div className="flex items-center text-gray-300">
                              <MapPin className="w-5 h-5 mr-2 text-[#00FFCC]" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-bold ${event.type === "keynote"
                                  ? "bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] text-black"
                                  : event.type === "workshop"
                                    ? "bg-[#00FFCC]/20 text-[#00FFCC] border border-[#00FFCC]/30"
                                    : event.type === "panel"
                                      ? "bg-[#CC00FF]/20 text-[#CC00FF] border border-[#CC00FF]/30"
                                      : "bg-white/10 text-white"
                                }`}
                            >
                              {event.type.charAt(0).toUpperCase() +
                                event.type.slice(1)}
                            </span>
                          </div>
                        </div>
                        <h4 className="text-xl font-bold text-white mt-3 group-hover:text-gradient transition-colors duration-500">
                          {event.title}
                        </h4>
                        <div className="flex items-center mt-2 text-gray-300">
                          <Users className="w-4 h-4 mr-2 text-[#00FFCC]" />
                          <span>{event.speaker}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>

        {/* View Full Schedule Button */}
        <div className="text-center mt-10">
          <a
            href="#full-schedule"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] text-black rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00FFCC]/20 transition-all duration-300 transform hover:translate-y-[-2px]"
          >
            View Complete Schedule
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventScheduleTeaser;
