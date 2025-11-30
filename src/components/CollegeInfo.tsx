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
          <div className="relative h-80 w-full glassmorphism-card overflow-hidden rounded-2xl">
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
                  Established 2018 | Affiliated with The TN Dr. MGR Medical
                  University
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Information */}
        <div className="glassmorphism-card rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFCC] to-[#00CCFF]">
            Vellalar Educational Trust
          </h3>
          <div className="text-gray-300 space-y-4">
            <p>
              Vellalar Educational Trust was established in 1969 under S.no 20
              of Societies Registration Act XX1 of 1860, which runs a variety of
              educational institutions. The main motto of the trust is to
              emphasize on women education. Today, more than 3000 faculty
              members instruct 15,000 Students approximately.
            </p>
            <p>
              The institution generates financial aid programs that ensure the
              talented students from all economic backgrounds can afford
              education at Vellalar Educational Trust. A wide range of cultural,
              educational, athletic and social activities are available to
              students, faculty and other staff. Campus life activities are
              built around the concepts of encouraging each member to express
              his or her talents and to respect all members of our pluralistic
              culture.
            </p>
          </div>

          <h4 className="text-xl font-bold mt-8 mb-4 text-white">
            Branches of Vellalar Educational Trust since 1970
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <CalendarClock className="w-5 h-5 text-[#00FFCC]" />
              <span className="text-gray-300">
                1970-1971 - Vellalar College for Women (Aided)
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <CalendarClock className="w-5 h-5 text-[#00FFCC]" />
              <span className="text-gray-300">
                1980-1981 - Vellalar Matriculation Higher Secondary School
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <CalendarClock className="w-5 h-5 text-[#00FFCC]" />
              <span className="text-gray-300">
                2000-2001 - Velalar College of Engineering and Technology
                (co-ed)
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <CalendarClock className="w-5 h-5 text-[#00FFCC]" />
              <span className="text-gray-300">
                2005-2006 - Vellalar College of Education
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <CalendarClock className="w-5 h-5 text-[#00FFCC]" />
              <span className="text-gray-300">
                2006-2007 - Vellalar Teacher Training Institute
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <CalendarClock className="w-5 h-5 text-[#00FFCC]" />
              <span className="text-gray-300">
                2006-2007 - Vellalar High School (State board)
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <CalendarClock className="w-5 h-5 text-[#00FFCC]" />
              <span className="text-gray-300">
                2008-2009 - Vellalar College of Nursing
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <CalendarClock className="w-5 h-5 text-[#00FFCC]" />
              <span className="text-gray-300">
                2010-2011 - Velalar Vidyalaya Senior Secondary School (co-ed)
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <CalendarClock className="w-5 h-5 text-[#00FFCC]" />
              <span className="text-gray-300">
                2018-2019 - Vellalar College of Pharmacy (co-ed)
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <CalendarClock className="w-5 h-5 text-[#00FFCC]" />
              <span className="text-gray-300">
                2019-2020 - VET Institute of Arts & Science (co-ed)
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <CalendarClock className="w-5 h-5 text-[#00FFCC]" />
              <span className="text-gray-300">
                2024-2025 - Vellalar Physiotherapy College (co-ed)
              </span>
            </div>
          </div>
        </div>

        {/* Institution Information */}
        <div className="glassmorphism-card rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFCC] to-[#00CCFF]">
            About the Institution
          </h3>
          <div className="text-gray-300 space-y-4">
            <p>
              Chebrolu Hanumaiah Institute of Pharmaceutical Sciences was
              established in the year 2018 by Vellalar Educational Trust under
              the dynamic leadership Mr. C. Jayakumar B.A., B.L, President, S.D
              Chandrasekar, Secretary cum correspondence, a renowned
              Educationalist and Industrialist having more than Five decades of
              rich experience in promoting and administering Professional
              colleges. The institution is committed to provide quality
              education in the pharmacy to cater the needs of the society in
              healthcare sector and also uplift of socio-economic status of
              human being. The college is approved by Directorate of Medical
              Education, PCI and affiliated with The TN Dr. MGR Medical
              University, Chennai. Tamilnadu.
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

          <h4 className="text-xl font-bold mt-8 mb-4 text-white">
            Courses Offered
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glassmorphism p-6 rounded-xl">
              <div className="flex items-center mb-3">
                <GraduationCap className="w-6 h-6 text-[#00FFCC] mr-3" />
                <h5 className="font-bold text-white">B. Pharmacy</h5>
              </div>
              <p className="text-gray-300">100 seats (04 Years)</p>
            </div>

            <div className="glassmorphism p-6 rounded-xl">
              <div className="flex items-center mb-3">
                <BookOpen className="w-6 h-6 text-[#00FFCC] mr-3" />
                <h5 className="font-bold text-white">D. Pharm</h5>
              </div>
              <p className="text-gray-300">60 Seats (02 Years)</p>
            </div>

            <div className="glassmorphism p-6 rounded-xl">
              <div className="flex items-center mb-3">
                <Building className="w-6 h-6 text-[#00FFCC] mr-3" />
                <h5 className="font-bold text-white">Pharm.D</h5>
              </div>
              <p className="text-gray-300">30 Seats (06 Years)</p>
            </div>

            <div className="glassmorphism p-6 rounded-xl">
              <div className="flex items-center mb-3">
                <BookOpen className="w-6 h-6 text-[#00FFCC] mr-3" />
                <h5 className="font-bold text-white">M.Pharmacy</h5>
              </div>
              <div className="text-gray-300 mt-2 pl-9">
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
