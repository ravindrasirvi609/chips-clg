"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookCopy,
  Calendar,
  FileCheck,
  Award,
  ArrowRight,
  FileText,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const CallForAbstracts = () => {
  const topics = [
    "AI-Driven Drug Discovery & Development",
    "Machine Learning Applications in Clinical Research",
    "Deep Learning for Precision Medicine",
    "Natural Language Processing in Medical Literature",
    "Quantum Computing in Drug Design",
    "Digital Biomarkers & Predictive Analytics",
  ];

  const guidelines = [
    {
      icon: <FileText className="w-6 h-6 text-[#00FFCC]" />,
      title: "Abstract Format",
      description:
        "Submit a concise abstract of up to 300 words with clear structure: Objectives, Methods, Results, and Conclusions.",
    },
    {
      icon: <Calendar className="w-6 h-6 text-[#00FFCC]" />,
      title: "Submission Deadline",
      description:
        "All abstracts must be submitted by December 31, 2025, for review and consideration.",
    },
    {
      icon: <Award className="w-6 h-6 text-[#00FFCC]" />,
      title: "Recognition Opportunities",
      description:
        "Outstanding submissions will receive awards and be featured in leading scientific journals and publications.",
    },
  ];

  return (
    <section className="py-16 bg-background relative">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#00FFCC] opacity-5 rounded-full filter blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-[#CC00FF] opacity-5 rounded-full filter blur-[100px] animate-pulse"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            Call for Abstracts
          </h2>
          <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We invite researchers and innovators to share cutting-edge work at
            the International Conference. Submit your abstract to contribute to
            the advancement of pharmaceutical sciences and healthcare.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Left Side - Research Topics */}
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-lg bg-gradient-to-r from-primary to-blue-500 mr-4">
                  <BookCopy className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Research Topics
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {topics.map((topic, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 rounded-lg bg-white border border-gray-200 hover:border-primary/50 transition-all duration-300 group shadow-sm"
                  >
                    <ArrowRight className="w-5 h-5 mr-3 flex-shrink-0 text-primary group-hover:translate-x-1 transition-transform" />
                    <span className="text-gray-700 group-hover:text-primary transition-colors">
                      {topic}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Right Side - Submission Guidelines */}
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-lg bg-gradient-to-r from-primary to-blue-500 mr-4">
                  <FileCheck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Submission Guidelines
                </h3>
              </div>

              <div className="space-y-6">
                {guidelines.map((guideline, index) => (
                  <div
                    key={index}
                    className="flex items-start p-4 rounded-lg bg-white border border-gray-200 hover:border-primary/50 transition-all duration-300 shadow-sm"
                  >
                    <div className="p-2 bg-primary/10 rounded-full mr-4">
                      {guideline.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-gray-800">
                        {guideline.title}
                      </h4>
                      <p className="text-gray-600">{guideline.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="inline-block bg-card border border-border/50">
            <CardContent className="p-8">
              <div className="flex justify-center mb-4">
                <Sparkles className="w-8 h-8 text-[#00FFCC]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gradient">
                Ready to Submit Your Research?
              </h3>
              <p className="text-gray-600 mb-6">
                Join the International Conference scientific community. Share
                your research, network with experts, and contribute to the
                future of healthcare.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/abstractForm">
                  <button className="px-8 py-3 rounded-lg font-semibold text-white bg-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-105">
                    Submit Abstract
                  </button>
                </Link>
                <Link href="/abstractForm">
                  <button className="px-8 py-3 rounded-lg font-semibold text-gray-800 bg-white border border-gray-200 hover:border-primary/50 hover:text-primary transition-all duration-300 hover:scale-105 shadow-sm">
                    View Guidelines
                  </button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CallForAbstracts;
