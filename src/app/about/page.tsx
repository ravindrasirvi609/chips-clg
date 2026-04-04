import Image from "next/image";
import React from "react";

const About = () => {
  const achievements = [
    "Established in 2005 under Nagarjuna Education Society (NES)",
    "NAAC accredited (B++) and autonomous status from 2024-25",
    "Recognized under UGC 2(f) and 12(B)",
    "NIRF ranked in 51-75 band (2017)",
    "300+ research publications and strong doctoral ecosystem",
    "Industry MoUs for training and collaborative research",
  ];

  return (
    <main className="relative min-h-screen py-14 sm:py-16">
      <div className="mesh-overlay" />
      <div className="page-shell py-0">
        <div className="mb-10 text-center">
          <p className="eyebrow">About CHIPS and ABAP</p>
          <h1 className="section-heading mt-4">Institutional Excellence and Scientific Collaboration</h1>
          <p className="section-subheading mx-auto">
            Learn more about Chebrolu Hanumaiah Institute of Pharmaceutical
            Sciences and the Association of Biotechnology and Pharmacy, the
            core organizations behind ABAP 2026.
          </p>
        </div>

        <section className="modern-card mb-6 overflow-hidden p-0">
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="relative min-h-[280px]">
              <Image
                src="/college.jpg"
                alt="Chebrolu Hanumaiah Institute of Pharmaceutical Sciences"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="p-7 sm:p-8">
              <h2 className="text-2xl font-bold text-foreground">About CHIPS</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                CHIPS was established in 2005 by the philanthropic Nagarjuna
                Education Society. The institute offers B.Pharmacy,
                M.Pharmacy, Pharm.D and Ph.D programs with modern laboratories,
                library facilities and dedicated faculty support.
              </p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                The institution has built a strong research and academic culture
                through publications, doctoral research, academic events and
                consistent student outcomes.
              </p>
            </div>
          </div>
        </section>

        <section className="modern-card mb-6 p-7 sm:p-8">
          <h2 className="text-2xl font-bold text-foreground">Institutional Highlights</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {achievements.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-border/80 bg-white p-4 text-sm text-muted-foreground"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="modern-card p-7 sm:p-8">
            <h2 className="text-2xl font-bold text-foreground">About ABAP</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
              The Association of Biotechnology and Pharmacy, established in
              2007, aims to advance science in biotechnology and pharmacy by
              creating collaborative forums, annual meetings, workshops and
              publication opportunities.
            </p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
              ABAP publishes Current Trends in Biotechnology and Pharmacy and
              confers scientific recognitions such as lifetime awards and ABAP
              medals in key domains.
            </p>
          </article>

          <article className="modern-card p-7 sm:p-8">
            <h2 className="text-2xl font-bold text-foreground">Programs at CHIPS</h2>
            <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
              <div className="rounded-xl bg-secondary/50 p-4">
                B.Pharmacy (4 years)
              </div>
              <div className="rounded-xl bg-secondary/50 p-4">
                Pharm.D (6 years)
              </div>
              <div className="rounded-xl bg-secondary/50 p-4">
                M.Pharmacy: Pharmaceutics and Pharmaceutical Analysis
              </div>
              <div className="rounded-xl bg-secondary/50 p-4">
                Ph.D and interdisciplinary research support
              </div>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
};

export default About;
