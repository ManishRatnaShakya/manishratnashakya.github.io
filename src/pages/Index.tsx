
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
    <div className="min-h-screen bg-dark text-white overflow-x-hidden bg-complex-gradient bg-[length:400%_400%] animate-background-shine">
      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-highlight z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
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
  );
};

export default Index;
