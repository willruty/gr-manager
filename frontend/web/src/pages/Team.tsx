import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { 
  Plus, Users, Search, Filter, Phone, Mail, UserCog, ShieldCheck, MoreVertical, ChevronRight 
} from "lucide-react";
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
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  dept: string;
  email: string;
  phone: string;
  status: "Ativo" | "Inativo";
  permissions: "Admin" | "Editor" | "Leitor";
}

const INITIAL_TEAM: TeamMember[] = [];

const Team = () => {
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form states
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newDept, setNewDept] = useState("");

  const handleAddMember = () => {
    if (!newName || !newRole) {
      toast.error("Por favor, preencha o nome e o cargo.");
      return;
    }

    const newMember: TeamMember = {
      id: Math.random().toString(36).substr(2, 9),
      name: newName,
      role: newRole,
      dept: newDept || "Administrativo",
      email: `${newName.toLowerCase().replace(" ", ".")}@empresa.com.br`,
      phone: "(11) 90000-0000",
      status: "Ativo",
      permissions: "Editor",
    };

    setTeam([newMember, ...team]);
    setIsDialogOpen(false);
    setNewName("");
    setNewRole("");
    toast.success("Membro adicionado ao time!");
  };

  const filteredTeam = team.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold font-display text-foreground">Gestão da Equipe</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input 
              type="text" 
              placeholder="Buscar equipe..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => toast.info("Pesquisa em tempo real ativada por Nome, Cargo ou Setor.")}
              className="pl-10 pr-4 py-2 bg-muted/30 border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary w-64"
            />
          </div>


          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium">
                <Plus size={16} /> Adicionar Membro
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Novo Colaborador</DialogTitle>
                <DialogDescription>
                  Adicione um novo membro ao sistema administrativo.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Nome</Label>
                  <Input id="name" value={newName} onChange={(e) => setNewName(e.target.value)} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">Cargo</Label>
                  <Input id="role" value={newRole} onChange={(e) => setNewRole(e.target.value)} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dept" className="text-right">Setor</Label>
                  <Input id="dept" value={newDept} onChange={(e) => setNewDept(e.target.value)} className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" onClick={handleAddMember}>Salvar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="section-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/30">
              <tr className="text-xs text-muted-foreground/70 uppercase tracking-wider">
                <th className="text-left py-4 px-6 font-medium border-b border-border/40">Colaborador</th>
                <th className="text-left py-4 px-6 font-medium border-b border-border/40">Setor/Cargo</th>
                <th className="text-left py-4 px-6 font-medium border-b border-border/40">Permissão</th>
                <th className="text-left py-4 px-6 font-medium border-b border-border/40">Status</th>
                <th className="text-right py-4 px-6 font-medium border-b border-border/40"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filteredTeam.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-muted-foreground italic">
                    Nenhum colaborador encontrado.
                  </td>
                </tr>
              ) : (
                filteredTeam.map((member, i) => (
                  <motion.tr 
                    key={member.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="table-row-hover"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-card-foreground">{member.name}</p>
                          <p className="text-[10px] text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-card-foreground text-xs">{member.role}</p>
                        <p className="text-[10px] text-muted-foreground opacity-70 uppercase tracking-wider">{member.dept}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        {member.permissions === "Admin" ? <ShieldCheck size={14} className="text-primary" /> : <UserCog size={14} />}
                        <span>{member.permissions}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={member.status === "Ativo" ? "badge-active" : "badge-pending"}>
                        {member.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Editar Perfil</DropdownMenuItem>
                            <DropdownMenuItem>Alterar Permissões</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Remover do Time</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                          <ChevronRight size={18} />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Team;
