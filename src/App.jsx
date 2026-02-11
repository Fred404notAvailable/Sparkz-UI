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
import CartPage from './pages/CartPage'; // New Cart Page
import { CartProvider } from './context/CartContext'; // Import CartProvider

// Layout wrapper for AppLayout routes
const AppLayoutWrapper = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

function App() {
  return (
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
            <Route path="/cart" element={<CartPage />} /> {/* New Cart Route */}
          </Route>
          
          {/* Auth routes with their own layout */}
          <Route path="/auth/*" element={<AuthPage />} />
          
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
                </div>
              </AppLayout>
            } 
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;