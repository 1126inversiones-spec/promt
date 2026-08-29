export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 sm:flex-row">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-smoke">
          Developed by <span className="text-ember-400">LinaGo</span>
        </p>
        <p className="text-xs text-smoke">
          Built for <span className="text-cream">eMenu International</span>
          <span className="mx-2 text-smoke/40">&middot;</span>
          {year}
        </p>
      </div>
    </footer>
  );
}
