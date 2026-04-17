import { useState, useMemo } from "react";
import {
  Plus, Search, FolderPlus, FileText, MoreVertical, LayoutGrid, List,
  Filter, AlertTriangle, CheckCircle2, Clock3, Download, Eye, TrendingUp,
  FolderOpen, Sparkles
} from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { mockDocuments, mockRecentFiles, MockDocument } from "@/lib/mockData";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type StatusFilter = "todos" | "valido" | "vencendo" | "vencido";

const STATUS_META: Record<MockDocument["status"], {
  label: string; dot: string; ring: string; text: string;
}> = {
  valido:   { label: "Válido",   dot: "bg-emerald-500", ring: "ring-emerald-500/20", text: "text-emerald-600 dark:text-emerald-400" },
  vencendo: { label: "Vencendo", dot: "bg-amber-500",   ring: "ring-amber-500/20",   text: "text-amber-600 dark:text-amber-400" },
  vencido:  { label: "Vencido",  dot: "bg-red-500",     ring: "ring-red-500/20",     text: "text-red-600 dark:text-red-400" },
};

const DOC_TYPES = ["Todos", "CNH", "ART", "Laudo", "Contrato", "NR-11", "ASO", "AVCB"] as const;
type DocTypeFilter = typeof DOC_TYPES[number];

const Documents = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("todos");
  const [typeFilter, setTypeFilter] = useState<DocTypeFilter>("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    return mockDocuments.filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.client.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "todos" || d.status === statusFilter;
      const matchesType = typeFilter === "Todos" || d.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchTerm, statusFilter, typeFilter]);

  const counts = useMemo(() => ({
    total: mockDocuments.length,
    validos: mockDocuments.filter(d => d.status === "valido").length,
    vencendo: mockDocuments.filter(d => d.status === "vencendo").length,
    vencidos: mockDocuments.filter(d => d.status === "vencido").length,
  }), []);

  const statusChips: { key: StatusFilter; label: string; count: number; icon: typeof CheckCircle2; accent: string }[] = [
    { key: "todos",    label: "Todos",    count: counts.total,    icon: FolderOpen,     accent: "text-primary" },
    { key: "valido",   label: "Válidos",  count: counts.validos,  icon: CheckCircle2,   accent: "text-emerald-500" },
    { key: "vencendo", label: "Vencendo", count: counts.vencendo, icon: Clock3,         accent: "text-amber-500" },
    { key: "vencido",  label: "Vencidos", count: counts.vencidos, icon: AlertTriangle,  accent: "text-red-500" },
  ];

  return (
    <>
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-primary/70 mb-1">
            Compliance · Repositório
          </p>
          <h1 className="text-2xl font-extrabold font-display text-foreground tracking-tight">
            Gestão de Documentos
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {counts.total} arquivos · {counts.vencendo + counts.vencidos} requerem atenção
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-muted/30 p-1 rounded-xl border border-border">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              title="Grade"
            >
              <LayoutGrid size={15} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              title="Lista"
            >
              <List size={15} />
            </button>
          </div>
          <Button
            variant="outline"
            onClick={() => toast.info("Nova pasta — integração em breve.")}
            className="gap-2 rounded-xl"
          >
            <FolderPlus size={14} /> Nova Pasta
          </Button>
          <Button
            onClick={() => toast.info("Selecione os arquivos para upload.")}
            className="gap-2 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow"
          >
            <Plus size={16} /> Upload
          </Button>
        </div>
      </div>

      {/* ── Status chips + Search (chunking Miller) ───────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {statusChips.map((chip, i) => {
            const active = statusFilter === chip.key;
            return (
              <motion.button
                key={chip.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => setStatusFilter(chip.key)}
                className={`group relative text-left p-4 rounded-2xl border transition-all overflow-hidden ${
                  active
                    ? "bg-card border-primary/40 shadow-lg shadow-primary/5"
                    : "bg-card/50 border-border hover:border-primary/20 hover:bg-card"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="docs-chip-active"
                    className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary to-primary/60"
                  />
                )}
                <div className="flex items-center justify-between mb-2">
                  <chip.icon size={16} className={`${chip.accent} opacity-80`} />
                  <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                    {chip.label}
                  </span>
                </div>
                <p className="text-3xl font-black text-card-foreground tracking-tight">{chip.count}</p>
              </motion.button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={15} />
            <input
              type="text"
              placeholder="Buscar documentos, clientes, equipamentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-11 pl-10 pr-4 bg-muted/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-background transition-colors"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-11 gap-2 rounded-xl shrink-0">
                <Filter size={14} /> {typeFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[160px]">
              {DOC_TYPES.map((t) => (
                <DropdownMenuItem key={t} onClick={() => setTypeFilter(t)} className={typeFilter === t ? "font-bold text-primary" : ""}>
                  {t}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* ── Main grid (2/3) + sidebar (1/3) — regra dos terços ── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
        <div>
          {filtered.length === 0 ? (
            <EmptyState />
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
              {filtered.map((doc, i) => (
                <DocumentCard key={doc.id} doc={doc} index={i} />
              ))}
            </div>
          ) : (
            <DocumentList docs={filtered} />
          )}
        </div>

        {/* Sidebar: recentes + insights */}
        <aside className="space-y-4">
          <div className="section-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-card-foreground flex items-center gap-2">
                <TrendingUp size={14} className="text-primary" /> Atividade recente
              </h3>
              <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                7 dias
              </span>
            </div>
            <div className="space-y-3">
              {mockRecentFiles.slice(0, 5).map((f, i) => (
                <motion.div
                  key={f.name}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="group flex items-center gap-3 cursor-pointer"
                >
                  <div className={`w-9 h-9 shrink-0 rounded-lg ${f.color} flex items-center justify-center shadow-sm`}>
                    <FileText size={15} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-card-foreground truncate group-hover:text-primary transition-colors">
                      {f.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {f.author} · {f.time}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground/60">{f.extra}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative section-card p-5 overflow-hidden bg-gradient-to-br from-primary/5 via-card to-card">
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/10 blur-2xl" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                  Dica inteligente
                </span>
              </div>
              <p className="text-sm font-semibold text-card-foreground leading-snug mb-3">
                3 documentos vencem nos próximos 30 dias — configure alertas automáticos.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.info("Configurando alertas automáticos…")}
                className="w-full gap-1.5 text-xs"
              >
                Configurar alertas
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

/* ── Sub-components ─────────────────────────────────────── */

const DocumentCard = ({ doc, index }: { doc: MockDocument; index: number }) => {
  const meta = STATUS_META[doc.status];
  const daysLabel =
    doc.expiresIn === undefined ? "—" :
    doc.expiresIn < 0 ? `Vencido há ${Math.abs(doc.expiresIn)}d` :
    doc.expiresIn <= 30 ? `${doc.expiresIn} dias` :
    `${Math.round(doc.expiresIn / 30)} meses`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="group section-card p-5 hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${doc.color} flex items-center justify-center shadow-md shadow-black/10`}>
          <FileText size={20} className="text-white" />
        </div>

        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-card border ring-1 ${meta.ring} ${meta.text} text-[10px] font-bold`}>
            <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
            {meta.label}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                onClick={(e) => e.stopPropagation()}
                className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-muted-foreground hover:bg-muted transition-all"
              >
                <MoreVertical size={15} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem><Eye size={13} className="mr-2" /> Visualizar</DropdownMenuItem>
              <DropdownMenuItem><Download size={13} className="mr-2" /> Baixar</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <h4 className="font-bold text-sm text-card-foreground line-clamp-2 leading-snug mb-1 group-hover:text-primary transition-colors">
        {doc.name}
      </h4>
      <p className="text-xs text-muted-foreground truncate mb-4">{doc.client}</p>

      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <div className="flex items-center gap-2 text-[11px]">
          <span className="font-bold text-[9px] uppercase tracking-widest bg-muted/60 text-muted-foreground px-2 py-0.5 rounded">
            {doc.type}
          </span>
          <span className="text-muted-foreground">{doc.size}</span>
        </div>
        <span className={`text-[11px] font-bold ${meta.text}`}>{daysLabel}</span>
      </div>
    </motion.div>
  );
};

const DocumentList = ({ docs }: { docs: MockDocument[] }) => (
  <div className="section-card p-0 overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-muted/30">
          <tr className="text-xs text-muted-foreground/80 uppercase tracking-wider">
            <th className="text-left py-4 px-6 font-semibold border-b border-border/40">Documento</th>
            <th className="text-left py-4 px-6 font-semibold border-b border-border/40">Tipo</th>
            <th className="text-left py-4 px-6 font-semibold border-b border-border/40">Vincula</th>
            <th className="text-left py-4 px-6 font-semibold border-b border-border/40">Status</th>
            <th className="text-left py-4 px-6 font-semibold border-b border-border/40">Atualizado</th>
            <th className="text-right py-4 px-6 font-semibold border-b border-border/40"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/40">
          {docs.map((d, i) => {
            const meta = STATUS_META[d.status];
            return (
              <motion.tr
                key={d.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="hover:bg-muted/20 transition-colors cursor-pointer group"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg ${d.color} flex items-center justify-center shadow-sm`}>
                      <FileText size={15} className="text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-card-foreground">{d.name}</p>
                      <p className="text-[10px] text-muted-foreground">{d.size} · {d.author}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-muted/60 text-muted-foreground px-2 py-1 rounded">
                    {d.type}
                  </span>
                </td>
                <td className="py-4 px-6 text-xs text-muted-foreground">{d.client}</td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-card border ring-1 ${meta.ring} ${meta.text} text-[10px] font-bold`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                    {meta.label}
                  </span>
                </td>
                <td className="py-4 px-6 text-xs text-muted-foreground">{d.updatedAt}</td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Eye size={14} /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Download size={14} /></Button>
                  </div>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="section-card min-h-[400px] flex flex-col items-center justify-center text-center py-16">
    <div className="w-20 h-20 bg-primary/5 border border-primary/10 rounded-2xl flex items-center justify-center mb-6">
      <FileText className="text-primary/60" size={36} />
    </div>
    <h3 className="text-lg font-bold text-card-foreground">Nenhum documento encontrado</h3>
    <p className="text-sm text-muted-foreground max-w-sm mt-2">
      Tente ajustar os filtros ou faça upload de um novo documento.
    </p>
  </div>
);

export default Documents;
