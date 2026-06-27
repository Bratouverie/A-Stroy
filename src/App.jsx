import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Services from './pages/Services';
import EngineeringServiceDetail from './pages/EngineeringServiceDetail';
import Portfolio from './pages/Portfolio';
import PortfolioDetail from './pages/PortfolioDetail';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPostPage from './pages/BlogPostPage';
import Contacts from './pages/Contacts';
import CRMLayout from './pages/crm/CRMLayout';
import Dashboard from './pages/crm/Dashboard';
import LeadsManagement from './pages/crm/LeadsManagement';
import ProjectsManagement from './pages/crm/ProjectsManagement';
import TasksBoard from './pages/crm/TasksBoard';
import Reports from './pages/crm/Reports';
import CRMSettings from './pages/crm/Settings';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CRMInfo from './pages/CRMInfo';
import Reviews from './pages/Reviews';
import CRMCodeLogin from './pages/CRMCodeLogin';
import CRMAdminPanel from './pages/CRMAdminPanel';
import ProtectedCRMRoute from '@/components/ProtectedCRMRoute';
import ProtectedRoute from '@/components/ProtectedRoute';
import ChatBotWidget from '@/components/chatbot/ChatBotWidget';
import { Navigate, useLocation } from 'react-router-dom';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#0F1419]">
        <div className="w-8 h-8 border-4 border-[#1A1F2E] border-t-[#D4AF37] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:slug" element={<EngineeringServiceDetail />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/portfolio/:projectId" element={<PortfolioDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogPostPage />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/crm-info" element={<CRMInfo />} />
      <Route path="/reviews" element={<Reviews />} />

      {/* CRM — code-based auth */}
      <Route path="/crm-login" element={<CRMCodeLogin />} />
      <Route path="/crm-admin" element={<ProtectedCRMRoute requiredRole="admin"><CRMAdminPanel /></ProtectedCRMRoute>} />
      <Route element={<ProtectedCRMRoute><CRMLayout /></ProtectedCRMRoute>}>
        <Route path="/crm" element={<Dashboard />} />
        <Route path="/crm/leads" element={<LeadsManagement />} />
        <Route path="/crm/projects" element={<ProjectsManagement />} />
        <Route path="/crm/tasks" element={<TasksBoard />} />
        <Route path="/crm/reports" element={<Reports />} />
        <Route path="/crm/settings" element={<CRMSettings />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
          <ChatBotWidget />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App