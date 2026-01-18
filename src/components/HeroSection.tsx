"use client";
import React, { useEffect, useState } from "react";
import { Calendar, MapPin, ChevronRight, Download, Clock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const countdownDate = new Date("2026-01-22T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleRegisterClick = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/assets/brochure.jpg')] bg-cover bg-center opacity-10"></div>

      <div className="absolute inset-0">
        <div className="absolute top-0 right-[10%] w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-[100px] animate-pulse"></div>
        <div
          className="absolute bottom-0 left-[10%] w-[40vw] h-[40vw] rounded-full bg-blue-500/5 blur-[100px] animate-pulse"
          style={{ animationDelay: "-5s" }}
        ></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
          {/* Alert for registration */}
          {showAlert && (
            <div className="fixed top-4 right-4 z-50">
              <Alert className="bg-card border-border animate-slideIn">
                <AlertDescription className="text-white">
                  Registration process initiated! Check your email.
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* Conference badge */}
          <div className="flex items-center space-x-4 mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 font-semibold transform hover:scale-105 transition-transform cursor-pointer shadow-sm">
              <Clock className="w-4 h-4 mr-2 text-primary" />
              <span>Conference 2026</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-primary to-transparent"></div>
          </div>

          {/* Main content grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* Title with gradient text */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gradient">International Conference</span>
                <br />
                <span className="text-gray-900 mt-2 block">
                  Emerging Innovations in
                </span>
                <span className="text-primary block mt-2">
                  Pharmaceutical Sciences and Drug Discovery
                </span>
              </h1>

              {/* Event details with hover effects */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center space-x-3 bg-white border border-gray-200 p-3 rounded-lg hover:border-primary/50 transition-all group shadow-sm">
                    <Calendar className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700">22nd & 23rd January 2026</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white border border-gray-200 p-3 rounded-lg hover:border-primary/50 transition-all group shadow-sm">
                    <MapPin className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700">
                      Chebrolu Hanumaiah Institute of Pharmaceutical Sciences
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA buttons with enhanced hover effects */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/registration"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                    onClick={handleRegisterClick}
                    className="group relative px-6 py-3 bg-primary text-white font-semibold rounded-lg overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/30"
                  >
                    <span className="relative z-10 flex items-center">
                      Registration Now
                      <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                  </button>
                </Link>

                <button className="px-6 py-3 bg-gray-200 text-gray-500 font-semibold rounded-lg border border-gray-300 cursor-not-allowed flex items-center group shadow-sm">
                  <Download className="w-5 h-5 mr-2 text-gray-400" />
                  Submissions Closed
                </button>

                <Link
                  href="https://docs.google.com/presentation/d/1W5-aeODAvLvh-43WHf_XESsrmLmWKWwX/edit?rtpof=true&sd=true&pli=1"
                  target="_blank"
                >
                  <button className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-200 hover:border-primary hover:text-primary transition-colors flex items-center group shadow-sm hover:shadow-md">
                    <Download className="w-5 h-5 mr-2 text-primary group-hover:scale-110 transition-transform" />
                    e-Poster Template
                  </button>
                </Link>

                <Link
                  href="https://docs.google.com/presentation/d/16F9_RbW6C8q7CebiaMS3OCmhGoSF43mD/edit?slide=id.p1#slide=id.p1"
                  target="_blank"
                >
                  <button className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-200 hover:border-primary hover:text-primary transition-colors flex items-center group shadow-sm hover:shadow-md">
                    <Download className="w-5 h-5 mr-2 text-primary group-hover:scale-110 transition-transform" />
                    Oral Template
                  </button>
                </Link>
                {/* Resource buttons moved from CallForAbstracts */}
                {/* <a
                  href="https://docs.google.com/presentation/d/1L_e3SSNTSXFWkthYOO5wOk3xhSzYhPBc/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="px-6 py-3 glassmorphism text-white font-semibold rounded-lg border border-[#00FFCC]/20 hover:border-[#00FFCC]/50 transition-colors hover:scale-105">
                    Model E-Poster Template
                  </button>
                </a>
                <a
                  href="https://docs.google.com/presentation/d/1-lKSpS42WNShrnJqDx915MlF5_A8jlTW/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="px-6 py-3 glassmorphism text-white font-semibold rounded-lg border border-[#00FFCC]/20 hover:border-[#00FFCC]/50 transition-colors hover:scale-105">
                    Model Oral Presentation Template
                  </button>
                </a>
                <a
                  href="https://drive.google.com/file/d/1_wM_k-nGHpIFdUOZr8AeZY_uiJsFFrAx/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="px-6 py-3 glassmorphism text-white font-semibold rounded-lg border border-[#00FFCC]/20 hover:border-[#00FFCC]/50 transition-colors hover:scale-105">
                    E-Poster Presentation Guidelines
                  </button>
                </a>
                <a
                  href="https://drive.google.com/file/d/1dSn5qBTwk1pbmXqgPydmDZ5d3ghcTios/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="px-6 py-3 glassmorphism text-white font-semibold rounded-lg border border-[#00FFCC]/20 hover:border-[#00FFCC]/50 transition-colors hover:scale-105">
                    Oral Presentation Guidelines
                  </button>
                </a> */}
              </div>
            </div>

            {/* Countdown section with solid card effect */}
            <div className="card bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
                Conference Begins In
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Minutes", value: timeLeft.minutes },
                  { label: "Seconds", value: timeLeft.seconds },
                ].map((item, index) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary/40 transition-all hover:transform hover:scale-105 duration-300 shadow-sm"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="text-4xl font-bold text-primary mb-2">
                      {String(item.value).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-gray-500">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  What&apos;s New in the International Conference
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-gray-600 text-sm">
                      Advanced Applications of AI in Pharmaceutical Research
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-gray-600 text-sm">
                      Personalized Medicine Breakthroughs
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-gray-600 text-sm">
                      International Healthcare Innovation Showcase
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
