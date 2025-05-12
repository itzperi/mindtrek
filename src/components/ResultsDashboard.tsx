
import { useState } from "react";
import { useMindTrek } from "@/context/MindTrekContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Brain, CheckSquare, Code, FileBarChart2, LightbulbIcon, LayoutGrid, Rocket, SearchCode } from "lucide-react";
import { motion } from "framer-motion";

// Using dynamic import for mermaid
import dynamic from "next/dynamic";
const Mermaid = dynamic(
  () => import("./Mermaid"),
  { ssr: false, loading: () => <div className="h-60 w-full bg-mindtrek-card-bg/50 rounded-lg animate-pulse"></div> }
);

export default function ResultsDashboard() {
  const { ideaResults, idea, currentSection, setCurrentSection } = useMindTrek();
  const [copied, setCopied] = useState(false);

  if (!ideaResults) return null;

  const handleCopyText = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`${type} copied to clipboard!`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    // Mock PDF download - would be implemented with a PDF generation library
    toast.success("PDF download started");
  };

  const scoreVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="container max-w-6xl py-12 mt-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Idea Analysis Results</h2>
        <p className="text-white/70 text-lg max-w-2xl mx-auto mb-2">
          "{idea.length > 100 ? idea.substring(0, 100) + '...' : idea}"
        </p>
        {ideaResults.ideaSummary && (
          <p className="text-white/90 text-lg max-w-3xl mx-auto font-medium">
            Summary: {ideaResults.ideaSummary}
          </p>
        )}
      </div>

      <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          className="glass-card p-6 rounded-xl"
          initial="hidden"
          animate="visible"
          variants={scoreVariants}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-medium text-white">Uniqueness Score</h3>
            <div className="relative">
              <div className="absolute inset-0 bg-mindtrek-blue/20 rounded-full blur-md"></div>
              <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-r from-mindtrek-blue to-mindtrek-cyan flex items-center justify-center text-xl font-bold">
                {ideaResults.uniquenessScore}
              </div>
            </div>
          </div>
          <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-mindtrek-blue to-mindtrek-cyan" 
              style={{ width: `${ideaResults.uniquenessScore}%` }}
            ></div>
          </div>
          <p className="mt-3 text-white/60 text-sm">
            Your idea shows originality compared to similar projects
          </p>
        </motion.div>

        <motion.div 
          className="glass-card p-6 rounded-xl"
          initial="hidden"
          animate="visible"
          variants={scoreVariants}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-medium text-white">Feasibility Score</h3>
            <div className="relative">
              <div className="absolute inset-0 bg-mindtrek-purple/20 rounded-full blur-md"></div>
              <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-r from-mindtrek-cyan to-mindtrek-purple flex items-center justify-center text-xl font-bold">
                {ideaResults.feasibilityScore}
              </div>
            </div>
          </div>
          <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-mindtrek-cyan to-mindtrek-purple" 
              style={{ width: `${ideaResults.feasibilityScore}%` }}
            ></div>
          </div>
          <p className="mt-3 text-white/60 text-sm">
            How implementable your idea is with current technologies
          </p>
        </motion.div>
      </div>

      {/* Similar projects section */}
      {ideaResults.existingProjects && ideaResults.existingProjects.length > 0 && (
        <Card className="bg-mindtrek-card-bg border-white/10 mb-12">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
                <SearchCode className="w-6 h-6 text-mindtrek-blue" /> Similar Projects
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ideaResults.existingProjects.map((project, index) => (
                <motion.div 
                  key={index}
                  className="glass-card p-4 rounded-lg"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <h4 className="text-lg font-medium text-white">{project.name}</h4>
                  <p className="text-white/70 text-sm mt-1">{project.description}</p>
                  <div className="flex justify-between items-center mt-3">
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-mindtrek-blue hover:text-mindtrek-cyan text-sm"
                    >
                      View Project
                    </a>
                    <span className="text-white/50 text-sm">
                      Similarity: {project.similarity}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Innovative twists section */}
      {ideaResults.innovativeTwists && ideaResults.innovativeTwists.length > 0 && (
        <Card className="bg-mindtrek-card-bg border-white/10 mb-12">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
                <LightbulbIcon className="w-6 h-6 text-mindtrek-purple" /> Innovative Twists
              </h3>
            </div>
            <motion.ul 
              className="space-y-4"
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              {ideaResults.innovativeTwists.map((twist, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start gap-3 p-4 glass-card rounded-lg"
                  variants={itemVariants}
                >
                  <div className="relative mt-1">
                    <div className="absolute inset-0 bg-mindtrek-purple/20 rounded-full blur-md"></div>
                    <div className="relative z-10 w-8 h-8 rounded-full bg-gradient-to-r from-mindtrek-cyan to-mindtrek-purple flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="mt-1">
                    <p className="text-white/90">{twist}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </CardContent>
        </Card>
      )}

      {/* Tech stack section */}
      {ideaResults.techStack && ideaResults.techStack.length > 0 && (
        <Card className="bg-mindtrek-card-bg border-white/10 mb-12">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
                <Code className="w-6 h-6 text-mindtrek-blue" /> Recommended Tech Stack
              </h3>
              <Button 
                variant="outline" 
                size="sm"
                className="text-white/80 border-white/10 hover:bg-white/5"
                onClick={() => handleCopyText(ideaResults.techStack.join("\n"), "Tech Stack")}
              >
                Copy
              </Button>
            </div>
            <motion.ul 
              className="space-y-2"
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              {ideaResults.techStack.map((tech, index) => (
                <motion.li 
                  key={index} 
                  className="text-white/80"
                  variants={itemVariants}
                >
                  {tech}
                </motion.li>
              ))}
            </motion.ul>
          </CardContent>
        </Card>
      )}

      <Tabs value={currentSection} onValueChange={setCurrentSection} className="w-full">
        <div className="flex justify-center mb-8 overflow-x-auto md:overflow-visible">
          <TabsList className="bg-mindtrek-card-bg/50 p-1">
            <TabsTrigger value="roadmap" className="data-[state=active]:bg-white/10">
              Roadmap
            </TabsTrigger>
            <TabsTrigger value="wireframe" className="data-[state=active]:bg-white/10">
              Wireframe
            </TabsTrigger>
            <TabsTrigger value="business" className="data-[state=active]:bg-white/10">
              Business Model
            </TabsTrigger>
            <TabsTrigger value="start" className="data-[state=active]:bg-white/10">
              How to Start
            </TabsTrigger>
            <TabsTrigger value="launch" className="data-[state=active]:bg-white/10">
              Launch Checklist
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="roadmap" className="mt-0">
          <Card className="bg-mindtrek-card-bg border-white/10">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
                  <LayoutGrid className="w-6 h-6 text-mindtrek-blue" /> Development Roadmap
                </h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-white/80 border-white/10 hover:bg-white/5"
                  onClick={() => handleCopyText(ideaResults.roadmap.join("\n"), "Roadmap")}
                >
                  Copy
                </Button>
              </div>
              <motion.ul 
                className="space-y-4"
                variants={listVariants}
                initial="hidden"
                animate="visible"
              >
                {ideaResults.roadmap.map((step, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start gap-3"
                    variants={itemVariants}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-mindtrek-blue/20 rounded-full blur-md"></div>
                      <div className="relative z-10 w-8 h-8 rounded-full bg-gradient-to-r from-mindtrek-blue to-mindtrek-cyan flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="mt-1">
                      <p className="text-white/80">{step.replace(/^\d+\.\s/, '')}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wireframe" className="mt-0">
          <Card className="bg-mindtrek-card-bg border-white/10">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
                  <FileBarChart2 className="w-6 h-6 text-mindtrek-cyan" /> Wireframe Visualization
                </h3>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-white/80 border-white/10 hover:bg-white/5"
                    onClick={() => handleCopyText(ideaResults.wireframe, "Wireframe code")}
                  >
                    Copy Code
                  </Button>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden bg-black/20 p-4">
                <Mermaid chart={ideaResults.wireframe} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business" className="mt-0">
          <Card className="bg-mindtrek-card-bg border-white/10">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
                  <Brain className="w-6 h-6 text-mindtrek-purple" /> Business Model
                </h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-white/80 border-white/10 hover:bg-white/5"
                  onClick={() => handleCopyText(ideaResults.businessModel.join("\n"), "Business model")}
                >
                  Copy
                </Button>
              </div>
              <motion.ul 
                className="space-y-4"
                variants={listVariants}
                initial="hidden"
                animate="visible"
              >
                {ideaResults.businessModel.map((item, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start gap-3 p-3 glass-card rounded-lg"
                    variants={itemVariants}
                  >
                    <div className="mt-1 text-white/90">{item}</div>
                  </motion.li>
                ))}
              </motion.ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="start" className="mt-0">
          <Card className="bg-mindtrek-card-bg border-white/10">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
                  <Rocket className="w-6 h-6 text-mindtrek-cyan" /> How to Start
                </h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-white/80 border-white/10 hover:bg-white/5"
                  onClick={() => handleCopyText(ideaResults.howToStart.join("\n"), "Start guide")}
                >
                  Copy
                </Button>
              </div>
              <motion.ol 
                className="space-y-4"
                variants={listVariants}
                initial="hidden"
                animate="visible"
              >
                {ideaResults.howToStart.map((step, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start gap-3"
                    variants={itemVariants}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-mindtrek-cyan/20 rounded-full blur-md"></div>
                      <div className="relative z-10 w-8 h-8 rounded-full bg-gradient-to-r from-mindtrek-cyan to-mindtrek-purple flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="mt-1">
                      <p className="text-white/80">{step.replace(/^\d+\.\s/, '')}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ol>

              <div className="mt-8 p-4 glass-card rounded-lg border border-mindtrek-cyan/30">
                <div className="flex items-start gap-3">
                  <div className="relative mt-1">
                    <Brain className="w-5 h-5 text-mindtrek-cyan" />
                    <div className="absolute inset-0 bg-mindtrek-cyan/30 rounded-full blur-md -z-10"></div>
                  </div>
                  <div className="w-full">
                    <h4 className="text-lg font-medium text-white mb-2">GitHub Repository Structure</h4>
                    <pre className="bg-black/20 p-3 rounded-md text-white/70 overflow-x-auto text-sm w-full">
                      {ideaResults.githubPlan}
                    </pre>
                    <div className="mt-4 flex justify-end">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-white/80 border-white/10 hover:bg-white/5"
                        onClick={() => handleCopyText(ideaResults.githubPlan, "GitHub plan")}
                      >
                        Copy Structure
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="launch" className="mt-0">
          <Card className="bg-mindtrek-card-bg border-white/10">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
                  <CheckSquare className="w-6 h-6 text-mindtrek-cyan" /> Launch Checklist
                </h3>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-white/80 border-white/10 hover:bg-white/5"
                    onClick={() => handleCopyText(ideaResults.launchChecklist.join("\n"), "Launch checklist")}
                  >
                    Copy List
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm"
                    className="bg-gradient-to-r from-mindtrek-blue to-mindtrek-purple"
                    onClick={handleDownloadPDF}
                  >
                    Download PDF
                  </Button>
                </div>
              </div>
              <motion.ul 
                className="space-y-3"
                variants={listVariants}
                initial="hidden"
                animate="visible"
              >
                {ideaResults.launchChecklist.map((item, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-center gap-3 p-3 glass-card rounded-lg"
                    variants={itemVariants}
                  >
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-white/30 bg-white/5 text-mindtrek-purple"
                    />
                    <span className="text-white/80">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
