export default function Footer() {
  return (
    <footer className="border-t border-border-soft px-6 md:px-10 py-10">
      <div className="mx-auto max-w-[1400px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent-cyan" />
          <span className="font-display text-sm font-medium">Xai</span>
          <span className="mono-label text-text-faint">/ Intelligence Workspace</span>
        </div>
        <p className="mono-label text-text-faint">
          Frontend challenge prototype — built with Next.js, Framer Motion, GSAP &amp; React Three Fiber
        </p>
      </div>
    </footer>
  );
}
