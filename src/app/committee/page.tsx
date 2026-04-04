"use client";
import React from "react";
import { Crown, Users } from "lucide-react";

type Group = {
  title: string;
  members: string[];
};

const leadership = [
  { role: "Chief Patron", name: "Dr. R. Srinivas" },
  { role: "Patron", name: "Dr. C. N. Srinivas" },
  { role: "Patron", name: "Mr. R. Gopala Krishna" },
  {
    role: "Chairman",
    name: "Prof. K. R. S. Sambasiva Rao, Vice Chancellor, Mangalayatan University",
  },
  { role: "Organizing Secretary", name: "Dr. S. Vidyadhara" },
];

const workingGroups: Group[] = [
  {
    title: "Conveners",
    members: [
      "Dr. T. V. Narayana",
      "Dr. P. Sudhakar",
      "Dr. A. Krishna Sathya",
    ],
  },
  {
    title: "Co-Conveners",
    members: [
      "Dr. J. Ramesh Babu",
      "Dr. A. Ramu",
      "Dr. V. Venkata Rao",
      "Dr. P. Malleswara Rao",
      "Dr. A. Chakravathy",
    ],
  },
  {
    title: "Core Organizing Team",
    members: [
      "Dr. R. L. C. Sasidhar",
      "Dr. P. Saidulu",
      "Dr. J. Subba Rao",
      "Dr. Sk. Khadar Yazdan",
      "Dr. P. Vijetha",
      "Dr. S. Ravi Chandra",
      "Dr. V. Ravi",
      "Dr. D. Sandeep",
      "Dr. K. Viswanadh",
      "Dr. S. Meraj Sulthana",
      "Dr. S. Kotaiah",
      "Mrs. B. Sowjanya Lakshmi",
      "Dr. Ch. Aruna Kumar",
      "Mrs. V. Jhansi Rani",
      "Dr. S. Siva Prasad",
      "Mrs. Sk. Rihana",
      "Dr. M. Raghava Kalyan",
      "Mrs. K. Haritha Pavani",
      "Ms. R. Sai Reshma",
      "Mr. P. Prachet",
      "Mr. V. Edukondalu",
    ],
  },
];

const CommitteePage = () => {
  return (
    <main className="relative min-h-screen py-14 sm:py-16">
      <div className="mesh-overlay" />
      <div className="page-shell py-0">
        <div className="mb-10 text-center">
          <p className="eyebrow">Conference Leadership</p>
          <h1 className="section-heading mt-4">Organizing Committee</h1>
          <p className="section-subheading mx-auto">
            The conference is coordinated by experienced academicians and
            organizers from CHIPS with national and international advisory
            support.
          </p>
        </div>

        <section className="modern-card mb-6 p-7 sm:p-8">
          <div className="mb-5 flex items-center gap-2">
            <Crown className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Leadership Team</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((person) => (
              <div
                key={`${person.role}-${person.name}`}
                className="rounded-xl border border-border/80 bg-white p-4"
              >
                <p className="text-xs uppercase tracking-wide text-primary">{person.role}</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{person.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6">
          {workingGroups.map((group) => (
            <article key={group.title} className="modern-card p-7 sm:p-8">
              <div className="mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">{group.title}</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.members.map((member) => (
                  <div
                    key={member}
                    className="rounded-xl border border-border/80 bg-white p-4 text-sm text-foreground"
                  >
                    {member}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
};

export default CommitteePage;
