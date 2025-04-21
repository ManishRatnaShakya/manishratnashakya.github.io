
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
  created_at?: string;
  updated_at?: string;
}
