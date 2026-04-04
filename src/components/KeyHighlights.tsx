"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  CalendarDays,
  CircuitBoard,
  FlaskConical,
  Leaf,
  Phone,
  Presentation,
  Shield,
  Trophy,
} from "lucide-react";

const KeyHighlights = () => {
  const tracks = [
    "Pharmaceutical Technology and Pharmaceutics",
    "Pharmaceutical Chemistry and Pharmaceutical Analysis",
    "Pharmacognosy, Phytochemistry and Biotechnology",
    "Pharmacology and Toxicology",
    "Pharmacy Practice and Pharmacy Education",
    "Pharmaceutical Regulatory Affairs",
    "Pharmacovigilance and Pharmacoepidemiology",
    "Agriculture Biotechnology and Sustainable Development",
    "Artificial Intelligence and Machine Learning in Health Sector",
    "Other Relevant Interdisciplinary Fields",
  ];

  const contacts = [
    { label: "Co-Convener", phone: "+91 9866204171" },
    { label: "Registrations", phone: "+91 9848553804" },
    { label: "Scientific Details", phone: "+91 7204767329" },
    { label: "Technical Details", phone: "+91 9885452068" },
    { label: "Hospitality & Accommodation", phone: "+91 9866701789" },
  ];

  return (
    <section className="relative py-16">
      <div className="page-shell py-0">
        <div className="mb-10 text-center">
          <p className="eyebrow">Program Highlights</p>
          <h2 className="section-heading mt-4">Why Attend ABAP 2026</h2>
          <p className="section-subheading mx-auto">
            Focused scientific tracks, publication opportunities and a strong
            platform for collaboration across academia, research and industry.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <Card className="modern-card p-0">
            <CardContent className="p-6 sm:p-8">
              <div className="mb-5 flex items-center gap-3">
                <CircuitBoard className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold text-foreground">Scientific Tracks</h3>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {tracks.map((track, index) => (
                  <div
                    key={track}
                    className="rounded-xl border border-border/80 bg-white p-4 text-sm text-muted-foreground"
                  >
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-primary">
                      Track {index + 1}
                    </p>
                    <p>{track}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="modern-card p-0">
              <CardContent className="space-y-4 p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <Trophy className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">Awards</h3>
                </div>
                <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
                  <li>Young Scientist Awards for oral presentations.</li>
                  <li>Junior Scientist Awards for UG/PG and scholars (poster).</li>
                  <li>ABAP Gold Medal and senior recognition awards.</li>
                  <li>Best Oral and Poster presentations in valedictory session.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="modern-card p-0">
              <CardContent className="space-y-4 p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">Important Milestones</h3>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="rounded-xl bg-secondary/50 p-3">02 Nov 2026: Early Bird and Abstract Deadline</p>
                  <p className="rounded-xl bg-secondary/50 p-3">14 Nov 2026: Abstract Acceptance Intimation</p>
                  <p className="rounded-xl bg-secondary/50 p-3">12 Dec 2026: Late Registration and PPT Deadline</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card className="modern-card p-0">
            <CardContent className="p-6">
              <div className="mb-3 flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-foreground">Research Output</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Accepted abstracts of registered delegates will be published in
                the Abstract Book with ISBN.
              </p>
            </CardContent>
          </Card>

          <Card className="modern-card p-0">
            <CardContent className="p-6">
              <div className="mb-3 flex items-center gap-2">
                <Presentation className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-foreground">Publication Opportunity</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Top selected papers may be invited for full-length publication
                in Current Trends in Biotechnology and Pharmacy.
              </p>
            </CardContent>
          </Card>

          <Card className="modern-card p-0">
            <CardContent className="p-6">
              <div className="mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-foreground">Travel and Stay</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Delegates should plan travel independently. Accommodation is
                available on request in hostels/hotels at additional charges.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="modern-card mt-6 p-0">
          <CardContent className="p-6 sm:p-7">
            <h3 className="text-lg font-bold text-foreground">Key Contacts</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {contacts.map((contact) => (
                <div
                  key={contact.label}
                  className="flex items-center gap-3 rounded-xl border border-border/70 bg-white p-3"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      {contact.label}
                    </p>
                    <p className="text-sm font-semibold text-foreground">{contact.phone}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Email for all conference communication: <span className="font-semibold text-foreground">chipsabap2026@gmail.com</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default KeyHighlights;
