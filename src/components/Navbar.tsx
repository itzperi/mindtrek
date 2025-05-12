
import { Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMindTrek } from "@/context/MindTrekContext";

export default function Navbar() {
  const { resetForm, isSubmitted } = useMindTrek();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-mindtrek-dark-bg/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Brain className="w-7 h-7 text-mindtrek-purple animate-pulse-glow" />
            <div className="absolute inset-0 bg-mindtrek-purple/30 rounded-full blur-md -z-10"></div>
          </div>
          <h1 className="text-xl font-bold gradient-text">MindTrek</h1>
        </div>
        
        <div className="flex items-center gap-3">
          {isSubmitted && (
            <Button 
              variant="outline" 
              className="text-white/80 border-white/10 hover:bg-white/5" 
              onClick={resetForm}
            >
              New Idea
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
