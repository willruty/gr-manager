import {
  BarChart3, TrendingUp, TrendingDown, Users, FileText, Calendar, Download,
  PieChart as PieChartIcon, Printer, ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import {
  mockKpis, mockRevenueByMonth, mockPortfolioStatus
} from "@/lib/mockData";

const PERIODS = ["7d", "30d", "90d", "Ano"] as const;
type Period = typeof PERIODS[number];

const Reports = () => {
  const [period, setPeriod] = useState<Period>("30d");

  const maxRevenue = useMemo(
    () => Math.max(...mockRevenueByMonth.map(r => r.value)),
    []
  );
  const portfolioTotal = useMemo(
    () => mockPortfolioStatus.reduce((s, p) => s + p.value, 0),
    []
  );

  return (
    <>
      {/* ── Header ──────────────────────────────────────────── */}
      <div className="flex items-end justify-between mb-6 flex-wrap gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-primary/70 mb-1">
            Business Intelligence · Abril/2026
          </p>
          <h1 className="text-2xl font-extrabold font-display text-foreground tracking-tight">
            Relatórios & Métricas
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Desempenho operacional e financeiro em tempo real
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-muted/30 p-1 rounded-xl border border-border">
            {PERIODS.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 h-8 rounded-lg text-xs font-bold transition-all ${
                  period === p
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <Button
            variant="outline"
            onClick={() => toast.info("Preparando para impressão.")}
            className="gap-2 rounded-xl"
          >
            <Printer size={14} /> Imprimir
          </Button>
          <Button
            onClick={() => toast.success("Relatório exportado para Excel!")}
            className="gap-2 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40"
          >
            <Download size={14} /> Exportar
          </Button>
        </div>
      </div>

      {/* ── KPI cards ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {mockKpis.map((kpi, i) => {
          const positive = kpi.trend >= 0;
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative section-card p-5 overflow-hidden group hover:border-primary/30 transition-colors"
            >
              <div className={`absolute -top-8 -right-8 w-28 h-28 rounded-full blur-2xl ${
                positive ? "bg-emerald-500/10" : "bg-red-500/10"
              }`} />
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    {kpi.label}
                  </span>
                  <span className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    positive
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "bg-red-500/10 text-red-600 dark:text-red-400"
                  }`}>
                    {positive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                    {positive ? "+" : ""}{kpi.trend}%
                  </span>
                </div>
                <p className="text-2xl md:text-3xl font-black text-card-foreground tracking-tight leading-none">
                  {kpi.value}
                </p>
                <p className="text-[11px] text-muted-foreground mt-1.5">{kpi.sub}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Gráficos principais — proporção áurea 1.618 ────── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.618fr_1fr] gap-6 mb-6">
        {/* Revenue line chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="section-card p-6"
        >
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-card-foreground flex items-center gap-2">
                <BarChart3 size={16} className="text-primary" /> Receita mensal
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Últimos 6 meses · crescimento médio de 9,2%
              </p>
            </div>
            <button
              onClick={() => toast.info("Abrindo detalhamento…")}
              className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1"
            >
              Detalhar <ArrowUpRight size={12} />
            </button>
          </div>

          {/* Revenue bars */}
          <div className="grid grid-cols-6 gap-3 h-[220px]">
            {mockRevenueByMonth.map((m, i) => {
              const heightPct = (m.value / maxRevenue) * 100;
              const isLast = i === mockRevenueByMonth.length - 1;
              return (
                <motion.div
                  key={m.month}
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: "bottom" }}
                  className="group flex flex-col justify-end items-center relative"
                >
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-black text-card-foreground bg-card border border-border px-2 py-1 rounded-md shadow-sm whitespace-nowrap">
                      R$ {(m.value / 1000).toFixed(0)}k
                    </span>
                  </div>
                  <div
                    style={{ height: `${heightPct}%` }}
                    className={`w-full rounded-t-lg transition-colors ${
                      isLast
                        ? "bg-gradient-to-t from-primary to-primary/60 shadow-lg shadow-primary/20"
                        : "bg-gradient-to-t from-primary/20 to-primary/5 group-hover:from-primary/40 group-hover:to-primary/20"
                    }`}
                  />
                  <span className={`text-[10px] font-bold uppercase mt-2 tracking-wider ${
                    isLast ? "text-primary" : "text-muted-foreground"
                  }`}>
                    {m.month}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Portfolio donut */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="section-card p-6"
        >
          <h3 className="text-base font-bold text-card-foreground flex items-center gap-2 mb-5">
            <PieChartIcon size={16} className="text-primary" /> Portfólio
          </h3>

          <div className="flex items-center gap-6">
            {/* SVG donut */}
            <div className="relative w-[140px] h-[140px] shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {(() => {
                  let offset = 0;
                  const circ = 2 * Math.PI * 40;
                  return mockPortfolioStatus.map((seg, i) => {
                    const pct = seg.value / portfolioTotal;
                    const len = pct * circ;
                    const strokeColors = ["#10b981", "#3b82f6", "#f59e0b", "#94a3b8"];
                    const el = (
                      <motion.circle
                        key={seg.label}
                        cx="50" cy="50" r="40"
                        fill="none"
                        strokeWidth="14"
                        stroke={strokeColors[i]}
                        strokeDasharray={`${len} ${circ}`}
                        strokeDashoffset={-offset}
                        strokeLinecap="round"
                        initial={{ strokeDasharray: `0 ${circ}` }}
                        animate={{ strokeDasharray: `${len} ${circ}` }}
                        transition={{ delay: 0.35 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      />
                    );
                    offset += len;
                    return el;
                  });
                })()}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-card-foreground leading-none">{portfolioTotal}</span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mt-1">Contratos</span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex-1 space-y-2.5 min-w-0">
              {mockPortfolioStatus.map((seg, i) => {
                const pct = Math.round((seg.value / portfolioTotal) * 100);
                return (
                  <div key={seg.label} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`w-2.5 h-2.5 rounded-full ${seg.color} shrink-0`} />
                      <span className="text-xs font-semibold text-card-foreground truncate">{seg.label}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="font-bold text-card-foreground tabular-nums">{seg.value}</span>
                      <span className="text-muted-foreground tabular-nums w-8 text-right">{pct}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Performance tables (lado a lado) ────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="section-card p-6"
        >
          <h3 className="text-base font-bold text-card-foreground flex items-center gap-2 mb-5">
            <Users size={16} className="text-primary" /> Top clientes do período
          </h3>
          <div className="space-y-3">
            {[
              { name: "Construtora Andrade Gutierrez", value: "R$ 287.400", contracts: 8, pct: 100 },
              { name: "MRV Engenharia S/A", value: "R$ 214.800", contracts: 6, pct: 75 },
              { name: "Odebrecht Infraestrutura", value: "R$ 186.200", contracts: 5, pct: 65 },
              { name: "Votorantim Cimentos", value: "R$ 142.900", contracts: 4, pct: 50 },
              { name: "Copel Distribuição", value: "R$ 98.300", contracts: 3, pct: 34 },
            ].map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.04 }}
                className="group"
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-5 h-5 rounded bg-muted/60 flex items-center justify-center text-[9px] font-black text-muted-foreground shrink-0">
                      {i + 1}
                    </span>
                    <span className="font-semibold text-card-foreground truncate">{c.name}</span>
                  </div>
                  <span className="font-black text-card-foreground tabular-nums">{c.value}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-muted/50 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${c.pct}%` }}
                      transition={{ delay: 0.5 + i * 0.05, duration: 0.6 }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground w-12 text-right tabular-nums">
                    {c.contracts} ctr
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="section-card p-6"
        >
          <h3 className="text-base font-bold text-card-foreground flex items-center gap-2 mb-5">
            <Calendar size={16} className="text-primary" /> Resumo operacional
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Reuniões realizadas",      value: "28",  sub: "92% de presença" },
              { label: "Propostas enviadas",       value: "17",  sub: "41% convertidas" },
              { label: "Documentos processados",   value: "142", sub: "em compliance" },
              { label: "Horas operacionais",       value: "867", sub: "frota ativa" },
              { label: "Ticket médio",             value: "R$ 28.500", sub: "por contrato" },
              { label: "Tempo médio de contrato",  value: "4,2 meses", sub: "execução" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.04 }}
                className="p-3 rounded-xl bg-muted/30 border border-border/40"
              >
                <p className="text-lg font-black text-card-foreground tabular-nums">{item.value}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-0.5">{item.label}</p>
                <p className="text-[10px] text-muted-foreground/70 mt-0.5">{item.sub}</p>
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => toast.info("Gerando relatório completo…")}
            className="w-full mt-5 h-10 text-xs font-bold rounded-xl border border-dashed border-primary/30 text-primary hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
          >
            <FileText size={13} /> Gerar relatório completo
          </button>
        </motion.div>
      </div>
    </>
  );
};

export default Reports;
