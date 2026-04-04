"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  Calendar,
  FileText,
  ListChecks,
  Medal,
  Send,
} from "lucide-react";
import Link from "next/link";

const CallForAbstracts = () => {
  const abstractChecklist = [
    "Title, author details and affiliation",
    "Introduction, aim/objectives, methods and results",
    "Summary and conclusion",
    "Maximum 250 words",
    "Times New Roman, font size 12",
    "Online submission only through conference portal",
  ];

  const milestones = [
    "02 Nov 2026 - Last date for abstract submission",
    "14 Nov 2026 - Intimation of acceptance",
    "12 Dec 2026 - Last date for oral/PPT submission",
    "Accepted abstracts will be published in the Abstract Book (ISBN)",
    "Top selected papers may be considered for full article publication",
  ];

  return (
    <section className="relative py-16">
      <div className="page-shell py-0">
        <div className="mb-10 text-center">
          <p className="eyebrow">Call For Scientific Presentation</p>
          <h2 className="section-heading mt-4">Submit Your Abstract</h2>
          <p className="section-subheading mx-auto">
            Authors are invited to submit original work for oral or poster
            presentation across conference tracks. The presenting author must
            be a registered delegate.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="modern-card p-0">
            <CardContent className="p-6 sm:p-8">
              <div className="mb-5 flex items-center gap-3">
                <ListChecks className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold text-foreground">Abstract Checklist</h3>
              </div>
              <ul className="space-y-3">
                {abstractChecklist.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-border/70 bg-white p-3 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-xl bg-secondary/50 p-4 text-sm text-muted-foreground">
                Model abstract is available on the website. Abstract and paper
                title should be submitted before 02 Nov 2026.
              </div>
            </CardContent>
          </Card>

          <Card className="modern-card p-0">
            <CardContent className="space-y-4 p-6 sm:p-8">
              <div className="mb-1 flex items-center gap-3">
                <Calendar className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold text-foreground">Important Dates and Outcomes</h3>
              </div>
              {milestones.map((milestone) => (
                <div
                  key={milestone}
                  className="rounded-xl border border-border/70 bg-white p-4 text-sm text-muted-foreground"
                >
                  <p>{milestone}</p>
                </div>
              ))}

              <div className="rounded-xl bg-primary/5 p-4 text-sm text-muted-foreground">
                All queries related to abstract submission can be emailed to
                <span className="ml-1 font-semibold text-foreground">chipsabap2026@gmail.com</span>
                .
              </div>

              <div className="rounded-xl bg-secondary/50 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Medal className="h-4 w-4 text-primary" />
                  Best Presentation Recognition
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Papers adjudged as best in oral and poster sessions by an
                  independent jury will receive awards during valedictory.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="modern-card mt-6 p-0">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-bold text-foreground">Ready to Submit?</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Complete your delegate registration and submit your abstract
                  through the online portal before deadlines.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/abstractForm" className="btn-primary">
                  <Send className="mr-2 h-4 w-4" />
                  Abstract Portal
                </Link>
                <Link href="/registration" className="btn-outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Register Delegate
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CallForAbstracts;
