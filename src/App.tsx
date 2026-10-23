import React from 'react';
import { Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AdminAccess, { AuthCallbackRedirect } from './components/AdminAccess';
import PageMetadata from './components/PageMetadata';
import ProjectDetailPage from './pages/ProjectDetailPage';
import PrivacyPage from './pages/PrivacyPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import AdminPage from './pages/AdminPage';
import { ProjectProvider } from './context/ProjectContext';
import { ThemeProvider } from './context/ThemeContext';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
      <ProjectProvider>
        <Router>
        <PageMetadata />
        <AuthCallbackRedirect />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/admin" element={<AdminAccess><AdminPage /></AdminAccess>} />
            <Route path="*" element={<section className="container section empty-state"><h1>Page not found</h1><p>Find your next property in our current portfolio.</p><Link to="/projects" className="btn btn-primary">Browse properties</Link></section>} />
          </Routes>
        </Layout>
      </Router>
    </ProjectProvider>
    </AuthProvider>
  </ThemeProvider>
);
};

export default App;
