import { Search, MoreHorizontal } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import StatCards from "@/components/dashboard/StatCards";
import ContractsTable from "@/components/dashboard/ContractsTable";
import PendingDocs from "@/components/dashboard/PendingDocs";
import Meetings from "@/components/dashboard/Meetings";
import RecentFiles from "@/components/dashboard/RecentFiles";
import UrgentDocs from "@/components/dashboard/UrgentDocs";
import Footer from "@/components/dashboard/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />

      <div className="flex-1 ml-56 flex flex-col">
        <Header />

        <main className="flex-1 p-6 bg-dashboard-content overflow-y-auto">
          {/* Page Title */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-extrabold font-display text-foreground">Painel Administrativo</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Bom dia. Aqui está um resumo das atividades administrativas de hoje.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 text-sm bg-muted/30 border border-border px-4 py-2 rounded-lg text-foreground hover:bg-muted/50 transition-colors">
                <Search size={14} /> Buscar
              </button>
              <button className="p-2 bg-muted/30 border border-border rounded-lg text-foreground hover:bg-muted/50 transition-colors">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>

          {/* Stat Cards */}
          <StatCards />

          {/* Contracts Table */}
          <div className="mt-6">
            <ContractsTable />
          </div>

          {/* Bottom Grid */}
          <div className="mt-6 grid grid-cols-2 gap-6">
            <PendingDocs />
            <Meetings />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-6">
            <RecentFiles />
            <UrgentDocs />
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Index;
