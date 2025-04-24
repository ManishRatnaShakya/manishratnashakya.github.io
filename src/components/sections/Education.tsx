import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, GraduationCap, Plus, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

const formSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  institution: z.string().min(1, "Institution is required"),
  date: z.string().min(1, "Date is required"),
  description: z.string().min(1, "Description is required"),
});

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [educationItems, setEducationItems] = useState(educationData);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      degree: "",
      institution: "",
      date: "",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newEducation: EducationItem = {
      id: educationItems.length + 1,
      ...values,
    };
    setEducationItems([...educationItems, newEducation]);
    setIsDialogOpen(false);
    form.reset();
  };

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
          
          {educationItems.map((item, index) => (
            <TimelineItem key={item.id} item={item} index={index} />
          ))}

          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Button 
              variant="outline" 
              className="glass-card hover:bg-dark-300/50 transition-colors px-6 py-3 rounded-full text-highlight"
              onClick={() => setIsDialogOpen(true)}
            >
              <Plus size={18} className="inline mr-2" />
              Add Education
            </Button>
          </motion.div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-dark-200 border-highlight/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Add Education</DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="degree"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Degree</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your degree" 
                        className="bg-dark-300/50" 
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="institution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institution</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter institution name" 
                        className="bg-dark-300/50" 
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., 2020 - 2024" 
                        className="bg-dark-300/50" 
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your education" 
                        className="bg-dark-300/50" 
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Add Education
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Education;
