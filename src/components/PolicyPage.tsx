import React from "react";

export interface PolicySection {
  title: string;
  content: React.ReactNode;
}

interface PolicyPageProps {
  title: string;
  intro: string;
  sections: PolicySection[];
}

const PolicyPage: React.FC<PolicyPageProps> = ({ title, intro, sections }) => (
  <div className="relative min-h-screen py-14 sm:py-16">
    <div className="mesh-overlay" />
    <article className="page-shell relative py-0" aria-labelledby="policy-title">
      <header className="mb-10 text-center">
        <p className="eyebrow">ABAP 2026 Conference Policies</p>
        <h1 id="policy-title" className="section-heading mt-4">{title}</h1>
        <p className="section-subheading mx-auto">{intro}</p>
        <p className="mt-4 text-xs text-muted-foreground">
          Last updated: 19 November 2026
        </p>
      </header>

      <div className="mx-auto grid max-w-4xl gap-5">
        {sections.map((section, index) => {
          const headingId = `policy-section-${index + 1}`;

          return (
            <section
              key={section.title}
              aria-labelledby={headingId}
              className="modern-card p-6 sm:p-8"
            >
              <h2
                id={headingId}
                className="text-xl font-bold text-foreground"
              >
                {section.title}
              </h2>
              <div className="mt-3 space-y-3 text-sm leading-7 text-muted-foreground">
                {section.content}
              </div>
            </section>
          );
        })}
      </div>

      <p className="mx-auto mt-8 max-w-4xl text-center text-sm text-muted-foreground">
        Questions about these policies? Email{" "}
        <a
          href="mailto:chipsabap2026@gmail.com"
          className="font-semibold text-primary underline underline-offset-2"
        >
          chipsabap2026@gmail.com
        </a>
        .
      </p>
    </article>
  </div>
);

export default PolicyPage;
