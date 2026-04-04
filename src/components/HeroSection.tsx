"use client";
import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  FileText,
  MapPin,
  Sparkles,
  Trophy,
} from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const countdownDate = new Date("2026-12-21T09:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative overflow-hidden pb-14 pt-10 sm:pb-20 sm:pt-14">
      <div className="mesh-overlay" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-[10%] top-0 h-[36vw] w-[36vw] rounded-full bg-primary/10 blur-[120px]" />
        <div
          className="absolute bottom-0 left-[8%] h-[34vw] w-[34vw] rounded-full bg-accent/15 blur-[120px]"
          style={{ animationDelay: "-4s" }}
        />
      </div>

      <div className="page-shell pb-2 pt-4 sm:pt-8">
        <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="modern-card space-y-6 p-7 sm:p-10">
            <p className="eyebrow">International Conference and 20th ABAP Convention</p>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Global Perspectives of <span className="text-gradient">Artificial Intelligence</span>
              <br />
              and Quantum Technologies
            </h1>
            <p className="max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
              Advancing Healthcare, Pharmaceutical, Biotechnological and
              Agricultural Innovations through interdisciplinary research,
              invited talks, oral and poster sessions.
            </p>

            <div className="grid gap-3 text-sm sm:grid-cols-2">
              <div className="flex items-start gap-2 rounded-xl bg-secondary/60 p-3">
                <CalendarDays className="mt-0.5 h-4 w-4 text-primary" />
                <span>21-23 December 2026</span>
              </div>
              <div className="flex items-start gap-2 rounded-xl bg-secondary/60 p-3">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                <span>CHIPS, Guntur, Andhra Pradesh</span>
              </div>
              <div className="flex items-start gap-2 rounded-xl bg-secondary/60 p-3">
                <Sparkles className="mt-0.5 h-4 w-4 text-primary" />
                <span>10 Scientific Tracks</span>
              </div>
              <div className="flex items-start gap-2 rounded-xl bg-secondary/60 p-3">
                <Trophy className="mt-0.5 h-4 w-4 text-primary" />
                <span>Best Oral and Poster Awards</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/registration" className="btn-primary">
                Register Now
              </Link>
              <Link href="/abstractForm" className="btn-outline">
                <FileText className="mr-2 h-4 w-4" />
                Submit Abstract
              </Link>
              <Link href="/schedule" className="btn-outline">
                View Schedule
              </Link>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="modern-card p-6 sm:p-8">
              <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-foreground sm:text-2xl">
                <Clock3 className="h-5 w-5 text-primary" />
                Countdown to Conference
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Minutes", value: timeLeft.minutes },
                  { label: "Seconds", value: timeLeft.seconds },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-border/80 bg-white p-4 text-center"
                  >
                    <p className="text-2xl font-extrabold text-primary">
                      {String(item.value).padStart(2, "0")}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="modern-card p-6 sm:p-8">
              <h3 className="mb-4 text-lg font-bold text-foreground">
                Conference Snapshot
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>Theme-driven sessions on AI, ML and quantum applications.</li>
                <li>Oral and E-poster presentations with scientific review.</li>
                <li>Top abstracts published in Abstract Book (ISBN).</li>
                <li>
                  Top selected papers get full article opportunity in Current
                  Trends in Biotechnology and Pharmacy (Scopus indexed).
                </li>
              </ul>
              <Link href="/abstractForm" className="btn-outline mt-5 w-full text-center">
                View Submission Guidelines
              </Link>
            </div>

            <div className="modern-card p-6">
              <h3 className="text-base font-bold text-foreground">
                Best Scientist Awards
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Young Scientist Awards and Junior Scientist Awards will be
                presented for selected oral and poster sessions.
              </p>
              <Link href="/registration" className="btn-primary mt-4 w-full text-center">
                View Award Eligibility
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
