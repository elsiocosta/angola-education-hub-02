
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import Institution from "./pages/Institution";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import RegisterOptions from "./components/RegisterOptions";
import VisitorRegister from "./components/VisitorRegister";
import EmailVerification from "./components/EmailVerification";
import Dashboard from "./pages/Dashboard";
import StudentDashboard from "./pages/StudentDashboard";
import InstitutionDashboard from "./pages/InstitutionDashboard";
import VisitorDashboard from "./pages/VisitorDashboard";
import StudentSocialDashboard from "./pages/StudentSocialDashboard";
import InviteManagement from "./pages/InviteManagement";
import CourseManagement from "./pages/CourseManagement";
import InternalMessages from "./pages/InternalMessages";
import Feed from "./pages/Feed";
import Application from "./pages/Application";
import Admin from "./pages/Admin";
import Report from "./pages/Report";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Support from "./pages/Support";
import Blog from "./pages/Blog";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Documents from "./pages/Documents";
import { AuthProvider } from "@/hooks/useAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/search" element={<Search />} />
            <Route path="/institution/:id" element={<Institution />} />
            <Route path="/register" element={<RegisterOptions />} />
            <Route path="/register/visitor" element={<VisitorRegister />} />
            <Route path="/register/institution" element={<Register />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/student" element={<StudentDashboard />} />
            <Route path="/dashboard/institution" element={<InstitutionDashboard />} />
            <Route path="/dashboard/visitor" element={<VisitorDashboard />} />
            <Route path="/dashboard/student-social" element={<StudentSocialDashboard />} />
            
            {/* Institution Management Routes */}
            <Route path="/invites" element={<InviteManagement />} />
            <Route path="/courses" element={<CourseManagement />} />
            <Route path="/messages" element={<InternalMessages />} />
            
            {/* Social Feed */}
            <Route path="/feed" element={<Feed />} />
            
            <Route path="/application/:institutionId" element={<Application />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/report" element={<Report />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/support" element={<Support />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/documents" element={<Documents />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
