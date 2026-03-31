import {
  LayoutDashboard, FileText, FolderOpen, Users, Calendar,
  CheckSquare, UserCog, BarChart3, Settings, LogOut, Phone, MapPin, ChevronRight
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true, badge: 0 },
  { icon: FileText, label: "Contratos" },
  { icon: FolderOpen, label: "Documentos" },
  { icon: Users, label: "Clientes" },
  { icon: Calendar, label: "Reuniões" },
  { icon: CheckSquare, label: "Tarefas" },
  { icon: UserCog, label: "Equipe" },
  { icon: BarChart3, label: "Relatórios" },
  { icon: Settings, label: "Configurações" },
];

const Sidebar = () => {
  return (
    <aside className="w-56 bg-sidebar flex flex-col h-screen fixed left-0 top-0 z-30">
      {/* Logo */}
      <div className="px-5 py-5 flex items-center gap-2.5">
        <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
          <span className="text-sidebar-primary-foreground font-bold text-sm">R</span>
        </div>
        <span className="text-sidebar-primary-foreground font-bold text-lg tracking-tight font-display">CENTRAL RIBAS</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 space-y-0.5">
        {navItems.map((item) => (
          <div
            key={item.label}
            className={`nav-item ${item.active ? "active" : ""}`}
          >
            <item.icon size={18} />
            <span className="flex-1">{item.label}</span>
            {item.badge > 0 && (
              <span className="w-5 h-5 rounded-full bg-status-danger text-white text-[10px] font-bold flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </div>
        ))}
        <div className="pt-4">
          <div className="nav-item cursor-pointer">
            <LogOut size={18} />
            <span>Sair</span>
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="px-4 py-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            <span className="text-muted-foreground text-sm font-semibold">U</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-sidebar-primary-foreground">Usuário</p>
            <p className="text-xs text-muted-foreground">Administrador</p>
          </div>
        </div>
        <div className="space-y-1.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Phone size={12} />
            <span>-</span>
            <ChevronRight size={12} className="ml-auto" />
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={12} />
            <span>-</span>
          </div>
        </div>
        <button className="mt-3 text-xs text-sidebar-primary hover:underline">
          Ver perfil detalhado →
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
