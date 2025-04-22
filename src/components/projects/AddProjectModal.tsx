import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const projectSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  image_url: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  technologies: z.string().transform((val) => val.split(",").map((t) => t.trim())),
  github_url: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  live_url: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

const AddProjectModal = ({
  open,
  onOpenChange,
  onProjectAdded,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProjectAdded: () => void;
}) => {
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

  const onSubmit = async (values: ProjectFormValues) => {
    try {
      const projectData = {
        title: values.title,
        description: values.description,
        image_url: values.image_url || null,
        technologies: values.technologies,
        github_url: values.github_url || null,
        live_url: values.live_url || null,
      };
      const { error } = await supabase
        .from("projects")
        .insert([projectData]);
      if (error) throw error;
      toast.success("Project added successfully!");
      form.reset();
      onProjectAdded();
    } catch (error: any) {
      toast.error(error.message || "Failed to add project");
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto w-full md:max-w-md bg-dark-200/95 border-highlight/20">
        <SheetHeader>
          <SheetTitle className="text-xl">Add New Project</SheetTitle>
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
                  onClick={() => onOpenChange(false)}
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
  );
};

export default AddProjectModal;
