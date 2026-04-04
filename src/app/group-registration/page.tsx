"use client";
import GroupRegistrationForm from "@/components/GroupRegistrationForm";
import React from "react";

const GroupRegistration = () => {
  return (
    <main className="relative min-h-screen py-14 sm:py-16">
      <div className="mesh-overlay" />
      <div className="page-shell py-0">
        <div className="mb-10 text-center">
          <p className="eyebrow">Bulk Participation</p>
          <h1 className="section-heading mt-4">Group Registration</h1>
          <p className="section-subheading mx-auto">
            Group entries are reviewed by the organizing team before final
            confirmation. For every fifteen bulk registrations, one additional
            registration is complimentary (15+1).
          </p>
        </div>

        <section className="modern-card mb-6 p-7 sm:p-8">
          <h2 className="text-2xl font-bold text-foreground">Instructions</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Use a unique group code for all members of the same institution/team.</li>
            <li>Group requests are subject to admin review and confirmation.</li>
            <li>Payment details are shared after approval.</li>
            <li>
              For support, write to <span className="font-semibold text-foreground">chipsabap2026@gmail.com</span>.
            </li>
          </ul>
        </section>

        <GroupRegistrationForm />
      </div>
    </main>
  );
};

export default GroupRegistration;
