import Image from "next/image";
import React from "react";

const About = () => {
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
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFCC] to-[#00CCFF]">
              About Us
            </span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Know more about{" "}
            <span className="text-white font-semibold">
              Chebrolu Hanumaiah Institute of Pharmaceutical Sciences
            </span>{" "}
            that we proudly support.
          </p>
        </div>

        {/* About College Section */}
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 md:p-10 mb-12 shadow-[0_0_30px_rgba(0,204,255,0.1)]">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg transform transition-transform duration-500 hover:scale-105">
                <Image
                  src="/college.jpg"
                  alt="Chebrolu Hanumaiah Institute of Pharmaceutical Sciences"
                  className="object-cover w-full"
                  width={540}
                  height={360}
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#FF3366] to-[#FF9966]">
                About Chebrolu Hanumaiah Institute of Pharmaceutical Sciences
              </h2>
              {/* <div className="space-y-4 text-gray-300">
                <p className="leading-relaxed">
                  <span className="text-white font-semibold">
                    Chebrolu Hanumaiah Institute of Pharmaceutical Sciences
                  </span>{" "}
                  was established in the year 2005 under Nagarjuna Education 
                  Society (NES), Guntur. CHIPS stands as a beacon of pharmaceutical 
                  education and research, committed to producing skilled professionals 
                  who drive innovation in healthcare.
                </p>
                <p className="leading-relaxed">
                  The institution is committed to provide quality education in
                  pharmacy to cater to the needs of the society in the
                  healthcare sector. The college is approved by AICTE, PCI and 
                  affiliated with Acharya Nagarjuna University, Andhra Pradesh.
                </p>
                <p className="leading-relaxed">
                  The college has a pollution-free environment, excellent
                  academic atmosphere, well-equipped laboratories, library,
                  hostel, and seminar halls. We have committed well-disciplined
                  and qualified faculty with their passion in Teaching &
                  Research in Pharmacy.
                </p>
              </div> */}
            </div>
          </div>
        </div>

        {/* About Nagarjuna Education Society Section */}
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 md:p-10 mb-12 shadow-[0_0_30px_rgba(0,204,255,0.1)]">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFCC] to-[#00CCFF]">
                About Nagarjuna Education Society
              </h2>
              <div className="space-y-4 text-gray-300">
                <p className="leading-relaxed">
                  The Nagarjuna Education Society (Regd.), Guntur, was
                  established and registered in 1967 by Philanthropists, Medical
                  Doctors, Industrial and Commercial houses with a mission of
                  serving the Society through promotion of Education, Literature
                  and Culture. The society was registered on 27th December, 1967
                  (No.56 of 1967) under Societies Act XXI of 1860.
                </p>
                <p className="leading-relaxed">
                  The strength of the Society is that it is purely an
                  educational society to which numerous people, organizations
                  and individuals have donated, only to contribute to the cause
                  of education. Quality of instruction through student-centered
                  teaching, updating teacher-capability and qualifications, and
                  developing personality and citizenship in students are the
                  guiding principles.
                </p>
                <p className="leading-relaxed">
                  NES runs multiple prestigious institutions including J.K.C
                  College, RVR & JC College of Engineering, JC College of Law,
                  MSB College of Nursing, and Chebrolu Hanumaiah Institute of
                  Pharmaceutical Sciences.
                </p>
              </div>
            </div>
            <div>
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg transform transition-transform duration-500 hover:scale-105">
                <Image
                  src="/college.jpg"
                  alt="Nagarjuna Education Society"
                  className="object-cover w-full"
                  width={540}
                  height={360}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Programs Offered Section */}
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 md:p-10 shadow-[0_0_30px_rgba(0,204,255,0.1)]">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#9900FF] to-[#FF66CC]">
              Programs Offered by CHIPS
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,204,255,0.3)]">
              <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] flex items-center justify-center mx-auto">
                <span className="text-[#070B39] text-2xl">🎓</span>
              </div>
              <h4 className="text-xl font-bold mb-3 text-center text-white">
                B. Pharmacy
              </h4>
              <p className="text-gray-300 text-center">
                4-year undergraduate program with 100 seats available.
              </p>
            </div>

            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,204,255,0.3)]">
              <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-r from-[#FF3366] to-[#FF9966] flex items-center justify-center mx-auto">
                <span className="text-[#070B39] text-2xl">📚</span>
              </div>
              <h4 className="text-xl font-bold mb-3 text-center text-white">
                D. Pharm
              </h4>
              <p className="text-gray-300 text-center">
                2-year diploma program with 60 seats available.
              </p>
            </div>

            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,204,255,0.3)]">
              <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-r from-[#9900FF] to-[#FF66CC] flex items-center justify-center mx-auto">
                <span className="text-[#070B39] text-2xl">🔬</span>
              </div>
              <h4 className="text-xl font-bold mb-3 text-center text-white">
                Pharm.D & M.Pharmacy
              </h4>
              <p className="text-gray-300 text-center">
                Advanced pharmaceutical education with specializations in
                Pharmaceutical Analysis and Pharmaceutics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
