"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Plan, RegistrationFormData } from "@/lib/interface";
import { useCloudflareStorage } from "@/app/hooks/useCloudflareStorage";
import axios from "axios";
import Link from "next/link";
import RegistrationForm from "./RegistrationForm";
import { plans } from "@/app/data";

const RegistrationPlans: React.FC = () => {
  const { uploadFile } = useCloudflareStorage();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
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
      errors.affiliation = "Organization/Institution Name is required";
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
      const totalAmount = plan.earlyBird;

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
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        name: "ABAP 2026 - CHIPS",
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
            setCountdown(7);
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
        theme: {
          color: "#0f5b8d",
        },
      };

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

  const RegistrationCard = ({ plan }: { plan: Plan }) => (
    <div className="modern-card overflow-hidden p-0">
      <div className="border-b border-border/70 bg-secondary/40 px-6 py-4">
        <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
      </div>
      <div className="p-6">
        <p className="mb-5 text-sm text-muted-foreground">{plan.description}</p>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
            <span className="text-muted-foreground">Early Bird</span>
            <span className="font-bold text-foreground">INR {plan.earlyBird}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-white p-3 border border-border/70">
            <span className="text-muted-foreground">Regular</span>
            <span className="font-semibold text-foreground">INR {plan.regular}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-white p-3 border border-border/70">
            <span className="text-muted-foreground">Spot</span>
            <span className="font-semibold text-foreground">INR {plan.spot}</span>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={() => openModal(plan)}
            className="btn-primary w-full"
          >
            Choose Plan
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative py-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-center text-3xl font-extrabold text-foreground sm:text-4xl">
          Registration Plans
        </h2>

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <RegistrationCard key={index} plan={plan} />
          ))}
        </div>

        <div className="modern-card p-5 text-sm text-muted-foreground">
          <p>
            Registration fee includes access to scientific sessions and
            conference kit. For accommodation or bulk registrations, please
            coordinate via the contact desk.
          </p>
          <Link href="/contact" className="mt-3 inline-block font-semibold text-primary">
            Contact support team
          </Link>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-white text-foreground">
            {isProcessingTransaction ? (
              <div className="flex flex-col items-center justify-center p-10">
                <div className="mb-6 h-20 w-20 animate-spin rounded-full border-b-4 border-t-4 border-primary" />
                <p className="mb-2 text-lg font-bold text-primary">
                  Processing your transaction...
                </p>
                <p className="text-center text-sm text-muted-foreground">
                  Please wait for <span className="font-semibold text-primary">{countdown}</span> seconds.
                </p>
              </div>
            ) : (
              <div className="p-8">
                <h2 className="mb-6 text-2xl font-bold text-primary">
                  Register for {selectedPlan?.name}
                </h2>
                <RegistrationForm
                  formData={formData}
                  onInputChange={handleInputChange}
                  onImageUpload={handleImageUpload}
                  errors={formErrors}
                  onBatchUpdate={handleBatchUpdate}
                />
                {submitError && (
                  <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {submitError}
                  </div>
                )}
                <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`flex-1 rounded-xl px-6 py-3 font-semibold transition ${
                      isSubmitting
                        ? "cursor-not-allowed bg-gray-300 text-gray-600"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin h-5 w-5 mr-3 text-white"
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
                      `Register and Pay (INR ${selectedPlan?.earlyBird})`
                    )}
                  </button>
                  <button
                    onClick={closeModal}
                    className="flex-1 rounded-xl border border-border px-6 py-3 font-semibold text-foreground hover:bg-secondary/40"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default RegistrationPlans;
