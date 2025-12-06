"use client";

import { CheckCircle, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const AnimatedInput = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    icon: Icon,
    error,
  }: any) => (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-500 group-focus-within:text-primary transition-colors duration-300" />
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`Enter your ${label.toLowerCase()}`}
        className={`w-full pl-10 pr-3 py-3 rounded-xl ${error
          ? "border-red-500 focus:ring-red-300"
          : "bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary"
          } focus:outline-none shadow-sm`}
        required
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 overflow-hidden relative selection:bg-primary/30">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-primary/20 pointer-events-none mix-blend-multiply" />
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 -right-40 w-80 h-80 bg-purple-400/20 rounded-full blur-[100px] animate-blob"></div>
      <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-primary/20 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8">
          <span className="text-primary">
            Get in Touch with Us
          </span>
        </h1>
        <p className="text-gray-600 text-xl text-center mb-16 max-w-3xl mx-auto">
          We&apos;re here to help! Don&apos;t hesitate to reach out with any
          questions or concerns.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 shadow-sm">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">
              Send a Message
            </h3>
            {isSubmitted ? (
              <div className="p-8 bg-green-50 border border-green-200 rounded-2xl text-center">
                <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-600">
                  Thank you for contacting us. We&apos;ll get back to you shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 px-6 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-all duration-300"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AnimatedInput
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    icon={CheckCircle}
                  />
                  <AnimatedInput
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    icon={Mail}
                  />
                </div>
                <AnimatedInput
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  icon={CheckCircle}
                />
                <div className="relative group">
                  <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                    <Send className="h-5 w-5 text-gray-500 group-focus-within:text-primary transition-colors duration-300" />
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows={4}
                    className="w-full pl-10 pr-3 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary shadow-sm focus:outline-none"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center transition-all duration-300 ${isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary text-white hover:shadow-lg hover:bg-primary/90"
                    }`}
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info and Map */}
          <div className="space-y-8">
            <div className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 shadow-sm">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">
                Our Location
              </h3>
              <div className="rounded-xl overflow-hidden border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3829.8396851947967!2d80.4374!3d16.3067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a74c5f2e5e4d1%3A0x1234567890abcdef!2sChebrolu%20Hanumaiah%20Institute%20of%20Pharmaceutical%20Sciences!5e0!3m2!1sen!2sin!4v1703432423912!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                ></iframe>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 shadow-sm">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">
                Contact Information
              </h3>
              <div className="space-y-6 text-gray-600">
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-primary mr-4 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Email</h4>
                    <p>innovatepharma2026@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-primary mr-4 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Address</h4>
                    <p>
                      Chandramoulipuram, Chowdavaram, Guntur, Andhra Pradesh
                      522019
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-primary mr-4 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Phone</h4>
                    <p>
                      <span className="text-gray-900 font-semibold">Phone:</span> +91
                      9866204171
                    </p>
                    <p>
                      <span className="text-gray-900 font-semibold">
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
      </div>
    </div>
  );
};

export default ContactPage;
