import { useNavigate } from "react-router-dom";
import ContractsTable from "@/components/dashboard/ContractsTable";
import {
  FileText, Users, Plus, ArrowRight, Activity, TrendingUp, Calendar,
  CheckSquare, AlertTriangle, ShieldCheck, Truck, Clock, ArrowUpRight,
  Sparkles, ChevronRight, CircleDot
} from "lucide-react";
import { motion } from "framer-motion";
import {
  mockContracts, mockClients, mockActivities, mockUrgentDocs,
  mockMeetings, mockRecentFiles, mockKpis
} from "@/lib/mockData";

/* ──────────────────────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────────────────────── */

const QuickAction = ({
  icon: Icon, label, description, color, onClick,
}: {
  icon: typeof FileText; label: string; description: string; color: string; onClick: () => void;
}) => (
  <motion.button
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="section-card p-3.5 flex items-center gap-3 w-full text-left hover:border-primary/20 hover:shadow-md transition-all group"
  >
    <div className={`p-2.5 rounded-xl ${color} shrink-0 shadow-sm`}>
      <Icon size={16} className="text-white" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[13px] font-bold text-card-foreground leading-tight">{label}</p>
      <p className="text-[11px] text-muted-foreground truncate mt-0.5">{description}</p>
    </div>
    <ArrowRight size={14} className="text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
  </motion.button>
);

const KpiCard = ({
  label, value, trend, sub, icon: Icon, highlight,
}: {
  label: string; value: string | number; trend: number; sub: string;
  icon: typeof FileText; highlight?: boolean;
}) => {
  const positive = trend >= 0;
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className={`relative rounded-2xl p-5 overflow-hidden cursor-pointer transition-all ${
        highlight
          ? "bg-gradient-to-br from-primary via-primary to-[hsl(222,47%,18%)] text-primary-foreground shadow-lg shadow-primary/20"
          : "bg-card border border-border/50 hover:border-primary/20 hover:shadow-md"
      }`}
    >
      {/* accent decorativo */}
      <div className={`absolute -top-10 -right-10 w-28 h-28 rounded-full ${highlight ? "bg-white/5" : "bg-primary/5"}`} />

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <span className={`text-[10px] font-black uppercase tracking-widest ${highlight ? "text-white/60" : "text-muted-foreground"}`}>
            {label}
          </span>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            highlight ? "bg-white/10" : "bg-muted/60"
          }`}>
            <Icon size={14} className={highlight ? "text-white/80" : "text-primary/70"} />
          </div>
        </div>

        <p className={`text-[28px] font-black leading-none mb-1.5 ${highlight ? "text-white" : "text-card-foreground"}`}>
          {value}
        </p>

        <div className="flex items-center gap-2 mt-1">
          <span className={`inline-flex items-center gap-0.5 text-[10px] font-black px-1.5 py-0.5 rounded-full ${
            positive
              ? highlight ? "bg-emerald-500/20 text-emerald-300" : "bg-emerald-500/10 text-emerald-600"
              : highlight ? "bg-red-500/20 text-red-300" : "bg-red-500/10 text-red-600"
          }`}>
            <ArrowUpRight size={10} className={positive ? "" : "rotate-180"} />
            {positive ? "+" : ""}{trend}%
          </span>
          <span className={`text-[11px] ${highlight ? "text-white/50" : "text-muted-foreground"}`}>
            {sub}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

/* ──────────────────────────────────────────────────────────────
   Página
   ────────────────────────────────────────────────────────────── */

const Index = () => {
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long", day: "numeric", month: "long",
  });
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const kpiIcons = [TrendingUp, FileText, Truck, AlertTriangle];

  const typeColors: Record<string, string> = {
    contract: "bg-emerald-500",
    document: "bg-purple-500",
    client: "bg-blue-500",
    meeting: "bg-amber-500",
    alert: "bg-red-500",
  };

  const meetingsToday = mockMeetings.filter(m => {
    const d = new Date(m.date);
    const now = new Date();
    return d.getDate() === now.getDate() && d.getMonth() === now.getMonth();
  });

  return (
    <div className="space-y-8">
      {/* ── Hero / Page header ───────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-[hsl(222,47%,13%)] to-[hsl(222,47%,20%)] p-8 text-primary-foreground shadow-xl shadow-primary/10">
        {/* decorações */}
        <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute -bottom-16 left-1/3 w-64 h-64 rounded-full bg-blue-300/5 blur-3xl" />

        <div className="relative flex items-start justify-between gap-6 flex-wrap">
          <div className="flex-1 min-w-[260px]">
            <p className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-blue-300/90 mb-3">
              <CircleDot size={10} className="animate-pulse" /> {capitalize(today)}
            </p>
            <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight leading-tight">
              Bom dia, Helena.
            </h1>
            <p className="mt-2 text-white/70 text-[15px] max-w-xl">
              Sua operação está em dia — 41 contratos ativos, 87% de ocupação da frota
              e 3 documentos precisando de atenção.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <button
                onClick={() => navigate("/contracts")}
                className="h-11 px-5 inline-flex items-center gap-2 rounded-xl bg-white text-primary font-bold text-[13px] shadow-lg shadow-black/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Plus size={15} /> Novo contrato
              </button>
              <button
                onClick={() => navigate("/meetings")}
                className="h-11 px-5 inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/15 text-white font-bold text-[13px] hover:bg-white/15 transition-all"
              >
                <Calendar size={15} /> Ver agenda
              </button>
            </div>
          </div>

          {/* Resumo lateral do dia */}
          <div className="flex gap-3">
            {[
              { label: "Reuniões hoje", value: meetingsToday.length, icon: Calendar },
              { label: "Alertas críticos", value: 3, icon: AlertTriangle },
            ].map((it) => (
              <div key={it.label} className="min-w-[140px] rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/50">{it.label}</span>
                  <it.icon size={12} className="text-white/50" />
                </div>
                <p className="text-3xl font-black leading-none">{it.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── KPIs ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockKpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <KpiCard
              label={kpi.label}
              value={kpi.value}
              trend={kpi.trend}
              sub={kpi.sub}
              icon={kpiIcons[i]}
              highlight={i === 0}
            />
          </motion.div>
        ))}
      </div>

      {/* ── Quick Actions + Activity (regra dos terços) ──────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Quick Actions (1/3) */}
        <div className="lg:col-span-1 flex flex-col gap-3">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <Sparkles size={12} /> Ações rápidas
          </h2>
          <QuickAction icon={FileText} label="Novo Contrato" description="Cadastrar nova locação"
            color="bg-gradient-to-br from-emerald-400 to-emerald-600"
            onClick={() => navigate("/contracts")} />
          <QuickAction icon={Users} label="Novo Cliente" description="Adicionar à base"
            color="bg-gradient-to-br from-blue-400 to-blue-600"
            onClick={() => navigate("/clients")} />
          <QuickAction icon={Calendar} label="Agendar Reunião" description="Marcar compromisso"
            color="bg-gradient-to-br from-purple-400 to-purple-600"
            onClick={() => navigate("/meetings")} />
          <QuickAction icon={CheckSquare} label="Nova Tarefa" description="Adicionar pendência"
            color="bg-gradient-to-br from-amber-400 to-amber-600"
            onClick={() => navigate("/tasks")} />
        </div>

        {/* Activity feed (2/3) */}
        <div className="lg:col-span-2 section-card p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Activity size={12} /> Atividade recente
            </h2>
            <button className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1">
              Ver tudo <ChevronRight size={11} />
            </button>
          </div>

          <div className="space-y-1">
            {mockActivities.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/40 transition-colors group cursor-pointer"
              >
                <div className="relative shrink-0">
                  <div className={`w-9 h-9 rounded-xl bg-muted flex items-center justify-center`}>
                    <span className="text-xs font-black text-muted-foreground">
                      {a.user.split(" ").map(n => n[0]).slice(0, 2).join("")}
                    </span>
                  </div>
                  <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ${typeColors[a.type]} border-2 border-card`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] leading-tight">
                    <span className="font-bold text-card-foreground">{a.user}</span>{" "}
                    <span className="text-muted-foreground">{a.action}</span>{" "}
                    <span className="font-semibold text-card-foreground">{a.target}</span>
                  </p>
                  <p className="text-[10px] text-muted-foreground/80 mt-0.5 flex items-center gap-1">
                    <Clock size={9} /> {a.time}
                  </p>
                </div>
                <ChevronRight size={14} className="text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Contratos + Documentos urgentes (50/50) ──────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Contratos recentes (3/5) */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <FileText size={12} /> Contratos recentes
            </h2>
            <button
              onClick={() => navigate("/contracts")}
              className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1"
            >
              Ver todos <ChevronRight size={11} />
            </button>
          </div>
          <div className="section-card p-4 sm:p-5">
            <ContractsTable data={mockContracts.slice(0, 5)} />
          </div>
        </div>

        {/* Urgent docs (2/5) */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-red-500/80 flex items-center gap-2">
              <AlertTriangle size={12} /> Documentos urgentes
            </h2>
            <button
              onClick={() => navigate("/documents")}
              className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1"
            >
              Ver todos <ChevronRight size={11} />
            </button>
          </div>

          <div className="relative rounded-2xl overflow-hidden p-5 bg-gradient-to-br from-[hsl(0,60%,32%)] via-[hsl(0,55%,26%)] to-[hsl(0,50%,20%)] text-white shadow-lg shadow-red-900/20">
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 blur-2xl" />
            <div className="relative space-y-3">
              {mockUrgentDocs.slice(0, 4).map((u, i) => (
                <motion.div
                  key={u.code}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border border-white/5"
                >
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-black shrink-0 ${
                    i === 0 ? "bg-white text-red-600" : "bg-white/15 text-white"
                  }`}>
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold truncate">{u.code}</p>
                    <p className="text-[11px] text-white/60 truncate">{u.desc}</p>
                    <p className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${
                      u.detail.includes("VENCIDO") ? "text-red-200" : "text-amber-200"
                    }`}>
                      {u.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <button className="relative w-full mt-4 h-10 rounded-xl border border-white/20 bg-white/5 text-[11px] font-black uppercase tracking-widest hover:bg-white/15 transition-all flex items-center justify-center gap-2">
              <ShieldCheck size={13} /> Revisar compliance
            </button>
          </div>
        </div>
      </div>

      {/* ── Meetings + Recent files (50/50) ──────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Próximas reuniões */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Calendar size={12} /> Reuniões de hoje
            </h2>
            <button
              onClick={() => navigate("/meetings")}
              className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1"
            >
              Agenda completa <ChevronRight size={11} />
            </button>
          </div>
          <div className="section-card p-4 space-y-2">
            {meetingsToday.length === 0 ? (
              <p className="py-8 text-center text-muted-foreground italic text-sm">
                Nenhuma reunião agendada para hoje.
              </p>
            ) : (
              meetingsToday.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/40 cursor-pointer transition-colors group"
                >
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 flex flex-col items-center justify-center text-primary">
                    <span className="text-[13px] font-black leading-none">{m.time.split(":")[0]}</span>
                    <span className="text-[9px] opacity-60 mt-0.5">:{m.time.split(":")[1]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-card-foreground truncate">{m.title}</p>
                    <p className="text-[11px] text-muted-foreground truncate flex items-center gap-1.5">
                      {m.company} · <span className={m.type === "Online" ? "text-blue-500" : "text-emerald-500"}>{m.type}</span>
                    </p>
                  </div>
                  <ChevronRight size={14} className="text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Recent files */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <FileText size={12} /> Últimos arquivos
            </h2>
            <button
              onClick={() => navigate("/documents")}
              className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1"
            >
              Repositório <ChevronRight size={11} />
            </button>
          </div>
          <div className="section-card p-4 space-y-1">
            {mockRecentFiles.map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/40 cursor-pointer transition-colors group"
              >
                <div className={`w-9 h-9 shrink-0 rounded-xl ${f.color} flex items-center justify-center shadow-sm`}>
                  <FileText size={14} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-card-foreground truncate">{f.name}</p>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1.5">
                    {f.author} · {f.time}
                  </p>
                </div>
                <span className="text-[10px] text-muted-foreground/70 shrink-0">{f.extra}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
