
import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Blogs from "@/components/sections/Blogs";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import { motion, useScroll } from "framer-motion";

const Index = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden bg-[length:400%_400%] animate-background-shine relative">
      {/* Rich gradient background with animated overlay */}
      <div className="fixed inset-0 bg-complex-gradient bg-[length:400%_400%] animate-background-shine -z-10" />
      
      {/* Animated orbs in background */}
      <div className="fixed inset-0 -z-5 overflow-hidden">
        <div className="absolute top-1/4 right-1/3 w-64 h-64 rounded-full bg-highlight/20 blur-3xl animate-glow" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-highlight-secondary/20 blur-3xl animate-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-2/3 right-1/4 w-72 h-72 rounded-full bg-highlight-tertiary/15 blur-3xl animate-glow" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Progress bar with enhanced color */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-vibrant-gradient z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Education />
        <Blogs />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
