"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import dynamic from "next/dynamic";

const DataField = dynamic(() => import("./DataField"), { ssr: false });

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const morph = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(morph, "change", (v) => {
    progressRef.current = v;
  });

  useEffect(() => {
    progressRef.current = 0;
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative h-[160vh]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden grid-backdrop">
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/70 to-bg" />
        <DataField progressRef={progressRef} />

        <div className="relative z-10 h-full mx-auto max-w-[1400px] px-6 md:px-10 flex flex-col justify-center pointer-events-none">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mono-label text-accent-cyan mb-6"
          >
            Xai — Intelligence Workspace
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[13vw] leading-[0.95] sm:text-[64px] md:text-[76px] lg:text-[92px] font-medium tracking-tight max-w-4xl text-gradient"
          >
            Raw data,
            <br />
            structured intelligence.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 max-w-lg text-[15px] md:text-base text-text-muted leading-relaxed"
          >
            Xai ingests your operational data, reasons over it with AI, and
            organizes the result into a calm, decision-ready workspace —
            built for people who move fast without moving carelessly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-9 flex items-center gap-4 pointer-events-auto"
          >
            <a
              href="#dashboard"
              className="text-[13px] font-medium px-5 py-2.5 rounded-full bg-text text-bg hover:opacity-90 transition-opacity"
            >
              Explore the workspace
            </a>
            <a
              href="#insight-flow"
              className="text-[13px] font-medium text-text-muted hover:text-text transition-colors"
            >
              See how it thinks →
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 inset-x-0 flex flex-col items-center gap-2 text-text-faint"
        >
          <span className="mono-label">Scroll — data becomes structure</span>
          <span className="h-8 w-px bg-gradient-to-b from-text-faint to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
