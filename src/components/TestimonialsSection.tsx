"use client";
import React, { useState, useEffect } from "react";
import { Quote, Star, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Director of AI Research",
      company: "PharmaInnovate Labs",
      image: undefined,
      quote:
        "This conference continues to be the premier event for showcasing the intersection of AI and pharmaceutical research. The latest advancements presented this year will transform drug discovery as we know it.",
      rating: 5,
      type: "Speaker",
      year: "2024",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Lead Data Scientist",
      company: "BioTech Innovations",
      image: undefined,
      quote:
        "The collaborative atmosphere at the National Conference fostered connections that led to two major research partnerships. The workshops on machine learning applications in clinical trials were particularly valuable.",
      rating: 5,
      type: "Attendee",
      year: "2024",
    },
    {
      id: 3,
      name: "Dr. Emma Rodriguez",
      role: "Healthcare AI Specialist",
      company: "MedTech Solutions",
      image: undefined,
      quote:
        "As both a presenter and attendee, I was impressed by the caliber of research and the seamless integration of theoretical concepts with practical applications. The quantum computing session was groundbreaking.",
      rating: 5,
      type: "Speaker",
      year: "2024",
    },
    {
      id: 4,
      name: "Prof. David Kim",
      role: "Head of Computational Biology",
      company: "National Medical University",
      image: undefined,
      quote:
        "This conference has consistently provided a platform where academia and industry converge to address healthcare challenges. This year's focus on personalized medicine through AI was particularly inspiring.",
      rating: 5,
      type: "Speaker",
      year: "2024",
    },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveIndex((current) =>
          current === testimonials.length - 1 ? 0 : current + 1
        );
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setActiveIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((current) =>
      current === testimonials.length - 1 ? 0 : current + 1
    );
  };

  const RatingStars: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${
            index < rating ? "fill-[#00FFCC] text-[#00FFCC]" : "text-gray-500"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="w-full bg-background py-20 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-[#00FFCC] opacity-5 blur-[100px] animate-pulse"></div>
        <div
          className="absolute bottom-[20%] left-[10%] w-[25vw] h-[25vw] rounded-full bg-[#CC00FF] opacity-5 blur-[100px] animate-pulse"
          style={{ animationDelay: "-3s" }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            Voices of Innovation
          </h2>
          <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] rounded-full mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Insights from leading researchers and professionals who have
            experienced the transformative impact of PharmaNEST.
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="relative glassmorphism-card rounded-2xl p-8 mb-12">
          <div className="absolute top-0 left-0 transform -translate-x-4 -translate-y-4">
            <Quote className="w-12 h-12 text-[#00FFCC] opacity-20" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Testimonial Content */}
            <div className="space-y-6">
              <div className="relative">
                <p className="text-xl leading-relaxed text-white italic">
                  &quot;{testimonials[activeIndex].quote}&quot;
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-[#00FFCC]/10 p-0.5 border border-[#00FFCC]/30">
                    {testimonials[activeIndex].image && (
                      <Image
                        src={testimonials[activeIndex].image}
                        alt={testimonials[activeIndex].name ?? ""}
                        className="w-full h-full object-cover rounded-full"
                        width={64}
                        height={64}
                      />
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] text-black text-xs px-2 py-1 rounded-full font-bold">
                    {testimonials[activeIndex].type}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-lg text-white">
                    {testimonials[activeIndex].name}
                  </h4>
                  <p className="text-gray-300">
                    {testimonials[activeIndex].role}
                  </p>
                  <p className="text-sm text-[#00FFCC]">
                    {testimonials[activeIndex].company}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <RatingStars rating={testimonials[activeIndex].rating} />
                <span className="text-sm text-gray-400">
                  National Conference {testimonials[activeIndex].year}
                </span>
              </div>
            </div>

            {/* Testimonial Preview Cards */}
            <div className="hidden md:block">
              <div className="relative h-96">
                {testimonials.map((testimonial, index) => {
                  const offset = index - activeIndex;
                  const isActive = index === activeIndex;
                  return (
                    <div
                      key={testimonial.id}
                      className={`absolute w-full p-6 bg-[#0a182f] border border-[#1e2a45] rounded-xl transition-all duration-500 ${
                        isActive
                          ? "opacity-100 z-20 transform scale-100"
                          : offset === 1
                          ? "opacity-60 z-10 transform translate-y-4 scale-95"
                          : offset === 2
                          ? "opacity-30 z-0 transform translate-y-8 scale-90"
                          : "opacity-0 z-0 transform translate-y-12 scale-85"
                      }`}
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-[#00FFCC]/10 p-0.5 border border-[#00FFCC]/30">
                          {testimonial.image && (
                            <Image
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-full h-full object-cover rounded-full"
                              width={48}
                              height={48}
                            />
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-white">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-gray-300">
                            {testimonial.company}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm line-clamp-3">
                        &quot;{testimonial.quote}&quot;
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={handlePrevious}
            className="p-3 glassmorphism rounded-full hover:bg-[#00FFCC]/10 transition-colors duration-300 group"
            aria-label="Previous testimonial"
          >
            <ArrowLeft className="w-6 h-6 text-[#00FFCC] group-hover:translate-x-[-2px] transition-transform" />
          </button>

          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setActiveIndex(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] w-8"
                    : "bg-gray-700 hover:bg-gray-600 w-2"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 glassmorphism rounded-full hover:bg-[#00FFCC]/10 transition-colors duration-300 group"
            aria-label="Next testimonial"
          >
            <ArrowRight className="w-6 h-6 text-[#00FFCC] group-hover:translate-x-[2px] transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
