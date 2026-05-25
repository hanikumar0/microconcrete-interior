import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SiteLayout from '../layouts/SiteLayout.jsx';

const Home = lazy(() => import('../pages/Home.jsx'));
const About = lazy(() => import('../pages/About.jsx'));
const Services = lazy(() => import('../pages/Services.jsx'));
const Portfolio = lazy(() => import('../pages/Portfolio.jsx'));
const Contact = lazy(() => import('../pages/Contact.jsx'));

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

