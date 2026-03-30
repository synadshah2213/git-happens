import { Loader2, Zap } from "lucide-react";

interface AnalysisInputProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onAnalyze: () => void;
  loading: boolean;
  disabled: boolean;
}

const AnalysisInput = ({ prompt, onPromptChange, onAnalyze, loading, disabled }: AnalysisInputProps) => {
  return (
    <div className="space-y-4">
      <textarea
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        placeholder="Enter prompt to analyze..."
        rows={4}
        className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
      />
      <button
        onClick={onAnalyze}
        disabled={loading || disabled || !prompt.trim()}
        className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3 rounded-lg text-sm tracking-wider hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed glow-primary"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            ANALYZING...
          </>
        ) : (
          <>
            <Zap className="w-4 h-4" />
            ANALYZE THREAT
          </>
        )}
      </button>
    </div>
  );
};

export default AnalysisInput;
