
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import HelpExcellences from "./pages/HelpExcellences";
import HelpExperiences from "./pages/HelpExperiences";
import HelpImport from "./pages/HelpImport";
import SelectPhosphorIcons from "./pages/SelectPhosphorIcons";
import { TestIconsPage } from "./components/TestIconsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/experiences" element={<Index />} />
            <Route path="/experiences/new" element={<Index />} />
            <Route path="/aide/excellences" element={<HelpExcellences />} />
            <Route path="/aide/experiences" element={<HelpExperiences />} />
            <Route path="/aide/import" element={<HelpImport />} />
            <Route path="/test-icons" element={<TestIconsPage />} />
            <Route path="/select-phosphor-icons" element={<SelectPhosphorIcons />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
