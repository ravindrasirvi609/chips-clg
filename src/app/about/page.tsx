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
          <p className="eyebrow">About the Conference</p>
          <h1 className="section-heading mt-4 text-gradient">Global Perspectives & Innovations</h1>
          <p className="section-subheading mx-auto">
            Exploring the transformative potential of Artificial Intelligence and Quantum Technologies
            in Healthcare, Pharmaceuticals, Biotechnology, and Agriculture.
          </p>
        </div>

        <section className="modern-card mb-10 p-7 sm:p-9 border border-primary/10 bg-gradient-to-br from-primary/5 via-white/80 to-secondary/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
          <h2 className="text-2xl font-bold text-foreground mb-4">Conference Overview</h2>
          <div className="space-y-4 text-sm sm:text-base leading-7 sm:leading-8 text-muted-foreground">
            <p>
              The conference on <strong className="text-foreground">“Global Perspectives of Artificial Intelligence and Quantum Technologies in Healthcare, Pharmaceutical, Biotechnological and Agricultural Innovations”</strong> aims to bring together researchers, academicians, industry experts, and policymakers from across the world to explore the transformative potential of emerging technologies.
            </p>
            <p>
              The event will highlight how artificial intelligence and quantum technologies are revolutionizing drug discovery, precision medicine, diagnostics, biotechnology advancements, and smart agricultural practices. Through keynote lectures, technical sessions, and panel discussions, the conference will foster interdisciplinary collaboration, encourage knowledge exchange, and address current challenges and future opportunities.
            </p>
            <p>
              It also seeks to promote innovative research, sustainable solutions, and the integration of cutting-edge technologies to improve global health outcomes, enhance pharmaceutical development, advance biotechnological research, and ensure agricultural sustainability.
            </p>
          </div>
        </section>

        <div className="mb-8 mt-12 text-center">
          <h2 className="text-2xl font-bold text-foreground">Organizing Institutions</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto text-sm sm:text-base">
            Learn more about Chebrolu Hanumaiah Institute of Pharmaceutical Sciences and the Association of Biotechnology and Pharmacy, the core organizations behind the event.
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
