import { useState, useEffect } from "react";
import { Search, Bell, Moon, Sun, Monitor } from "lucide-react";
import CommandPalette from "./CommandPalette";
import { useTheme } from "@/components/theme-provider";

const Header = () => {
  const [cmdOpen, setCmdOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  // Global keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const ThemeIcon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;

  const cycleTheme = () => {
    if (theme === "dark") setTheme("light");
    else if (theme === "light") setTheme("system");
    else setTheme("dark");
  };

  return (
    <>
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />

      <header className="h-16 bg-background/80 flex items-center justify-between px-8 sticky top-0 z-20 backdrop-blur-md border-b border-border/50 transition-colors duration-300">
        {/* Search trigger (Cmd+K) */}
        <button
          onClick={() => setCmdOpen(true)}
          className="relative flex items-center gap-3 w-80 bg-muted/40 border border-border rounded-xl pl-10 pr-3 py-2.5 text-sm text-muted-foreground hover:bg-muted/60 hover:border-primary/30 transition-all group text-left"
        >
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 group-hover:text-primary transition-colors" />
          <span className="flex-1">Buscar páginas e ações...</span>
          <div className="flex items-center gap-0.5">
            <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted text-[10px] font-bold leading-none">⌘</kbd>
            <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted text-[10px] font-bold leading-none">K</kbd>
          </div>
        </button>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Notification bell */}
          <button className="relative p-2 bg-card border border-border rounded-xl text-muted-foreground hover:text-primary hover:shadow-md transition-all">
            <Bell size={18} />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-black flex items-center justify-center">
              3
            </span>
          </button>

          {/* Theme toggle */}
          <button
            onClick={cycleTheme}
            title={`Tema: ${theme}`}
            className="p-2 bg-card border border-border rounded-xl text-muted-foreground hover:text-primary hover:shadow-md transition-all"
          >
            <ThemeIcon size={18} />
          </button>

          {/* User profile */}
          <div className="flex items-center gap-3 pl-3 border-l border-border/50">
            <div className="flex flex-col items-end">
              <span className="text-sm font-bold text-foreground leading-tight">Helena Ribas</span>
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Administradora</span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-border shadow-sm flex items-center justify-center">
              <span className="text-sm font-bold text-primary">HR</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
