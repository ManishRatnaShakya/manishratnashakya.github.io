import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, Pencil, Trash2, Save, X, Loader2 } from "lucide-react";
import { Project } from "@/types/database";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const projectSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  image_url: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  technologies: z.string()
    .transform((val) => val.split(",").map((t) => t.trim()).filter(t => t !== "")),
  github_url: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  live_url: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

const ProjectsManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formAction, setFormAction] = useState<"add" | "edit">("add");

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      image_url: "",
      technologies: "",
      github_url: "",
      live_url: "",
    },
  });

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

  const resetForm = () => {
    form.reset({
      title: "",
      description: "",
      image_url: "",
      technologies: "",
      github_url: "",
      live_url: "",
    });
  };

  const onSubmit = async (values: ProjectFormValues) => {
    try {
      const techArray = typeof values.technologies === 'string' 
        ? values.technologies.split(',').map(t => t.trim()).filter(t => t !== '') 
        : values.technologies;
      
      const projectData = {
        title: values.title,
        description: values.description,
        image_url: values.image_url || null,
        technologies: techArray,
        github_url: values.github_url || null,
        live_url: values.live_url || null,
      };
      
      if (formAction === "add") {
        const { error } = await supabase
          .from("projects")
          .insert([projectData]);
          
        if (error) throw error;
        toast.success("Project added successfully");
      } else if (formAction === "edit" && editingId) {
        const { error } = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", editingId);
          
        if (error) throw error;
        toast.success("Project updated successfully");
        setEditingId(null);
      }
      
      resetForm();
      setIsAdding(false);
      fetchProjects();
    } catch (error: any) {
      toast.error(error.message || "Failed to save project");
    }
  };

  const handleEdit = (project: Project) => {
    setFormAction("edit");
    setEditingId(project.id);
    
    const techString = Array.isArray(project.technologies) 
      ? project.technologies.join(", ")
      : "";
    
    form.reset({
      title: project.title,
      description: project.description,
      image_url: project.image_url || "",
      technologies: techString,
      github_url: project.github_url || "",
      live_url: project.live_url || "",
    });
    setIsAdding(true);
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

  const handleAddNew = () => {
    setFormAction("add");
    resetForm();
    setIsAdding(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Projects</h2>
        <Sheet open={isAdding} onOpenChange={setIsAdding}>
          <SheetTrigger asChild>
            <Button onClick={handleAddNew} className="bg-highlight hover:bg-highlight/90">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Project
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto w-full md:max-w-md bg-dark-200/95 border-highlight/20">
            <SheetHeader>
              <SheetTitle className="text-xl">
                {formAction === "add" ? "Add New Project" : "Edit Project"}
              </SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Project title" {...field} className="bg-dark-300/50" />
                        </FormControl>
                        <FormMessage />
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
                            placeholder="Project description" 
                            rows={4}
                            {...field} 
                            className="bg-dark-300/50" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="image_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/image.jpg" {...field} className="bg-dark-300/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="technologies"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Technologies (comma separated)</FormLabel>
                        <FormControl>
                          <Input placeholder="React, Node.js, TypeScript" {...field} className="bg-dark-300/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="github_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GitHub URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://github.com/username/repo" {...field} className="bg-dark-300/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="live_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Live URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com" {...field} className="bg-dark-300/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex space-x-2 pt-4">
                    <Button 
                      type="submit" 
                      className="flex-1 bg-highlight hover:bg-highlight/90"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Project
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsAdding(false)}
                      className="border-gray-600"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </SheetContent>
        </Sheet>
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
    </div>
  );
};

export default ProjectsManager;
