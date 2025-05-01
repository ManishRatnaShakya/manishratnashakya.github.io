
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export const projectSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  image_url: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  technologies: z.string()
    .transform((val) => val ? val.split(",").map((t) => t.trim()).filter(t => t !== "") : [])
    .or(z.array(z.string())),
  github_url: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  live_url: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
});

// Define a specific type for the form values that includes technologies as either string or array
export type ProjectFormValues = {
  title: string;
  description: string;
  image_url: string;
  technologies: string | string[];  // Can be either string for input or array after processing
  github_url: string;
  live_url: string;
};

interface ProjectFormProps {
  defaultValues?: ProjectFormValues;
  onSubmit: (values: ProjectFormValues) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
  showCancelButton?: boolean;
  isSubmitting?: boolean;
}

const ProjectForm = ({
  defaultValues = {
    title: "",
    description: "",
    image_url: "",
    technologies: "",
    github_url: "",
    live_url: "",
  },
  onSubmit,
  onCancel,
  submitLabel = "Save Project",
  showCancelButton = true,
  isSubmitting = false,
}: ProjectFormProps) => {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

  const handleSubmit = async (values: ProjectFormValues) => {
    await onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
            className={`${showCancelButton ? "flex-1" : ""} bg-highlight hover:bg-highlight/90`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin mr-2">◌</span>
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {submitLabel}
              </>
            )}
          </Button>
          {showCancelButton && onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="border-gray-600"
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default ProjectForm;
