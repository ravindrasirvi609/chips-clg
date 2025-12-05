import React from "react";
import Image from "next/image";

interface Speaker {
  id: number;
  name: string;
  designation: string;
  image: string;
  role?: string;
}

const speakers: Speaker[] = [
  {
    id: 1,
    name: "Prof. Dr. Mohd Zulkefeli",
    designation: "Director, Quality, IMU University, Malaysia",
    image: "/speakers/Prof Dr Mohd Zulkefeli Bin Mat Jusoh.jpg",
  },
  {
    id: 2,
    name: "Assoc. Prof. Dr. Wong Pei Se",
    designation: "Associate Dean, Teaching & Learning, IMU University, Malaysia",
    image: "/speakers/Assoc Prof Dr Wong Pei Se.jpg",
  },
  {
    id: 3,
    name: "Assoc. Prof. Dr. Ooi Ing Hong",
    designation: "Head of Department, Pharmaceutical Chemistry, School of Pharmacy, IMU University, Malaysia",
    image: "/speakers/Assoc Prof Dr Ooi Ing Hong.jpg",
  },
  {
    id: 4,
    name: "Assoc. Prof. Dr. Lee Choy Sin",
    designation: "Associate Dean, Research & Consultancy, School of Pharmacy, IMU University, Malaysia",
    image: "/speakers/Assoc Prof Dr Lee Choy Sin.jpg",
  },
  {
    id: 5,
    name: "Assoc. Prof. Dr. Shazia Jamshed",
    designation: "Associate Professor, Department of Pharmacy Practice, School of Pharmacy, IMU University, Malaysia",
    image: "/speakers/Assoc Prof Dr Shazia Jamshed.jfif",
  },
  {
    id: 6,
    name: "Dr. Chin Swee Yee",
    designation: "Programme Director of MSc in Analytical and Pharmaceutical Chemistry (MAPC), School of Pharmacy, IMU University, Malaysia",
    image: "/speakers/Dr Chin Swee Yee.jpg",
  },
  {
    id: 7,
    name: "Dr. Vasudeva Rao Avupati",
    designation: "E-Learning Lead and AI Coordinator, School of Pharmacy, IMU University, Malaysia",
    image: "/speakers/Dr Vasudeva Rao Avupati.jpg",
  },
];

const SpeakersPage = () => {
  return (
    <div className="bg-[#070B39] bg-opacity-90 relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-gradient-to-r from-[#FF3366] to-[#FF9966] rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-gradient-to-r from-[#9900FF] to-[#FF66CC] rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="text-5xl font-extrabold text-center mb-16">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFCC] to-[#00CCFF]">
            Our Distinguished Speakers
          </span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
          {speakers.map((speaker) => (
            <div
              key={speaker.id}
              className="group backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl hover:bg-white/20 transition-all duration-300 ease-out hover:shadow-[0_0_20px_rgba(0,204,255,0.3)]"
            >
              <div className="relative aspect-square overflow-hidden rounded-t-3xl">
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  width={400}
                  height={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070B39]/70 to-transparent" />
              </div>

              <div className="p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#00FFCC] group-hover:to-[#00CCFF] transition-all duration-300">
                    {speaker.name}
                  </h3>
                  {speaker.role && (
                    <span className="bg-gradient-to-r from-[#00FFCC]/20 to-[#00CCFF]/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium border border-white/10">
                      {speaker.role}
                    </span>
                  )}
                </div>

                <p className="text-gray-300 text-base leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                  {speaker.designation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpeakersPage;
