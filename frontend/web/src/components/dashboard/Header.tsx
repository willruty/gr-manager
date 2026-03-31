import { Search, Bell, BellDot, Monitor, MoreHorizontal } from "lucide-react";

const Header = () => {
  return (
    <header className="h-16 bg-dashboard-header flex items-center justify-between px-6 border-b border-border">
      {/* Search */}
      <div className="relative w-80">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full bg-muted/50 border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-4">
        <button className="relative text-muted-foreground hover:text-foreground transition-colors">
          <Bell size={20} />
        </button>
        <button className="relative text-muted-foreground hover:text-foreground transition-colors">
          <BellDot size={20} />
        </button>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Monitor size={20} />
        </button>
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
          <span className="text-xs font-semibold text-muted-foreground">U</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
