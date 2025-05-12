
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { idea } = await req.json();
    
    if (!idea) {
      return new Response(
        JSON.stringify({ error: "No idea provided" }),
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    console.log("Processing idea:", idea);

    // In a production environment, we would actually query GitHub and Product Hunt APIs here
    // For now, we'll generate mock data that matches the expected structure

    // Generate idea summary (in a real implementation, this would use a model like GPT)
    const ideaSummary = `A${/^[aeiou]/i.test(idea.trim()) ? 'n' : ''} ${idea.trim().toLowerCase().includes("app") ? '' : 'app for '} ${idea.trim()}`;
    
    // Determine uniqueness and feasibility scores
    const uniquenessScore = Math.floor(Math.random() * 30) + 70; // 70-100
    const feasibilityScore = Math.floor(Math.random() * 20) + 80; // 80-100

    // Mock existing projects data
    const mockExistingProjects = [
      {
        name: generateRandomProjectName(idea),
        description: `Similar to ${idea}, but focuses on ${generateRandomFeature(idea)}`,
        url: "https://github.com/example/project1",
        similarity: Math.floor(Math.random() * 30) + 50 // 50-80% similarity
      },
      {
        name: generateRandomProjectName(idea),
        description: `${idea} with additional ${generateRandomFeature(idea)}`,
        url: "https://github.com/example/project2",
        similarity: Math.floor(Math.random() * 20) + 40 // 40-60% similarity
      }
    ];

    // Innovative twists
    const innovativeTwists = [
      `Integrate AI to automatically ${generateRandomImprovement(idea)}`,
      `Add social features allowing users to ${generateRandomSocialFeature(idea)}`,
      `Create a marketplace where ${generateRandomMarketplaceFeature(idea)}`
    ];

    // Generate development roadmap
    const roadmap = [
      // Week 1: Design
      "1. Research target users and market needs (2 days)",
      "2. Create user personas and user journey maps (1 day)",
      "3. Design wireframes and mockups (2 days)",
      "4. Get feedback on design from potential users (1 day)",
      "5. Finalize MVP feature list (1 day)",
      
      // Week 2: Development
      "6. Set up development environment and project structure (1 day)",
      "7. Implement core functionality (3 days)",
      "8. Create basic UI components (1 day)",
      "9. Connect backend services and APIs (1 day)",
      "10. Internal testing and bug fixes (1 day)",
      
      // Week 3: Launch/Feedback
      "11. Deploy to staging environment (1 day)",
      "12. Conduct user acceptance testing (1 day)",
      "13. Make improvements based on feedback (2 days)",
      "14. Prepare marketing materials (1 day)",
      "15. Launch MVP and collect initial user feedback (1 day)"
    ];

    // Generate wireframe in Mermaid.js format
    const wireframe = generateMermaidWireframe(idea);

    // Recommended tech stack
    const techStack = generateTechStack(idea);

    // Business model
    const businessModel = [
      `Target Users: ${generateTargetUsers(idea)}`,
      `Value Proposition: ${generateValueProposition(idea)}`,
      `Revenue Stream: ${generateRevenueStream(idea)}`,
      `Marketing Strategy: ${generateMarketingStrategy(idea)}`,
      `Competitive Advantage: ${generateCompetitiveAdvantage(idea)}`
    ];

    // How to start guide
    const howToStart = [
      "1. Learn the fundamentals of web/mobile development (1-2 weeks)",
      "2. Set up your development environment with the recommended tech stack (1 day)",
      "3. Create a GitHub repository with a clear README and project structure (1 day)",
      "4. Build a simple prototype focusing on core functionality (1 week)",
      "5. Join relevant online communities to network and get feedback (ongoing)",
      "6. Find a mentor or co-founder with experience in this domain (2-4 weeks)",
      "7. Create a simple landing page to gauge interest (2-3 days)"
    ];

    // Launch checklist
    const launchChecklist = [
      "Register a domain name",
      "Set up hosting and deployment pipeline",
      "Create social media accounts",
      "Write documentation and help guides",
      "Prepare press kit and promotional materials",
      "Set up analytics to track user behavior",
      "Create a feedback collection system",
      "Plan an initial marketing push",
      "Set up a system for bug reporting",
      "Prepare a roadmap for post-MVP features"
    ];

    // GitHub repository structure
    const githubPlan = `
# ${ideaSummary.charAt(0).toUpperCase() + ideaSummary.slice(1)}

${idea}

## Project Structure
- /src
  - /components
  - /pages
  - /services
  - /hooks
  - /utils
  - /assets
  - /styles
- /docs
- /tests
- /public

## Tech Stack
${techStack.join('\n')}

## Getting Started
1. Clone this repository
2. Install dependencies with \`npm install\`
3. Run development server with \`npm run dev\`
4. Open http://localhost:3000 to view it in the browser

## Contributing
We welcome contributions! Please see our contributing guide for details.
    `;

    const result = {
      idea_summary: ideaSummary,
      uniqueness_score: uniquenessScore,
      feasibility_score: feasibilityScore,
      existing_projects: mockExistingProjects,
      innovative_twists: innovativeTwists,
      roadmap,
      wireframe,
      tech_stack: techStack,
      business_model: businessModel,
      how_to_start: howToStart,
      github_plan: githubPlan,
      launch_checklist: launchChecklist
    };

    // Store the result in Supabase
    const supabaseUrl = "https://lkkzsqcnwmjokqsqaqdz.supabase.co";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log("Storing idea analysis in Supabase");
    
    // Store the result in the database
    const { data, error } = await supabase
      .from("ideas")
      .insert({
        idea_text: idea,
        uniqueness_score: uniquenessScore,
        feasibility_score: feasibilityScore,
        existing_projects: mockExistingProjects,
        roadmap,
        wireframe,
        business_model: businessModel,
        how_to_start: howToStart,
        github_plan: githubPlan,
        launch_checklist: launchChecklist,
        status: "completed"
      });

    if (error) {
      console.error("Error saving to database:", error);
    }

    return new Response(
      JSON.stringify(result),
      { 
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
    
  } catch (error) {
    console.error("Error processing request:", error);
    
    return new Response(
      JSON.stringify({ error: "Internal Server Error", details: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});

// Helper functions for generating mock data
function generateRandomProjectName(idea) {
  const prefixes = ["Smart", "Quick", "Easy", "Pro", "Insta", "Ultra", "Meta", "Hyper", "Quantum", "Super"];
  const words = idea.split(" ").filter(word => word.length > 3);
  const baseWord = words.length > 0 ? words[Math.floor(Math.random() * words.length)] : "App";
  return `${prefixes[Math.floor(Math.random() * prefixes.length)]}${baseWord.charAt(0).toUpperCase() + baseWord.slice(1)}`;
}

function generateRandomFeature(idea) {
  const features = [
    "machine learning capabilities", 
    "blockchain integration", 
    "AR/VR features", 
    "social networking", 
    "real-time analytics", 
    "gamification elements", 
    "subscription options", 
    "mobile-first approach", 
    "voice commands", 
    "recommendation engine"
  ];
  return features[Math.floor(Math.random() * features.length)];
}

function generateRandomImprovement(idea) {
  const improvements = [
    "predict user needs", 
    "optimize performance", 
    "personalize recommendations", 
    "automate repetitive tasks", 
    "enhance data visualization", 
    "improve decision-making", 
    "streamline workflow", 
    "reduce costs", 
    "increase engagement", 
    "scale operations"
  ];
  return improvements[Math.floor(Math.random() * improvements.length)];
}

function generateRandomSocialFeature(idea) {
  const socialFeatures = [
    "share their achievements", 
    "collaborate on projects", 
    "engage in friendly competitions", 
    "form communities of interest", 
    "mentor each other", 
    "rate and review services", 
    "create and share content", 
    "participate in challenges", 
    "build professional networks", 
    "exchange tips and tricks"
  ];
  return socialFeatures[Math.floor(Math.random() * socialFeatures.length)];
}

function generateRandomMarketplaceFeature(idea) {
  const marketplaceFeatures = [
    "users can buy and sell related products", 
    "professionals can offer their services", 
    "creators can monetize their content", 
    "companies can advertise relevant solutions", 
    "experts can provide consulting services", 
    "users can exchange resources", 
    "brands can sponsor user activities", 
    "developers can sell plugins and extensions", 
    "influencers can promote featured items", 
    "users can trade digital assets"
  ];
  return marketplaceFeatures[Math.floor(Math.random() * marketplaceFeatures.length)];
}

function generateMermaidWireframe(idea) {
  // Create a mermaid.js flowchart based on the type of idea
  const lowerIdea = idea.toLowerCase();
  
  if (lowerIdea.includes("app") || lowerIdea.includes("mobile")) {
    // Mobile app wireframe
    return `graph TD
    A[Home Screen] --> B[Feature 1]
    A --> C[Feature 2]
    A --> D[Settings]
    B --> E[Sub-Feature 1.1]
    B --> F[Sub-Feature 1.2]
    C --> G[Sub-Feature 2.1]
    D --> H[Profile]
    D --> I[Preferences]
    H --> J[Edit Profile]`;
  } 
  else if (lowerIdea.includes("website") || lowerIdea.includes("web") || lowerIdea.includes("platform")) {
    // Website wireframe
    return `graph TD
    A[Landing Page] --> B[Features]
    A --> C[Pricing]
    A --> D[About Us]
    A --> E[Login/Signup]
    E --> F[Dashboard]
    F --> G[User Profile]
    F --> H[Main Feature]
    F --> I[Analytics]
    H --> J[Sub-Feature 1]
    H --> K[Sub-Feature 2]`;
  }
  else if (lowerIdea.includes("ai") || lowerIdea.includes("machine learning") || lowerIdea.includes("analytics")) {
    // AI/Analytics product wireframe
    return `graph TD
    A[Dashboard] --> B[Data Input]
    A --> C[Analysis Results]
    A --> D[Settings]
    B --> E[Manual Entry]
    B --> F[Import Data]
    C --> G[Visualizations]
    C --> H[Insights]
    C --> I[Export]
    D --> J[Model Settings]
    D --> K[User Preferences]`;
  }
  else {
    // Generic product wireframe
    return `graph TD
    A[Homepage] --> B[Core Feature]
    A --> C[Secondary Feature]
    A --> D[User Account]
    B --> E[Feature Details]
    B --> F[Actions]
    C --> G[Sub-Feature]
    D --> H[Profile]
    D --> I[Settings]
    F --> J[Results]`;
  }
}

function generateTechStack(idea) {
  const lowerIdea = idea.toLowerCase();
  const stack = [];
  
  // Frontend
  if (lowerIdea.includes("mobile") || lowerIdea.includes("app")) {
    stack.push("- Frontend: React Native / Flutter");
  } else {
    stack.push("- Frontend: React.js with Next.js");
  }
  
  // Backend
  if (lowerIdea.includes("ai") || lowerIdea.includes("machine learning")) {
    stack.push("- Backend: Python (Flask/FastAPI), Node.js");
  } else if (lowerIdea.includes("scale") || lowerIdea.includes("enterprise")) {
    stack.push("- Backend: Java Spring Boot / Go");
  } else {
    stack.push("- Backend: Node.js with Express");
  }
  
  // Database
  if (lowerIdea.includes("data") || lowerIdea.includes("analytics")) {
    stack.push("- Database: PostgreSQL, MongoDB for analytics");
  } else if (lowerIdea.includes("real-time") || lowerIdea.includes("chat")) {
    stack.push("- Database: Firebase Firestore / MongoDB");
  } else {
    stack.push("- Database: Supabase (PostgreSQL)");
  }
  
  // Additional services
  stack.push("- Authentication: Supabase Auth / Auth0");
  
  if (lowerIdea.includes("payment") || lowerIdea.includes("subscription")) {
    stack.push("- Payments: Stripe");
  }
  
  if (lowerIdea.includes("email") || lowerIdea.includes("notification")) {
    stack.push("- Notifications: SendGrid / Twilio");
  }
  
  if (lowerIdea.includes("analytics") || lowerIdea.includes("tracking")) {
    stack.push("- Analytics: Google Analytics / Mixpanel");
  }
  
  if (lowerIdea.includes("ai") || lowerIdea.includes("machine learning")) {
    stack.push("- AI/ML: TensorFlow / PyTorch / OpenAI API");
  }
  
  if (lowerIdea.includes("file") || lowerIdea.includes("upload") || lowerIdea.includes("image")) {
    stack.push("- Storage: AWS S3 / Cloudinary");
  }
  
  // Deployment
  stack.push("- Deployment: Vercel / Netlify for frontend, Docker with AWS/GCP for backend");
  
  return stack;
}

function generateTargetUsers(idea) {
  const lowerIdea = idea.toLowerCase();
  
  if (lowerIdea.includes("business") || lowerIdea.includes("enterprise")) {
    return "Small to medium-sized businesses and enterprise clients";
  } else if (lowerIdea.includes("developer") || lowerIdea.includes("code")) {
    return "Software engineers, developers and technical teams";
  } else if (lowerIdea.includes("design") || lowerIdea.includes("creative")) {
    return "Designers, creators and creative professionals";
  } else if (lowerIdea.includes("health") || lowerIdea.includes("fitness")) {
    return "Health-conscious individuals and fitness enthusiasts";
  } else if (lowerIdea.includes("education") || lowerIdea.includes("learn")) {
    return "Students, educators and lifelong learners";
  } else if (lowerIdea.includes("finance") || lowerIdea.includes("money")) {
    return "Financial professionals and individuals managing personal finances";
  } else {
    return "Tech-savvy early adopters and general consumers seeking innovative solutions";
  }
}

function generateValueProposition(idea) {
  const valueProps = [
    `Save time and increase efficiency by automating ${idea.toLowerCase().includes("automat") ? "key processes" : "manual tasks"}`,
    `Gain valuable insights through advanced analytics and visualization`,
    `Streamline workflow and improve collaboration among team members`,
    `Reduce costs while improving quality and performance`,
    `Enhance user experience with intuitive design and personalization`,
    `Access powerful tools previously only available to large enterprises`,
    `Connect with a community of like-minded individuals`,
    `Make better decisions with data-driven recommendations`,
    `Simplify complex processes into manageable steps`,
    `Achieve goals faster with targeted guidance and support`
  ];
  
  return valueProps[Math.floor(Math.random() * valueProps.length)];
}

function generateRevenueStream(idea) {
  const revenueStreams = [
    "Freemium model with premium features available through subscription",
    "Monthly subscription with tiered pricing based on usage or features",
    "One-time purchase with optional add-ons",
    "Transaction fees on marketplace exchanges",
    "B2B SaaS model with annual contracts",
    "Free for basic users, paid for enterprise clients",
    "Ad-supported free tier with ad-free premium option",
    "Affiliate marketing and referral partnerships",
    "Usage-based pricing model",
    "White-label licensing for enterprise customers"
  ];
  
  return revenueStreams[Math.floor(Math.random() * revenueStreams.length)];
}

function generateMarketingStrategy(idea) {
  const strategies = [
    "Content marketing through blog posts, ebooks, and tutorials",
    "Social media marketing focusing on platform-specific content",
    "Search engine optimization (SEO) to drive organic traffic",
    "Referral program incentivizing users to invite others",
    "Partnerships with complementary services and influencers",
    "Community building through events and online forums",
    "Email marketing with personalized campaigns",
    "Free trials and demos to showcase value",
    "Product hunt launch and tech community outreach",
    "Targeted paid advertising on relevant platforms"
  ];
  
  return strategies[Math.floor(Math.random() * strategies.length)];
}

function generateCompetitiveAdvantage(idea) {
  const advantages = [
    "Proprietary technology that improves efficiency by 30%",
    "Unique approach combining multiple disciplines for better results",
    "First-mover advantage in an emerging market segment",
    "Superior user experience based on extensive research",
    "More affordable solution without sacrificing quality",
    "Integration capabilities with existing popular tools",
    "Specialized focus on an underserved niche market",
    "Data-driven insights unavailable from competitors",
    "Stronger privacy and security measures",
    "Open ecosystem encouraging third-party development"
  ];
  
  return advantages[Math.floor(Math.random() * advantages.length)];
}
