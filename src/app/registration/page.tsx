"use client";
import RegistrationPlans from "@/components/RegistrationPlans";
import Link from "next/link";
import React from "react";

const Registration = () => {
  return (
    <main className="relative min-h-screen py-14 sm:py-16">
      <div className="mesh-overlay" />
      <div className="page-shell py-0">
        <div className="mb-10 text-center">
          <p className="eyebrow">Delegate Registration</p>
          <h1 className="section-heading mt-4">Registration and Fee Details</h1>
          <p className="section-subheading mx-auto">
            Participants are required to complete registration through the
            online portal. Confirmation will be shared on registered email ID.
          </p>
        </div>

        <section className="modern-card mb-6 p-7 sm:p-8">
          <h2 className="text-2xl font-bold text-foreground">Important Notes</h2>
          <div className="mt-5 grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
            <p className="rounded-xl bg-secondary/50 p-4">
              Early bird registration closes on 02 Nov 2026.
            </p>
            <p className="rounded-xl bg-secondary/50 p-4">
              Last date for registration with late fee: 12 Dec 2026.
            </p>
            <p className="rounded-xl bg-secondary/50 p-4">
              Mode of participation: Offline or Online.
            </p>
            <p className="rounded-xl bg-secondary/50 p-4">
              Mode of payment: Online through conference gateway only.
            </p>
          </div>

          <div className="mt-6 space-y-3 text-sm text-muted-foreground">
            <p>
              No refund will be made after payment. Replacement or transfer of
              registration is not permitted.
            </p>
            <p>
              Accommodation can be arranged on request: Hostel (INR 300/day)
              and Hotel (INR 1000/day), subject to availability.
            </p>
            <p>
              Bulk benefit: For every fifteen registrations, one registration is
              complimentary (15+1). For process support, contact the technical
              coordinator.
            </p>
            <p>
              Conference support email: <span className="font-semibold text-foreground">chipsabap2026@gmail.com</span>
            </p>
          </div>

          <div className="mt-6 rounded-xl border border-border/70 bg-white p-4 text-sm text-muted-foreground">
            Need help with payment or group onboarding? Reach out via
            <Link href="/contact" className="ml-1 font-semibold text-primary">
              Contact Page
            </Link>
            .
          </div>
        </section>

        <RegistrationPlans />
      </div>
    </main>
  );
};

export default Registration;
