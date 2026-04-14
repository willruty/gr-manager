import { useState } from "react";
import { 
  Plus, Calendar as CalendarIcon, Clock, Users, Video, MapPin, Search, Filter 
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
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
import { motion } from "framer-motion";

interface Meeting {
  id: string;
  title: string;
  company: string;
  time: string;
  date: Date;
  type: "Presencial" | "Online";
  participants: number;
}

const INITIAL_MEETINGS: Meeting[] = [];

const Meetings = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [meetings, setMeetings] = useState<Meeting[]>(INITIAL_MEETINGS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form states
  const [newTitle, setNewTitle] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newType, setNewType] = useState<"Presencial" | "Online">("Online");

  const handleAddMeeting = () => {
    if (!newTitle || !newCompany || !newTime || !date) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    const newMeeting: Meeting = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTitle,
      company: newCompany,
      time: newTime,
      date: date,
      type: newType,
      participants: 1,
    };

    setMeetings([newMeeting, ...meetings]);
    setIsDialogOpen(false);
    setNewTitle("");
    setNewCompany("");
    setNewTime("");
    toast.success("Reunião agendada com sucesso!");
  };

  const filteredByDate = meetings.filter(m => 
    m.date.toDateString() === date?.toDateString()
  );

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold font-display text-foreground">Agenda de Reuniões</h1>
        </div>

        <div className="flex items-center gap-3">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium">
                <Plus size={16} /> Agendar Reunião
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Novo Agendamento</DialogTitle>
                <DialogDescription>
                  Preencha os detalhes para agendar uma nova reunião.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">Título</Label>
                  <Input id="title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="company" className="text-right">Empresa</Label>
                  <Input id="company" value={newCompany} onChange={(e) => setNewCompany(e.target.value)} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time" className="text-right">Horário</Label>
                  <Input id="time" type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" onClick={handleAddMeeting}>Confirmar Agendamento</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Side */}
        <div className="lg:col-span-1 space-y-6">
          <div className="section-card p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border-none flex items-center justify-center"
            />
          </div>
          
          <div className="section-card p-4">
            <h3 className="text-sm font-bold text-card-foreground mb-3 flex items-center gap-2">
              <Clock size={16} className="text-primary" /> Próximos Lembretes
            </h3>
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground italic">Nenhum lembrete para hoje.</p>
            </div>
          </div>
        </div>

        {/* List Side */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
             <h2 className="text-lg font-bold text-card-foreground">
                Reuniões de {date?.toLocaleDateString("pt-BR", { day: 'numeric', month: 'long' })}
             </h2>
             <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 text-xs"
                  onClick={() => toast.info("Busca de reuniões em breve.")}
                >
                  <Search size={14} className="mr-2" /> Buscar
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 text-xs"
                  onClick={() => toast.info("Filtros de agenda em desenvolvimento.")}
                >
                  <Filter size={14} className="mr-2" /> Filtrar
                </Button>
             </div>

          </div>

          {filteredByDate.length === 0 ? (
            <div className="section-card py-20 flex flex-col items-center justify-center text-center opacity-80">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <CalendarIcon className="text-muted-foreground" size={24} />
              </div>
              <h3 className="text-base font-bold text-card-foreground">Nenhuma reunião hoje</h3>
              <p className="text-sm text-muted-foreground max-w-[200px] mt-1">
                Aproveite o tempo livre ou agende um novo compromisso.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredByDate.map((meeting, i) => (
                <motion.div
                  key={meeting.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="section-card p-4 flex items-center justify-between group hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex flex-col items-center justify-center text-primary">
                      <span className="text-xs font-bold uppercase">{meeting.time.split(":")[0]}</span>
                      <span className="text-[10px] opacity-70">h</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-card-foreground">{meeting.title}</h4>
                      <p className="text-xs text-muted-foreground">{meeting.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="hidden md:flex flex-col items-end">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        {meeting.type === "Online" ? <Video size={14} /> : <MapPin size={14} />}
                        <span>{meeting.type}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mt-1">
                        <Users size={12} />
                        <span>{meeting.participants} participante</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="group-hover:text-primary transition-colors">
                      <Clock size={18} />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Meetings;
