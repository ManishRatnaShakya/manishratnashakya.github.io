import React from "react";
import { motion } from "framer-motion";
import { Calendar, GraduationCap, Plus } from "lucide-react";

type EducationItem = {
  id: number;
  degree: string;
  institution: string;
  date: string;
  description: string;
};

const educationData: EducationItem[] = [
  {
    id: 1,
    degree: "Master of Computer Science",
    institution: "Stanford University",
    date: "2013 - 2015",
    description: "Specialized in Human-Computer Interaction and User Experience Design. Thesis on adaptive user interfaces for diverse user needs."
  },
  {
    id: 2,
    degree: "Bachelor of Design",
    institution: "Rhode Island School of Design",
    date: "2009 - 2013",
    description: "Major in Digital Media Design with a minor in Computer Science. Graduated with honors."
  },
  {
    id: 3,
    degree: "UX Design Certification",
    institution: "Nielsen Norman Group",
    date: "2016",
    description: "Comprehensive UX certification covering research methods, interaction design, and usability testing."
  }
];

const TimelineItem = ({ item, index }: { item: EducationItem; index: number }) => {
  return (
    <motion.div
      className="mb-12 last:mb-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="glass-card p-6 rounded-lg relative">
        <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-highlight/20 border-2 border-highlight flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-highlight" />
        </div>
        <div className="flex items-start ml-6">
          <div className="p-2 bg-highlight/20 rounded-full text-highlight mr-4">
            <GraduationCap size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold">{item.degree}</h3>
            <p className="text-highlight mb-1">{item.institution}</p>
            <div className="flex items-center text-gray-400 text-sm mb-3">
              <Calendar size={14} className="mr-1" />
              <span>{item.date}</span>
            </div>
            <p className="text-gray-300">{item.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Education = () => {
  return (
    <section id="education" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            My <span className="text-gradient">Education</span>
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-highlight mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          />
        </div>

        <div className="max-w-2xl mx-auto relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-highlight/30" />
          
          {educationData.map((item, index) => (
            <TimelineItem key={item.id} item={item} index={index} />
          ))}

          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <button className="glass-card hover:bg-dark-300/50 transition-colors px-6 py-3 rounded-full text-highlight">
              <Plus size={18} className="inline mr-2" />
              Add Education
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
