
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const AdminHeader = () => {
  const { user } = useAuth();

  return (
    <header className="bg-dark-300/80 backdrop-blur-md py-4 border-b border-highlight/10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/admin" className="text-2xl font-bold text-gradient">Portfolio Admin</Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-400">
            Logged in as: <span className="text-highlight">{user?.email}</span>
          </div>
          
          <Link to="/">
            <Button variant="ghost" size="sm">
              <Home className="h-4 w-4 mr-2" />
              View Site
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
