"use client";
import React, { useState } from "react";
import { indianStates, designationOptions } from "@/app/data";

interface Member {
  Salutations: string;
  name: string;
  email: string;
  whatsappNumber: string;
  affiliation: string;
  designation: string;
  gender: string;
  dob: string;
  AadharNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  needAccommodation: boolean;
}

const GroupRegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [groupCode, setGroupCode] = useState("");

  // Single member state
  const [member, setMember] = useState<Member>({
    Salutations: "",
    name: "",
    email: "",
    whatsappNumber: "",
    affiliation: "",
    designation: "",
    gender: "",
    dob: "",
    AadharNumber: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    needAccommodation: false,
  });

  const updateMember = (field: string, value: string | boolean) => {
    setMember((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    if (!member.name || !member.email) {
      setErrorMessage("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    if (!groupCode.trim()) {
      setErrorMessage("Please enter a group code to identify your group.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Submit the member with the group code
      const response = await fetch("/api/group-submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...member,
          groupCode: groupCode.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit group registration");
      }

      setSubmitStatus("success");
      // Reset form
      setMember({
        Salutations: "",
        name: "",
        email: "",
        whatsappNumber: "",
        affiliation: "",
        designation: "",
        gender: "",
        dob: "",
        AadharNumber: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
        needAccommodation: false,
      });
      setGroupCode("");
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "An error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="backdrop-blur-lg bg-green-900/20 border border-green-500/50 rounded-xl p-6">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-white text-sm">✓</span>
          </div>
          <div>
            <p className="text-green-400 font-semibold">
              Group Registration Submitted Successfully!
            </p>
            <p className="text-green-300 text-sm">
              Your group registration has been submitted and is awaiting admin
              approval. You will receive a confirmation email once reviewed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {submitStatus === "error" && (
        <div className="backdrop-blur-lg bg-red-900/20 border border-red-500/50 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
              <span className="text-white text-sm">!</span>
            </div>
            <div>
              <p className="text-red-400 font-semibold">Submission Failed</p>
              <p className="text-red-300 text-sm">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Group Code Section */}
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] flex items-center justify-center">
            <span className="text-[#070B39] font-bold">1</span>
          </span>
          Group Information
        </h3>

        <div className="mb-6">
          <label className="block text-white font-medium mb-2">
            Group Code/Name *
          </label>
          <input
            type="text"
            value={groupCode}
            onChange={(e) => setGroupCode(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-[#00FFCC] focus:ring-1 focus:ring-[#00FFCC] focus:outline-none backdrop-blur-sm"
            placeholder="Enter a unique group code/name (e.g., 'XYZ_College_Group_2026')"
          />
          <p className="text-gray-400 text-sm mt-1">
            This code will be used to identify all members of your group. Make
            it unique and memorable.
          </p>
        </div>
      </div>

      {/* Member Information */}
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF3366] to-[#FF9966] flex items-center justify-center">
            <span className="text-white font-bold">2</span>
          </span>
          Member Information
        </h3>

        <div className="border border-white/10 rounded-xl p-6 space-y-4">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-medium mb-2">
                Salutations *
              </label>
              <select
                value={member.Salutations}
                onChange={(e) => updateMember("Salutations", e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#00FFCC] focus:ring-1 focus:ring-[#00FFCC] focus:outline-none backdrop-blur-sm"
              >
                <option value="">Select Salutation</option>
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Dr.">Dr.</option>
                <option value="Prof.">Prof.</option>
              </select>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={member.name}
                onChange={(e) => updateMember("name", e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-[#00FFCC] focus:ring-1 focus:ring-[#00FFCC] focus:outline-none backdrop-blur-sm"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">
                Email *
              </label>
              <input
                type="email"
                value={member.email}
                onChange={(e) => updateMember("email", e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-[#00FFCC] focus:ring-1 focus:ring-[#00FFCC] focus:outline-none backdrop-blur-sm"
                placeholder="Enter email address"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">
                WhatsApp Number *
              </label>
              <input
                type="tel"
                value={member.whatsappNumber}
                onChange={(e) => updateMember("whatsappNumber", e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-[#00FFCC] focus:ring-1 focus:ring-[#00FFCC] focus:outline-none backdrop-blur-sm"
                placeholder="Enter WhatsApp number"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">
                Affiliation/Institution *
              </label>
              <input
                type="text"
                value={member.affiliation}
                onChange={(e) => updateMember("affiliation", e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-[#00FFCC] focus:ring-1 focus:ring-[#00FFCC] focus:outline-none backdrop-blur-sm"
                placeholder="Enter institution name"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">
                Designation *
              </label>
              <select
                value={member.designation}
                onChange={(e) => updateMember("designation", e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#00FFCC] focus:ring-1 focus:ring-[#00FFCC] focus:outline-none backdrop-blur-sm"
              >
                <option value="">Select Designation</option>
                {designationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">
                Gender *
              </label>
              <select
                value={member.gender}
                onChange={(e) => updateMember("gender", e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#00FFCC] focus:ring-1 focus:ring-[#00FFCC] focus:outline-none backdrop-blur-sm"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                value={member.dob}
                onChange={(e) => updateMember("dob", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#00FFCC] focus:ring-1 focus:ring-[#00FFCC] focus:outline-none backdrop-blur-sm"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">
                Aadhar Number
              </label>
              <input
                type="text"
                value={member.AadharNumber}
                onChange={(e) => updateMember("AadharNumber", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-[#00FFCC] focus:ring-1 focus:ring-[#00FFCC] focus:outline-none backdrop-blur-sm"
                placeholder="Enter Aadhar number"
              />
            </div>
          </div>

          {/* Address Information */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <h5 className="text-white font-medium mb-4">Address Information</h5>

            <div className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">
                  Address *
                </label>
                <textarea
                  value={member.address}
                  onChange={(e) => updateMember("address", e.target.value)}
                  required
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-[#00FFCC] focus:ring-1 focus:ring-[#00FFCC] focus:outline-none backdrop-blur-sm resize-none"
                  placeholder="Enter complete address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={member.city}
                    onChange={(e) => updateMember("city", e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-[#00FFCC] focus:ring-1 focus:ring-[#00FFCC] focus:outline-none backdrop-blur-sm"
                    placeholder="Enter city"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    State *
                  </label>
                  <select
                    value={member.state}
                    onChange={(e) => updateMember("state", e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#00FFCC] focus:ring-1 focus:ring-[#00FFCC] focus:outline-none backdrop-blur-sm"
                  >
                    <option value="">Select State</option>
                    {indianStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    value={member.pincode}
                    onChange={(e) => updateMember("pincode", e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-[#00FFCC] focus:ring-1 focus:ring-[#00FFCC] focus:outline-none backdrop-blur-sm"
                    placeholder="Enter pincode"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    value={member.country}
                    onChange={(e) => updateMember("country", e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-[#00FFCC] focus:ring-1 focus:ring-[#00FFCC] focus:outline-none backdrop-blur-sm"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={member.needAccommodation}
                  onChange={(e) =>
                    updateMember("needAccommodation", e.target.checked)
                  }
                  className="w-4 h-4 text-[#00FFCC] bg-gray-100 border-gray-300 rounded focus:ring-[#00FFCC] focus:ring-2"
                />
                <label className="text-white">Need Accommodation</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-6">
        <button
          type="submit"
          disabled={
            isSubmitting || !member.name || !member.email || !groupCode.trim()
          }
          className="bg-gradient-to-r from-[#FF3366] to-[#FF9966] text-white font-bold py-4 px-8 rounded-full text-lg hover:shadow-[0_0_20px_rgba(255,51,102,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit Group Registration"}
        </button>
      </div>

      {(!member.name || !member.email || !groupCode.trim()) && (
        <p className="text-center text-gray-400 text-sm">
          Please enter a group code and fill in all required fields to submit
          the registration.
        </p>
      )}
    </form>
  );
};

export default GroupRegistrationForm;
