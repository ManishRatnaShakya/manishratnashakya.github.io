
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, GitBranch, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
};

const projectData: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A modern e-commerce platform built with React, Node.js, and Stripe integration.",
    image: "",
    tags: ["React", "Node.js", "Stripe", "MongoDB"],
    link: "#",
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "A responsive portfolio website designed for a photographer client.",
    image: "",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    link: "#",
  },
  {
    id: 3,
    title: "Task Management App",
    description: "A productivity app for tracking tasks and managing projects.",
    image: "",
    tags: ["React", "Redux", "Firebase"],
    link: "#",
  },
  {
    id: 4,
    title: "Music Streaming Service",
    description: "A web-based music streaming service with custom audio player.",
    image: "",
    tags: ["React", "Node.js", "MongoDB", "AWS"],
    link: "#",
  },
];

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div
      className="glass-card rounded-xl overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Link to={`/project/${project.id}`} className="block h-full">
        <div className="aspect-video bg-dark-300 relative overflow-hidden">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-600">
              <span>Project Image</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-100/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
            <div>
              <h3 className="text-xl font-semibold">{project.title}</h3>
            </div>
            <a 
              href={project.link} 
              className="text-highlight hover:text-highlight-secondary transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
        <div className="p-5">
          <p className="text-gray-300 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 rounded-full bg-dark-100 text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState("All");
  
  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            My <span className="text-gradient">Projects</span>
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-highlight mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          />
          <p className="text-gray-300 max-w-2xl mx-auto">
            Browse through my recent projects, showcasing a diverse range of skills and expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {projectData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          <motion.div
            className="glass-card rounded-xl overflow-hidden flex flex-col items-center justify-center p-8 text-center h-full min-h-[300px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Plus size={48} className="text-highlight/50 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Add New Project</h3>
            <p className="text-gray-400 mb-6">Showcase your latest work</p>
            <Button className="bg-highlight hover:bg-highlight/90 rounded-full px-6">
              Add Project
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
