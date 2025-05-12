
import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  chart: string;
}

const Mermaid = ({ chart }: MermaidProps) => {
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chart || !mermaidRef.current) return;

    // Configure and initialize mermaid
    mermaid.initialize({
      startOnLoad: true,
      theme: 'dark',
      securityLevel: 'loose',
      themeVariables: {
        primaryColor: '#0f172a',
        primaryTextColor: '#ffffff',
        primaryBorderColor: '#334155',
        lineColor: '#94a3b8',
        secondaryColor: '#1e293b',
        tertiaryColor: '#020617',
        backgroundColor: 'transparent'
      }
    });
    
    // Reset the container
    if (mermaidRef.current) {
      mermaidRef.current.innerHTML = chart;
    }
    
    // Render the diagram
    try {
      mermaid.run({
        nodes: [mermaidRef.current]
      });
    } catch (error) {
      console.error('Mermaid rendering error:', error);
    }
  }, [chart]);

  return (
    <div className="mermaid-container w-full overflow-x-auto p-4">
      <div ref={mermaidRef} className="mermaid"></div>
    </div>
  );
};

export default Mermaid;
