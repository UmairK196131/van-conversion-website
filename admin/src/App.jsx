import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Layout from './components/Layout.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import TestimonialsPage from './pages/TestimonialsPage.jsx';
import InquiriesPage from './pages/InquiriesPage.jsx';
import FaqPage from './pages/FaqPage.jsx';
import { isAuthenticated } from './lib/auth.js';

export default function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated() ? <Navigate to="/" replace /> : <LoginPage />}
      />
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="testimonials" element={<TestimonialsPage />} />
        <Route path="inquiries" element={<InquiriesPage />} />
        <Route path="faq" element={<FaqPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
