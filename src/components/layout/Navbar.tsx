
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Home, User, Briefcase, GraduationCap, Phone } from "lucide-react";
import { Link } from "react-router-dom";

type NavItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  { name: "Home", href: "#home", icon: <Home size={18} /> },
  { name: "About", href: "#about", icon: <User size={18} /> },
  { name: "Projects", href: "#projects", icon: <Briefcase size={18} /> },
  { name: "Experience", href: "#experience", icon: <Briefcase size={18} /> },
  { name: "Education", href: "#education", icon: <Graduation size={18} /> },
  { name: "Contact", href: "#contact", icon: <Phone size={18} /> },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-dark/80 backdrop-blur-md py-2 shadow-md"
          : "bg-transparent py-4"
      )}
    >
      <div className="container px-4 mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gradient">Portfolio</Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm text-gray-300 hover:text-highlight transition-colors flex items-center gap-1.5"
            >
              {item.icon}
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-300 hover:text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 bg-dark-400/95 backdrop-blur-lg transform transition-transform duration-300 ease-in-out z-40",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-6 text-center">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-xl text-gray-300 hover:text-highlight transition-colors flex items-center gap-2"
            >
              {item.icon}
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
