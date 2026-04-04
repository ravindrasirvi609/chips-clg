"use client";
import React, { useEffect, useState } from "react";
import { CalendarDays, MapPin, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Registration", href: "/registration" },
    { name: "Abstract", href: "/abstractForm" },
    // { name: "Speakers", href: "/speakers" },
    // { name: "Schedule", href: "/schedule" },
    // { name: "Committee", href: "/committee" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-border/80 bg-white/95 shadow-lg backdrop-blur"
          : "bg-white/90 backdrop-blur"
      }`}
    >
      <div className="border-b border-border/60 bg-secondary/40">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs text-muted-foreground sm:px-6 lg:px-8">
          <p className="font-medium">
            20th Annual Convention of ABAP and International Conference
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-primary" />
              21-23 December 2026
            </span>
            <span className="hidden items-center gap-1.5 sm:inline-flex">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              CHIPS, Guntur, Andhra Pradesh
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/assets/logo-new.png"
            alt="ABAP CHIPS Conference"
            className="h-12 w-auto rounded-lg border border-border/80 object-contain"
          />
          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-wide text-primary sm:text-lg">
              ABAP 2026
            </span>
            <span className="max-w-[240px] text-[11px] font-medium leading-tight text-muted-foreground sm:text-xs">
              Global Perspectives of AI and Quantum Technologies
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              href={item.href}
              key={item.name}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                isActive(item.href)
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/80 hover:bg-secondary hover:text-primary"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/registration" className="hidden sm:block">
            <span className="btn-primary">Register Now</span>
          </Link>

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex rounded-lg border border-border p-2 text-foreground transition hover:border-primary/50 hover:text-primary md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-border/70 bg-white md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <Link
                href={item.href}
                key={item.name}
                className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 text-foreground hover:bg-secondary"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link href="/registration" className="btn-primary mt-2 text-center">
              Complete Registration
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
