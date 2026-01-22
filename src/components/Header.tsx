"use client";
import React, { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Use passive listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Registration", href: "/registration" },
    { name: "Speakers", href: "/speakers" },
    { name: "Schedule", href: "/schedule" },
    { name: "Committee", href: "/committee" },
    { name: "Abstract", href: "/abstractForm" },
    { name: "Contact", href: "/contact" },
  ];

  const handleNavClick = (itemName: string) => {
    setActiveItem(itemName);
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
        ? "bg-white/95 backdrop-blur-sm py-2 shadow-lg border-b border-gray-100"
        : "bg-white/90 py-4 shadow-sm"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src="/assets/logo-new.jpg" alt="Innovate Pharma 2026" className="h-12 w-auto object-contain" />
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight text-primary">INNOVATE PHARMA</span>
              <span className="text-xs font-medium text-gray-500">2026</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                href={item.href}
                key={item.name}
                onClick={() => handleNavClick(item.name)}
                className={`relative px-3 py-2 text-sm font-bold transition-all duration-300 ${activeItem === item.name
                  ? "text-primary"
                  : "text-gray-600 hover:text-primary"
                  }`}
              >
                {item.name}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] transform transition-transform duration-300 ${activeItem === item.name ? "scale-x-100" : "scale-x-0"
                    }`}
                />
              </Link>
            ))}
            <button
              disabled
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-400 font-semibold text-sm cursor-not-allowed opacity-70"
            >
              Registrations Closed
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-colors z-50 relative"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-gray-800" />
            ) : (
              <Menu className="h-6 w-6 text-gray-800" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`absolute right-0 top-0 h-full w-64 bg-white border-l border-gray-100 transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
            } overflow-y-auto shadow-2xl`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-center mb-8 text-primary font-bold text-xl">
              International Conference
            </div>
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  href={item.href}
                  key={item.name}
                  onClick={() => handleNavClick(item.name)}
                  className={`flex items-center justify-between p-3 rounded-lg transition-colors font-bold text-base ${activeItem === item.name
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                    }`}
                >
                  <span>{item.name}</span>
                  <ChevronRight
                    className={`h-4 w-4 transition-transform ${activeItem === item.name
                      ? "text-[#00FFCC] translate-x-1"
                      : ""
                      }`}
                  />
                </Link>
              ))}
              <button
                disabled
                className="w-full mt-4 px-4 py-3 rounded-lg bg-gray-200 text-gray-400 font-semibold text-sm cursor-not-allowed opacity-70"
              >
                Registrations Closed
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
