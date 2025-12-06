"use client";
import RegistrationPlans from "@/components/RegistrationPlans";
import Link from "next/link";
import React from "react";

const Registration = () => {
  return (
    <div className="bg-gray-50 min-h-screen relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8">
          <span className="text-primary">
            Registration
          </span>
        </h1>

        {/* Content */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 mb-12 shadow-xl">
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            <span className="text-gray-900 font-semibold">
              Registrations for the International Conference 2026
            </span>{" "}
            began on{" "}
            <span className="text-gray-900 font-semibold">1st December 2025</span>.
          </p>

          {/* Registration Option */}
          <h2 className="text-2xl font-bold mb-4 text-primary">
            Registration Options
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Online registration is now open, and{" "}
            <span className="text-gray-900 font-semibold">
              registration is mandatory
            </span>{" "}
            to participate in the International Conference. Candidates must
            register by filling out the online form available on our official
            website.
          </p>

          {/* Cancellation Policy */}
          <h3 className="text-xl font-bold mb-4 text-primary">
            Cancellation and Refund Policy
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            The amount paid for registration is{" "}
            <span className="text-gray-900 font-semibold">non-refundable</span> and{" "}
            <span className="text-gray-900 font-semibold">non-transferable</span>.
          </p>

          {/* Important Instructions */}
          <h3 className="text-xl font-bold mb-4 text-primary">
            Important Instructions
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            The{" "}
            <span className="text-gray-900 font-semibold">registration fee</span>{" "}
            includes:
          </p>
          <ul className="list-disc ml-6 text-lg text-gray-600 mb-6">
            <li>Entry to all scientific sessions</li>
            <li>Conference kit</li>
            <li>Lunch and refreshments</li>
          </ul>

          {/* Payment */}
          <h3 className="text-xl font-bold mb-4 text-primary">
            Mode of Payment
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            All payments must be made online through our secure{" "}
            <span className="text-gray-900 font-semibold">
              website payment gateway Only.
            </span>
            .
          </p>

          {/* Accommodation */}
          <h3 className="text-xl font-bold mb-4 text-primary">
            Accommodation
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Accommodation will be arranged on request in{" "}
            <span className="text-gray-900 font-semibold">
              dormitories or hotels
            </span>{" "}
            at additional charges. For more details, please write to us at:{" "}
            <Link
              href="mailto:innovatepharma2026@gmail.com"
              className="text-primary hover:text-primary/80 underline transition-colors"
            >
              innovatepharma2026@gmail.com
            </Link>
          </p>

          {/* Early Bird Offer */}
          <p className="text-lg leading-relaxed mb-4 text-primary font-bold">
            <span className="text-gray-900 font-semibold">Early Bird Offer:</span>{" "}
            Valid until{" "}
            <span className="text-gray-900 font-semibold">10/01/2026</span>
            .
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            All prices mentioned are{" "}
            <span className="text-gray-900 font-semibold">exclusive of GST</span>.
          </p>
        </div>

        {/* Registration Plans */}
        <RegistrationPlans />
      </div>
    </div>
  );
};

export default Registration;
