"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Network,
  BrainCircuit,
  Users,
  ArrowRight,
  Calendar,
  Bot,
  Dna,
  Lightbulb,
  Database,
} from "lucide-react";

const KeyHighlights = () => {
  // const speakers = [
  //   {
  //     name: "Dr. Sarah Chen",
  //     role: "Director of AI Research",
  //     specialty: "Revolutionizing Drug Discovery",
  //     institution: "PharmaTech Institute",
  //   },
  //   {
  //     name: "Prof. James Wilson",
  //     role: "Innovation Leader",
  //     specialty: "Machine Learning Applications in Pharma",
  //     institution: "Global Pharma Labs",
  //   },
  //   {
  //     name: "Dr. Maria Rodriguez",
  //     role: "Chief Data Scientist",
  //     specialty: "AI Integration in Medical Research",
  //     institution: "BioTech Solutions",
  //   },
  // ];

  const topics = [
    {
      icon: <Bot className="w-6 h-6 text-[#00FFCC]" />,
      title: "AI-Driven Drug Discovery",
      description:
        "Cutting-edge AI models accelerating identification of novel therapeutic targets and compounds.",
    },
    {
      icon: <Dna className="w-6 h-6 text-[#00FFCC]" />,
      title: "Personalized Medicine",
      description:
        "Machine learning approaches for tailoring treatments to individual genetic profiles.",
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-[#00FFCC]" />,
      title: "Quantum Computing in Pharma",
      description:
        "Revolutionary quantum algorithms for simulating molecular interactions at unprecedented scale.",
    },
    {
      icon: <Database className="w-6 h-6 text-[#00FFCC]" />,
      title: "Healthcare Data Science",
      description:
        "Advanced analytics transforming clinical trials, patient outcomes, and drug optimization.",
    },
  ];

  const networkingBenefits = [
    "Connect with leading AI and pharmaceutical researchers",
    "Participate in specialized innovation workshops",
    "Join collaborative cross-disciplinary sessions",
    "Explore partnership and funding opportunities",
  ];

  return (
    <section className="py-20 bg-background relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-[20%] w-[30vw] h-[30vw] rounded-full bg-[#00FFCC] opacity-5 blur-[100px] animate-pulse"></div>
        <div
          className="absolute bottom-20 right-[20%] w-[25vw] h-[25vw] rounded-full bg-[#CC00FF] opacity-5 blur-[100px] animate-pulse"
          style={{ animationDelay: "-5s" }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            Key Highlights
          </h2>
          <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] rounded-full mb-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore the groundbreaking features of the National Conference that
            make it the premier conference for AI and pharmaceutical innovation
            in India.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Keynote Speakers */}
          {/* <Card className="col-span-1 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center mb-6">
                <UserSquare2
                  className="w-8 h-8 mr-3"
                  style={{ color: "#1e8f26" }}
                />
                <h3 className="text-2xl font-semibold">
                  Meet Our Keynote Speakers
                </h3>
              </div>
              <div className="space-y-6">
                {speakers.map((speaker, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                  >
                    <Image
                      src="/PharmaNEST.png"
                      alt={speaker.name}
                      className="w-16 h-16 rounded-full object-cover"
                      width={100}
                      height={100}
                    />
                    <div>
                      <h4
                        className="font-semibold"
                        style={{ color: "#1e8f26" }}
                      >
                        {speaker.name}
                      </h4>
                      <p className="text-sm text-gray-600">{speaker.role}</p>
                      <p className="text-sm text-gray-500">
                        {speaker.institution}
                      </p>
                      <p
                        className="text-sm mt-1 italic"
                        style={{ color: "#c12b23" }}
                      >
                        {speaker.specialty}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card> */}

          {/* Critical Topics */}
          <Card className="col-span-3 lg:col-span-2">
            <CardContent className="p-8">
              <div className="flex items-center mb-8">
                <div className="p-3 rounded-lg bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] mr-4">
                  <BrainCircuit className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Pioneering Topics
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {topics.map((topic, index) => (
                  <div
                    key={index}
                    className="glassmorphism rounded-xl p-5 transition-all duration-300 hover:border hover:border-[#00FFCC]/30 group"
                  >
                    <div className="flex items-center mb-3">
                      <div className="p-2 bg-[#00FFCC]/10 rounded-lg mr-3 group-hover:bg-[#00FFCC]/20 transition-colors">
                        {topic.icon}
                      </div>
                      <h4 className="font-bold text-white group-hover:text-gradient transition-colors duration-500">
                        {topic.title}
                      </h4>
                    </div>
                    <p className="text-gray-300 text-sm pl-2 border-l border-[#00FFCC]/30">
                      {topic.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Networking Opportunities */}
          <Card className="col-span-3 lg:col-span-1">
            <CardContent className="p-8">
              <div className="flex items-center mb-8">
                <div className="p-3 rounded-lg bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] mr-4">
                  <Network className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Connect & Collaborate
                </h3>
              </div>

              <div className="space-y-6">
                <div className="glassmorphism rounded-xl p-5">
                  <div className="flex items-center mb-3">
                    <Users className="w-5 h-5 text-[#00FFCC] mr-3" />
                    <h4 className="font-bold text-white">
                      Global Innovation Network
                    </h4>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Join an exclusive community of innovators, researchers, and
                    industry leaders from around the world.
                  </p>
                </div>

                <div className="glassmorphism rounded-xl p-5">
                  <div className="flex items-center mb-3">
                    <Calendar className="w-5 h-5 text-[#00FFCC] mr-3" />
                    <h4 className="font-bold text-white">
                      Strategic Networking Events
                    </h4>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Curated opportunities for meaningful connections through
                    targeted sessions and digital matchmaking.
                  </p>
                </div>

                <div className="mt-6 glassmorphism rounded-xl p-5">
                  <h4 className="font-bold text-white mb-4">
                    National Conference Advantages:
                  </h4>
                  <ul className="space-y-3">
                    {networkingBenefits.map((benefit, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-300 group"
                      >
                        <ArrowRight className="w-4 h-4 mr-2 text-[#00FFCC] group-hover:translate-x-1 transition-transform" />
                        <span className="group-hover:text-white transition-colors">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default KeyHighlights;
