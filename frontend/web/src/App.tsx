import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);



export default App;

