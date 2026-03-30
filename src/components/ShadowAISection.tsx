import { motion } from "framer-motion";
import { Ghost } from "lucide-react";

interface ShadowAISectionProps {
  decoyResponse: string;
}

const ShadowAISection = ({ decoyResponse }: ShadowAISectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-shadow-ai border border-destructive/30 rounded-xl p-6 space-y-4"
    >
      <div className="flex items-center gap-2">
        <Ghost className="w-5 h-5 text-destructive" />
        <h2 className="text-lg font-bold text-destructive">🕵️ Shadow AI Activated</h2>
      </div>
      <p className="text-sm text-destructive/80">
        Attacker has been rerouted to Shadow AI sandbox
      </p>
      <div className="space-y-2">
        <h3 className="text-xs text-muted-foreground tracking-[0.2em] uppercase">
          Decoy Response Served to Attacker
        </h3>
        <div className="bg-background/50 border border-border rounded-lg p-4 font-mono text-sm text-foreground/70 leading-relaxed">
          {decoyResponse}
        </div>
      </div>
    </motion.div>
  );
};

export default ShadowAISection;
