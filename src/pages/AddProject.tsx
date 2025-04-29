
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import AdminHeader from "@/components/admin/AdminHeader";
import ProjectForm, { ProjectFormValues } from "@/components/projects/ProjectForm";
import { transformProjectFormData } from "@/utils/projectUtils";

const AddProject = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: ProjectFormValues) => {
    setIsSubmitting(true);
    try {
      const projectData = transformProjectFormData(values);
      
      const { error } = await supabase
        .from("projects")
        .insert([projectData]);
        
      if (error) throw error;
      toast.success("Project added successfully!");
      navigate("/admin");
    } catch (error: any) {
      toast.error(error.message || "Failed to add project");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      <AdminHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/admin")}
              className="mr-4 text-gray-400 hover:text-white"
            >
              <ArrowLeft size={18} />
            </Button>
            <h1 className="text-2xl font-bold">Add New Project</h1>
          </div>
          
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectForm 
              onSubmit={handleSubmit}
              showCancelButton={false}
              isSubmitting={isSubmitting}
              submitLabel="Save Project"
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AddProject;
