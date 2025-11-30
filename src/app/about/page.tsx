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
            and{" "}
            <span className="text-white font-semibold">
              Operant Pharmacy Federation (OPF)
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
              <div className="space-y-4 text-gray-300">
                <p className="leading-relaxed">
                  <span className="text-white font-semibold">
                    Chebrolu Hanumaiah Institute of Pharmaceutical Sciences
                  </span>{" "}
                  was established in the year 2018 by Vellalar Educational Trust
                  under the dynamic leadership of Mr. C. Jayakumar B.A., B.L,
                  President, and S.D Chandrasekar, Secretary cum correspondence,
                  renowned Educationalists and Industrialists having more than
                  five decades of rich experience in promoting and administering
                  Professional colleges.
                </p>
                <p className="leading-relaxed">
                  The institution is committed to provide quality education in
                  pharmacy to cater to the needs of the society in the
                  healthcare sector. The college is approved by Directorate of
                  Medical Education, PCI and affiliated with The TN Dr. MGR
                  Medical University, Chennai, Tamil Nadu.
                </p>
                <p className="leading-relaxed">
                  The college has a pollution-free environment, excellent
                  academic atmosphere, well-equipped laboratories, library,
                  hostel, and seminar halls. We have committed well-disciplined
                  and qualified faculty with their passion in Teaching &
                  Research in Pharmacy.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* About Vellalar Educational Trust Section */}
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 md:p-10 mb-12 shadow-[0_0_30px_rgba(0,204,255,0.1)]">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFCC] to-[#00CCFF]">
                About Vellalar Educational Trust
              </h2>
              <div className="space-y-4 text-gray-300">
                <p className="leading-relaxed">
                  Vellalar Educational Trust was established in 1969 under S.no
                  20 of Societies Registration Act XX1 of 1860, which runs a
                  variety of educational institutions. The main motto of the
                  trust is to emphasize on women education. Today, more than
                  3000 faculty members instruct 15,000 Students approximately.
                </p>
                <p className="leading-relaxed">
                  The institution generates financial aid programs that ensure
                  the talented students from all economic backgrounds can afford
                  education at Vellalar Educational Trust. A wide range of
                  cultural, educational, athletic and social activities are
                  available to students, faculty and other staff.
                </p>
                <p className="leading-relaxed">
                  Campus life activities are built around the concepts of
                  encouraging each member to express his or her talents and to
                  respect all members of our pluralistic culture.
                </p>
              </div>
            </div>
            <div>
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg transform transition-transform duration-500 hover:scale-105">
                <Image
                  src="/college.jpg"
                  alt="Vellalar Educational Trust"
                  className="object-cover w-full"
                  width={540}
                  height={360}
                />
              </div>
            </div>
          </div>
        </div>

        {/* About OPF Section */}
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 md:p-10 mb-12 shadow-[0_0_30px_rgba(0,204,255,0.1)]">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFCC] to-[#00CCFF]">
                About Operant Pharmacy Federation (OPF)
              </h2>
              <div className="space-y-4 text-gray-300">
                <p className="leading-relaxed">
                  Operant Pharmacy Federation (OPF) is committed to advancing
                  the{" "}
                  <span className="text-white font-semibold">
                    pharmacy profession
                  </span>{" "}
                  by hosting exhibitions, conferences, workshops, and more. With
                  a national reputation in biomedical and pharmaceutical
                  studies, OPF serves as a hub for high-quality research,
                  education forums, ethical discussions, and collaboration
                  across the country.
                </p>
                <p className="leading-relaxed">
                  At OPF, we prioritize{" "}
                  <span className="text-white font-semibold">
                    national healthcare impact
                  </span>{" "}
                  by fostering research, community wellness, and ethical
                  business practices. Our goal is to promote innovations in the{" "}
                  <span className="text-white font-semibold">
                    pharmaceutical industry
                  </span>
                  , benefiting both professionals and the wider community.
                </p>
                <p className="leading-relaxed">
                  We are proud to assist researchers in their dissertation work,
                  providing support through{" "}
                  <span className="text-white font-semibold">
                    editorial services
                  </span>{" "}
                  and{" "}
                  <span className="text-white font-semibold">
                    publication opportunities
                  </span>
                  . Our open-access research papers empower students and
                  professionals to stay informed about industry advancements.
                </p>
              </div>
            </div>
            <div>
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg transform transition-transform duration-500 hover:scale-105">
                <Image
                  src="/opflogo.png"
                  alt="About OPF"
                  className="object-cover w-full bg-white"
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
              Programs Offered by Vellalar College of Pharmacy
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
