import React from "react";

type Advisor = {
  name: string;
  title: string;
};

const internationalAdvisors: Advisor[] = [
  {
    name: "Assoc. Prof. Dr. Lee Choy Sin",
    title: "School of Pharmacy, IMU University, Malaysia",
  },
  {
    name: "Prof. Wong Pei Se",
    title: "School of Pharmacy, IMU University, Malaysia",
  },
  {
    name: "Prof. Dr. Mohd. Zulkefeli",
    title: "IMU University, Malaysia",
  },
];

const nationalAdvisors: Advisor[] = [
  { name: "Prof. G. Gangadhara Rao", title: "National Advisory Board" },
  { name: "Prof. R. Siva Rama Prasad", title: "National Advisory Board" },
  { name: "Prof. G. Simhachalam", title: "National Advisory Board" },
  { name: "Prof. Y. Rajendra Prasad", title: "National Advisory Board" },
  { name: "Prof. K. Sobha", title: "National Advisory Board" },
  { name: "Dr. M. V. Ramana", title: "National Advisory Board" },
  { name: "Dr. M. Niranjan Babu", title: "National Advisory Board" },
  { name: "Dr. P. Srinivasa Rao", title: "National Advisory Board" },
  { name: "Dr. Hafeez Basha", title: "National Advisory Board" },
  { name: "Dr. K. Venkata Ramana", title: "National Advisory Board" },
  { name: "Dr. Y. Ankamma Chowdary", title: "National Advisory Board" },
  { name: "Dr. A. Vasudeva Rao", title: "National Advisory Board" },
  { name: "Dr. M. Prasada Rao", title: "National Advisory Board" },
  { name: "Dr. G. Sumalatha", title: "National Advisory Board" },
  { name: "Dr. K. Suresh", title: "National Advisory Board" },
  { name: "Dr. T. E. G. K. Murthy", title: "National Advisory Board" },
  { name: "Dr. Y. Srinivasa Rao", title: "National Advisory Board" },
];

const SpeakersPage = () => {
  return (
    <main className="relative min-h-screen py-14 sm:py-16">
      <div className="mesh-overlay" />
      <div className="page-shell py-0">
        <div className="mb-10 text-center">
          <p className="eyebrow">Advisory and Invited Experts</p>
          <h1 className="section-heading mt-4">Distinguished Academic Voices</h1>
          <p className="section-subheading mx-auto">
            ABAP 2026 features advisory experts and invited academicians from
            international and national institutions in pharmacy and
            biotechnology.
          </p>
        </div>

        <section className="modern-card mb-6 p-7 sm:p-8">
          <h2 className="text-2xl font-bold text-foreground">International Advisory Members</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {internationalAdvisors.map((advisor) => (
              <div
                key={advisor.name}
                className="rounded-xl border border-border/80 bg-white p-4"
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                  International
                </p>
                <h3 className="mt-1 text-base font-bold text-foreground">{advisor.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{advisor.title}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="modern-card p-7 sm:p-8">
          <h2 className="text-2xl font-bold text-foreground">National Advisory Board</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {nationalAdvisors.map((advisor) => (
              <div
                key={advisor.name}
                className="rounded-xl border border-border/80 bg-white p-4"
              >
                <h3 className="text-base font-bold text-foreground">{advisor.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{advisor.title}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Additional invited sessions, plenary topics and final speaking order
            will be released in the detailed conference schedule.
          </p>
        </section>
      </div>
    </main>
  );
};

export default SpeakersPage;
