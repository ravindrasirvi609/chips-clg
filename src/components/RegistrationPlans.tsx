"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Plan, RegistrationFormData } from "@/lib/interface";
import { useFirebaseStorage } from "@/app/hooks/useFirebaseStorage";
import axios from "axios";
import Link from "next/link";
import RegistrationForm from "./RegistrationForm";
import { plans } from "@/app/data";

const RegistrationPlans: React.FC = () => {
  const { uploadFile } = useFirebaseStorage();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [includeGalaDinner, setIncludeGalaDinner] = useState(false);
  const [isProcessingTransaction, setIsProcessingTransaction] = useState(false);
  const [formData, setFormData] = useState<RegistrationFormData>({
    email: "",
    whatsappNumber: "",
    name: "",
    affiliation: "",
    designation: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    registrationType: "",
    needAccommodation: false,
    dietaryRequirements: "",
    specialAssistance: "",
    Salutations: "Mr.",
    imageUrl: "",
    dob: "",
    AadharNumber: "",
    memberId: "",
    institute: "",
    gender: "Male",
    abstractSubmitted: false,
    abstractId: null,
    includeGalaDinner: false,
  });
  const [countdown, setCountdown] = useState(7);

  useEffect(() => {
    if (isProcessingTransaction && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isProcessingTransaction, countdown]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]:
          type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      }));
    },
    []
  );

  const handleBatchUpdate = useCallback(
    (updates: Partial<RegistrationFormData>) => {
      setFormData((prevState) => ({
        ...prevState,
        ...updates,
      }));
    },
    []
  );

  const handleGalaDinnerChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIncludeGalaDinner(e.target.checked);
      setFormData((prevState) => ({
        ...prevState,
        includeGalaDinner: e.target.checked,
      }));
    },
    []
  );

  const handleImageUpload = useCallback(
    async (file: File) => {
      try {
        const imageUrl = await uploadFile(file);
        setFormData((prevState) => ({
          ...prevState,
          imageUrl: imageUrl,
        }));
      } catch (error) {
        console.error("Failed to upload image:", error);
        alert("Failed to upload image. Please try again.");
      }
    },
    [uploadFile]
  );

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.imageUrl) {
      errors.imageUrl = "Image is required";
    }

    if (!formData.dob) {
      errors.dob = "Date of birth is required";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.whatsappNumber) {
      errors.whatsappNumber = "WhatsApp number is required";
    } else if (!/^\d{10}$/.test(formData.whatsappNumber)) {
      errors.whatsappNumber = "WhatsApp number must be 10 digits";
    }

    if (!formData.name) {
      errors.name = "Name is required";
    }

    if (!formData.affiliation) {
      errors.affiliation = "Affiliation is required";
    }

    if (!formData.designation) {
      errors.designation = "Designation is required";
    }

    if (!formData.address) {
      errors.address = "Address is required";
    }

    if (!formData.city) {
      errors.city = "City is required";
    }

    if (!formData.state) {
      errors.state = "State is required";
    }

    if (!formData.pincode) {
      errors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      errors.pincode = "Pincode must be 6 digits";
    }

    if (selectedPlan?.name === "OPF Members" && !formData.memberId) {
      errors.memberId = "Member ID is required for OPF Members";
    }

    // Add more validations as needed

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) {
      alert("Please select a plan before submitting.");
      return;
    }

    const registrationType = selectedPlan.name;

    const newFormData = { ...formData, registrationType };

    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const registrationResponse = await fetch("/api/save-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFormData),
      });

      if (registrationResponse.ok) {
        const registration = await registrationResponse.json();
        await makePayment(selectedPlan, registration.registration);
      } else {
        throw new Error("Failed to save registration");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setSubmitError(
        "Failed to submit registration. Please check the form and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  let totalAmount = 0;
  const makePayment = async (
    plan: Plan,
    registration: RegistrationFormData
  ) => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      totalAmount = includeGalaDinner ? plan.earlyBird + 1000 : plan.earlyBird;

      // Create Razorpay order
      const orderResponse = await fetch("/api/razorpay-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: totalAmount }),
      });

      if (!orderResponse.ok) {
        throw new Error("Failed to create Razorpay order");
      }

      const orderData = await orderResponse.json();

      const options = {
        name: "Operant Pharmacy Federation",
        currency: orderData.currency,
        amount: orderData.amount,
        order_id: orderData.id,
        description: `Payment for ${plan.name}`,
        handler: async function (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) {
          try {
            setIsProcessingTransaction(true);

            const transactionResponse = await axios.post(
              "/api/save-transaction",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                amount: orderData.amount / 100,
                currency: orderData.currency,
                planName: plan.name,
                customerName: registration.name,
                customerEmail: registration.email,
                customerPhone: registration.whatsappNumber,
              }
            );

            window.location.href = `/abstractForm/${transactionResponse.data.registration._id}`;
          } catch (error) {
            console.error("Failed to save transaction:", error);
          } finally {
            setIsProcessingTransaction(false);
            closeModal();
          }
        },
        prefill: {
          name: registration.name,
          email: registration.email,
          contact: registration.whatsappNumber,
        },
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Failed to initiate payment. Please try again.");
    }
  };

  const openModal = (plan: Plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const PriceDisplay = ({
    label,
    price,
    className,
    planName,
  }: {
    label: string;
    price: number;
    className?: string;
    planName?: string;
  }) => {
    const isInternational = planName === "International Delegates";
    const currency = isInternational ? "$" : "₹";
    const displayPrice = isInternational ? price / 83 : price; // Convert back to USD for display

    return (
      <div className="flex justify-between items-center mb-2">
        <span className="text-white font-medium">{label}:</span>
        <span className={`text-lg font-bold ${className || "text-white"}`}>
          {currency}
          {displayPrice}
        </span>
      </div>
    );
  };

  const RegistrationCard = ({ plan }: { plan: Plan }) => (
    <div className="bg-card border border-border/50 rounded-3xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,204,255,0.2)]">
      <div className="bg-card border-b border-border/10 py-4 px-6">
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00FFCC] to-[#00CCFF]">
          {plan.name}
        </h3>
      </div>
      <div className="p-6">
        <p className="text-gray-300 mb-6">{plan.description}</p>
        {/* Early Bird pricing now active */}
        <PriceDisplay label="Early Bird" price={plan.earlyBird} planName={plan.name} />
        <PriceDisplay
          label="Late Fee"
          price={plan.regular}
          className="text-gray-400 line-through"
          planName={plan.name}
        />
        <PriceDisplay
          label="Spot"
          price={plan.spot}
          className="text-gray-400 line-through"
          planName={plan.name}
        />
        <div className="mt-6">
          <button
            onClick={() => openModal(plan)}
            className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] text-[#070B39] font-bold hover:shadow-[0_0_20px_rgba(0,204,255,0.5)] transition-all duration-300"
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative overflow-hidden bg-[#070B39] py-16 px-4 md:px-8">
      {/* Animated Background Elements */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#00FFCC]/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 -right-40 w-80 h-80 bg-[#00CCFF]/20 rounded-full blur-[100px] animate-blob"></div>
      <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-[#9900FF]/10 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>

      <div className="container mx-auto relative z-10 max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFCC] to-[#00CCFF]">
            Registration Plans
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <RegistrationCard key={index} plan={plan} />
          ))}


        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 py-8">
          <Link href="/group-registration">
            <button className="py-4 px-8 rounded-full bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] text-[#070B39] text-xl font-bold hover:shadow-[0_0_20px_rgba(0,255,204,0.5)] transition-all duration-300">
              Group Registration Form
            </button>
          </Link>
          <Link href="/contact">
            <button className="py-4 px-8 rounded-full bg-gradient-to-r from-[#FF3366] to-[#FF9966] text-[#070B39] text-xl font-bold hover:shadow-[0_0_20px_rgba(255,51,102,0.5)] transition-all duration-300">
              Contact Us for Help
            </button>
          </Link>
        </div>
      </div>

      {/* Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border/50 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto text-white">
            {isProcessingTransaction ? (
              <div className="flex flex-col items-center justify-center p-8">
                <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-[#00CCFF] mb-6"></div>
                <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] mb-4">
                  Processing your transaction...
                </p>
                <p className="text-gray-300 text-center">
                  Thank you for your patience! Please wait for{" "}
                  <span className="font-bold text-[#00CCFF]">{countdown}</span>{" "}
                  seconds...
                </p>
              </div>
            ) : (
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFCC] to-[#00CCFF]">
                  Register for {selectedPlan?.name}
                </h2>
                <RegistrationForm
                  formData={formData}
                  onInputChange={handleInputChange}
                  onImageUpload={handleImageUpload}
                  errors={formErrors}
                  includeGalaDinner={includeGalaDinner}
                  handleGalaDinnerChange={handleGalaDinnerChange}
                  selectedPlanName={selectedPlan?.name}
                  onBatchUpdate={handleBatchUpdate}
                />
                {submitError && (
                  <div className="mb-4 p-3 bg-red-900/50 border border-red-500 text-red-200 rounded-xl">
                    {submitError}
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`flex-1 py-3 px-6 rounded-full font-bold transition-all duration-300 ${isSubmitting
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] text-[#070B39] hover:shadow-[0_0_20px_rgba(0,204,255,0.5)]"
                      }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin h-5 w-5 mr-3 text-[#070B39]"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Submitting...
                      </div>
                    ) : (
                      `Register and Pay (${selectedPlan?.name === "International Delegates"
                        ? "$"
                        : "₹"
                      }${includeGalaDinner
                        ? selectedPlan?.name === "International Delegates"
                          ? (selectedPlan?.earlyBird || 0) / 83 + 12
                          : (selectedPlan?.earlyBird || 0) + 1000
                        : selectedPlan?.name === "International Delegates"
                          ? (selectedPlan?.earlyBird || 0) / 83
                          : selectedPlan?.earlyBird
                      })`
                    )}
                  </button>
                  <button
                    onClick={closeModal}
                    className="flex-1 py-3 px-6 rounded-full border border-white/20 text-white font-bold hover:bg-white/10 transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationPlans;
