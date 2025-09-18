import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";

// Páginas públicas
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import Institution from "./pages/Institution";
import About from "./pages/About";
import Support from "./pages/Support";
import Blog from "./pages/Blog";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";

// Páginas de autenticação
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import ForgotPasswordRedirect from "./pages/ForgotPasswordRedirect";
import RegisterOptions from "./components/RegisterOptions";
import VisitorRegister from "./components/VisitorRegister";
import EmailVerification from "./components/EmailVerification";

// Páginas de dashboard e redirecionamento
import { DashboardRedirect } from "./pages/DashboardRedirect";
import Unauthorized from "./pages/Unauthorized";
import StudentDashboard from "./pages/StudentDashboard";
import InstitutionDashboard from "./pages/InstitutionDashboard";
import VisitorDashboard from "./pages/VisitorDashboard";
import StudentSocialDashboard from "./pages/StudentSocialDashboard";
import Admin from "./pages/Admin";

// Páginas de estudante
import StudentCourses from "./pages/StudentCourses";
import StudentApplications from "./pages/StudentApplications";
import StudentMessages from "./pages/StudentMessages";
import StudentProfile from "./pages/StudentProfile";

// Páginas de instituição
import InstitutionStudents from "./pages/InstitutionStudents";
import InstitutionApplications from "./pages/InstitutionApplications";
import InstitutionReports from "./pages/InstitutionReports";
import InstitutionSettings from "./pages/InstitutionSettings";

// Páginas de visitante
import VisitorProfile from "./pages/VisitorProfile";

// Páginas de gestão institucional
import InviteManagement from "./pages/InviteManagement";
import CourseManagement from "./pages/CourseManagement";
import InternalMessages from "./pages/InternalMessages";
import Documents from "./pages/Documents";

// Páginas sociais e aplicações
import Feed from "./pages/Feed";
import Application from "./pages/Application";
import Report from "./pages/Report";

// Guards e Layouts
import { 
  PublicOnlyGuard, 
  StudentGuard, 
  InstitutionStaffGuard, 
  InstitutionAdminGuard, 
  PlatformAdminGuard 
} from "./components/guards/RouteGuard";
import { DashboardLayout } from "./components/layout/DashboardLayout";

// Provider
import { AuthProvider } from "@/hooks/useAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
          <Routes>
            {/* ===== ROTAS PÚBLICAS ===== */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/discover" element={<Search />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            
            {/* Rotas antigas mantidas para compatibilidade */}
            <Route path="/search" element={<Search />} />
            <Route path="/institution/:id" element={<Institution />} />
            <Route path="/support" element={<Support />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* ===== ROTAS DE AUTENTICAÇÃO (apenas para não logados) ===== */}
            <Route path="/login" element={
              <PublicOnlyGuard>
                <Login />
              </PublicOnlyGuard>
            } />
            <Route path="/signup" element={
              <PublicOnlyGuard>
                <RegisterOptions />
              </PublicOnlyGuard>
            } />
            <Route path="/register" element={
              <PublicOnlyGuard>
                <RegisterOptions />
              </PublicOnlyGuard>
            } />
            <Route path="/register/visitor" element={
              <PublicOnlyGuard>
                <VisitorRegister />
              </PublicOnlyGuard>
            } />
            <Route path="/register/institution" element={
              <PublicOnlyGuard>
                <Register />
              </PublicOnlyGuard>
            } />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route path="/forgot-password" element={
              <PublicOnlyGuard>
                <ForgotPassword />
              </PublicOnlyGuard>
            } />
            <Route path="/forgot-password-redirect" element={<ForgotPasswordRedirect />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            
            {/* ===== DASHBOARDS (protegidos por perfil) ===== */}
            <Route path="/dashboard" element={<DashboardRedirect />} />
            
            {/* Dashboard do Estudante */}
            <Route path="/dashboard/student/*" element={
              <StudentGuard>
                <DashboardLayout>
                  <Routes>
                    <Route path="/" element={<StudentDashboard />} />
                    <Route path="/courses" element={<StudentCourses />} />
                    <Route path="/applications" element={<StudentApplications />} />
                    <Route path="/messages" element={<StudentMessages />} />
                    <Route path="/profile" element={<StudentProfile />} />
                  </Routes>
                </DashboardLayout>
              </StudentGuard>
            } />
            
            {/* Dashboard Institucional */}
            <Route path="/dashboard/institution/*" element={
              <InstitutionStaffGuard>
                <DashboardLayout>
                  <Routes>
                    <Route path="/" element={<InstitutionDashboard />} />
                    <Route path="/students" element={<InstitutionStudents />} />
                    <Route path="/applications" element={<InstitutionApplications />} />
                    <Route path="/reports" element={<InstitutionReports />} />
                    <Route path="/settings" element={<InstitutionSettings />} />
                    <Route path="/profile" element={<InstitutionSettings />} />
                  </Routes>
                </DashboardLayout>
              </InstitutionStaffGuard>
            } />
            
            {/* Dashboard do Visitante */}
            <Route path="/dashboard/visitor/*" element={
              <DashboardLayout>
                <Routes>
                  <Route path="/" element={<VisitorDashboard />} />
                  <Route path="/profile" element={<VisitorProfile />} />
                </Routes>
              </DashboardLayout>
            } />
            
            {/* Dashboard Social do Estudante */}
            <Route path="/dashboard/student-social" element={
              <StudentGuard>
                <DashboardLayout>
                  <StudentSocialDashboard />
                </DashboardLayout>
              </StudentGuard>
            } />
            
            {/* ===== GESTÃO INSTITUCIONAL (apenas funcionários) ===== */}
            <Route path="/invites" element={
              <InstitutionStaffGuard>
                <DashboardLayout>
                  <InviteManagement />
                </DashboardLayout>
              </InstitutionStaffGuard>
            } />
            <Route path="/courses" element={
              <InstitutionStaffGuard>
                <DashboardLayout>
                  <CourseManagement />
                </DashboardLayout>
              </InstitutionStaffGuard>
            } />
            <Route path="/messages" element={
              <InstitutionStaffGuard>
                <DashboardLayout>
                  <InternalMessages />
                </DashboardLayout>
              </InstitutionStaffGuard>
            } />
            <Route path="/documents" element={
              <InstitutionStaffGuard>
                <DashboardLayout>
                  <Documents />
                </DashboardLayout>
              </InstitutionStaffGuard>
            } />
            
            {/* ===== FEED SOCIAL (estudantes e funcionários) ===== */}
            <Route path="/feed" element={
              <DashboardLayout>
                <Feed />
              </DashboardLayout>
            } />
            
            {/* ===== APLICAÇÕES E RELATÓRIOS ===== */}
            <Route path="/application/:institutionId" element={<Application />} />
            <Route path="/report" element={<Report />} />
            
            {/* ===== ADMINISTRAÇÃO DA PLATAFORMA ===== */}
            <Route path="/admin/*" element={
              <PlatformAdminGuard>
                <DashboardLayout>
                  <Routes>
                    <Route path="/" element={<Admin />} />
                    <Route path="/institutions" element={<div>Gestão de Instituições</div>} />
                    <Route path="/users" element={<div>Gestão de Usuários</div>} />
                    <Route path="/reports" element={<div>Relatórios Globais</div>} />
                    <Route path="/settings" element={<div>Configurações da Plataforma</div>} />
                  </Routes>
                </DashboardLayout>
              </PlatformAdminGuard>
            } />
            
            {/* ===== ROTA CATCH-ALL ===== */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
