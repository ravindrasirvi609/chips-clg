"use client";
import RegistrationPlans from "@/components/RegistrationPlans";
import Link from "next/link";
import React from "react";

const Registration = () => {
  return (
    <div className="bg-[#070B39] bg-opacity-90 relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
            Registration
          </span>
        </h1>

        {/* Content */}
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 md:p-10 mb-12 shadow-[0_0_30px_rgba(0,204,255,0.1)]">
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            <span className="text-white font-semibold">
              Registrations for the International Conference 2026
            </span>{" "}
            began on{" "}
            <span className="text-white font-semibold">1st June 2025</span>.
          </p>

          {/* Registration Option */}
          <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FF3366] to-[#FF9966]">
            Registration Options
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Online registration is now open, and{" "}
            <span className="text-white font-semibold">
              registration is mandatory
            </span>{" "}
            to participate in the International Conference. Candidates must
            register by filling out the online form available on our official
            website.
          </p>

          {/* Cancellation Policy */}
          <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFCC] to-[#00CCFF]">
            Cancellation and Refund Policy
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            The amount paid for registration is{" "}
            <span className="text-white font-semibold">non-refundable</span> and{" "}
            <span className="text-white font-semibold">non-transferable</span>.
          </p>

          {/* Important Instructions */}
          <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFCC] to-[#00CCFF]">
            Important Instructions
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            The{" "}
            <span className="text-white font-semibold">registration fee</span>{" "}
            includes:
          </p>
          <ul className="list-disc ml-6 text-lg text-gray-300 mb-6">
            <li>Entry to all scientific sessions</li>
            <li>Conference kit</li>
            <li>Lunch and refreshments</li>
          </ul>

          {/* Payment */}
          <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FF3366] to-[#FF9966]">
            Mode of Payment
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            All payments must be made online through our secure{" "}
            <span className="text-white font-semibold">
              website payment gateway Only.
            </span>
            .
          </p>

          {/* Accommodation */}
          <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFCC] to-[#00CCFF]">
            Accommodation
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Accommodation will be arranged on request in{" "}
            <span className="text-white font-semibold">
              dormitories or hotels
            </span>{" "}
            at additional charges. For more details, please write to us at:{" "}
            <Link
              href="mailto:conferences@opf.org.in"
              className="text-[#00FFCC] hover:text-[#00CCFF] underline transition-colors"
            >
              conferences@opf.org.in
            </Link>
          </p>

          {/* Early Bird Offer */}
          <p className="text-lg leading-relaxed mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] font-bold">
            <span className="text-white font-semibold">Early Bird Offer:</span>{" "}
            Valid until{" "}
            <span className="text-white font-semibold">31st July 2025</span>.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            All prices mentioned are{" "}
            <span className="text-white font-semibold">exclusive of GST</span>.
          </p>
        </div>

        {/* Registration Plans */}
        <RegistrationPlans />
      </div>
    </div>
  );
};

export default Registration;
