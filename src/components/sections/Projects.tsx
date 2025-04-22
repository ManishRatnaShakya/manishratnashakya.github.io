
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import AddProjectModal from "@/components/projects/AddProjectModal";
import { Project } from "@/types/database";

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
          {project.image_url ? (
            <img
              src={project.image_url}
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
            {project.github_url && (
              <a 
                href={project.github_url} 
                className="text-highlight hover:text-highlight-secondary transition-colors"
                onClick={e => e.stopPropagation()}
                target="_blank" rel="noopener noreferrer"
              >
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>
        <div className="p-5">
          <p className="text-gray-300 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies?.map((tag, index) => (
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
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setProjects(data);
    setLoading(false);
  };

  const handleProjectAdded = () => {
    setShowAddModal(false);
    fetchProjects();
  };

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
        {loading ? (
          <div className="flex justify-center py-12">
            <span className="text-highlight text-lg animate-pulse">Loading projects...</span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
              {user && (
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
                  <Button className="bg-highlight hover:bg-highlight/90 rounded-full px-6" onClick={() => setShowAddModal(true)}>
                    Add Project
                  </Button>
                </motion.div>
              )}
            </div>
            <AddProjectModal 
              open={showAddModal}
              onOpenChange={setShowAddModal}
              onProjectAdded={handleProjectAdded}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
