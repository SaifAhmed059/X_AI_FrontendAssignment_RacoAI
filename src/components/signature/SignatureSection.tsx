"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const SignatureCluster = dynamic(() => import("./SignatureCluster"), { ssr: false });

export default function SignatureSection() {
  return (
    <section id="signature" className="relative py-28 md:py-36 px-6 md:px-10 bg-bg">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl mb-12"
        >
          <span className="mono-label text-accent-violet">AI Automations</span>
          <h2 className="mt-4 font-display text-3xl md:text-4xl font-medium tracking-tight">
            Every record finds its cluster.
          </h2>
          <p className="mt-4 text-text-muted leading-relaxed">
            Xai doesn&apos;t just store your data — it recognizes the
            structure inside it. Nudge it, and every record finds its way
            back to where it belongs.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[520px] md:h-[600px] rounded-2xl border border-border bg-surface/40 grid-backdrop overflow-hidden"
        >
          <SignatureCluster />
        </motion.div>
      </div>
    </section>
  );
}
