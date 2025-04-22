
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BlogPost } from "@/types/database";
import { toast } from "sonner";
import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  excerpt: z.string().min(10, { message: "Excerpt must be at least 10 characters" }),
  content: z.string().min(50, { message: "Content must be at least 50 characters" }),
  image_url: z.string().url({ message: "Please enter a valid URL" }).or(z.literal("")).optional(),
  category: z.string().min(2, { message: "Category must be at least 2 characters" }),
});

export type BlogFormValues = z.infer<typeof blogSchema>;

export function useBlogsManager() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setBlogs((data || []) as BlogPost[]);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch blogs");
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const addBlog = useCallback(async (values: BlogFormValues) => {
    try {
      const { error } = await supabase
        .from("blogs")
        .insert([
          {
            title: values.title,
            excerpt: values.excerpt,
            content: values.content,
            image_url: values.image_url || null,
            category: values.category,
          }
        ]);
      if (error) throw error;
      toast.success("Blog post added successfully");
      await fetchBlogs();
    } catch (error: any) {
      toast.error(error.message || "Failed to add blog post");
      throw error;
    }
  }, [fetchBlogs]);

  const editBlog = useCallback(async (id: string, values: BlogFormValues) => {
    try {
      const { error } = await supabase
        .from("blogs")
        .update({
          title: values.title,
          excerpt: values.excerpt,
          content: values.content,
          image_url: values.image_url || null,
          category: values.category,
        })
        .eq("id", id);
      if (error) throw error;
      toast.success("Blog post updated successfully");
      await fetchBlogs();
    } catch (error: any) {
      toast.error(error.message || "Failed to update blog post");
      throw error;
    }
  }, [fetchBlogs]);

  const deleteBlog = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from("blogs")
        .delete()
        .eq("id", id);
      if (error) throw error;
      toast.success("Blog post deleted successfully");
      await fetchBlogs();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete blog post");
      throw error;
    }
  }, [fetchBlogs]);

  return {
    blogs,
    loading,
    fetchBlogs,
    addBlog,
    editBlog,
    deleteBlog,
    setBlogs,
    setLoading
  };
}
