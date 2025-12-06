"use client";
import React from "react";
import Image from "next/image";
import { GraduationCap, Building, CalendarClock, BookOpen } from "lucide-react";

const CollegeInfo = () => {
  return (
    <section className="py-16 bg-background relative">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            Chebrolu Hanumaiah Institute of Pharmaceutical Sciences
          </h2>
          <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] rounded-full"></div>
        </div>

        {/* College Image */}
        <div className="mb-12">
          <div className="relative h-80 w-full card overflow-hidden rounded-2xl">
            <Image
              src="/college.jpg"
              alt="Chebrolu Hanumaiah Institute of Pharmaceutical Sciences"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-8">
                <h3 className="text-3xl font-bold text-white mb-2">
                  Excellence in Pharmacy Education
                </h3>
                <p className="text-gray-300">
                  Established 2005 | Affiliated with Acharya Nagarjuna
                  University
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Information */}
        <div className="card rounded-2xl p-8 mb-12">
          {/* <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFCC] to-[#00CCFF]">
            Nagarjuna Education Society
          </h3>
          <div className="text-gray-300 space-y-4">
            <p>
              The Nagarjuna Education Society (Regd.), Guntur, was established 
              and registered in 1967 by Philanthropists, Medical Doctors, Industrial 
              and Commercial houses with a mission of serving the Society through 
              promotion of Education, Literature and Culture.
            </p>
            <p>
              It is purely an educational society to which numerous people, 
              organizations and individuals have donated, only to contribute to 
              the cause of education. Quality of instruction through student-centered 
              teaching and developing personality in students are the guiding principles.
            </p>
          </div>

          <h4 className="text-xl font-bold mt-8 mb-4 text-white">
            Institutions Run by N.E.S
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <CalendarClock className="w-5 h-5 text-[#00FFCC]" />
              <span className="text-gray-300">
                1968 - J.K.C College
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <CalendarClock className="w-5 h-5 text-[#00FFCC]" />
              <span className="text-gray-300">
                1968 - S.G.V.R. High School
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <CalendarClock className="w-5 h-5 text-[#00FFCC]" />
              <span className="text-gray-300">
                1983 - Dr. K.L.P Public School
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <CalendarClock className="w-5 h-5 text-[#00FFCC]" />
              <span className="text-gray-300">
                1985 - R.V.R.R College Of Education
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <CalendarClock className="w-5 h-5 text-[#00FFCC]" />
              <span className="text-gray-300">
                1985 - R.V.R & JC College of Engineering
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <CalendarClock className="w-5 h-5 text-[#00FFCC]" />
              <span className="text-gray-300">
                1990 - JC College Of Law
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <CalendarClock className="w-5 h-5 text-[#00FFCC]" />
              <span className="text-gray-300">
                2005 - Chebrolu Hanumaiah Institute of Pharmaceutical Sciences (CHIPS)
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <CalendarClock className="w-5 h-5 text-[#00FFCC]" />
              <span className="text-gray-300">
                2006 - MSB College Of Nursing
              </span>
            </div>
          </div> */}
        </div>

        {/* Institution Information */}
        <div className="card rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFCC] to-[#00CCFF]">
            About the Institution
          </h3>
          <div className="text-gray-600 space-y-4">
            <p>
              Chebrolu Hanumaiah Institute of Pharmaceutical Sciences (CHIPS)
              was established in the year 2005 as the 7th institute under the
              philanthropic organization Nagarjuna Education Society (NES).
              CHIPS is situated in Guntur, Andhra Pradesh, and is recognized for
              its excellence in pharmaceutical sciences. The college is approved
              by AICTE, PCI and affiliated with Acharya Nagarjuna University.
            </p>
            <p>
              The college has pollution free environment, excellent academic
              atmosphere, well equipped laboratories, library, hostel, seminar
              hall etc. We have committed well-disciplined and qualified faculty
              with their passion in Teaching & Research in Pharmacy. Students
              are encouraged to present scientific posters, seminars in various
              conferences and to participate in co-curricular activities
              organized by other pharmacy colleges.
            </p>
          </div>

          <h4 className="text-xl font-bold mt-8 mb-4 text-gray-800">
            Courses Offered
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-3">
                <GraduationCap className="w-6 h-6 text-primary mr-3" />
                <h5 className="font-bold text-gray-800">B. Pharmacy</h5>
              </div>
              <p className="text-gray-600">100 seats (04 Years)</p>
            </div>

            {/* <div className="bg-card border border-border/50 p-6 rounded-xl">
              <div className="flex items-center mb-3">
                <BookOpen className="w-6 h-6 text-[#00FFCC] mr-3" />
                <h5 className="font-bold text-white">D. Pharm</h5>
              </div>
              <p className="text-gray-300">60 Seats (02 Years)</p>
            </div> */}

            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-3">
                <Building className="w-6 h-6 text-primary mr-3" />
                <h5 className="font-bold text-gray-800">Pharm.D</h5>
              </div>
              <p className="text-gray-600">30 Seats (06 Years)</p>
            </div>

            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-3">
                <BookOpen className="w-6 h-6 text-primary mr-3" />
                <h5 className="font-bold text-gray-800">M.Pharmacy</h5>
              </div>
              <div className="text-gray-600 mt-2 pl-9">
                <p>- Pharmaceutical Analysis (02 Years)</p>
                <p>- Pharmaceutics (02 Years)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollegeInfo;
