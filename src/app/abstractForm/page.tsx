import React from "react";
import { AbstractForm } from "@/components/abstract-form";

const AbstractFormPage: React.FC = () => {
  return (
    <main className="relative min-h-screen py-14 sm:py-16">
      <div className="mesh-overlay" />
      <div className="page-shell py-0">
        <div className="mb-10 text-center">
          <p className="eyebrow">Call For Scientific Presentation</p>
          <h1 className="section-heading mt-4">Abstract Submission Portal</h1>
          <p className="section-subheading mx-auto">
            Submit your original findings for oral or E-poster presentation.
            Last date for abstract submission: 02 Nov 2026.
          </p>
        </div>

        <section className="modern-card mb-6 p-7 sm:p-8">
          <h2 className="text-2xl font-bold text-foreground">Submission Guidelines</h2>
          <div className="mt-5 grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Abstract Format</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                <li>Include title, author names, affiliations and contact details.</li>
                <li>Use introduction, aim/objectives, methods, results and conclusion structure.</li>
                <li>Word limit: 250 words.</li>
                <li>Use Times New Roman, font size 12.</li>
                <li>Submit in online mode only.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground">Review and Publication</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                <li>Acceptance intimation: 14 Nov 2026.</li>
                <li>Last date for oral/PPT submission: 12 Dec 2026.</li>
                <li>Accepted abstracts of registered delegates will appear in Abstract Book (ISBN).</li>
                <li>Top selected papers may be invited for full-length publication.</li>
                <li>Presenting author must be a registered delegate.</li>
              </ul>
            </div>
          </div>

          <p className="mt-6 rounded-xl bg-secondary/50 p-4 text-sm text-muted-foreground">
            For all abstract-related communication, contact
            <span className="ml-1 font-semibold text-foreground">chipsabap2026@gmail.com</span>
            .
          </p>
        </section>

        <section className="modern-card p-6 sm:p-8">
          <AbstractForm />
        </section>
      </div>
    </main>
  );
};

export default AbstractFormPage;
