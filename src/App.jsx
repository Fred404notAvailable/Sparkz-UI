import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import EventsPage from './pages/EventsPage';
import ProShowPage from './pages/ProShowPage';
import SponsorsPage from './pages/SponsorsPage';
import HospitalityPage from './pages/HospitalityPage';
import TeamPage from './pages/TeamPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage'; // <-- NEW IMPORT
import { CartProvider } from './context/CartContext';

// Layout wrapper for AppLayout routes
const AppLayoutWrapper = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import AdminPage from './pages/AdminPage'; // Import AdminPage
import ScannerPage from './pages/ScannerPage'; // Import ScannerPage

import ProtectedRoute from './components/auth/ProtectedRoute'; // Import ProtectedRoute
import PublicRoute from './components/auth/PublicRoute'; // Import PublicRoute

function App() {
  return (
    <AuthProvider> {/* Wrap entire app with AuthProvider */}
      <CartProvider> {/* Wrap entire app with CartProvider */}
        <Router>
          <Routes>
            {/* Routes wrapped with AppLayout */}
            <Route element={<AppLayoutWrapper />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/proshow" element={<ProShowPage />} />
              <Route path="/sponsors" element={<SponsorsPage />} />
              <Route path="/hospitality" element={<HospitalityPage />} />
              <Route path="/teams" element={<TeamPage />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/cart" element={<CartPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/scanner" element={<ScannerPage />} />
              </Route>
            </Route>

            {/* Public Routes (Only accessible when NOT logged in) */}
            <Route element={<PublicRoute />}>
              <Route path="/auth/*" element={<AuthPage />} />
            </Route>

            {/* 404 Page - also wrapped in AppLayout */}
            <Route
              path="*"
              element={
                <AppLayout>
                  <div className="min-h-screen flex flex-col items-center justify-center px-4">
                    <div className="text-center">
                      <h1 className="text-8xl font-bold font-['Cinzel'] mb-6 text-amber-500">404</h1>
                      <p className="text-2xl text-white mb-8">PAGE NOT FOUND</p>
                      <p className="text-white/60 mb-10 max-w-md mx-auto">
                        The reel you're looking for has reached its final cut. This scene doesn't exist in our cinematic universe.
                      </p>
                      <a
                        href="/"
                        className="px-8 py-4 bg-gradient-to-r from-amber-600 to-red-600 text-white font-bold text-lg uppercase tracking-widest rounded-lg hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-300 inline-block"
                      >
                        RETURN TO HOME
                      </a>
                    </div>
    <CartProvider>
      <Router>
        <Routes>
          {/* Routes wrapped with AppLayout */}
          <Route element={<AppLayoutWrapper />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/proshow" element={<ProShowPage />} />
            <Route path="/sponsors" element={<SponsorsPage />} />
            <Route path="/hospitality" element={<HospitalityPage />} />
            <Route path="/teams" element={<TeamPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/profile" element={<ProfilePage />} /> {/* <-- NEW ROUTE */}
          </Route>
          
          {/* Auth routes with their own layout */}
          <Route path="/auth/*" element={<AuthPage />} />
          
          {/* 404 Page */}
          <Route 
            path="*" 
            element={
              <AppLayout>
                <div className="min-h-screen flex flex-col items-center justify-center px-4">
                  <div className="text-center">
                    <h1 className="text-8xl font-bold font-['Cinzel'] mb-6 text-amber-500">404</h1>
                    <p className="text-2xl text-white mb-8">PAGE NOT FOUND</p>
                    <p className="text-white/60 mb-10 max-w-md mx-auto">
                      The reel you're looking for has reached its final cut. This scene doesn't exist in our cinematic universe.
                    </p>
                    <a 
                      href="/" 
                      className="px-8 py-4 bg-gradient-to-r from-amber-600 to-red-600 text-white font-bold text-lg uppercase tracking-widest rounded-lg hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-300 inline-block"
                    >
                      RETURN TO HOME
                    </a>
                  </div>
                </AppLayout>
              }
            />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;