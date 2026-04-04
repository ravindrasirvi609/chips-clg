"use client";

import { CheckCircle2, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      const data = await res.json();
      setIsSubmitted(data.registrationId ?? "Submitted");
      setFormData({ name: "", email: "", mobile: "", message: "" });
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Unable to submit message"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen py-14 sm:py-16">
      <div className="mesh-overlay" />
      <div className="page-shell py-0">
        <div className="mb-10 text-center">
          <p className="eyebrow">Contact and Support</p>
          <h1 className="section-heading mt-4">Get In Touch</h1>
          <p className="section-subheading mx-auto">
            For registration, abstract submission, accommodation, scientific or
            technical queries, reach the organizing team using the form below.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="modern-card p-7 sm:p-8">
            <h2 className="text-2xl font-bold text-foreground">Send Message</h2>

            {isSubmitted ? (
              <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-5">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
                <h3 className="mt-2 text-lg font-bold text-green-800">Message submitted successfully</h3>
                <p className="mt-1 text-sm text-green-700">
                  Reference ID: <span className="font-semibold">{isSubmitted}</span>
                </p>
                <button
                  onClick={() => setIsSubmitted(null)}
                  className="btn-outline mt-4"
                >
                  Submit Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                    required
                  />
                </div>

                <input
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                  required
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Write your query"
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                  required
                />

                {submitError && (
                  <p className="text-sm font-medium text-destructive">{submitError}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full"
                >
                  {isSubmitting ? "Submitting..." : "Send Message"}
                  {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
                </button>
              </form>
            )}
          </section>

          <section className="space-y-6">
            <div className="modern-card p-7 sm:p-8">
              <h2 className="text-2xl font-bold text-foreground">Contact Information</h2>
              <div className="mt-5 space-y-4 text-sm text-muted-foreground">
                <p className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-4 w-4 text-primary" />
                  chipsabap2026@gmail.com
                </p>
                <p className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                  Chebrolu Hanumaiah Institute of Pharmaceutical Sciences,
                  Chowdavaram, Guntur, Andhra Pradesh 522019
                </p>
                <p className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 text-primary" />
                  Co-Convener: +91 9866204171
                </p>
                <p className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 text-primary" />
                  Registrations: +91 9848553804
                </p>
                <p className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 text-primary" />
                  Scientific: +91 7204767329 | Technical: +91 9885452068
                </p>
              </div>
            </div>

            <div className="modern-card p-0 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4349823.3978435155!2d78.20565083117262!3d14.775039944979435!2m3!1f0!2f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a76e3229a1b83%3A0xb859ed4d0357991e!2sChebrolu%20Hanumaiah%20Institute%20Of%20Pharmaceutical%20Sciences%20(Autonomous)!5e1!3m2!1sen!2sin!4v1764999698040!5m2!1sen!2sin"
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
