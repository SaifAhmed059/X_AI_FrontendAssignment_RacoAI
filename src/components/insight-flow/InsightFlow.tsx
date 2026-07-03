"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stages = [
  {
    index: "01",
    title: "Ingest data",
    copy: "Connect warehouses, product events, and third-party sources. Xai normalizes schemas automatically, no pipelines to hand-maintain.",
    path: "M10 70 L60 40 L110 55 L160 20 L210 35",
  },
  {
    index: "02",
    title: "Analyze with AI",
    copy: "Models trace correlations across every connected source, scoring signal against noise before anything reaches a person.",
    path: "M10 45 L50 45 L70 15 L90 75 L110 45 L150 45 L210 45",
  },
  {
    index: "03",
    title: "Generate insight",
    copy: "Findings are compiled into ranked, explainable insights — each one traceable back to the exact rows that produced it.",
    path: "M10 60 C 60 60, 60 20, 110 20 S 160 60, 210 20",
  },
];

export default function InsightFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const panels = gsap.utils.toArray<HTMLElement>(".insight-panel");
      const distance = track.scrollWidth - window.innerWidth;

      const scrollTween = gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${distance}`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      panels.forEach((panel, i) => {
        const path = pathRefs.current[i];
        if (path) {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(path, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left 75%",
              end: "left 25%",
              scrub: true,
            },
          });
        }

        gsap.fromTo(
          panel.querySelector(".panel-copy"),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left 70%",
              end: "left 35%",
              scrub: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="insight-flow" ref={containerRef} className="relative h-screen overflow-hidden bg-bg">
      <div className="absolute top-10 left-6 md:left-10 z-10">
        <span className="mono-label text-text-faint">Interactive Insight Flow</span>
      </div>

      <div
        ref={trackRef}
        className="h-full flex items-center will-change-transform"
        style={{ width: `${stages.length * 100}vw` }}
      >
        {stages.map((s, i) => (
          <div
            key={s.index}
            className="insight-panel h-full w-screen flex-shrink-0 flex items-center px-6 md:px-10"
          >
            <div className="mx-auto max-w-[1400px] w-full grid md:grid-cols-2 gap-10 items-center">
              <div className="panel-copy">
                <span className="mono-label text-accent">{s.index} / {stages.length.toString().padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-4xl md:text-5xl font-medium tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-md text-text-muted leading-relaxed">{s.copy}</p>
              </div>

              <div className="relative h-64 md:h-80 rounded-2xl border border-border bg-surface/60 grid-backdrop flex items-center justify-center group">
                <svg viewBox="0 0 220 90" className="w-4/5 h-auto overflow-visible">
                  <path
                    ref={(el) => {
                      pathRefs.current[i] = el;
                    }}
                    d={s.path}
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                  {s.path.match(/[ML]\s?([\d.]+)\s([\d.]+)/g)?.map((pt, ptIdx) => {
                    const [, x, y] = pt.match(/[ML]\s?([\d.]+)\s([\d.]+)/) ?? [];
                    return (
                      <circle
                        key={ptIdx}
                        cx={x}
                        cy={y}
                        r={2.4}
                        className="fill-accent-cyan transition-transform duration-300 group-hover:scale-125"
                      />
                    );
                  })}
                  <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#4cc9f0" />
                      <stop offset="100%" stopColor="#5b6ef5" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
