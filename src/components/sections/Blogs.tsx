
import React from "react";
import { motion } from "framer-motion";
import { Book, Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Link } from "react-router-dom";

// Sample blog data, this would typically come from an API
const blogPosts = [
  {
    id: 1,
    title: "The Future of UI/UX Design Trends in 2025",
    excerpt: "Exploring the upcoming design trends that will dominate the industry in the coming year.",
    date: "April 10, 2025",
    category: "Design",
    imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=700"
  },
  {
    id: 2,
    title: "How to Build Scalable React Applications",
    excerpt: "Learn the best practices for building React apps that can scale with your business needs.",
    date: "March 28, 2025",
    category: "Development",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=700"
  },
  {
    id: 3,
    title: "Creative Direction: Balancing Innovation and User Experience",
    excerpt: "Finding the perfect balance between creative innovation and practical user experience.",
    date: "March 15, 2025",
    category: "Creative",
    imageUrl: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&q=80&w=700"
  }
];

const Blogs = () => {
  return (
    <section id="blogs" className="section-padding bg-dark-100/30">
      <div className="container mx-auto">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest <span className="text-gradient">Insights</span></h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Thoughts, learnings, and perspectives from my journey in design and development.
          </p>
        </motion.div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col bg-dark-200/80 border-highlight/10 overflow-hidden hover:border-highlight/30 transition-all duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center text-sm text-highlight mb-2">
                    <Book size={16} className="mr-2" />
                    <span>{post.category}</span>
                    <span className="mx-2">•</span>
                    <Calendar size={16} className="mr-2" />
                    <span>{post.date}</span>
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  {/* Additional content could go here */}
                </CardContent>
                <CardFooter>
                  <Link to={`/blog/${post.id}`}>
                    <Button 
                      variant="ghost" 
                      className="text-highlight hover:text-highlight-secondary hover:bg-dark-300/50"
                    >
                      Read More <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        {/* View all posts button */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-highlight hover:bg-highlight/90 text-white rounded-full px-8"
          >
            View All Posts
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
