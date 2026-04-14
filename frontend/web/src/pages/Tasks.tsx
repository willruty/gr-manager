import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  Plus, CheckSquare, Search, Filter, Clock, AlertTriangle, CheckCircle2, Trash2
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
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface Task {
  id: string;
  title: string;
  priority: "Alta" | "Média" | "Baixa";
  status: "Pendente" | "Concluido";
  deadline: string;
  category: string;
  createdAt: string;
}

const PRIORITY_COLORS = {
  Alta: "text-red-500",
  Média: "text-yellow-500",
  Baixa: "text-blue-400",
};

const Tasks = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>("gr:tasks", []);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"Todos" | "Pendente" | "Concluido">("Todos");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newPriority, setNewPriority] = useState<"Alta" | "Média" | "Baixa">("Média");
  const [newCategory, setNewCategory] = useState("");
  const [newDeadline, setNewDeadline] = useState("");

  const handleAddTask = () => {
    if (!newTitle) {
      toast.error("Por favor, dê um título para a tarefa.");
      return;
    }

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: newTitle,
      priority: newPriority,
      status: "Pendente",
      deadline: newDeadline ? new Date(newDeadline + "T12:00:00").toLocaleDateString("pt-BR") : "Hoje",
      category: newCategory || "Geral",
      createdAt: new Date().toISOString(),
    };

    setTasks([newTask, ...tasks]);
    setIsDialogOpen(false);
    setNewTitle("");
    setNewCategory("");
    setNewDeadline("");
    setNewPriority("Média");
    toast.success("Tarefa adicionada!");
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, status: t.status === "Pendente" ? "Concluido" : "Pendente" } : t
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
    toast.success("Tarefa removida.");
  };

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "Todos" || t.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const pendentes = tasks.filter(t => t.status === "Pendente").length;
  const concluidas = tasks.filter(t => t.status === "Concluido").length;
  const altas = tasks.filter(t => t.priority === "Alta" && t.status === "Pendente").length;

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold font-display text-foreground">Gerenciador de Tarefas</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{pendentes} pendente{pendentes !== 1 ? "s" : ""} · {concluidas} concluída{concluidas !== 1 ? "s" : ""}</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium">
              <Plus size={16} /> Nova Tarefa
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[440px]">
            <DialogHeader>
              <DialogTitle>Adicionar Tarefa</DialogTitle>
              <DialogDescription>
                Preencha os detalhes para cadastrar uma nova tarefa.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right text-sm">Título</Label>
                <Input id="title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="col-span-3" placeholder="Descreva a tarefa..." />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right text-sm">Prioridade</Label>
                <select
                  id="priority"
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as "Alta" | "Média" | "Baixa")}
                  className="col-span-3 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <option value="Alta">Alta</option>
                  <option value="Média">Média</option>
                  <option value="Baixa">Baixa</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right text-sm">Categoria</Label>
                <Input id="category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Ex: Financeiro" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="deadline" className="text-right text-sm">Prazo</Label>
                <Input id="deadline" type="date" value={newDeadline} onChange={(e) => setNewDeadline(e.target.value)} className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
              <Button type="button" onClick={handleAddTask}>Adicionar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary bar */}
      {tasks.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Pendentes", value: pendentes, color: "text-yellow-500" },
            { label: "Concluídas", value: concluidas, color: "text-green-500" },
            { label: "Alta Prioridade", value: altas, color: "text-red-500" },
          ].map((item) => (
            <div key={item.label} className="section-card p-4 flex items-center gap-3">
              <p className={`text-2xl font-extrabold ${item.color}`}>{item.value}</p>
              <p className="text-xs text-muted-foreground font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-6">
        {/* Filters and Search */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              type="text"
              placeholder="Buscar tarefas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-muted/30 border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          {(["Todos", "Pendente", "Concluido"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === status
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/30 border border-border text-foreground hover:bg-muted/50"
              }`}
            >
              {status === "Concluido" ? "Concluídas" : status}
            </button>
          ))}
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="section-card py-20 flex flex-col items-center justify-center text-center">
              <CheckSquare className="text-muted-foreground opacity-30 mb-4" size={48} />
              <h3 className="text-lg font-bold text-card-foreground">
                {tasks.length === 0 ? "Sua lista está limpa!" : "Nenhuma tarefa encontrada"}
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs mt-2">
                {tasks.length === 0
                  ? "Nenhuma tarefa pendente no momento. Adicione uma nova se houver trabalho a fazer."
                  : "Tente ajustar os filtros ou termo de busca."}
              </p>
            </div>
          ) : (
            <AnimatePresence>
              {filteredTasks.map((task, i) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.04 }}
                  className={`section-card p-4 flex items-center justify-between group transition-all ${
                    task.status === "Concluido"
                      ? "opacity-60"
                      : "hover:border-primary/20"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                        task.status === "Concluido"
                          ? "bg-green-500 border-green-500 text-white"
                          : "border-muted-foreground/40 hover:border-primary"
                      }`}
                    >
                      {task.status === "Concluido" && <CheckCircle2 size={14} />}
                    </button>
                    <div>
                      <h4 className={`font-semibold text-card-foreground transition-all ${task.status === "Concluido" ? "line-through text-muted-foreground" : ""}`}>
                        {task.title}
                      </h4>
                      <div className="flex items-center gap-2.5 text-[10px] uppercase font-bold tracking-wider mt-1">
                        <span className="text-muted-foreground">{task.category}</span>
                        <span className="text-muted-foreground/30">·</span>
                        <span className={PRIORITY_COLORS[task.priority]}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock size={12} />
                      <span>{task.deadline}</span>
                    </div>
                    {task.priority === "Alta" && task.status === "Pendente" && (
                      <AlertTriangle size={14} className="text-red-500" />
                    )}
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Tasks;
