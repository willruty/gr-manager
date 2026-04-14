import {
  LayoutDashboard, FileText, FolderOpen, Users, Calendar,
  CheckSquare, UserCog, BarChart3, Settings, LogOut, ChevronRight,
  PanelLeftClose, PanelLeftOpen
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Logo from "@/components/Logo";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: FileText, label: "Contratos", path: "/contracts" },
  { icon: FolderOpen, label: "Documentos", path: "/documents" },
  { icon: Users, label: "Clientes", path: "/clients" },
  { icon: Calendar, label: "Reuniões", path: "/meetings" },
  { icon: CheckSquare, label: "Tarefas", path: "/tasks" },
  { icon: UserCog, label: "Equipe", path: "/team" },
  { icon: BarChart3, label: "Relatórios", path: "/reports" },
  { icon: Settings, label: "Configurações", path: "/settings" },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useLocalStorage<boolean>("gr:sidebar-collapsed", false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 256 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="h-screen fixed left-0 top-0 z-40 flex flex-col border-r border-border overflow-hidden bg-card"
    >
      {/* Brand Logo Section */}
      <div className={`px-4 py-5 flex items-center shrink-0 border-b border-border/50 min-h-16 ${collapsed ? "justify-center" : "justify-between gap-3"}`}>
        <AnimatePresence mode="wait">
          {!collapsed ? (
            <motion.div
              key="logo-full"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.18 }}
              className="flex-1 min-w-0"
            >
              <Logo collapsed={false} className="w-32 h-auto" />
            </motion.div>
          ) : (
            <motion.div
              key="logo-icon"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.18 }}
            >
              <Logo collapsed className="w-8 h-8" />
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all shrink-0"
          title={collapsed ? "Expandir menu" : "Recolher menu"}
        >
          {collapsed ? <PanelLeftOpen size={15} /> : <PanelLeftClose size={15} />}
        </button>
      </div>

      {/* Nav Section */}
      <nav className="flex-1 px-3 py-5 space-y-1.5 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => (
          collapsed ? (
            <Tooltip key={item.label} delayDuration={100}>
              <TooltipTrigger asChild>
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `flex items-center justify-center p-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`
                  }
                >
                  <item.icon size={18} />
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right" className="font-medium text-xs">
                {item.label}
              </TooltipContent>
            </Tooltip>
          ) : (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-200 group/item ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon size={15} className="shrink-0 transition-transform group-hover/item:scale-105" />
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1 truncate"
                  >
                    {item.label}
                  </motion.span>
                  {isActive && <ChevronRight size={12} className="ml-auto shrink-0 opacity-60" />}
                </>
              )}
            </NavLink>
          )
        ))}
      </nav>

      {/* Bottom Profile Section */}
      <div className={`p-4 pb-6 bg-muted/20 border-t border-border/50 mt-auto shrink-0 ${collapsed ? "flex flex-col items-center gap-3" : ""}`}>
        {!collapsed ? (
          <>
            <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted transition-colors cursor-pointer group/user">
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-border flex items-center justify-center text-primary font-black text-xs shrink-0">
                HR
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-black text-foreground uppercase tracking-tighter truncate">Helena Ribas</span>
                <span className="text-[9px] text-muted-foreground font-medium">Administradora</span>
              </div>
              <ChevronRight size={12} className="ml-auto text-muted-foreground group-hover/user:translate-x-0.5 transition-all shrink-0" />
            </div>

            <button
              onClick={() => toast.info("Logout realizado com sucesso.")}
              className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 text-[9px] font-bold uppercase tracking-widest text-muted-foreground hover:text-destructive-foreground transition-all border border-border rounded-xl bg-background hover:bg-destructive hover:border-destructive/20"
            >
              <LogOut size={12} />
              <span>Sair do Sistema</span>
            </button>
          </>
        ) : (
          <>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-border flex items-center justify-center text-primary font-black text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all">
                  HR
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">Helena Ribas · Admin</TooltipContent>
            </Tooltip>

            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => toast.info("Logout realizado com sucesso.")}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:bg-destructive hover:text-destructive-foreground hover:border-destructive/20 transition-all"
                >
                  <LogOut size={14} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Sair do Sistema</TooltipContent>
            </Tooltip>
          </>
        )}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </motion.aside>
  );
};

export default Sidebar;
