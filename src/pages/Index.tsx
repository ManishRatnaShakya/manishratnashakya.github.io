
import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
