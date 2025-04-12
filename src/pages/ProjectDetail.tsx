
import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Sample project data - in a real app, this would come from an API or context
const projectData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A modern e-commerce platform built with React, Node.js, and Stripe integration.",
    longDescription: "This fully-featured e-commerce platform provides a seamless shopping experience with a responsive design, secure payment processing via Stripe, and a robust backend built on Node.js. Features include product categorization, user accounts, order history, wishlist functionality, and an admin dashboard for inventory management.\n\nThe application uses MongoDB for data storage, Redux for state management, and includes comprehensive testing with Jest and React Testing Library. The UI is built with a combination of custom components and Material UI, ensuring a consistent and professional appearance across all devices.",
    image: "",
    tags: ["React", "Node.js", "Stripe", "MongoDB"],
    link: "#",
    challenges: "One of the main challenges was implementing a secure and seamless payment flow while maintaining a smooth user experience. We also focused on optimizing database queries for large product catalogs.",
    technologies: {
      frontend: ["React", "Redux", "Material UI", "SCSS"],
      backend: ["Node.js", "Express", "MongoDB", "JWT Authentication"],
      deployment: ["AWS", "Docker", "CI/CD Pipeline"]
    }
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "A responsive portfolio website designed for a photographer client.",
    longDescription: "This portfolio website was designed for a professional photographer who needed a clean, minimalist platform to showcase their work. The site features a responsive image gallery with lazy loading and smooth transitions, a contact form with email integration, and a blog section for sharing photography tips and experiences.\n\nThe design prioritizes visual content, with a focus on image quality and loading speed. Advanced image optimization techniques were implemented to ensure fast loading times while maintaining high-quality visuals.",
    image: "",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    link: "#",
    challenges: "The main challenge was balancing high-resolution image quality with performance, especially on mobile devices. We implemented advanced lazy loading and image optimization to achieve the best results.",
    technologies: {
      frontend: ["React", "Tailwind CSS", "Framer Motion", "React Router"],
      backend: ["Firebase for contact form", "Cloudinary for image hosting"],
      deployment: ["Netlify", "GitHub Actions"]
    }
  },
  {
    id: 3,
    title: "Task Management App",
    description: "A productivity app for tracking tasks and managing projects.",
    longDescription: "This task management application helps teams and individuals organize their work efficiently. It features customizable Kanban boards, task assignments, due dates, priority levels, and progress tracking. The app includes real-time updates using Firebase, enabling seamless collaboration between team members.\n\nUsers can create multiple projects, set up automated workflows, receive notifications, and generate productivity reports. The application also offers integration with calendar apps and supports file attachments for tasks.",
    image: "",
    tags: ["React", "Redux", "Firebase"],
    link: "#",
    challenges: "Creating a real-time synchronization system that works reliably across multiple devices and users was the biggest challenge. We also put significant effort into designing an intuitive UI that remains uncluttered despite the app's many features.",
    technologies: {
      frontend: ["React", "Redux", "Styled Components"],
      backend: ["Firebase", "Cloud Functions"],
      deployment: ["Firebase Hosting", "GitHub Actions"]
    }
  },
  {
    id: 4,
    title: "Music Streaming Service",
    description: "A web-based music streaming service with custom audio player.",
    longDescription: "This music streaming platform offers users access to a vast library of songs with features like playlist creation, artist following, and personalized recommendations. The custom audio player includes visualizations, equalizer settings, and supports continuous playback while browsing.\n\nThe application implements user authentication, subscription management, and social features like sharing playlists and following other users. The recommendation engine uses machine learning algorithms to suggest music based on listening history and preferences.",
    image: "",
    tags: ["React", "Node.js", "MongoDB", "AWS"],
    link: "#",
    challenges: "Building a reliable and smooth audio streaming service was complex, particularly handling different audio formats and ensuring consistent playback across devices. The recommendation system also required careful design to balance accuracy and discovery.",
    technologies: {
      frontend: ["React", "Redux", "Web Audio API", "SCSS"],
      backend: ["Node.js", "Express", "MongoDB", "AWS S3 for audio storage"],
      deployment: ["AWS EC2", "Docker", "Nginx"]
    }
  },
];

const ProjectDetail = () => {
  const { id } = useParams();
  const projectId = parseInt(id || "1");
  
  const project = projectData.find(p => p.id === projectId);
  
  if (!project) {
    return (
      <div className="min-h-screen bg-dark text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
            <p className="mb-8">The project you're looking for doesn't exist.</p>
            <Link to="/">
              <Button>
                <ArrowLeft className="mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      
      <main className="container mx-auto py-16 px-4">
        <Link to="/#projects">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2" />
            Back to Projects
          </Button>
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
          <div className="w-24 h-1 bg-highlight mb-8" />
          
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="text-sm px-3 py-1 rounded-full bg-dark-200 text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="glass-card rounded-xl overflow-hidden mb-12">
            <div className="aspect-video bg-dark-300 relative">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600">
                  <span>Project Image</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <div className="space-y-4 text-gray-300">
                {project.longDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Challenges</h2>
              <p className="text-gray-300">{project.challenges}</p>
            </div>
            
            <div>
              <div className="glass-card rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4">Technologies</h2>
                
                <div className="mb-4">
                  <h3 className="text-highlight mb-2">Frontend</h3>
                  <ul className="list-disc pl-5 text-gray-300">
                    {project.technologies.frontend.map((tech, index) => (
                      <li key={index}>{tech}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-highlight mb-2">Backend</h3>
                  <ul className="list-disc pl-5 text-gray-300">
                    {project.technologies.backend.map((tech, index) => (
                      <li key={index}>{tech}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-highlight mb-2">Deployment</h3>
                  <ul className="list-disc pl-5 text-gray-300">
                    {project.technologies.deployment.map((tech, index) => (
                      <li key={index}>{tech}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-8">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-highlight hover:text-highlight-secondary transition-colors"
                  >
                    <ExternalLink size={18} className="mr-2" />
                    View Live Project
                  </a>
                  
                  <a 
                    href="#" 
                    className="flex items-center mt-3 text-highlight hover:text-highlight-secondary transition-colors"
                  >
                    <GitBranch size={18} className="mr-2" />
                    Source Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProjectDetail;
