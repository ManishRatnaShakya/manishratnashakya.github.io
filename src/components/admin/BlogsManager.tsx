
import React, { useEffect, useState } from "react";
import { blogSchema, useBlogsManager, BlogFormValues } from "@/hooks/useBlogsManager";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { format } from "date-fns";
import { Book, Calendar, Edit, Trash, Save, X } from "lucide-react";

const BlogsManager = () => {
  const {
    blogs,
    loading,
    fetchBlogs,
    addBlog,
    editBlog,
    deleteBlog
  } = useBlogsManager();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formAction, setFormAction] = useState<"add" | "edit">("add");

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      image_url: "",
      category: "",
    },
  });

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const resetForm = () => {
    form.reset({
      title: "",
      excerpt: "",
      content: "",
      image_url: "",
      category: "",
    });
  };

  const onSubmit = async (values: BlogFormValues) => {
    try {
      if (formAction === "add") {
        await addBlog(values);
      } else if (formAction === "edit" && editingId) {
        await editBlog(editingId, values);
        setEditingId(null);
      }
      resetForm();
      setIsAdding(false);
    } catch {
      // Errors already handled in hook
    }
  };

  const handleEdit = (blog: any) => {
    setFormAction("edit");
    setEditingId(blog.id);
    form.reset({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      image_url: blog.image_url || "",
      category: blog.category,
    });
    setIsAdding(true);
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteBlog(deleteId);
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
        <h2 className="text-2xl font-bold">Manage Blog Posts</h2>
        <Sheet open={isAdding} onOpenChange={setIsAdding}>
          <SheetTrigger asChild>
            <Button onClick={handleAddNew} className="bg-highlight hover:bg-highlight/90">
              <Edit className="mr-2 h-4 w-4" />
              Add New Blog Post
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto w-full md:max-w-md bg-dark-200/95 border-highlight/20">
            <SheetHeader>
              <SheetTitle className="text-xl">
                {formAction === "add" ? "Add New Blog Post" : "Edit Blog Post"}
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
                          <Input placeholder="Blog post title" {...field} className="bg-dark-300/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input placeholder="Design, Development, etc." {...field} className="bg-dark-300/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="excerpt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Excerpt</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="A short summary of the blog post"
                            rows={2}
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
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Full blog post content"
                            rows={8}
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
                  <div className="flex space-x-2 pt-4">
                    <Button
                      type="submit"
                      className="flex-1 bg-highlight hover:bg-highlight/90"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Blog Post
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
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-highlight"></div>
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg">No blog posts found</p>
          <p className="text-sm mt-2">Click "Add New Blog Post" to create your first post.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {blogs.map((blog) => (
            <Card key={blog.id} className="bg-dark-200/80 border-highlight/10">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{blog.title}</h3>
                    <div className="flex items-center text-sm text-highlight mt-1 mb-2">
                      <Book size={16} className="mr-1" />
                      <span>{blog.category}</span>
                      <span className="mx-2">•</span>
                      <Calendar size={16} className="mr-1" />
                      <span>
                        {format(new Date(blog.created_at), "MMMM d, yyyy")}
                      </span>
                    </div>
                    <p className="text-gray-400 line-clamp-2">{blog.excerpt}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(blog)}
                      className="text-gray-400 hover:text-white"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog open={deleteId === blog.id} onOpenChange={(v) => !v && setDeleteId(null)}>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-gray-400 hover:text-red-500"
                          onClick={() => setDeleteId(blog.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-dark-200/95 border-highlight/20">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the blog post.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-transparent border-gray-600 text-white hover:bg-dark-300/50">Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700"
                            onClick={handleDelete}
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

export default BlogsManager;
