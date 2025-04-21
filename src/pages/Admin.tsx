
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import ProjectsManager from "@/components/admin/ProjectsManager";
import BlogsManager from "@/components/admin/BlogsManager";
import AdminHeader from "@/components/admin/AdminHeader";

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    } else if (!loading && user && !isAdmin) {
      navigate("/");
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-highlight"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-dark text-white">
      <AdminHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button 
            variant="outline" 
            className="border-highlight text-highlight hover:bg-highlight/10"
            onClick={signOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
        
        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="w-full bg-dark-300 mb-6">
            <TabsTrigger value="projects" className="flex-1">Projects</TabsTrigger>
            <TabsTrigger value="blogs" className="flex-1">Blogs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects">
            <ProjectsManager />
          </TabsContent>
          
          <TabsContent value="blogs">
            <BlogsManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
