import { motion } from "framer-motion";
import { AlertTriangle, ChevronRight, ChevronDown, FileText, Calendar } from "lucide-react";

import { Contract } from "@/types/dashboard";

const contracts: Contract[] = [];

const ContractsTable = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.2 }}
      className="section-card"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold font-display text-card-foreground">Contratos Vencendo Em Breve</h2>
        <button className="text-xs font-medium text-status-info hover:underline flex items-center gap-1">
          Ver contratos <ChevronRight size={14} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-muted-foreground/70 uppercase tracking-wider">
              <th className="text-left pb-3 font-medium">Clientes</th>
              <th className="text-left pb-3 font-medium">Código</th>
              <th className="text-left pb-3 font-medium">Status</th>
              <th className="text-left pb-3 font-medium">Prazo/Data</th>
              <th className="text-right pb-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {contracts.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-muted-foreground italic">
                  Nenhum contrato vencendo em breve.
                </td>
              </tr>
            ) : (
              contracts.map((c, i) => (
                <tr key={i} className="table-row-hover">
                  <td className="py-3 font-medium text-card-foreground">
                    <div className="flex items-center gap-2">
                      {c.client}
                      {c.date && (
                        <span className="inline-flex items-center gap-1 text-[10px] bg-muted px-2 py-0.5 rounded">
                          <Calendar size={10} /> {c.date}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 text-muted-foreground/80">{c.code}</td>
                  <td className="py-3">
                    <span className="badge-pending">
                      <AlertTriangle size={10} /> {c.status}
                    </span>
                  </td>
                  <td className="py-3 text-card-foreground">{c.days}</td>
                  <td className="py-3 text-right">
                    <button className="inline-flex items-center gap-1 text-xs bg-muted hover:bg-muted/80 px-3 py-1.5 rounded-md text-card-foreground transition-colors">
                      <FileText size={12} /> {c.action} <ChevronRight size={12} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
        <button className="text-xs text-muted-foreground/70 flex items-center gap-1 hover:text-card-foreground">
          <ChevronDown size={14} /> Ver contratos
        </button>
        <button className="text-xs font-medium bg-card-foreground text-card px-4 py-1.5 rounded-md hover:opacity-90 transition-opacity">
          Relembretos →
        </button>
      </div>
    </motion.div>
  );
};

export default ContractsTable;
