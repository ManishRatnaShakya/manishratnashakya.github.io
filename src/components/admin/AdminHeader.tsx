
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Home, Upload } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AdminHeader = () => {
  const { user } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Fetch avatar on component mount
  React.useEffect(() => {
    if (user) {
      getAvatar();
    }
  }, [user]);

  async function getAvatar() {
    try {
      if (!user) return;
      
      // Check if profiles table is accessible and has avatar_url column
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }
      
      // The avatar_url property will be checked safely
      if (data && 'avatar_url' in data && data.avatar_url) {
        setAvatarUrl(data.avatar_url as string);
      }
    } catch (error) {
      console.error('Error fetching avatar:', error);
    }
  }

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }
      
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user!.id}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;
      
      try {
        // Upload the image to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, file);
          
        if (uploadError) throw uploadError;
        
        // Get the public URL
        const { data } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);
        
        const avatarUrl = data.publicUrl;
        
        // Update the profile with the new avatar URL, carefully checking if column exists
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ 
            // Use type assertion to handle the dynamic property
            avatar_url: avatarUrl 
          } as any)
          .eq('id', user!.id);
          
        if (updateError) throw updateError;
        
        setAvatarUrl(avatarUrl);
        toast.success('Profile picture updated successfully!');
      } catch (uploadError: any) {
        if (uploadError.message?.includes("column") && uploadError.message?.includes("avatar_url")) {
          toast.error("The avatar_url column doesn't exist yet. Please run the necessary SQL migration first.");
        } else if (uploadError.message?.includes("relation") && uploadError.message?.includes("avatars")) {
          toast.error("The avatars storage bucket doesn't exist yet. Please create it first.");
        } else {
          toast.error(uploadError.message || 'Error uploading avatar');
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'Error uploading avatar');
    } finally {
      setUploading(false);
    }
  };

  return (
    <header className="bg-dark-300/80 backdrop-blur-md py-4 border-b border-highlight/10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/admin" className="text-2xl font-bold text-gradient">Portfolio Admin</Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="text-sm text-gray-400">
              Logged in as: <span className="text-highlight">{user?.email}</span>
            </div>
            
            <div className="relative group">
              <Avatar className="h-10 w-10 border-2 border-highlight/30 group-hover:border-highlight transition-all cursor-pointer">
                {avatarUrl ? (
                  <AvatarImage src={avatarUrl} alt="Profile" />
                ) : (
                  <AvatarFallback className="bg-dark-300 text-highlight">
                    {user?.email?.charAt(0).toUpperCase() || 'A'}
                  </AvatarFallback>
                )}
              </Avatar>
              
              <label 
                className="absolute inset-0 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                htmlFor="avatar-upload"
              >
                <Upload size={16} />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={uploadAvatar}
                disabled={uploading}
              />
            </div>
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
