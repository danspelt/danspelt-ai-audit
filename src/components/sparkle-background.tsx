const SPARKLES = [
  { top: "8%", left: "12%", delay: "0s", size: "3px" },
  { top: "18%", left: "78%", delay: "1.2s", size: "2px" },
  { top: "32%", left: "45%", delay: "0.6s", size: "4px" },
  { top: "55%", left: "8%", delay: "2s", size: "2px" },
  { top: "62%", left: "88%", delay: "0.3s", size: "3px" },
  { top: "75%", left: "32%", delay: "1.8s", size: "2px" },
  { top: "85%", left: "65%", delay: "1s", size: "3px" },
  { top: "42%", left: "92%", delay: "2.4s", size: "2px" },
  { top: "12%", left: "55%", delay: "0.9s", size: "2px" },
  { top: "68%", left: "52%", delay: "1.5s", size: "4px" },
];

export function SparkleBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      <div className="mesh-bg absolute inset-0" />
      <div
        className="absolute -left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[100px] animate-pulse-glow"
      />
      <div
        className="absolute -right-1/4 top-1/2 h-[400px] w-[400px] rounded-full bg-emerald-400/8 blur-[100px] animate-pulse-glow"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full bg-emerald-500/8 blur-[90px] animate-pulse-glow"
        style={{ animationDelay: "1s" }}
      />
      {SPARKLES.map((s, i) => (
        <span
          key={i}
          className="sparkle animate-float"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            animationDuration: `${4 + (i % 3)}s`,
          }}
        />
      ))}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}
