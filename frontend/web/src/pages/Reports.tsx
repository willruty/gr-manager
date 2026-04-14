import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  BarChart3, TrendingUp, Users, FileText, Calendar, Download,
  PieChart as PieChartIcon, Printer, Database
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/sonner";

const EmptyChart = ({ icon: Icon, label }: { icon: typeof FileText; label: string }) => (
  <div className="flex-1 w-full flex flex-col items-center justify-center border border-dashed border-border/60 rounded-xl bg-muted/10 gap-3">
    <div className="p-3 rounded-full bg-muted/50">
      <Database size={22} className="text-muted-foreground opacity-40" />
    </div>
    <div className="text-center">
      <p className="text-sm font-semibold text-muted-foreground opacity-60">{label}</p>
      <p className="text-xs text-muted-foreground/50 mt-0.5">Aguardando integração com o backend</p>
    </div>
  </div>
);

const Reports = () => {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold font-display text-foreground">Relatórios e Métricas</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Visão geral de desempenho</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => toast.info("Preparando visualização para impressão.")}
            className="flex items-center gap-2 text-sm bg-muted/30 border border-border px-4 py-2 rounded-lg text-foreground hover:bg-muted/50 transition-colors"
          >
            <Printer size={16} /> Imprimir
          </button>
          <button
            onClick={() => toast.success("Dados exportados para Excel com sucesso!")}
            className="flex items-center gap-2 text-sm bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            <Download size={16} /> Exportar Dados
          </button>
        </div>
      </div>

      {/* KPI Cards — aguardam backend */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Contratos", icon: FileText },
          { label: "Novos Clientes", icon: Users },
          { label: "Reuniões", icon: Calendar },
          { label: "Receita Estimada", icon: TrendingUp },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="section-card p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">{item.label}</span>
              <item.icon size={16} className="text-primary opacity-50" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-extrabold text-muted-foreground/30">—</span>
            </div>
            <p className="text-[11px] text-muted-foreground/50 mt-1">Aguardando backend</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="section-card p-6 h-[360px] flex flex-col"
        >
          <h3 className="text-base font-bold text-card-foreground mb-5 flex items-center gap-2">
            <BarChart3 size={18} className="text-primary" /> Novos Contratos por Mês
          </h3>
          <EmptyChart icon={BarChart3} label="Tendência de contratos" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="section-card p-6 h-[360px] flex flex-col"
        >
          <h3 className="text-base font-bold text-card-foreground mb-5 flex items-center gap-2">
            <PieChartIcon size={18} className="text-primary" /> Status do Portfólio
          </h3>
          <EmptyChart icon={PieChartIcon} label="Distribuição do portfólio" />
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="section-card p-6 h-[300px] flex flex-col mb-6"
      >
        <h3 className="text-base font-bold text-card-foreground mb-5 flex items-center gap-2">
          <Users size={18} className="text-primary" /> Crescimento de Clientes
        </h3>
        <EmptyChart icon={Users} label="Histórico de clientes" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="section-card p-6 h-[300px] flex flex-col"
      >
        <h3 className="text-base font-bold text-card-foreground mb-5 flex items-center gap-2">
          <TrendingUp size={18} className="text-primary" /> Receita Estimada Mensal (R$)
        </h3>
        <EmptyChart icon={TrendingUp} label="Receita mensal" />
      </motion.div>
    </DashboardLayout>
  );
};

export default Reports;
