
import React from "react";
import { Github, Linkedin, Twitter, Instagram, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-dark py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-gradient mb-2">John Doe</h2>
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>

          <div className="flex space-x-4 items-center">
            <a
              href="#"
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-highlight transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-highlight transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-highlight transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-highlight transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>

            <button
              onClick={scrollToTop}
              className="w-10 h-10 ml-4 rounded-full bg-highlight/20 flex items-center justify-center text-highlight hover:bg-highlight/30 transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
