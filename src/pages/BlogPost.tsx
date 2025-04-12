
import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Sample blog data (in a real app, this would come from an API)
const blogPosts = [
  {
    id: 1,
    title: "The Future of UI/UX Design Trends in 2025",
    excerpt: "Exploring the upcoming design trends that will dominate the industry in the coming year.",
    content: `
      <p>The landscape of UI/UX design is constantly evolving, with new trends emerging every year. As we look ahead to 2025, several key design trends are poised to dominate the industry.</p>
      
      <h3>1. Immersive 3D Experiences</h3>
      <p>With advancements in browser capabilities and hardware performance, immersive 3D experiences are becoming more accessible for web applications. Designers are incorporating subtle 3D elements to create depth and engagement without sacrificing performance.</p>
      
      <h3>2. Adaptive Design Systems</h3>
      <p>Design systems are evolving beyond static component libraries to become adaptive frameworks that respond to user preferences, contexts, and behaviors. These intelligent systems will allow for more personalized user experiences while maintaining brand consistency.</p>
      
      <h3>3. AI-Enhanced Interfaces</h3>
      <p>Artificial intelligence is playing an increasingly important role in UI/UX design, enabling interfaces that learn from user interactions and adapt accordingly. This includes everything from smart form suggestions to layout adjustments based on user behavior patterns.</p>
      
      <h3>4. Ethical Design Considerations</h3>
      <p>As digital products become more integrated into our daily lives, ethical design considerations are moving to the forefront. Designers are focusing on creating interfaces that respect user privacy, promote digital wellbeing, and avoid manipulative patterns.</p>
      
      <p>By embracing these emerging trends while maintaining a focus on user needs and business goals, designers can create experiences that are both innovative and effective in the rapidly evolving digital landscape of 2025.</p>
    `,
    date: "April 10, 2025",
    category: "Design",
    imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=700"
  },
  {
    id: 2,
    title: "How to Build Scalable React Applications",
    excerpt: "Learn the best practices for building React apps that can scale with your business needs.",
    content: `
      <p>Building scalable React applications requires careful planning and implementation of best practices. Let's explore some key strategies for creating React apps that can grow alongside your business needs.</p>
      
      <h3>1. Component Architecture</h3>
      <p>A well-designed component architecture is the foundation of a scalable React application. This includes creating reusable, composable components that follow the single responsibility principle. By breaking your UI into small, focused components, you can ensure better maintainability and code reuse as your application grows.</p>
      
      <h3>2. State Management</h3>
      <p>As your application scales, managing state becomes increasingly complex. Consider implementing a state management solution like Redux, Zustand, or React Query depending on your specific requirements. The key is to have a predictable state flow that can accommodate growing complexity.</p>
      
      <h3>3. Code Splitting</h3>
      <p>Code splitting allows you to load only the necessary code for the current view, improving initial load times. React's lazy loading and Suspense features make implementing code splitting straightforward, ensuring your application remains performant even as it grows.</p>
      
      <h3>4. Testing Strategy</h3>
      <p>A comprehensive testing strategy is crucial for scalable applications. Implement unit tests for isolated functionality, integration tests for component interactions, and end-to-end tests for critical user flows. This ensures that new features and changes don't break existing functionality.</p>
      
      <p>By implementing these principles and continuously refining your approach, you can build React applications that scale effectively with your business growth and evolving user needs.</p>
    `,
    date: "March 28, 2025",
    category: "Development",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=700"
  },
  {
    id: 3,
    title: "Creative Direction: Balancing Innovation and User Experience",
    excerpt: "Finding the perfect balance between creative innovation and practical user experience.",
    content: `
      <p>In the world of digital design, finding the right balance between creative innovation and practical user experience is a constant challenge. This balance is at the heart of effective creative direction.</p>
      
      <h3>1. Understanding User Needs vs. Creative Vision</h3>
      <p>Creative direction begins with a deep understanding of user needs and business objectives. While innovative design can differentiate your product, it must always serve the user's goals. The best creative directors find ways to infuse innovation into designs without compromising usability.</p>
      
      <h3>2. Creating a Cohesive Design Language</h3>
      <p>A unified design language provides the framework within which creativity can flourish. By establishing clear design principles and visual systems, creative directors can ensure consistency while allowing for creative exploration within those boundaries.</p>
      
      <h3>3. Iterative Design Processes</h3>
      <p>The path to balancing innovation and user experience is rarely straightforward. Successful creative direction embraces an iterative process, using prototyping and user testing to refine ideas and ensure they resonate with the target audience.</p>
      
      <h3>4. Fostering Collaboration</h3>
      <p>Great creative direction involves bringing together diverse perspectives from designers, developers, marketers, and users. This collaborative approach leads to solutions that are both innovative and practical.</p>
      
      <p>By navigating these considerations thoughtfully, creative directors can push the boundaries of design while creating experiences that genuinely connect with users and meet business objectives.</p>
    `,
    date: "March 15, 2025",
    category: "Creative",
    imageUrl: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&q=80&w=700"
  }
];

const BlogPost = () => {
  const { id } = useParams();
  const blogId = parseInt(id || "1");
  
  // Find the blog post by ID
  const post = blogPosts.find(post => post.id === blogId) || blogPosts[0];

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/#blogs">
              <Button variant="ghost" className="mb-8 text-gray-400 hover:text-white">
                <ArrowLeft size={18} className="mr-2" />
                Back to Blogs
              </Button>
            </Link>
          </motion.div>
          
          {/* Featured image */}
          <motion.div 
            className="w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Meta information */}
          <motion.div 
            className="flex items-center text-sm text-highlight mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Book size={16} className="mr-2" />
            <span>{post.category}</span>
            <span className="mx-2">•</span>
            <Calendar size={16} className="mr-2" />
            <span>{post.date}</span>
          </motion.div>
          
          {/* Title */}
          <motion.h1 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {post.title}
          </motion.h1>
          
          {/* Content */}
          <motion.div 
            className="prose prose-invert prose-lg max-w-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
