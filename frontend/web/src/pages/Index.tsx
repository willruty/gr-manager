import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCards from "@/components/dashboard/StatCards";
import ContractsTable from "@/components/dashboard/ContractsTable";
import PendingDocs from "@/components/dashboard/PendingDocs";
import Meetings from "@/components/dashboard/Meetings";
import RecentFiles from "@/components/dashboard/RecentFiles";
import UrgentDocs from "@/components/dashboard/UrgentDocs";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Contract } from "@/types/dashboard";
import { ClientData } from "@/components/dashboard/ClientsTable";
import {
  FileText, Users, Plus, ArrowRight, Activity,
  TrendingUp, Calendar, CheckSquare
} from "lucide-react";
import { motion } from "framer-motion";

const QuickAction = ({
  icon: Icon,
  label,
  description,
  color,
  onClick,
}: {
  icon: typeof FileText;
  label: string;
  description: string;
  color: string;
  onClick: () => void;
}) => (
  <motion.button
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="section-card p-4 flex items-center gap-3 w-full text-left hover:border-primary/20 transition-all group"
  >
    <div className={`p-2.5 rounded-xl ${color} shrink-0`}>
      <Icon size={18} className="text-white" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-bold text-card-foreground">{label}</p>
      <p className="text-xs text-muted-foreground truncate">{description}</p>
    </div>
    <ArrowRight size={16} className="text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
  </motion.button>
);

const Index = () => {
  const navigate = useNavigate();
  const [contracts] = useLocalStorage<Contract[]>("gr:contracts", []);
  const [clients] = useLocalStorage<ClientData[]>("gr:clients", []);

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest mb-1">
            {capitalize(today)}
          </p>
          <h1 className="text-2xl font-extrabold text-foreground">Painel Administrativo</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Bem-vinda, <span className="font-semibold text-foreground">Helena</span>. Aqui está o resumo do dia.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/contracts")}
            className="flex items-center gap-2 text-sm bg-primary text-primary-foreground px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity font-medium shadow-sm"
          >
            <Plus size={16} /> Novo Contrato
          </motion.button>
        </div>
      </div>

      {/* Stat Cards */}
      <StatCards />

      {/* Quick Actions + Activity */}
      <div className="mt-6 grid grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="col-span-1 flex flex-col gap-3">
          <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <Activity size={13} /> Ações Rápidas
          </h2>
          <QuickAction
            icon={FileText}
            label="Novo Contrato"
            description="Cadastrar contrato"
            color="bg-emerald-500"
            onClick={() => navigate("/contracts")}
          />
          <QuickAction
            icon={Users}
            label="Novo Cliente"
            description="Adicionar à base"
            color="bg-blue-500"
            onClick={() => navigate("/clients")}
          />
          <QuickAction
            icon={Calendar}
            label="Agendar Reunião"
            description="Marcar compromisso"
            color="bg-purple-500"
            onClick={() => navigate("/meetings")}
          />
          <QuickAction
            icon={CheckSquare}
            label="Nova Tarefa"
            description="Adicionar pendência"
            color="bg-orange-500"
            onClick={() => navigate("/tasks")}
          />
        </div>

        {/* Overview Stats */}
        <div className="col-span-2 section-card p-5">
          <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-4">
            <TrendingUp size={13} /> Visão Geral
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                label: "Contratos cadastrados",
                value: contracts.length,
                sub: contracts.filter(c => c.status === "Ativo").length + " ativos",
                color: "text-emerald-500",
                onClick: () => navigate("/contracts"),
              },
              {
                label: "Clientes na base",
                value: clients.length,
                sub: clients.filter(c => c.status === "Ativo").length + " ativos",
                color: "text-blue-500",
                onClick: () => navigate("/clients"),
              },
              {
                label: "Documentos pendentes",
                value: 0,
                sub: "Nenhum atrasado",
                color: "text-orange-500",
                onClick: () => navigate("/documents"),
              },
              {
                label: "Reuniões esta semana",
                value: 0,
                sub: "Ver agenda completa",
                color: "text-purple-500",
                onClick: () => navigate("/meetings"),
              },
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.onClick}
                className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors text-left group"
              >
                <p className={`text-3xl font-black ${item.color} mb-0.5`}>{item.value}</p>
                <p className="text-sm font-semibold text-card-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                  {item.sub}
                  <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contracts Table */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <FileText size={13} /> Contratos Recentes
          </h2>
          <button
            onClick={() => navigate("/contracts")}
            className="text-xs text-primary hover:underline font-semibold flex items-center gap-1"
          >
            Ver todos <ArrowRight size={12} />
          </button>
        </div>
        <ContractsTable data={contracts.slice(0, 5)} />
      </div>

      {/* Bottom Grid */}
      <div className="mt-6 grid grid-cols-2 gap-6">
        <PendingDocs />
        <Meetings />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6">
        <RecentFiles />
        <UrgentDocs />
      </div>
    </DashboardLayout>
  );
};

export default Index;
