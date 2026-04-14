import { 
  User, Bell, Shield, Palette, Globe, Mail, Lock, LogOut, Save, Moon, Sun, Smartphone 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";
import { useTheme } from "@/components/theme-provider.tsx";

import { useState } from "react";

const Settings = () => {
  const { theme, setTheme } = useTheme();

  const handleSave = () => {
     toast.success("Configurações salvas com sucesso!");
  };


  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold font-display text-foreground">Configurações</h1>
        </div>

        <Button onClick={handleSave} className="gap-2">
          <Save size={16} /> Salvar Alterações
        </Button>
      </div>

      <div className="flex flex-col gap-6">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="bg-muted/30 border border-border p-1 gap-2 mb-6">
            <TabsTrigger value="profile" className="gap-2"><User size={14} /> Perfil</TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2"><Bell size={14} /> Notificações</TabsTrigger>
            <TabsTrigger value="appearance" className="gap-2"><Palette size={14} /> Aparência</TabsTrigger>
            <TabsTrigger value="security" className="gap-2"><Shield size={14} /> Segurança</TabsTrigger>
          </TabsList>

          <div className="mt-4">
            <TabsContent value="profile">
               <div className="section-card p-6 max-w-2xl">
                  <h3 className="text-lg font-bold text-card-foreground mb-6">Informações Pessoais</h3>
                  <div className="grid gap-6">
                     <div className="flex items-center gap-6 mb-4">
                        <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-dashed border-primary/30 flex items-center justify-center text-primary cursor-pointer hover:bg-primary/20 transition-colors">
                           <User size={32} />
                        </div>
                        <Button variant="outline" size="sm">Alterar Avatar</Button>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label htmlFor="firstName">Nome</Label>
                           <Input id="firstName" placeholder="Seu nome" defaultValue="Caio" />
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="lastName">Sobrenome</Label>
                           <Input id="lastName" placeholder="Seu sobrenome" defaultValue="Marani" />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <div className="relative">
                           <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                           <Input id="email" className="pl-10" placeholder="seu@email.com" defaultValue="konohafamilia@gmail.com" />
                        </div>
                     </div>


                     <div className="space-y-2">
                        <Label htmlFor="bio">Bio curta</Label>
                        <textarea 
                           className="w-full min-h-[100px] bg-background border border-border rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                           placeholder="Conte um pouco sobre você..."
                        />
                     </div>
                  </div>
               </div>
            </TabsContent>

            <TabsContent value="notifications">
               <div className="section-card p-6 max-w-2xl space-y-6">
                  <h3 className="text-lg font-bold text-card-foreground mb-4">Preferências de Notificação</h3>
                  
                  <div className="space-y-4">
                     <div className="flex items-center justify-between p-4 bg-muted/20 rounded-xl">
                        <div className="space-y-0.5">
                           <p className="text-sm font-bold text-card-foreground">E-mail Marketing</p>
                           <p className="text-xs text-muted-foreground">Receba novidades e promoções por e-mail.</p>
                        </div>
                        <Switch />
                     </div>

                     <div className="flex items-center justify-between p-4 bg-muted/20 rounded-xl">
                        <div className="space-y-0.5">
                           <p className="text-sm font-bold text-card-foreground">Alertas de Vencimento</p>
                           <p className="text-xs text-muted-foreground">Notificar quando contratos estiverem próximos do vencimento.</p>
                        </div>
                        <Switch defaultChecked />
                     </div>

                     <div className="flex items-center justify-between p-4 bg-muted/20 rounded-xl">
                        <div className="space-y-0.5">
                           <p className="text-sm font-bold text-card-foreground">Novas Mensagens</p>
                           <p className="text-xs text-muted-foreground">Receber notificações quando um colega de equipe enviar uma mensagem.</p>
                        </div>
                        <Switch defaultChecked />
                     </div>
                  </div>
               </div>
            </TabsContent>

            <TabsContent value="appearance">
               <div className="section-card p-6 max-w-2xl">
                  <h3 className="text-lg font-bold text-card-foreground mb-6">Tema e Layout</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div 
                      onClick={() => setTheme("dark")}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${theme === "dark" ? "border-primary bg-primary/5" : "border-border hover:border-border/80"}`}
                    >
                      <div className="w-full h-24 bg-slate-900 rounded-md mb-3 flex items-center justify-center">
                        <Moon className="text-white" size={24} />
                      </div>
                      <p className="text-xs font-bold text-center">Modo Escuro</p>
                    </div>

                    <div 
                      onClick={() => setTheme("light")}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${theme === "light" ? "border-primary bg-primary/5" : "border-border hover:border-border/80"}`}
                    >
                      <div className="w-full h-24 bg-white rounded-md mb-3 flex items-center justify-center border border-slate-200">
                        <Sun className="text-slate-400" size={24} />
                      </div>
                      <p className="text-xs font-bold text-center">Modo Claro</p>
                    </div>

                    <div 
                      onClick={() => setTheme("system")}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${theme === "system" ? "border-primary bg-primary/5" : "border-border hover:border-border/80"}`}
                    >
                      <div className="w-full h-24 bg-gradient-to-br from-slate-900 to-white rounded-md mb-3 flex items-center justify-center border border-slate-200">
                        <Smartphone className="text-slate-500" size={24} />
                      </div>
                      <p className="text-xs font-bold text-center">Sistema</p>
                    </div>
                  </div>
               </div>
            </TabsContent>

            <TabsContent value="security">
               <div className="section-card p-6 max-w-2xl space-y-6">
                  <h3 className="text-lg font-bold text-card-foreground mb-4">Segurança da Conta</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                       <Label htmlFor="currentPass">Senha Atual</Label>
                       <Input id="currentPass" type="password" placeholder="••••••••" />
                    </div>
                    <div className="space-y-2">
                       <Label htmlFor="newPass">Nova Senha</Label>
                       <Input id="newPass" type="password" placeholder="••••••••" />
                    </div>
                    <Button variant="outline" className="w-full gap-2">
                       <Lock size={14} /> Atualizar Senha
                    </Button>
                  </div>

                  <div className="pt-6 border-t border-border mt-8">
                     <p className="text-sm font-bold text-status-danger mb-1">Encerrar Sessão</p>
                     <p className="text-xs text-muted-foreground mb-4">Você será desconectado de todos os seus dispositivos.</p>
                     <Button variant="destructive" size="sm" className="gap-2">
                        <LogOut size={14} /> Sair do Sistema
                     </Button>
                  </div>
               </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </>
  );
};

export default Settings;
