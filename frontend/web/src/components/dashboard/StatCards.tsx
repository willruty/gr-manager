import { motion } from "framer-motion";
import { ChevronRight, ChevronDown, AlertTriangle, Heart, Calendar } from "lucide-react";

import { StatCard } from "@/types/dashboard";

const cards: StatCard[] = [
  {
    title: "Contratos Ativos",
    value: "0",
    subtitle: "R$ 0,00",
    footer: "-",
    bg: "bg-dashboard-green",
    icon: ChevronDown,
    delay: 0,
  },
  {
    title: "Vencendo Em Breve",
    value: "0",
    subtitle: "Prazo -",
    footer: "-",
    bg: "bg-dashboard-yellow",
    icon: ChevronDown,
    delay: 0.05,
  },
  {
    title: "Documentos Pendentes",
    value: "0",
    subtitle: "-",
    footer: "-",
    bg: "bg-dashboard-orange",
    icon: ChevronDown,
    footerIcon: AlertTriangle,
    delay: 0.1,
  },
  {
    title: "Reuniões da Semana",
    value: "0",
    subtitle: "",
    footer: "VER AGENDA",
    bg: "bg-card",
    textDark: true,
    icon: null,
    delay: 0.15,
  },
];

const StatCards = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: card.delay }}
          className={`stat-card ${card.bg} ${card.textDark ? "!text-card-foreground" : ""}`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider opacity-90">
              {card.title}
            </span>
            {card.icon && <card.icon size={14} className="opacity-70" />}
          </div>
          <p className="text-4xl font-bold mb-1">{card.value}</p>
          {card.subtitle && (
            <p className="text-sm opacity-80">{card.subtitle}</p>
          )}
          <div className="mt-3 pt-2 border-t border-white/20 flex items-center gap-2 text-xs opacity-80">
            {card.footerIcon && <card.footerIcon size={12} />}
            {card.footer === "Empresa Familiar" && <Heart size={12} />}
            {card.footer === "Detias 1988" && <Calendar size={12} />}
            <span>{card.footer}</span>
            <ChevronRight size={12} className="ml-auto" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatCards;
