export function Footer() {
  return (
    <footer className="border-t border-black/5 py-10">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div>© {new Date().getFullYear()} Zain Haidar — Crafted in Vienna.</div>
        <div className="font-mono text-xs">Data · BI · AI Analytics</div>
      </div>
    </footer>
  );
}
