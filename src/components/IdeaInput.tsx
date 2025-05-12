
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import { useMindTrek } from "@/context/MindTrekContext";
import { toast } from "sonner";

export default function IdeaInput() {
  const { idea, setIdea, validateIdea, isLoading } = useMindTrek();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!idea.trim()) {
      toast.error("Please enter your idea before submitting");
      return;
    }
    
    validateIdea(idea);
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 pb-24 px-4">
      <div className="container max-w-4xl">
        <div className="text-center mb-8 animate-on-scroll">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Brain size={60} className="text-mindtrek-purple" />
              <div className="absolute inset-0 bg-mindtrek-purple/30 rounded-full blur-xl -z-10"></div>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-glow mb-4 gradient-text">
            Validate Your Next Big Idea
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Get instant feedback, comprehensive roadmaps, and everything you need to bring your idea to life.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="animate-on-scroll delay-100 mt-10">
          <div 
            className={`relative transition-all duration-300 rounded-xl ${
              isFocused ? 'shadow-glow-purple' : 'shadow-none'
            }`}
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-mindtrek-blue via-mindtrek-cyan to-mindtrek-purple opacity-30 blur-xl -z-10"></div>
            <textarea
              ref={inputRef}
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Describe your idea (e.g., an app for farmers to detect crop diseases)"
              className="w-full p-6 h-40 bg-mindtrek-card-bg border border-white/10 text-white rounded-xl focus:outline-none focus:ring-0 resize-none text-lg"
            />
          </div>

          <div className="flex justify-center mt-8">
            <Button
              type="submit"
              disabled={isLoading}
              className={`py-6 px-10 text-lg font-medium bg-gradient-to-r from-mindtrek-blue to-mindtrek-purple hover:opacity-90 transition-all duration-300 relative group ${
                isLoading ? 'animate-pulse' : ''
              }`}
            >
              <span className="relative z-10">
                {isLoading ? 'Analyzing...' : 'Analyze Idea'}
              </span>
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 rounded-md transition-opacity"></span>
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
