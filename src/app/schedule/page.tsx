"use client";
import React, { useState } from "react";
import { CalendarDays, Clock3, MapPin } from "lucide-react";

type DayProgram = {
  key: string;
  label: string;
  title: string;
  date: string;
  sessions: Array<{ time: string; item: string }>;
};

const program: DayProgram[] = [
  {
    key: "day1",
    label: "Day 1",
    title: "Inauguration and Plenary Sessions",
    date: "21 December 2026",
    sessions: [
      { time: "09:00 AM", item: "Delegate registration and reporting" },
      { time: "11:00 AM", item: "Inaugural ceremony" },
      { time: "12:00 PM", item: "Plenary talks and keynote interactions" },
      { time: "02:00 PM", item: "Technical sessions on AI and healthcare" },
    ],
  },
  {
    key: "day2",
    label: "Day 2",
    title: "Scientific Presentations and Parallel Sessions",
    date: "22 December 2026",
    sessions: [
      { time: "10:00 AM", item: "Invited lectures by advisory experts" },
      { time: "11:30 AM", item: "Oral and E-poster parallel sessions" },
      { time: "02:00 PM", item: "Track-wise panel discussions" },
      { time: "04:00 PM", item: "Industry-academia interaction forum" },
    ],
  },
  {
    key: "day3",
    label: "Day 3",
    title: "Awards, Future Directions and Valedictory",
    date: "23 December 2026",
    sessions: [
      { time: "10:00 AM", item: "Focused thematic sessions" },
      { time: "12:00 PM", item: "Best oral and poster evaluations" },
      { time: "02:30 PM", item: "Award ceremony and invited talks" },
      { time: "04:00 PM", item: "Valedictory function" },
    ],
  },
];

const milestones = [
  "02 Nov 2026 - Last date for early bird registrations",
  "02 Nov 2026 - Last date for abstract submission",
  "14 Nov 2026 - Intimation of abstract acceptance",
  "12 Dec 2026 - Last date for registration with late fee",
  "12 Dec 2026 - Last date for oral/PPT submission",
];

const ProgramSchedule = () => {
  const [activeDay, setActiveDay] = useState("day1");
  const day = program.find((entry) => entry.key === activeDay) ?? program[0];

  return (
    <main className="relative min-h-screen py-14 sm:py-16">
      <div className="mesh-overlay" />
      <div className="page-shell py-0">
        <div className="mb-10 text-center">
          <p className="eyebrow">Program Schedule</p>
          <h1 className="section-heading mt-4">Conference At A Glance</h1>
          <p className="section-subheading mx-auto">
            21-23 December 2026 at CHIPS, Guntur. Final detailed session order,
            speaker slots and halls will be circulated to registered delegates.
          </p>
        </div>

        <section className="modern-card mb-6 p-7 sm:p-8">
          <div className="mb-5 flex flex-wrap gap-3">
            {program.map((entry) => (
              <button
                key={entry.key}
                onClick={() => setActiveDay(entry.key)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  activeDay === entry.key
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-white text-foreground hover:border-primary/40"
                }`}
              >
                {entry.label}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-border/80 bg-white p-5 sm:p-6">
            <h2 className="text-2xl font-bold text-foreground">{day.title}</h2>
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4 text-primary" />
              {day.date}
            </div>
            <div className="mt-4 space-y-3">
              {day.sessions.map((session) => (
                <div
                  key={`${day.key}-${session.time}-${session.item}`}
                  className="flex flex-col gap-2 rounded-xl border border-border/70 bg-secondary/40 p-4 sm:flex-row sm:items-center"
                >
                  <div className="inline-flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-primary sm:min-w-[120px] sm:justify-center">
                    <Clock3 className="h-3.5 w-3.5" />
                    {session.time}
                  </div>
                  <p className="text-sm text-foreground">{session.item}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 text-primary" />
              Venue: Chebrolu Hanumaiah Institute of Pharmaceutical Sciences,
              Chowdavaram, Guntur, Andhra Pradesh.
            </div>
          </div>
        </section>

        <section className="modern-card p-7 sm:p-8">
          <h2 className="text-2xl font-bold text-foreground">Important Timeline</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {milestones.map((milestone) => (
              <div
                key={milestone}
                className="rounded-xl border border-border/80 bg-white p-4 text-sm text-muted-foreground"
              >
                {milestone}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProgramSchedule;
