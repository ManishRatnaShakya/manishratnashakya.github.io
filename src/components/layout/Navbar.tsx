
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Home, User, Briefcase, GraduationCap, Phone, BookOpen, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

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
  { name: "Education", href: "#education", icon: <GraduationCap size={18} /> },
  { name: "Blogs", href: "#blogs", icon: <BookOpen size={18} /> },
  { name: "Contact", href: "#contact", icon: <Phone size={18} /> },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAdmin } = useAuth();

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
        <Link to="/" className="text-2xl font-bold text-gradient">Manish Shakya</Link>

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
          
          {isAdmin && (
            <Link
              to="/admin"
              className="text-sm text-highlight hover:text-highlight/80 transition-colors flex items-center gap-1.5"
            >
              <Settings size={18} />
              Admin
            </Link>
          )}
          
          {!user && (
            <Link
              to="/auth"
              className="text-sm text-highlight border border-highlight/50 px-3 py-1 rounded hover:bg-highlight/10 transition-colors flex items-center gap-1.5"
            >
              Sign In
            </Link>
          )}
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
          
          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="text-xl text-highlight hover:text-highlight/80 transition-colors flex items-center gap-2"
            >
              <Settings size={18} />
              Admin
            </Link>
          )}
          
          {!user && (
            <Link
              to="/auth"
              onClick={() => setIsOpen(false)}
              className="text-xl text-highlight border border-highlight/50 px-4 py-2 rounded hover:bg-highlight/10 transition-colors flex items-center gap-2"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
