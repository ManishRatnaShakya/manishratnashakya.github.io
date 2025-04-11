
import React from "react";
import { motion } from "framer-motion";
import { ArrowDownCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center section-padding overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-dark-100/50 via-dark/80 to-dark-200/50" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-highlight/20 rounded-full filter blur-3xl opacity-20" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-highlight-secondary/20 rounded-full filter blur-3xl opacity-10" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hi, I'm <span className="text-gradient">John Doe</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Creative Director & Full Stack Developer<br />
            Crafting digital experiences that blend art and technology
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-highlight hover:bg-highlight/90 text-white rounded-full px-8"
            >
              View Projects
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-highlight text-highlight hover:bg-highlight/10 rounded-full px-8"
            >
              Contact Me
            </Button>
          </motion.div>
        </div>
      </div>
      
      <a 
        href="#about" 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowDownCircle className="animate-bounce" />
      </a>
    </section>
  );
};

export default Hero;
