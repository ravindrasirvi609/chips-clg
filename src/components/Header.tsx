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
    { name: "Abstract", href: "/abstractForm" },
    { name: "Contact", href: "/contact" },
  ];

  const handleNavClick = (itemName: string) => {
    setActiveItem(itemName);
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#1a1a2e]/95 backdrop-blur-sm py-2 shadow-lg border-b border-white/10"
          : "bg-[#1a1a2e]/80 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center text-white font-bold text-xl">
              National Conference
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                href={item.href}
                key={item.name}
                onClick={() => handleNavClick(item.name)}
                className={`relative px-3 py-2 text-sm font-bold transition-all duration-300 ${
                  activeItem === item.name
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.name}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] transform transition-transform duration-300 ${
                    activeItem === item.name ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            ))}
            <Link href="/registration">
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] text-black font-semibold text-sm hover:opacity-90 hover:scale-105 transition-all duration-300">
                Register
              </button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-colors z-50 relative"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`absolute right-0 top-0 h-full w-64 bg-[#16213e] border-l border-white/10 transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } overflow-y-auto shadow-2xl`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-center mb-8 text-white font-bold text-xl">
              National Conference
            </div>
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  href={item.href}
                  key={item.name}
                  onClick={() => handleNavClick(item.name)}
                  className={`flex items-center justify-between p-3 rounded-lg transition-colors font-bold text-base ${
                    activeItem === item.name
                      ? "bg-[#00FFCC]/20 text-white border border-[#00FFCC]/30"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span>{item.name}</span>
                  <ChevronRight
                    className={`h-4 w-4 transition-transform ${
                      activeItem === item.name
                        ? "text-[#00FFCC] translate-x-1"
                        : ""
                    }`}
                  />
                </Link>
              ))}
              <Link href="/registration" onClick={() => setIsOpen(false)}>
                <button className="w-full mt-4 px-4 py-3 rounded-lg bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] text-black font-semibold text-sm hover:opacity-90 transition-all duration-300">
                  Register Now
                </button>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
