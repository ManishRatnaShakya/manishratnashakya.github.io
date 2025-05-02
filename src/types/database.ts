
// Custom type definitions for database tables
// These types will be used as a workaround since we can't modify the generated types

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  category: string;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  technologies: string[];
  github_url: string | null;
  live_url: string | null;
  created_at?: string;
}

export interface Profile {
  id: string;
  email: string;
  role: 'admin' | 'user';
  avatar_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

// Define a custom type for Supabase client to use with our tables
export type CustomDatabase = {
  public: {
    Tables: {
      blogs: {
        Row: BlogPost;
        Insert: Omit<BlogPost, 'id' | 'created_at'>;
        Update: Partial<Omit<BlogPost, 'id' | 'created_at'>>;
      };
      projects: {
        Row: Project;
        Insert: Omit<Project, 'id' | 'created_at'>;
        Update: Partial<Omit<Project, 'id' | 'created_at'>>;
      };
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
};
