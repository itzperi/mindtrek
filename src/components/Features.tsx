
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const features = [
  {
    title: "Idea Validation",
    description: "Get instant feedback on your idea's uniqueness and feasibility.",
    gradient: "from-blue-500 to-cyan-400"
  },
  {
    title: "Roadmap Generation",
    description: "Receive a detailed development roadmap to bring your vision to life.",
    gradient: "from-cyan-400 to-teal-400"
  },
  {
    title: "Wireframe Visualization",
    description: "See what your solution might look like with AI-generated wireframes.",
    gradient: "from-violet-500 to-purple-500"
  },
  {
    title: "Business Model Canvas",
    description: "Explore potential business models and monetization strategies.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Implementation Guide",
    description: "Get step-by-step instructions on how to start building.",
    gradient: "from-pink-500 to-red-500"
  },
  {
    title: "Launch Checklist",
    description: "Follow a comprehensive checklist to prepare for your product launch.",
    gradient: "from-amber-500 to-orange-500"
  }
];

export default function Features() {
  return (
    <section className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Turn Ideas into Reality
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            MindTrek provides everything you need to validate, plan, and launch your next big idea.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Card className="glass-card overflow-hidden h-full">
                <div className="p-6 relative z-10">
                  <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${feature.gradient}`}></div>
                  <div className={`h-12 w-12 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4`}>
                    <span className="text-white text-xl font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
