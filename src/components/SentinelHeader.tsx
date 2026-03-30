import { Shield, ShieldOff } from "lucide-react";

interface SentinelHeaderProps {
  active: boolean;
  onToggle: () => void;
}

const SentinelHeader = ({ active, onToggle }: SentinelHeaderProps) => {
  return (
    <div className="relative">
      {!active && (
        <div className="bg-destructive/90 text-destructive-foreground text-center py-2 text-sm font-semibold tracking-wide">
          ⚠️ SENTINEL PROTECTION DISABLED — ALL PROMPTS WILL PASS THROUGH UNFILTERED
        </div>
      )}
      <header className="flex items-center justify-between px-6 py-6 md:px-12">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground flex items-center gap-3">
            🛡️ SENTINEL AI
          </h1>
          <p className="text-muted-foreground text-sm mt-1 tracking-wide">
            Intelligent Deception Defense System
          </p>
          <div className="flex gap-2 mt-3">
            {["Powered by Groq", "Llama 3.3 70B", "<500ms"].map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={onToggle}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
            active
              ? "bg-safe/15 text-safe border border-safe/30"
              : "bg-destructive/15 text-destructive border border-destructive/30"
          }`}
        >
          {active ? <Shield className="w-4 h-4" /> : <ShieldOff className="w-4 h-4" />}
          SENTINEL: {active ? "ACTIVE" : "DISABLED"}
        </button>
      </header>
    </div>
  );
};

export default SentinelHeader;
