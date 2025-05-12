
import { useEffect } from "react";
import { useMindTrek } from "@/context/MindTrekContext";
import Navbar from "@/components/Navbar";
import IdeaInput from "@/components/IdeaInput";
import LoadingAnimation from "@/components/LoadingAnimation";
import ResultsDashboard from "@/components/ResultsDashboard";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const Index = () => {
  const { isLoading, isSubmitted } = useMindTrek();

  useEffect(() => {
    document.title = "MindTrek | AI-powered Idea Validator & Roadmap Generator";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-mindtrek-dark-bg">
      <Navbar />
      
      <main className="flex-grow">
        {!isSubmitted && <IdeaInput />}
        
        {isLoading && <LoadingAnimation />}
        
        {isSubmitted && !isLoading && <ResultsDashboard />}
        
        {!isSubmitted && !isLoading && <Features />}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
