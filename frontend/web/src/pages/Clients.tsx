import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ClientsTable, { ClientData } from "@/components/dashboard/ClientsTable";
import { Plus, Search, Users, Filter, UserCheck, UserX } from "lucide-react";
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
import { toast } from "@/components/ui/sonner";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { motion } from "framer-motion";

const Clients = () => {
  const [clients, setClients] = useLocalStorage<ClientData[]>("gr:clients", []);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newLocation, setNewLocation] = useState("");

  const filteredClients = clients.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ativos = clients.filter(c => c.status === "Ativo").length;
  const inativos = clients.filter(c => c.status === "Inativo").length;

  const handleAddClient = () => {
    if (!newName || !newEmail) {
      toast.error("Por favor, preencha o nome e o e-mail do cliente.");
      return;
    }

    const newClient: ClientData = {
      id: crypto.randomUUID(),
      name: newName,
      email: newEmail,
      phone: newPhone || "-",
      location: newLocation || "-",
      status: "Ativo",
    };

    setClients([newClient, ...clients]);
    setIsDialogOpen(false);
    setNewName("");
    setNewEmail("");
    setNewPhone("");
    setNewLocation("");
    toast.success("Cliente cadastrado com sucesso!");
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold font-display text-foreground">Gestão de Clientes</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Gerencie sua base de clientes</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              type="text"
              placeholder="Pesquisar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-muted/30 border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary w-64"
            />
          </div>
          <button
            onClick={() => toast.info("Filtros avançados em desenvolvimento.")}
            className="flex items-center gap-2 text-sm bg-muted/30 border border-border px-4 py-2 rounded-lg text-foreground hover:bg-muted/50 transition-colors"
          >
            <Filter size={14} className="text-muted-foreground" /> Filtros
          </button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 text-sm bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium">
                <Plus size={16} /> Novo Cliente
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[440px]">
              <DialogHeader>
                <DialogTitle>Novo Cliente</DialogTitle>
                <DialogDescription>
                  Adicione um novo cliente à sua base de dados.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right text-sm">Nome</Label>
                  <Input id="name" value={newName} onChange={(e) => setNewName(e.target.value)} className="col-span-3" placeholder="Nome completo" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right text-sm">E-mail</Label>
                  <Input id="email" type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="col-span-3" placeholder="email@exemplo.com" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right text-sm">Telefone</Label>
                  <Input id="phone" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} className="col-span-3" placeholder="(00) 00000-0000" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right text-sm">Localização</Label>
                  <Input id="location" value={newLocation} onChange={(e) => setNewLocation(e.target.value)} className="col-span-3" placeholder="Cidade, Estado" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                <Button type="button" onClick={handleAddClient}>Cadastrar Cliente</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total de Clientes", value: clients.length, icon: Users, color: "text-primary" },
          { label: "Clientes Ativos", value: ativos, icon: UserCheck, color: "text-green-500" },
          { label: "Inativos", value: inativos, icon: UserX, color: "text-red-500" },
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
        <ClientsTable data={filteredClients} />
      </div>
    </DashboardLayout>
  );
};

export default Clients;
