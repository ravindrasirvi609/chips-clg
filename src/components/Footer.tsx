"use client";
import React from "react";
import {
  CalendarDays,
  Mail,
  Phone,
  MapPin,
  FileText,
  UserRound,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const keyDates = [
    "Early bird registration closes: 02 Nov 2026",
    "Abstract submission deadline: 02 Nov 2026",
    "Acceptance intimation: 14 Nov 2026",
    "Late fee registration closes: 12 Dec 2026",
    "PPT/Oral submission closes: 12 Dec 2026",
  ];

  return (
    <footer className="mt-16 border-t border-border/70 bg-white/90">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <p className="eyebrow">ABAP 2026</p>
          <h3 className="mt-4 text-2xl font-extrabold leading-tight text-foreground">
            Global Perspectives of Artificial Intelligence and Quantum
            Technologies in Healthcare, Pharmaceutical, Biotechnological and
            Agricultural Innovations
          </h3>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Organized at Chebrolu Hanumaiah Institute of Pharmaceutical Sciences
            (CHIPS), Guntur, Andhra Pradesh under the 20th Annual Convention of
            the Association of Biotechnology and Pharmacy.
          </p>
          <div className="mt-5 space-y-2 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              CHIPS, Chowdavaram, Guntur, Andhra Pradesh 522019
            </p>
            <p className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" />
              Conference dates: 21-23 December 2026
            </p>
          </div>
        </div>

        <div className="modern-card">
          <h4 className="mb-4 text-base font-bold text-foreground">Quick Links</h4>
          <div className="space-y-2 text-sm">
            <Link href="/about" className="block text-muted-foreground transition hover:text-primary">
              About CHIPS and ABAP
            </Link>
            <Link href="/registration" className="block text-muted-foreground transition hover:text-primary">
              Registration
            </Link>
            <Link href="/abstractForm" className="block text-muted-foreground transition hover:text-primary">
              Abstract Submission
            </Link>
            <Link href="/schedule" className="block text-muted-foreground transition hover:text-primary">
              Program Schedule
            </Link>
            <Link href="/committee" className="block text-muted-foreground transition hover:text-primary">
              Organizing Committee
            </Link>
          </div>
        </div>

        <div className="modern-card">
          <h4 className="mb-4 text-base font-bold text-foreground">Key Contacts</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 text-primary" />
              chipsabap2026@gmail.com
            </p>
            <p className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 text-primary" />
              Co-Convener: +91 9866204171
            </p>
            <p className="flex items-start gap-2">
              <UserRound className="mt-0.5 h-4 w-4 text-primary" />
              Registrations: +91 9848553804
            </p>
            <p className="flex items-start gap-2">
              <FileText className="mt-0.5 h-4 w-4 text-primary" />
              Technical: +91 9885452068
            </p>
          </div>

          <h5 className="mb-2 mt-5 text-sm font-bold text-foreground">Important Dates</h5>
          <ul className="space-y-1 text-xs text-muted-foreground">
            {keyDates.map((date) => (
              <li key={date}>{date}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border/70 bg-secondary/30">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            Copyright 2026 ABAP Conference at CHIPS. All rights reserved.
          </p>
          <p>Built for conference management, registration and abstract workflows.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
