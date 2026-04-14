import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ContractsTable from "@/components/dashboard/ContractsTable";
import { Plus, Filter, Search, FileText, TrendingUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Contract } from "@/types/dashboard";
import { toast } from "sonner";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { motion } from "framer-motion";

const Contracts = () => {
  const [contracts, setContracts] = useLocalStorage<Contract[]>("gr:contracts", []);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [newClient, setNewClient] = useState("");
  const [newCode, setNewCode] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newStatus, setNewStatus] = useState<"Ativo" | "Pendente">("Pendente");

  const filteredContracts = contracts.filter(c =>
    c.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ativos = contracts.filter(c => c.status === "Ativo").length;
  const pendentes = contracts.filter(c => c.status === "Pendente").length;

  const handleAddContract = () => {
    if (!newClient || !newCode) {
      toast.error("Por favor, preencha o nome do cliente e o código.");
      return;
    }

    const newContract: Contract = {
      client: newClient,
      code: newCode,
      status: newStatus,
      days: "Recém criado",
      action: "Ver",
      date: newDate ? new Date(newDate + "T12:00:00").toLocaleDateString("pt-BR") : "-",
    };

    setContracts([newContract, ...contracts]);
    setIsDialogOpen(false);
    setNewClient("");
    setNewCode("");
    setNewDate("");
    setNewStatus("Pendente");
    toast.success("Contrato adicionado com sucesso!");
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold font-display text-foreground">Gestão de Contratos</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Gerencie e acompanhe todos os contratos</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              type="text"
              placeholder="Buscar contratos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-muted/30 border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary w-64"
            />
          </div>
          <button
            onClick={() => toast.info("Sistema de filtros em desenvolvimento.")}
            className="flex items-center gap-2 text-sm bg-muted/30 border border-border px-4 py-2 rounded-lg text-foreground hover:bg-muted/50 transition-colors"
          >
            <Filter size={14} /> Filtros
          </button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 text-sm bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium">
                <Plus size={16} /> Novo Contrato
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[440px]">
              <DialogHeader>
                <DialogTitle>Novo Contrato</DialogTitle>
                <DialogDescription>
                  Preencha os dados abaixo para cadastrar um novo contrato no sistema.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="client" className="text-right text-sm">Cliente</Label>
                  <Input
                    id="client"
                    placeholder="Nome do cliente"
                    className="col-span-3"
                    value={newClient}
                    onChange={(e) => setNewClient(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="code" className="text-right text-sm">Código</Label>
                  <Input
                    id="code"
                    placeholder="Ex: CTR-2024-001"
                    className="col-span-3"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right text-sm">Status</Label>
                  <select
                    id="status"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as "Ativo" | "Pendente")}
                    className="col-span-3 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="Pendente">Pendente</option>
                    <option value="Ativo">Ativo</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right text-sm">Vencimento</Label>
                  <Input
                    id="date"
                    type="date"
                    className="col-span-3"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                <Button type="button" onClick={handleAddContract}>Salvar Contrato</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total de Contratos", value: contracts.length, icon: FileText, color: "text-primary" },
          { label: "Contratos Ativos", value: ativos, icon: TrendingUp, color: "text-green-500" },
          { label: "Pendentes", value: pendentes, icon: Filter, color: "text-yellow-500" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="section-card p-4 flex items-center gap-4"
          >
            <div className="p-2.5 rounded-lg bg-muted/50">
              <item.icon size={18} className={item.color} />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-card-foreground">{item.value}</p>
              <p className="text-xs text-muted-foreground font-medium">{item.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-6">
        <ContractsTable data={filteredContracts} />
      </div>
    </DashboardLayout>
  );
};

export default Contracts;
