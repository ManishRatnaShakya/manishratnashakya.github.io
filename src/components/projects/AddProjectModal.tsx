
import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import ProjectForm, { ProjectFormValues } from "./ProjectForm";
import { transformProjectFormData } from "@/utils/projectUtils";

interface AddProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProjectAdded: () => void;
}

const AddProjectModal = ({
  open,
  onOpenChange,
  onProjectAdded,
}: AddProjectModalProps) => {
  
  const handleSubmit = async (values: ProjectFormValues) => {
    try {
      const projectData = transformProjectFormData(values);
      
      const { error } = await supabase
        .from("projects")
        .insert([projectData]);
        
      if (error) throw error;
      toast.success("Project added successfully!");
      onProjectAdded();
    } catch (error: any) {
      toast.error(error.message || "Failed to add project");
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto w-full md:max-w-md bg-dark-200/95 border-highlight/20">
        <SheetHeader>
          <SheetTitle className="text-xl">Add New Project</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <ProjectForm
            onSubmit={handleSubmit}
            onCancel={() => onOpenChange(false)}
            submitLabel="Save Project"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AddProjectModal;
