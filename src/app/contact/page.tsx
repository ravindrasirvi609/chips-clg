"use client";
import React, { useState } from "react";
import {
  AlertTriangle,
  CheckCircle,
  User,
  Mail,
  MessageSquare,
} from "lucide-react";

const AnimatedInput = ({
  type,
  name,
  value,
  onChange,
  error,
  label,
  icon: Icon,
}: {
  type: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}) => (
  <div className="relative mb-6">
    <label htmlFor={name} className="block text-sm font-medium text-white mb-2">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="w-5 h-5 text-gray-400" />
        </div>
      )}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`Enter your ${label.toLowerCase()}`}
        className={`w-full pl-10 pr-3 py-3 rounded-xl ${
          error
            ? "border-red-500 focus:ring-red-300"
            : "bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-[#00FFCC] focus:ring-1 focus:ring-[#00FFCC]"
        } focus:outline-none backdrop-blur-sm`}
      />
      {error && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <AlertTriangle className="w-5 h-5 text-red-500" />
        </div>
      )}
    </div>
    {error && (
      <p className="text-red-500 text-sm mt-1 flex items-center">
        <AlertTriangle className="w-4 h-4 mr-2" /> {error}
      </p>
    )}
  </div>
);

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const tempErrors = { name: "", email: "", message: "" };
    if (!formData.name.trim()) {
      tempErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      tempErrors.name = "Name must be at least 2 characters";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) {
      tempErrors.message = "Your message cannot be empty";
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = "Message must be at least 10 characters";
    }
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (validate()) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-[#070B39] bg-opacity-90 relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-gradient-to-r from-[#FF3366] to-[#FF9966] rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-gradient-to-r from-[#9900FF] to-[#FF66CC] rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFCC] to-[#00CCFF]">
            Get in Touch with Us
          </span>
        </h1>
        <p className="text-gray-300 text-xl text-center mb-16 max-w-3xl mx-auto">
          We&apos;re here to help! Don&apos;t hesitate to reach out with any
          questions or concerns.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 shadow-[0_0_30px_rgba(0,204,255,0.1)]">
            <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFCC] to-[#00CCFF]">
              Send a Message
            </h3>

            {isSubmitted ? (
              <div className="p-8 backdrop-blur-lg bg-[#0A192F]/70 border border-[#00FFCC]/20 rounded-2xl text-center">
                <CheckCircle className="w-16 h-16 mx-auto text-[#00FFCC] mb-4" />
                <p className="text-xl font-semibold text-white mb-2">
                  Message Sent Successfully!
                </p>
                <p className="text-gray-300">
                  Thank you for reaching out. We&apos;ll get back to you
                  shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatedInput
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  label="Full Name"
                  error={errors.name}
                  icon={User}
                />
                <AnimatedInput
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  label="Email Address"
                  error={errors.email}
                  icon={Mail}
                />

                <div className="relative mb-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Your Message
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <MessageSquare className="w-5 h-5 text-gray-400" />
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Type your message here..."
                      rows={4}
                      className="w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-[#00FFCC] focus:ring-1 focus:ring-[#00FFCC] focus:outline-none backdrop-blur-sm"
                    />
                  </div>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />{" "}
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] text-[#070B39] font-semibold hover:shadow-[0_0_20px_rgba(0,204,255,0.5)] transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-8">
            <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 shadow-[0_0_30px_rgba(0,204,255,0.1)]">
              <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFCC] to-[#00CCFF]">
                Our Location
              </h3>
              <div className="rounded-xl overflow-hidden border border-white/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3829.8396851947967!2d80.4374!3d16.3067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a74c5f2e5e4d1%3A0x1234567890abcdef!2sChebrolu%20Hanumaiah%20Institute%20of%20Pharmaceutical%20Sciences!5e0!3m2!1sen!2sin!4v1703432423912!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                ></iframe>
              </div>
            </div>

            <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 shadow-[0_0_30px_rgba(0,204,255,0.1)]">
              <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFCC] to-[#00CCFF]">
                Contact Information
              </h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  <span className="text-white font-semibold">Address:</span>{" "}
                  Beside RVR & JC College of Engineering, Chandramoulipuram,
                  Chowdavaram, Andhra Pradesh - 522019
                </p>
                <p>
                  <span className="text-white font-semibold">Email:</span>{" "}
                  chipsguntur@gmail.com
                </p>
                <p>
                  <span className="text-white font-semibold">Phone:</span> +91
                  738 200 8494
                </p>
                <p>
                  <span className="text-white font-semibold">
                    Office Hours:
                  </span>{" "}
                  Monday to Friday, 9:00 AM - 5:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
