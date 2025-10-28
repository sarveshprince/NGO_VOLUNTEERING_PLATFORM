import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Opportunities from "./pages/Opportunities";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./pages/ProtectedRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import NGOCoordinatorDashboard from "./pages/Ngo_Admin/NGOCoordinatorDashboard";
import AboutUs from "./pages/AboutUs";
import Donate from "./pages/Donate";
import ContactUs from "./pages/ContactUs";
import NGORegister from "./pages/Ngo_Admin/NGORegister";
import ProgramManagerDashboard from "./pages/Program_Manager/ProgramManagerDashboard";
import VolunteerDashboard from "./pages/Volunteer/VolunteerDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
  <Route path="/" element={<Index />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/opportunities" element={<Opportunities />} />
  <Route path="/about" element={<AboutUs />} />
  <Route path="/donate" element={<Donate />} />
  <Route path="/contact" element={<ContactUs />} />
  <Route path="/NGORegister" element={<NGORegister />} />
  {/* Protected Dashboards */}
  <Route
    path="/dashboard/admin"
    element={
      <ProtectedRoute allowedRoles={["ADMIN"]}>
        <AdminDashboard />
      </ProtectedRoute>
    }
  />
  <Route
    path="/dashboard/volunteer"
    element={
      <ProtectedRoute allowedRoles={["VOLUNTEER", "VOLUNTEER_LEADER"]}>
        <VolunteerDashboard/>
      </ProtectedRoute>
    }
  />
  
  <Route
    path="/dashboard/ngo-coordinator"
    element={
      <ProtectedRoute allowedRoles={["NGO_COORDINATOR"]}>
        <NGOCoordinatorDashboard />
      </ProtectedRoute>
    }
  />
  
  <Route
    path="/dashboard/program-manager"
    element={
      <ProtectedRoute allowedRoles={["PROGRAM_MANAGER"]}>
        <ProgramManagerDashboard />
      </ProtectedRoute>
    }
  />
  

  <Route path="*" element={<NotFound />} />
</Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
