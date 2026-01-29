// AuthSelection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { University, Users, Sparkles } from 'lucide-react';

const AuthSelection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 pt-12">
          <div className="flex justify-center items-center gap-3 mb-6">
            <Sparkles className="text-amber-500" size={32} />
            <h1 className="text-5xl font-bold font-['Cinzel'] tracking-tight">
              SPARKZ<span className="text-amber-500">'26</span>
            </h1>
          </div>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Kalasalingam Academy's Cinematic Cultural Fest
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 font-['Cinzel']">
            Choose Your Portal
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* KARE Students Card */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-900/20 to-red-900/20 border border-amber-500/20 p-8 hover:border-amber-500/40 transition-all duration-500">
              <div className="absolute top-2 right-4">
                <div className="bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold">
                  INTERNAL
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-amber-500/20 rounded-xl">
                  <University className="text-amber-400" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">KARE Students</h3>
                  <p className="text-white/60 text-sm">Kalasalingam Academy of Research & Education</p>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  'Direct campus login with your credentials',
                  'Access to all events and workshops',
                  'Priority registration for pro-shows',
                  'Special discounts on merchandise',
                  'Campus accommodation facilities'
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-1 gap-4">
                <Link
                  to="/auth/kare/login"
                  className="py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 text-center transition-colors"
                >
                  Login
                </Link>
              </div>
            </div>

            {/* Other College Students Card */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 p-8 hover:border-blue-500/40 transition-all duration-500">
              <div className="absolute top-2 right-4">
                <div className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-bold">
                  EXTERNAL
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Users className="text-blue-400" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Other Colleges</h3>
                  <p className="text-white/60 text-sm">External Participants & Visitors</p>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  'Register with your college credentials',
                  'Access to all competitive events',
                  'Pro-show passes available',
                  'Accommodation assistance provided',
                  'Transport coordination support'
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-2 gap-4">
                <Link
                  to="/auth/external/login"
                  className="py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 text-center transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/auth/external/register"
                  className="py-3 bg-transparent border border-blue-500 text-blue-400 font-semibold rounded-lg hover:bg-blue-500/10 text-center transition-colors"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-12 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Sparkles size={20} className="text-amber-500" />
              Important Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h4 className="font-semibold text-amber-300">For KARE Students</h4>
                <p className="text-sm text-white/60">
                  Use your KARE email and student ID for authentication
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-blue-300">For Other Colleges</h4>
                <p className="text-sm text-white/60">
                  College ID card verification required during on-site registration
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-white">Common Guidelines</h4>
                <p className="text-sm text-white/60">
                  All participants must follow the code of conduct
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthSelection;