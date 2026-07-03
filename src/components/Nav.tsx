"use client";

import { motion } from "framer-motion";

const links = [
  { label: "Insight Flow", href: "#insight-flow" },
  { label: "Workspace", href: "#dashboard" },
  { label: "Automations", href: "#signature" },
];

export default function Nav() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-50 border-b border-border-soft bg-bg/70 backdrop-blur-md"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent-cyan shadow-[0_0_12px_2px_rgba(76,201,240,0.6)]" />
          <span className="font-display text-[15px] font-semibold tracking-tight text-text">
            Xai
          </span>
          <span className="mono-label text-text-faint hidden sm:inline">
            / Intelligence Workspace
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] text-text-muted hover:text-text transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#dashboard"
          className="text-[13px] font-medium px-4 py-2 rounded-full border border-border bg-surface hover:bg-surface-2 hover:border-accent/40 transition-colors"
        >
          Open workspace
        </a>
      </div>
    </motion.header>
  );
}
