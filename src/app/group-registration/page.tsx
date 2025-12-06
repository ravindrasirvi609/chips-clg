"use client";
import GroupRegistrationForm from "@/components/GroupRegistrationForm";
import React from "react";

const GroupRegistration = () => {
  return (
    <div className="bg-[#070B39] bg-opacity-90 relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-gradient-to-r from-[#FF3366] to-[#FF9966] rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-gradient-to-r from-[#9900FF] to-[#FF66CC] rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFCC] to-[#00CCFF]">
            Group Registration
          </span>
        </h1>

        {/* Content */}
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 md:p-10 mb-12 shadow-[0_0_30px_rgba(0,204,255,0.1)]">
          <p className="text-gray-300 text-lg leading-relaxed mb-6 text-center">
            <span className="text-white font-semibold">
              Submit your group registration for the International Conference
              2026
            </span>
            <br />
            <span className="text-sm text-gray-400">
              Note: Group registrations require admin approval before
              confirmation
            </span>
          </p>

          {/* Important Notice */}
          <div className="bg-gradient-to-r from-[#FF3366]/20 to-[#FF9966]/20 border border-[#FF3366]/30 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FF3366] to-[#FF9966]">
              Important Information
            </h3>
            <ul className="list-disc ml-6 text-gray-300 space-y-2">
              <li>Group registrations are subject to admin approval</li>
              <li>
                You will receive a confirmation email once your registration is
                reviewed
              </li>
              <li>
                Payment and registration code will be assigned after approval
              </li>
              <li>
                For queries, contact us at:
                <a
                  href="mailto:innovatepharma2026@gmail.com"
                  className="text-[#00FFCC] hover:text-[#00CCFF] underline ml-1"
                >
                  innovatepharma2026@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Registration Form */}
          <GroupRegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default GroupRegistration;
