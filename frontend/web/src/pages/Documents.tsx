import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Plus, Search, FolderPlus, FileText, Download, MoreVertical, LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/sonner";

const Documents = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold font-display text-foreground">Repositório de Documentos</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-muted/30 p-1 rounded-lg border border-border mr-2">
            <button 
              onClick={() => {
                setViewMode("grid");
                toast.info("Visualização em grade ativada.");
              }}
              className={`p-1.5 rounded-md transition-colors ${viewMode === "grid" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              <LayoutGrid size={16} />
            </button>
            <button 
              onClick={() => {
                setViewMode("list");
                toast.info("Visualização em lista ativada.");
              }}
              className={`p-1.5 rounded-md transition-colors ${viewMode === "list" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              <List size={16} />
            </button>
          </div>
          <button 
            onClick={() => toast.info("Funcionalidade de Nova Pasta será integrada ao bucket de arquivos.")}
            className="flex items-center gap-2 text-sm bg-muted/30 border border-border px-4 py-2 rounded-lg text-foreground hover:bg-muted/50 transition-colors"
          >
            <FolderPlus size={14} /> Nova Pasta
          </button>
          <button 
            onClick={() => toast.info("Selecione os arquivos para upload.")}
            className="flex items-center gap-2 text-sm bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            <Plus size={16} /> Upload de Arquivos
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden min-h-[400px] flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-muted/30 rounded-2xl flex items-center justify-center mb-6 border border-border/50">
          <FileText className="text-muted-foreground/60" size={40} />
        </div>
        <h3 className="text-xl font-bold text-card-foreground">Sua biblioteca está vazia</h3>
        <p className="text-sm text-muted-foreground max-w-sm mt-3 mb-8">
            Faça upload de seu primeiro documento para começar a organizar seus arquivos e contratos de forma eficiente.
        </p>
        <div className="flex gap-4">
          <button 
            onClick={() => toast.info("Iniciando seletor de arquivos.")}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
          >
             Enviar Documento
          </button>
          <button 
            onClick={() => toast.info("O tutorial em vídeo está sendo preparado.")}
            className="px-6 py-3 bg-muted/50 text-foreground rounded-lg font-bold hover:bg-muted transition-colors"
          >
            Ver Tutorial
          </button>
        </div>
      </div>

    </DashboardLayout>
  );
};

export default Documents;
