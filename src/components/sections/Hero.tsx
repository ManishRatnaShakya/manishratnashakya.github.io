
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Add scroll animations
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const y3 = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  const roles = [
    "Full stack Developer",
    "Data Analytics Enthusiast",
    "AI/ML Explorer",
  ];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const currentRole = roles[roleIndex];
    
    if (!isDeleting) {
      // Typing
      if (displayText !== currentRole) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.substring(0, displayText.length + 1));
        }, 100);
      } else {
        // Pause at the end of typing before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1500);
      }
    } else {
      // Deleting
      if (displayText !== "") {
        timeout = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        }, 50);
      } else {
        // Move to the next role
        setIsDeleting(false);
        setRoleIndex((prevIndex) => 
          prevIndex === roles.length - 1 ? 0 : prevIndex + 1
        );
      }
    }
    
    return () => clearTimeout(timeout);
  }, [displayText, roleIndex, isDeleting]);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center section-padding overflow-hidden"
    >
      {/* Animated background elements with parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-dark-100/50 via-dark/80 to-dark-200/50" />
        
        {/* Animated floating orbs with parallax */}
        <motion.div 
          className="absolute bottom-10 left-20 w-64 h-64 bg-highlight/20 rounded-full filter blur-3xl"
          style={{ y: y1 }}
          animate={{
            opacity: [0.2, 0.3, 0.2],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-highlight-secondary/20 rounded-full filter blur-3xl"
          style={{ y: y2 }}
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <motion.div 
          className="absolute top-3/4 right-1/3 w-48 h-48 bg-purple-500/10 rounded-full filter blur-3xl"
          style={{ y: y3 }}
          animate={{
            x: [0, 30, 0],
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        <motion.div 
          className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl"
          style={{ y: y2 }}
          animate={{
            x: [0, -20, 0],
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.15, 1]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>

      {/* Content with parallax effect */}
      <motion.div 
        className="container mx-auto relative z-10"
        style={{ opacity }}
      >
        <div className="flex flex-col items-center text-center">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hi, I'm <span className="text-gradient">Manish Shakya</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl h-16 flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="relative">
              <span className="text-gradient">{displayText}</span>
              <span className="animate-pulse inline-block ml-1">|</span>
            </span>
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
            
            <Button
              variant="outline"
              size="lg"
              className="border-highlight-secondary text-highlight-secondary hover:bg-highlight-secondary/10 rounded-full px-8 flex items-center gap-2"
              onClick={() => window.open('/sample-cv.pdf', '_blank')}
            >
              <Download size={18} /> Download CV
            </Button>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Scroll down indicator */}
      <motion.a 
        href="#about" 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-white transition-colors"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ opacity }}
      >
        <ArrowDownCircle />
      </motion.a>
    </section>
  );
};

export default Hero;
