import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpenCheck,
  Building2,
  GraduationCap,
  Microscope,
  Network,
  ShieldCheck,
} from "lucide-react";

const AboutSection = () => {
  return (
    <section className="relative py-14 sm:py-16">
      <div className="page-shell py-0">
        <div className="mb-10 text-center">
          <p className="eyebrow">About The Conference</p>
          <h2 className="section-heading mt-4">
            A Global Platform for AI and Quantum Innovation
          </h2>
          <p className="section-subheading mx-auto">
            The conference brings together researchers, academicians, industry
            experts and policy leaders to discuss transformative technologies
            for healthcare, pharmaceuticals, biotechnology and agriculture.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <article className="modern-card p-7 sm:p-8">
            <h3 className="text-2xl font-bold text-foreground">
              Conference Theme
            </h3>
            <p className="mt-4 rounded-xl border border-primary/15 bg-primary/5 p-4 text-sm font-semibold leading-6 text-primary">
              Global Perspectives of Artificial Intelligence and Quantum
              Technologies in Healthcare, Pharmaceutical, Biotechnological and
              Agricultural Innovations
            </p>

            <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
              Through keynote lectures, technical sessions, and panel discussions, the conference will foster interdisciplinary collaboration, encourage knowledge exchange, and address current challenges and future opportunities. It also seeks to promote innovative research, sustainable solutions, and the integration of cutting-edge technologies to improve global health outcomes, enhance pharmaceutical development, advance biotechnological research, and ensure agricultural sustainability.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border/80 bg-white p-4">
                <p className="text-2xl font-extrabold text-primary">20th</p>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  ABAP Annual Convention
                </p>
              </div>
              <div className="rounded-xl border border-border/80 bg-white p-4">
                <p className="text-2xl font-extrabold text-primary">10</p>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Scientific Tracks
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              <p className="rounded-xl bg-secondary/50 p-3">
                Early Bird Deadline: 02 Nov 2026
              </p>
              <p className="rounded-xl bg-secondary/50 p-3">
                Abstract Submission: 02 Nov 2026
              </p>
              <p className="rounded-xl bg-secondary/50 p-3">
                Acceptance Intimation: 14 Nov 2026
              </p>
              <p className="rounded-xl bg-secondary/50 p-3">
                Conference Dates: 21-23 Dec 2026
              </p>
            </div>
          </article>

          <div className="space-y-6">
            <Card className="modern-card p-0">
              <CardContent className="p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <Building2 className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">
                    About CHIPS
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                  Chebrolu Hanumaiah Institute of Pharmaceutical Sciences was
                  established in 2005 by the philanthropic Nagarjuna Education
                  Society. The institute offers B.Pharmacy, Pharm.D,
                  M.Pharmacy, Ph.D programs and maintains strong academic,
                  research and industry engagement.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                  <div className="rounded-xl bg-secondary/50 p-3">
                    NAAC Accredited and Autonomous
                  </div>
                  <div className="rounded-xl bg-secondary/50 p-3">
                    300+ Research Publications
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="modern-card p-0">
              <CardContent className="space-y-4 p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <Network className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">
                    About ABAP
                  </h3>
                </div>
                <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                  The Association of Biotechnology and Pharmacy, established in
                  2007, promotes scientific exchange through conventions,
                  workshops, and its journal Current Trends in Biotechnology
                  and Pharmacy.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-border/80 bg-white p-4 text-sm">
                    <BookOpenCheck className="mb-2 h-5 w-5 text-primary" />
                    Annual scientific interactions and publication support.
                  </div>
                  <div className="rounded-xl border border-border/80 bg-white p-4 text-sm">
                    <ShieldCheck className="mb-2 h-5 w-5 text-primary" />
                    Recognizes excellence with national awards and medals.
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="modern-card p-0">
              <CardContent className="p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <Microscope className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">
                    Research Culture at CHIPS
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                  CHIPS has supported numerous Ph.D graduates and hosts active
                  research scholars. Selected conference papers will receive an
                  opportunity for full-length publication after review.
                </p>
                <div className="mt-4 rounded-xl bg-secondary/50 p-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 font-semibold text-foreground">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    Academic and Industry Connect
                  </div>
                  <p className="mt-2">
                    MoUs with pharmaceutical industries support training,
                    collaborative research and placement opportunities.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
