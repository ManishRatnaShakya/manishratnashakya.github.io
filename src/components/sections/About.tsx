
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code, Palette, Globe, Lightbulb } from "lucide-react";

const About = () => {
  // Add scroll animations only to the background, not the summary or profile image
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [300, 900], [100, -100]);
  const y2 = useTransform(scrollY, [300, 900], [50, -50]);
  // No opacity transforms for the profile image or summary

  const skills = [
    { name: "Development", icon: <Code size={24} />, description: "Angular, React, Node.js, TypeScript, Python" },
    { name: "Design", icon: <Palette size={24} />, description: "Figma" },
    { name: "Data", icon: <Globe size={24} />, description: "Machine learning, Data Analytics" },
    { name: "Creative Direction", icon: <Lightbulb size={24} />, description: "Communication Skills, Customer Relationship" },
  ];

  return (
    <section id="about" className="section-padding bg-dark-200/50 relative overflow-hidden backdrop-blur-sm">
      {/* Enhanced parallax background elements */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-highlight/20 rounded-full filter blur-3xl"
        style={{ y: y1 }}
      />
      <motion.div 
        className="absolute bottom-20 left-10 w-64 h-64 bg-highlight-tertiary/20 rounded-full filter blur-3xl"
        style={{ y: y2 }}
      />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            About <span className="text-gradient">Me</span>
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-vibrant-gradient mx-auto mb-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="glow-effect"
          >
            <div className="glass-card p-1 rounded-lg">
              <div className="aspect-square rounded-lg bg-gradient-to-br from-highlight/30 to-highlight-secondary/30 overflow-hidden">
                <div className="w-full h-full bg-dark-300 flex items-center justify-center text-gray-600">
                  <img src="public/profile.jpeg" alt="No Image" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold">Professional <span className="text-gradient-gold">Summary</span></h3>
            <p className="text-gray-300">
              A passionate and dedicated professional with a strong background in web development, and Analytics.
             
            </p>
            <p className="text-gray-300">
            Graduated from Murdoch University with a degree in Information Technology, Major in AI and data science, I have honed my skills in various technologies
            and frameworks, including Angular, React, Node.js, and Python.
            </p>
            <p className="text-gray-300">
              With a strong background in both Analytics and development, I bring a unique perspective to projects 
              that bridges technical implementation with analytical vision.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {skills.map((skill, index) => (
                <motion.div 
                  key={index} 
                  className="glass-card p-4 rounded-lg flex items-start gap-3 hover:border-highlight/30 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.2)"
                  }}
                >
                  <div className="text-highlight mt-1">{skill.icon}</div>
                  <div>
                    <h4 className="font-semibold">{skill.name}</h4>
                    <p className="text-sm text-gray-400">{skill.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
