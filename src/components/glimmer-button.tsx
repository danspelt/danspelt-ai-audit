import Link from "next/link";

type GlimmerButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function GlimmerButton({
  href,
  children,
  variant = "primary",
  className = "",
}: GlimmerButtonProps) {
  const variants = {
    primary:
      "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-400 hover:shadow-emerald-500/40 hover:scale-[1.02]",
    secondary:
      "border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-400/60",
  };

  return (
    <Link
      href={href}
      className={`glimmer-btn group relative inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-sm font-semibold transition-all duration-300 ${variants[variant]} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Link>
  );
}
