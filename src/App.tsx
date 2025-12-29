import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Branches from "./pages/Branches";
import Users from "./pages/Users";
import Transactions from "./pages/Transactions";
import Payments from "./pages/Payments";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import AuditLog from "./pages/AuditLog";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/books" element={<Books />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/users" element={<Users />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/audit-log" element={<AuditLog />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
