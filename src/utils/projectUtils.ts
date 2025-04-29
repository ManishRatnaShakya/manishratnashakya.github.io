
import { ProjectFormValues } from "@/components/projects/ProjectForm";

export const transformProjectFormData = (values: ProjectFormValues) => {
  const techArray = values.technologies 
    ? values.technologies.split(',').map(t => t.trim()).filter(t => t !== '') 
    : [];
  
  return {
    title: values.title,
    description: values.description,
    image_url: values.image_url || null,
    technologies: techArray,
    github_url: values.github_url || null,
    live_url: values.live_url || null,
  };
};
