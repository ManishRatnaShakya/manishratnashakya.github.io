
import { ProjectFormValues } from "@/components/projects/ProjectForm";

export const transformProjectFormData = (values: ProjectFormValues) => {
  // Handle case where technologies might be undefined or empty
  const techArray = values.technologies 
    ? values.technologies.split(',').map(t => t.trim()).filter(t => t !== '') 
    : [];
  
  return {
    title: values.title,
    description: values.description,
    image_url: values.image_url || null, // Handle empty strings
    technologies: techArray,
    github_url: values.github_url || null, // Handle empty strings
    live_url: values.live_url || null, // Handle empty strings
  };
};
