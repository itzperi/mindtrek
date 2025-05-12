
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MindTrekProvider } from "./context/MindTrekContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Import for framer-motion
import { AnimatePresence } from "framer-motion";

// Note: We don't need to import the CSS file separately as mermaid handles styling internally

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MindTrekProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </MindTrekProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
