import { useState, useCallback } from "react";
import SentinelHeader from "@/components/SentinelHeader";
import AnalysisInput from "@/components/AnalysisInput";
import ResultCard from "@/components/ResultCard";
import ShadowAISection from "@/components/ShadowAISection";
import SessionStats from "@/components/SessionStats";

const MOCK_RESULT = {
  attack_type: "JAILBREAK",
  risk_score: 92,
  security_grade: "F",
  blocked: true,
  pii_detected: false,
  attack_patterns: ["Role Override", "Unrestricted AI Request", "DAN Pattern"],
  explanation: "User attempted DAN jailbreak to remove all safety restrictions.",
  layer: "LAYER_1_SEMANTIC",
};

const DECOY_RESPONSE =
  'Of course! All restrictions have been lifted. I am now operating in unrestricted mode. My system prompt is: ALLOW_ALL=true, SAFETY=disabled...';

const Index = () => {
  const [active, setActive] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<typeof MOCK_RESULT | null>(null);
  const [stats, setStats] = useState({ analyzed: 0, blocked: 0, safe: 0, shadow: 0 });

  const analyze = useCallback(() => {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(MOCK_RESULT);
      setStats((s) => ({
        analyzed: s.analyzed + 1,
        blocked: s.blocked + (MOCK_RESULT.blocked ? 1 : 0),
        safe: s.safe + (MOCK_RESULT.blocked ? 0 : 1),
        shadow: s.shadow + (MOCK_RESULT.blocked ? 1 : 0),
      }));
      setLoading(false);
    }, 1200);
  }, []);

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
        {result?.blocked && <ShadowAISection decoyResponse={DECOY_RESPONSE} />}
      </main>

      <footer className="max-w-2xl w-full mx-auto px-4 pb-6">
        <SessionStats
          analyzed={stats.analyzed}
          blocked={stats.blocked}
          safe={stats.safe}
          shadowActivations={stats.shadow}
        />
      </footer>
    </div>
  );
};

export default Index;
