
import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";

export interface IdeaResult {
  roadmap: string[];
  wireframe: string;
  businessModel: string[];
  howToStart: string[];
  launchChecklist: string[];
  githubPlan: string;
  uniquenessScore: number;
  feasibilityScore: number;
  existingProjects?: {
    name: string;
    description: string;
    url: string;
    similarity: number;
  }[];
  innovativeTwists?: string[];
  techStack?: string[];
  ideaSummary?: string;
}

interface MindTrekContextType {
  idea: string;
  setIdea: (idea: string) => void;
  isLoading: boolean;
  isSubmitted: boolean;
  ideaResults: IdeaResult | null;
  validateIdea: (idea: string) => Promise<void>;
  resetForm: () => void;
  currentSection: string;
  setCurrentSection: (section: string) => void;
}

const MindTrekContext = createContext<MindTrekContextType | undefined>(undefined);

export const MindTrekProvider = ({ children }: { children: ReactNode }) => {
  const [idea, setIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ideaResults, setIdeaResults] = useState<IdeaResult | null>(null);
  const [currentSection, setCurrentSection] = useState('roadmap');

  const validateIdea = async (ideaText: string) => {
    if (!ideaText.trim()) {
      toast.error("Please enter an idea before submitting");
      return;
    }

    setIsLoading(true);
    
    try {
      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('validate-idea', {
        body: { idea: ideaText }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Transform the data to match our interface
      const results: IdeaResult = {
        roadmap: data.roadmap,
        wireframe: data.wireframe,
        businessModel: data.business_model,
        howToStart: data.how_to_start,
        launchChecklist: data.launch_checklist,
        githubPlan: data.github_plan,
        uniquenessScore: data.uniqueness_score,
        feasibilityScore: data.feasibility_score,
        existingProjects: data.existing_projects,
        innovativeTwists: data.innovative_twists,
        techStack: data.tech_stack,
        ideaSummary: data.idea_summary
      };

      setIdeaResults(results);
      setIsSubmitted(true);
      
      toast.success("Idea analysis complete!");
    } catch (error) {
      console.error("Error validating idea:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setIdea('');
    setIsSubmitted(false);
    setIdeaResults(null);
    setCurrentSection('roadmap');
  };

  return (
    <MindTrekContext.Provider value={{
      idea,
      setIdea,
      isLoading,
      isSubmitted,
      ideaResults,
      validateIdea,
      resetForm,
      currentSection,
      setCurrentSection
    }}>
      {children}
    </MindTrekContext.Provider>
  );
};

export const useMindTrek = () => {
  const context = useContext(MindTrekContext);
  if (context === undefined) {
    throw new Error('useMindTrek must be used within a MindTrekProvider');
  }
  return context;
};
