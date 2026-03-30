import { useState, useCallback } from "react";
import { toast } from "sonner";
import SentinelHeader from "@/components/SentinelHeader";
import AnalysisInput from "@/components/AnalysisInput";
import ResultCard from "@/components/ResultCard";
import ShadowAISection from "@/components/ShadowAISection";
import SessionStats from "@/components/SessionStats";
import { analyzePrompt, getShadowResponse } from "@/services/sentinel";

const Index = () => {
  const [active, setActive] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [decoy, setDecoy] = useState<string | null>(null);
  const [stats, setStats] = useState({ analyzed: 0, blocked: 0, safe: 0, shadow: 0 });
  const [sessionThreatScore, setSessionThreatScore] = useState(0);

  const analyze = useCallback(async () => {
    setLoading(true);
    setResult(null);
    setDecoy(null);

    try {
      const analysis = await analyzePrompt(prompt);

      // Layer 2: Behavioral memory — accumulate session threat score
      const scoreDeltas: Record<string, number> = {
        JAILBREAK: 30,
        PROMPT_INJECTION: 20,
        DATA_EXTRACTION: 10,
        PII_PROBE: 0,
        SAFE: 0,
      };
      const delta = scoreDeltas[analysis.attack_type] ?? 0;
      const newThreatScore = sessionThreatScore + delta;
      setSessionThreatScore(newThreatScore);

      // When CRITICAL (>80): boost DATA_EXTRACTION risk by +20
      if (newThreatScore > 80 && analysis.attack_type === "DATA_EXTRACTION") {
        analysis.risk_score = Math.min(100, analysis.risk_score + 20);
        if (!analysis.blocked) {
          analysis.blocked = true;
          analysis.security_grade = "F";
        }
      }

      setResult(analysis);
      setStats((s) => ({
        analyzed: s.analyzed + 1,
        blocked: s.blocked + (analysis.blocked ? 1 : 0),
        safe: s.safe + (analysis.blocked ? 0 : 1),
        shadow: s.shadow + (analysis.blocked ? 1 : 0),
      }));

      if (analysis.blocked) {
        const shadowResponse = await getShadowResponse(prompt);
        setDecoy(shadowResponse);
      }
    } catch (e) {
      console.error("Analysis failed:", e);
      toast.error("Analysis failed. Check your API key or try again.");
    } finally {
      setLoading(false);
    }
  }, [prompt]);

  return (
    <div className="min-h-screen flex flex-col">
      <SentinelHeader active={active} onToggle={() => setActive((a) => !a)} />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-8 space-y-6">
        <AnalysisInput
          prompt={prompt}
          onPromptChange={setPrompt}
          onAnalyze={analyze}
          loading={loading}
          disabled={!active}
        />

        {result && <ResultCard result={result} />}
        {result?.blocked && decoy && <ShadowAISection decoyResponse={decoy} />}
      </main>

      <footer className="max-w-2xl w-full mx-auto px-4 pb-6">
        <SessionStats
          analyzed={stats.analyzed}
          blocked={stats.blocked}
          safe={stats.safe}
          shadowActivations={stats.shadow}
          sessionThreatScore={sessionThreatScore}
        />
      </footer>
    </div>
  );
};

export default Index;
