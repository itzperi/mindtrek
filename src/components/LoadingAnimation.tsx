
import { Brain } from "lucide-react";
import { useMindTrek } from "@/context/MindTrekContext";

const phases = [
  "Analyzing idea feasibility...",
  "Searching similar projects...",
  "Calculating uniqueness score...",
  "Generating development roadmap...",
  "Creating wireframe visualization...",
  "Drafting business model options...",
  "Preparing implementation guides..."
];

export default function LoadingAnimation() {
  const { idea } = useMindTrek();
  
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-mindtrek-blue to-mindtrek-purple opacity-50 blur-2xl"></div>
        <div className="relative z-10 animate-spin-slow">
          <Brain size={80} className="text-white" />
        </div>
        <div className="absolute inset-0 bg-white/5 rounded-full animate-ping"></div>
      </div>
      
      <div className="text-center max-w-md">
        <h3 className="text-2xl font-bold mb-3 gradient-text">Processing Your Idea</h3>
        <p className="text-white/60 mb-6">{idea.slice(0, 50)}{idea.length > 50 ? '...' : ''}</p>
        
        <div className="space-y-4">
          {phases.map((phase, index) => (
            <div 
              key={index} 
              className={`flex items-center space-x-3 transition-all duration-300 ${
                index === Math.min(Math.floor(Date.now() / 1000) % phases.length, phases.length - 1) 
                  ? 'text-white' 
                  : 'text-white/40'
              }`}
            >
              <div 
                className={`w-2 h-2 rounded-full ${
                  index === Math.min(Math.floor(Date.now() / 1000) % phases.length, phases.length - 1)
                    ? 'bg-mindtrek-cyan animate-pulse'
                    : 'bg-white/30'
                }`}
              ></div>
              <span>{phase}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
