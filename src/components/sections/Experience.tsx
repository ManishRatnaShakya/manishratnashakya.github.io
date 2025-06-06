
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Briefcase, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type ExperienceItem = {
  id: number;
  title: string;
  company: string;
  date: string;
  description: string;
  skills: string[];
};

const initialExperienceData: ExperienceItem[] = [
  {
    id: 1,
    title: "Senior Front-End Developer",
    company: "Tech Innovations Inc.",
    date: "2021 - Present",
    description: "Led the development of enterprise web applications using React and TypeScript. Implemented CI/CD pipelines and mentored junior developers.",
    skills: ["React", "TypeScript", "Redux", "AWS"],
  },
  {
    id: 2,
    title: "UX/UI Designer",
    company: "Creative Studios",
    date: "2018 - 2021",
    description: "Designed user interfaces for mobile and web applications. Conducted user research and usability testing to improve product experiences.",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
  },
  {
    id: 3,
    title: "Web Developer",
    company: "Digital Agency",
    date: "2015 - 2018",
    description: "Developed responsive websites and e-commerce platforms for clients across various industries.",
    skills: ["JavaScript", "CSS", "HTML", "WordPress"],
  },
];

const TimelineItem = ({ item, index }: { item: ExperienceItem; index: number }) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`flex flex-col md:flex-row ${isEven ? "" : "md:flex-row-reverse"} mb-12 md:mb-0`}>
      <div className="md:w-1/2 relative">
        <motion.div
          className={`glass-card p-6 rounded-lg ${isEven ? "md:mr-8" : "md:ml-8"} relative z-10`}
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start gap-4">
            <div className="p-2 bg-highlight/20 rounded-full text-highlight">
              <Briefcase size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-highlight mb-1">{item.company}</p>
              <div className="flex items-center text-gray-400 text-sm mb-3">
                <Calendar size={14} className="mr-1" />
                <span>{item.date}</span>
              </div>
              <p className="text-gray-300 mb-4">{item.description}</p>
              <div className="flex flex-wrap gap-2">
                {item.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded-full bg-dark-100 text-gray-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="md:w-1/2 hidden md:block" />
    </div>
  );
};

const Experience = () => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>(initialExperienceData);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    company: "",
    date: "",
    description: "",
    skills: "",
  });
  const [formError, setFormError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.company || !form.date || !form.description) {
      setFormError("All fields are required");
      return;
    }
    const newExperience: ExperienceItem = {
      id: Date.now(),
      title: form.title,
      company: form.company,
      date: form.date,
      description: form.description,
      skills: form.skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0),
    };
    setExperiences([newExperience, ...experiences]);
    setForm({
      title: "",
      company: "",
      date: "",
      description: "",
      skills: "",
    });
    setFormError(null);
    setOpen(false);
  };

  return (
    <section id="experience" className="section-padding bg-dark-100">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Work <span className="text-gradient">Experience</span>
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-highlight mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          />
        </div>
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-highlight/50 via-highlight/30 to-highlight/10 transform -translate-x-1/2" />
          {experiences.map((item, index) => (
            <TimelineItem key={item.id} item={item} index={index} />
          ))}
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button className="glass-card hover:bg-dark-300/50 transition-colors px-6 py-3 rounded-full text-highlight flex items-center">
                  <Plus size={18} className="inline mr-2" />
                  Add Experience
                </button>
              </DialogTrigger>
              <DialogContent className="bg-dark-200 border-highlight/20">
                <DialogHeader>
                  <DialogTitle>Add Experience</DialogTitle>
                </DialogHeader>
                <form className="space-y-4 pt-4" onSubmit={handleAddExperience}>
                  <Input
                    name="title"
                    value={form.title}
                    onChange={handleInputChange}
                    placeholder="Job Title"
                  />
                  <Input
                    name="company"
                    value={form.company}
                    onChange={handleInputChange}
                    placeholder="Company"
                  />
                  <Input
                    name="date"
                    value={form.date}
                    onChange={handleInputChange}
                    placeholder="Date (e.g. 2022 - Present)"
                  />
                  <Textarea
                    name="description"
                    value={form.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                    rows={3}
                  />
                  <Input
                    name="skills"
                    value={form.skills}
                    onChange={handleInputChange}
                    placeholder="Skills (comma separated)"
                  />
                  {formError && (
                    <div className="text-sm text-red-500">{formError}</div>
                  )}
                  <DialogFooter>
                    <Button type="submit" className="bg-highlight hover:bg-highlight/90 w-full">
                      Add Experience
                    </Button>
                    <DialogClose asChild>
                      <Button type="button" variant="outline" className="w-full mt-2">
                        Cancel
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
