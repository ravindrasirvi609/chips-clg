import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Users, Building2, Globe, Zap } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-16 bg-background relative">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            About the International Conference
          </h2>
          <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Main text */}
          <div className="space-y-6 card rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-gradient">
              Emerging Innovations in Pharmaceutical Sciences and Drug Discovery
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              The International Conference is a premier international platform
              dedicated to exploring the revolutionary impact of AI and ML
              technologies across the healthcare and pharmaceutical spectrum. We
              bring together thought leaders, researchers, industry
              professionals, academicians, clinicians, data scientists, and
              regulatory experts from across India to discuss the latest trends,
              innovations, challenges, and future prospects.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              With advancements in computational power and data analytics,
              Artificial Intelligence and Machine Learning have become vital
              tools in improving patient outcomes, drug discovery, diagnostics,
              clinical decision-making, personalized medicine, and operational
              efficiency in healthcare.
            </p>
            <div className="mt-6 p-4 bg-card border border-border/50 rounded-xl">
              <h4 className="text-xl font-semibold mb-2 text-white">Theme</h4>
              <p className="text-[#00FFCC] italic font-medium">
                &quot;Emerging Innovations in Pharmaceutical Sciences and Drug
                Discovery&quot;
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex flex-col items-center bg-card border border-border/50 p-4 rounded-lg text-center">
                <div className="bg-[#00FFCC]/10 p-3 rounded-full mb-3">
                  <Globe className="w-6 h-6 text-[#00FFCC]" />
                </div>
                <span className="text-white font-medium">
                  International Platform
                </span>
              </div>
              <div className="flex flex-col items-center bg-card border border-border/50 p-4 rounded-lg text-center">
                <div className="bg-[#00FFCC]/10 p-3 rounded-full mb-3">
                  <Zap className="w-6 h-6 text-[#00FFCC]" />
                </div>
                <span className="text-white font-medium">Future-Ready</span>
              </div>
            </div>
          </div>

          {/* Right side - Feature cards */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 flex items-start space-x-4">
                <div className="bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] p-3 rounded-lg">
                  <Building2 className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h4 className="font-bold mb-2 text-white">
                    Jointly Organized By
                  </h4>
                  <p className="text-gray-300">
                    Chebrolu Hanumaiah Institute of Pharmaceutical Sciences
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-start space-x-4">
                <div className="bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] p-3 rounded-lg">
                  <Brain className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h4 className="font-bold mb-2 text-white">
                    Conference Highlights
                  </h4>
                  <p className="text-gray-300">
                    Keynote sessions by industry pioneers, Real Time
                    Applications of AI Tools, poster presentations, networking
                    sessions, and in-depth discussions on AI-driven healthcare
                    innovations.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-start space-x-4">
                <div className="bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] p-3 rounded-lg">
                  <Users className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h4 className="font-bold mb-2 text-white">Key Focus Areas</h4>
                  <p className="text-gray-300">
                    AI-driven diagnostics, predictive analytics, machine
                    learning in genomics, early disease detection, ML in drug
                    development, and ethical considerations in AI healthcare.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
