import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Contracts from "./pages/Contracts.tsx";
import Clients from "./pages/Clients.tsx";
import Documents from "./pages/Documents.tsx";
import Meetings from "./pages/Meetings.tsx";
import Tasks from "./pages/Tasks.tsx";
import Team from "./pages/Team.tsx";
import Reports from "./pages/Reports.tsx";
import Settings from "./pages/Settings.tsx";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import Sidebar from "@/components/dashboard/Sidebar.tsx";
import Header from "@/components/dashboard/Header.tsx";
import Footer from "@/components/dashboard/Footer.tsx";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const queryClient = new QueryClient();

const AppLayout = () => {
  const [collapsed] = useLocalStorage<boolean>("gr:sidebar-collapsed", false);

  const sidebarWidth = collapsed ? 72 : 256;

  return (
    <div className="min-h-screen bg-background font-sans overflow-hidden">
      {/* Global Sidebar - Never remounts */}
      <Sidebar />

      {/* Main content area - width syncs with sidebar */}
      <motion.div
        animate={{ paddingLeft: sidebarWidth }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="w-full flex flex-col min-h-screen relative z-10"
      >
        {/* Global Header - Never remounts */}
        <Header />

        {/* Page content - stretches to fill all available space */}
        <main className="flex-1 px-8 py-6 overflow-y-auto relative">
          <div className="w-full">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/contracts" element={<Contracts />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/meetings" element={<Meetings />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/team" element={<Team />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </main>
      </motion.div>
    </div>
  );
};

const App = () => (
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;

