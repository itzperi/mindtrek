
import { Brain } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-8 border-t border-white/10 bg-mindtrek-dark-bg/50 mt-auto">
      <div className="container max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="relative">
              <Brain className="w-5 h-5 text-mindtrek-purple" />
              <div className="absolute inset-0 bg-mindtrek-purple/30 rounded-full blur-md -z-10"></div>
            </div>
            <span className="font-bold gradient-text">MindTrek</span>
          </div>
          
          <div className="text-white/50 text-sm">
            © {new Date().getFullYear()} MindTrek. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
