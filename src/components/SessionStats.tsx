interface SessionStatsProps {
  analyzed: number;
  blocked: number;
  safe: number;
  shadowActivations: number;
  sessionThreatScore: number;
}

const trustLevel = (score: number) => {
  if (score > 80) return { label: "CRITICAL", cls: "bg-destructive/15 text-destructive border-destructive/30" };
  if (score > 50) return { label: "ELEVATED", cls: "bg-warning/15 text-warning border-warning/30" };
  return { label: "LOW RISK", cls: "bg-safe/15 text-safe border-safe/30" };
};

const SessionStats = ({ analyzed, blocked, safe, shadowActivations, sessionThreatScore }: SessionStatsProps) => {
  const trust = trustLevel(sessionThreatScore);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-card border border-border rounded-xl text-xs font-mono text-muted-foreground">
      <div className="flex flex-wrap gap-4">
        <span>Prompts Analyzed: <strong className="text-foreground">{analyzed}</strong></span>
        <span>Attacks Blocked: <strong className="text-destructive">{blocked}</strong></span>
        <span>Safe: <strong className="text-safe">{safe}</strong></span>
        <span>Shadow AI Activations: <strong className="text-foreground">{shadowActivations}</strong></span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-foreground font-bold">{sessionThreatScore}</span>
        <span className={`px-3 py-1 rounded-full font-bold border text-xs tracking-wider ${trust.cls}`}>
          {trust.label}
        </span>
      </div>
    </div>
  );
};

export default SessionStats;
