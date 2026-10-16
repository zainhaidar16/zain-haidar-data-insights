import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
export function ThemeToggle() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const sync = () =>
      setTheme(document.documentElement.dataset.theme || "dark");
    sync();
    window.addEventListener("portfolio-theme-change", sync);
    return () => window.removeEventListener("portfolio-theme-change", sync);
  }, []);
  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    setTheme(next);
    window.dispatchEvent(new Event("portfolio-theme-change"));
    try {
      localStorage.setItem("zain-rare-theme", next);
    } catch {}
  }
  return (
    <button
      className="icon-button theme-toggle"
      onClick={toggle}
      aria-label={
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
      title={theme === "dark" ? "Light theme" : "Dark theme"}
    >
      {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
