import { motion } from "framer-motion";
import { ShieldAlert, ShieldCheck, AlertTriangle } from "lucide-react";

interface AnalysisResult {
  attack_type: string;
  risk_score: number;
  security_grade: string;
  blocked: boolean;
  pii_detected: boolean;
  attack_patterns: string[];
  explanation: string;
  layer: string;
}

interface ResultCardProps {
  result: AnalysisResult;
}

const gradeColor = (grade: string) => {
  if (grade === "A") return "text-safe";
  if (grade === "B" || grade === "C") return "text-warning";
  return "text-destructive";
};

const riskBarColor = (score: number) => {
  if (score <= 30) return "bg-safe";
  if (score <= 60) return "bg-warning";
  return "bg-destructive";
};

const ResultCard = ({ result }: ResultCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-card border border-border rounded-xl p-6 space-y-6"
    >
      {/* Top row */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-destructive/20 text-destructive border border-destructive/30 uppercase tracking-wider">
          {result.attack_type.replace(/_/g, " ")}
        </span>
        <span className={`text-3xl font-black font-mono ${gradeColor(result.security_grade)}`}>
          {result.security_grade}
        </span>
        <span
          className={`ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider ${
            result.blocked
              ? "bg-destructive/20 text-destructive border border-destructive/30"
              : "bg-safe/20 text-safe border border-safe/30"
          }`}
        >
          {result.blocked ? <ShieldAlert className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
          {result.blocked ? "BLOCKED" : "ALLOWED"}
        </span>
      </div>

      {/* Risk score */}
      <div className="text-center space-y-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className={`text-6xl font-black font-mono ${
            result.risk_score > 60 ? "text-destructive" : result.risk_score > 30 ? "text-warning" : "text-safe"
          }`}
        >
          {result.risk_score}
        </motion.div>
        <p className="text-xs text-muted-foreground tracking-[0.3em] uppercase">Risk Score</p>
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${result.risk_score}%` }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className={`h-full rounded-full ${riskBarColor(result.risk_score)}`}
          />
        </div>
      </div>

      {/* Explanation */}
      <div className="space-y-2">
        <h3 className="text-xs text-muted-foreground tracking-[0.2em] uppercase">Explanation</h3>
        <p className="text-sm text-foreground/80 font-mono">{result.explanation}</p>
      </div>

      {/* Attack patterns */}
      <div className="space-y-2">
        <h3 className="text-xs text-muted-foreground tracking-[0.2em] uppercase">Attack Patterns Detected</h3>
        <div className="flex flex-wrap gap-2">
          {result.attack_patterns.map((p) => (
            <span
              key={p}
              className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-destructive/10 text-destructive border border-destructive/20"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* PII warning */}
      {result.pii_detected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 px-4 py-2 bg-warning/15 border border-warning/30 rounded-lg"
        >
          <AlertTriangle className="w-4 h-4 text-warning" />
          <span className="text-sm font-semibold text-warning">⚠️ PII Detected & Sanitized</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ResultCard;
