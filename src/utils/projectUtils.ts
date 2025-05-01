
import { ProjectFormValues } from "@/components/projects/ProjectForm";

export const transformProjectFormData = (values: ProjectFormValues) => {
  // Handle case where technologies might be a string, array, undefined or empty
  let techArray: string[] = [];
  
  if (values.technologies) {
    if (typeof values.technologies === 'string') {
      // If it's a string, split by commas
      techArray = values.technologies.split(',').map(t => t.trim()).filter(t => t !== '');
    } else if (Array.isArray(values.technologies)) {
      // If it's already an array, use it directly
      techArray = values.technologies;
    }
  }
  
  return {
    title: values.title,
    description: values.description,
    image_url: values.image_url || null, // Handle empty strings
    technologies: techArray,
    github_url: values.github_url || null, // Handle empty strings
    live_url: values.live_url || null, // Handle empty strings
  };
};
