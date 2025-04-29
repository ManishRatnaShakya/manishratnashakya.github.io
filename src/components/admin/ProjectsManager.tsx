
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PlusCircle, Pencil, Trash2, Loader2 } from "lucide-react";
import { Project } from "@/types/database";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import ProjectForm, { ProjectFormValues } from "@/components/projects/ProjectForm";
import { transformProjectFormData } from "@/utils/projectUtils";

const ProjectsManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    
    const techString = Array.isArray(project.technologies) 
      ? project.technologies.join(", ")
      : "";
    
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id);
        
      if (error) throw error;
      toast.success("Project deleted successfully");
      fetchProjects();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete project");
    } finally {
      setDeleteId(null);
    }
  };

  const handleSubmitEdit = async (values: ProjectFormValues) => {
    try {
      if (!editingId) return;
      
      const projectData = transformProjectFormData(values);
      
      const { error } = await supabase
        .from("projects")
        .update(projectData)
        .eq("id", editingId);
          
      if (error) throw error;
      toast.success("Project updated successfully");
      setEditingId(null);
      setIsEditing(false);
      fetchProjects();
    } catch (error: any) {
      toast.error(error.message || "Failed to save project");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Projects</h2>
        <Button 
          onClick={() => navigate("/admin/add-project")} 
          className="bg-highlight hover:bg-highlight/90"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Project
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-highlight" />
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg">No projects found</p>
          <p className="text-sm mt-2">Click "Add New Project" to create your first project.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {projects.map((project) => (
            <Card key={project.id} className="bg-dark-200/80 border-highlight/10">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <p className="text-gray-400 mt-1 line-clamp-2">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.technologies.map((tech, i) => (
                        <span 
                          key={i} 
                          className="text-xs bg-dark-300 text-highlight py-1 px-2 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleEdit(project)}
                      className="text-gray-400 hover:text-white"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="text-gray-400 hover:text-red-500"
                          onClick={() => setDeleteId(project.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-dark-200/95 border-highlight/20">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the project.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-transparent border-gray-600 text-white hover:bg-dark-300/50">Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700"
                            onClick={() => deleteId && handleDelete(deleteId)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Sheet open={isEditing} onOpenChange={setIsEditing}>
        <SheetContent className="overflow-y-auto w-full md:max-w-md bg-dark-200/95 border-highlight/20">
          <SheetHeader>
            <SheetTitle className="text-xl">Edit Project</SheetTitle>
          </SheetHeader>
          <div className="py-4">
            {editingId && (
              <ProjectForm
                defaultValues={{
                  title: projects.find(p => p.id === editingId)?.title || "",
                  description: projects.find(p => p.id === editingId)?.description || "",
                  image_url: projects.find(p => p.id === editingId)?.image_url || "",
                  technologies: projects.find(p => p.id === editingId)?.technologies.join(", ") || "",
                  github_url: projects.find(p => p.id === editingId)?.github_url || "",
                  live_url: projects.find(p => p.id === editingId)?.live_url || "",
                }}
                onSubmit={handleSubmitEdit}
                onCancel={() => setIsEditing(false)}
                submitLabel="Save Changes"
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProjectsManager;
