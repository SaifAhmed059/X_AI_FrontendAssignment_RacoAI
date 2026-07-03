"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  Zap,
  Database,
  FileBarChart,
  Settings,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const navItems = [
  { label: "Overview", icon: LayoutGrid },
  { label: "Automations", icon: Zap },
  { label: "Data sources", icon: Database },
  { label: "Reports", icon: FileBarChart },
  { label: "Settings", icon: Settings },
];

const tabs = ["Overview", "Automations", "Reports"] as const;

const kpis = [
  { label: "Insights generated", value: "1,284", delta: "+12.4%", up: true },
  { label: "Automations live", value: "37", delta: "+3", up: true },
  { label: "Data freshness", value: "2m ago", delta: "-40s", up: true },
  { label: "Anomalies flagged", value: "6", delta: "-18%", up: false },
];

const bars = [38, 52, 44, 68, 59, 74, 66, 82, 71, 90, 84, 96];

const tableRows = [
  { source: "Product events", records: "482K", status: "Synced", freshness: "1m ago" },
  { source: "Billing (Stripe)", records: "12.1K", status: "Synced", freshness: "3m ago" },
  { source: "Support tickets", records: "9.4K", status: "Syncing", freshness: "—" },
  { source: "Marketing (Ads)", records: "204K", status: "Synced", freshness: "6m ago" },
];

function LineChart() {
  return (
    <svg viewBox="0 0 320 120" className="w-full h-32">
      <defs>
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5b6ef5" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#5b6ef5" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d="M0 90 L30 78 L60 82 L90 55 L120 60 L150 40 L180 48 L210 25 L240 32 L270 18 L300 22 L320 10"
        fill="none"
        stroke="#5b6ef5"
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d="M0 90 L30 78 L60 82 L90 55 L120 60 L150 40 L180 48 L210 25 L240 32 L270 18 L300 22 L320 10 L320 120 L0 120 Z"
        fill="url(#areaFill)"
        stroke="none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
      />
    </svg>
  );
}

function BarChart() {
  return (
    <div className="flex items-end gap-1.5 h-32">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: `${h}%`, transformOrigin: "bottom" }}
          className="flex-1 rounded-t-sm bg-gradient-to-t from-accent-cyan/70 to-accent"
        />
      ))}
    </div>
  );
}

export default function DashboardPreview() {
  const [active, setActive] = useState<(typeof tabs)[number]>("Overview");

  return (
    <section id="dashboard" className="relative py-28 md:py-36 px-6 md:px-10 bg-bg">
      <div className="mx-auto max-w-[1400px]">
        <div className="max-w-xl mb-14">
          <span className="mono-label text-accent-cyan">Intelligence Dashboard</span>
          <h2 className="mt-4 font-display text-3xl md:text-4xl font-medium tracking-tight">
            One workspace, every signal.
          </h2>
          <p className="mt-4 text-text-muted leading-relaxed">
            A single, calm surface for the insights Xai produces — organized
            the way a decision-maker actually works, not the way a database
            happens to be structured.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-border bg-surface/70 overflow-hidden shadow-[0_40px_120px_-40px_rgba(91,110,245,0.25)]"
        >
          <div className="flex h-9 items-center gap-1.5 px-4 border-b border-border-soft bg-bg-raised">
            <span className="h-2.5 w-2.5 rounded-full bg-[#4a4d57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#4a4d57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#4a4d57]" />
            <span className="mono-label text-text-faint ml-3">workspace.xai.app</span>
          </div>

          <div className="grid grid-cols-[220px_1fr] min-h-[560px]">
            {/* Sidebar */}
            <aside className="border-r border-border-soft bg-bg-raised/60 p-4 hidden sm:flex flex-col">
              <span className="mono-label text-text-faint px-2 mb-3">Navigate</span>
              <nav className="flex flex-col gap-1">
                {navItems.map((item, i) => {
                  const Icon = item.icon;
                  const isActive = i === 0;
                  return (
                    <button
                      key={item.label}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors text-left ${
                        isActive
                          ? "bg-accent-soft text-text"
                          : "text-text-muted hover:text-text hover:bg-surface-2"
                      }`}
                    >
                      <Icon size={15} strokeWidth={1.75} />
                      {item.label}
                    </button>
                  );
                })}
              </nav>

              <div className="mt-auto rounded-xl border border-border-soft bg-surface p-3">
                <p className="mono-label text-text-faint mb-1">Sync status</p>
                <p className="text-[13px] text-text">All sources healthy</p>
              </div>
            </aside>

            {/* Main panel */}
            <div className="p-5 md:p-7">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-1 rounded-full border border-border-soft bg-surface p-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActive(tab)}
                      className="relative px-3.5 py-1.5 text-[12.5px] rounded-full transition-colors"
                    >
                      {active === tab && (
                        <motion.span
                          layoutId="tab-pill"
                          className="absolute inset-0 rounded-full bg-accent"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                      <span
                        className={`relative z-10 ${
                          active === tab ? "text-white" : "text-text-muted"
                        }`}
                      >
                        {tab}
                      </span>
                    </button>
                  ))}
                </div>
                <span className="mono-label text-text-faint hidden md:inline">
                  Updated 2 min ago
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                    {kpis.map((kpi) => (
                      <div
                        key={kpi.label}
                        className="rounded-xl border border-border-soft bg-surface p-4 hover:border-accent/30 transition-colors"
                      >
                        <p className="mono-label text-text-faint mb-2">{kpi.label}</p>
                        <div className="flex items-end justify-between">
                          <span className="font-display text-xl font-medium">{kpi.value}</span>
                          <span
                            className={`flex items-center text-[11px] gap-0.5 ${
                              kpi.up ? "text-accent-cyan" : "text-text-muted"
                            }`}
                          >
                            {kpi.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                            {kpi.delta}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid md:grid-cols-2 gap-3 mb-6">
                    <div className="rounded-xl border border-border-soft bg-surface p-4">
                      <p className="mono-label text-text-faint mb-3">Insight velocity</p>
                      <LineChart />
                    </div>
                    <div className="rounded-xl border border-border-soft bg-surface p-4">
                      <p className="mono-label text-text-faint mb-3">Automation runs / day</p>
                      <BarChart />
                    </div>
                  </div>

                  <div className="rounded-xl border border-border-soft bg-surface overflow-hidden">
                    <p className="mono-label text-text-faint px-4 pt-4 pb-3">Data sources</p>
                    <table className="w-full text-[13px]">
                      <thead>
                        <tr className="text-text-faint border-y border-border-soft">
                          <th className="text-left font-normal px-4 py-2">Source</th>
                          <th className="text-left font-normal px-4 py-2">Records</th>
                          <th className="text-left font-normal px-4 py-2">Status</th>
                          <th className="text-left font-normal px-4 py-2">Freshness</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRows.map((row) => (
                          <tr
                            key={row.source}
                            className="border-b border-border-soft last:border-0 hover:bg-surface-2/60 transition-colors"
                          >
                            <td className="px-4 py-2.5 text-text">{row.source}</td>
                            <td className="px-4 py-2.5 text-text-muted font-mono text-[12px]">
                              {row.records}
                            </td>
                            <td className="px-4 py-2.5">
                              <span
                                className={`inline-flex items-center gap-1.5 text-[12px] ${
                                  row.status === "Synced" ? "text-accent-cyan" : "text-text-muted"
                                }`}
                              >
                                <span
                                  className={`h-1.5 w-1.5 rounded-full ${
                                    row.status === "Synced" ? "bg-accent-cyan" : "bg-text-faint animate-pulse"
                                  }`}
                                />
                                {row.status}
                              </span>
                            </td>
                            <td className="px-4 py-2.5 text-text-muted font-mono text-[12px]">
                              {row.freshness}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
