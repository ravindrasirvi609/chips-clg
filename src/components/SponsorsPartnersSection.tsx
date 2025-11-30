"use client";
import React, { useState } from "react";
import {
  Star,
  Award,
  Diamond,
  Gem,
  ChevronRight,
  Building,
  Globe,
} from "lucide-react";

const SponsorsPartnersSection = () => {
  const [activeTab, setActiveTab] = useState<"platinum" | "gold" | "silver">(
    "platinum"
  );

  const sponsors = {
    platinum: [
      { id: 1, name: "PharmaInnovate India", type: "platinum" },
      { id: 2, name: "BioTech Research Labs", type: "platinum" },
      { id: 3, name: "HealthAI Systems", type: "platinum" },
    ],
    gold: [
      { id: 4, name: "MediData Solutions", type: "gold" },
      { id: 5, name: "NextGen Pharma", type: "gold" },
      { id: 6, name: "Quantum Health Analytics", type: "gold" },
      { id: 7, name: "Clinical AI Partners", type: "gold" },
    ],
    silver: [
      { id: 8, name: "MedTech Innovations", type: "silver" },
      { id: 9, name: "Healthcare Data Systems", type: "silver" },
      { id: 10, name: "Neural Pharma Labs", type: "silver" },
      { id: 11, name: "Precision Medicine Group", type: "silver" },
      { id: 12, name: "BioInformatics Solutions", type: "silver" },
    ],
  };

  const partners = [
    { id: 13, name: "National Medical University" },
    { id: 14, name: "Pharmaceutical Research Institute" },
    { id: 15, name: "Healthcare Innovation Hub" },
    { id: 16, name: "BioTech Association of India" },
  ];

  const SponsorIcon: React.FC<{
    type: "platinum" | "gold" | "silver" | "default";
  }> = ({ type }) => {
    switch (type) {
      case "platinum":
        return <Diamond className="w-8 h-8 text-[#00FFCC]" />;
      case "gold":
        return <Award className="w-8 h-8 text-[#00CCFF]" />;
      case "silver":
        return <Star className="w-8 h-8 text-gray-400" />;
      default:
        return <Gem className="w-8 h-8 text-[#00FFCC]" />;
    }
  };

  return (
    <div className="w-full bg-background relative py-20">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-[15%] w-[25vw] h-[25vw] rounded-full bg-[#00FFCC] opacity-5 blur-[100px] animate-pulse"></div>
        <div
          className="absolute bottom-40 right-[15%] w-[25vw] h-[25vw] rounded-full bg-[#CC00FF] opacity-5 blur-[100px] animate-pulse"
          style={{ animationDelay: "-3s" }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            Our Sponsors & Partners
          </h2>
          <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] rounded-full mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We collaborate with leading organizations at the forefront of
            pharmaceutical innovation and artificial intelligence to create a
            transformative experience.
          </p>
        </div>

        {/* Sponsors Section */}
        <div className="mb-16">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {["platinum", "gold", "silver"].map((type) => (
              <button
                key={type}
                onClick={() =>
                  setActiveTab(type as "platinum" | "gold" | "silver")
                }
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === type
                    ? "bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] text-black shadow-lg transform scale-105"
                    : "glassmorphism text-white hover:border hover:border-[#00FFCC]/30"
                }`}
              >
                <div className="flex items-center">
                  {type === "platinum" && <Diamond className="w-5 h-5 mr-2" />}
                  {type === "gold" && <Award className="w-5 h-5 mr-2" />}
                  {type === "silver" && <Star className="w-5 h-5 mr-2" />}
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sponsors[activeTab].map((sponsor) => (
              <div
                key={sponsor.id}
                className="glassmorphism-card rounded-xl p-6 transition-all duration-300"
              >
                <div className="flex items-center justify-center h-40 glassmorphism rounded-lg mb-6 p-4">
                  {/* Placeholder for sponsor logo */}
                  <div className="max-w-[200px] max-h-[80px] flex items-center justify-center text-white font-bold text-lg bg-[#00FFCC]/10 rounded-lg">
                    {sponsor.name}
                  </div>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center p-3 mb-3 rounded-full bg-[#00FFCC]/10">
                    <SponsorIcon
                      type={sponsor.type as "platinum" | "gold" | "silver"}
                    />
                  </div>
                  <h3 className="font-bold text-lg mb-1 text-white">
                    {sponsor.name}
                  </h3>
                  <span
                    className={`text-sm px-3 py-1 rounded-full ${
                      sponsor.type === "platinum"
                        ? "bg-[#00FFCC]/20 text-[#00FFCC]"
                        : sponsor.type === "gold"
                        ? "bg-[#00CCFF]/20 text-[#00CCFF]"
                        : "bg-gray-600/30 text-gray-300"
                    }`}
                  >
                    {sponsor.type.charAt(0).toUpperCase() +
                      sponsor.type.slice(1)}{" "}
                    Sponsor
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partners Section */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="p-3 rounded-lg bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] mr-4">
              <Globe className="w-6 h-6 text-black" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              Strategic Partners
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="glassmorphism rounded-xl p-5 hover:border hover:border-[#00FFCC]/30 transition-all duration-300"
              >
                <div className="flex items-center justify-center h-32 glassmorphism-dark rounded-lg mb-4 p-3">
                  {/* Placeholder for partner logo */}
                  <div className="max-w-[160px] max-h-[60px] flex items-center justify-center text-white font-bold text-base bg-[#00FFCC]/10 rounded-lg">
                    {partner.name}
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="font-medium text-white">{partner.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Become a Sponsor CTA */}
        <div className="text-center glassmorphism-card rounded-2xl p-8 border border-[#00FFCC]/20">
          <div className="flex justify-center mb-4">
            <Building className="w-8 h-8 text-[#00FFCC]" />
          </div>
          <h3 className="text-2xl font-bold text-gradient mb-4">
            Become a Sponsor
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join our growing ecosystem of industry partners and showcase your
            innovations to a national audience of healthcare leaders, AI
            specialists, and pharmaceutical pioneers.
          </p>
          <a
            href="#sponsor-packages"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] text-black rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00FFCC]/20 transition-all duration-300 transform hover:translate-y-[-2px] group"
          >
            View Sponsorship Packages
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SponsorsPartnersSection;
