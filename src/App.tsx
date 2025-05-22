
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import DashboardPage from "./pages/dashboard";
import FounderDetail from "./pages/founder/[id]";
import ResourceDetail from "./pages/resource/[id]";
import ResourcesPage from "./pages/resources";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/founders" element={<Index />} />
          <Route path="/founder/:id" element={<FounderDetail />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resource/:id" element={<ResourceDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
