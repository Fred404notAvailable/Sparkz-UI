import React, { useState, useEffect, useRef, createContext } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import {
  Menu,
  X,
  Film,
  Volume2,
  VolumeX,
  Sparkles,
  User,
  Spotlight,
  Play
} from 'lucide-react';
import { clsx } from 'clsx';
import SmoothScrollWrapper from './SmoothScrollWrapper';
import { useAuth } from '../../context/AuthContext';
import ProfileModal from '../profile/ProfileModal';

const AppLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Changed to false by default
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState('00:00:00');
  const [isScrolled, setIsScrolled] = useState(false);
  const [analyser, setAnalyser] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showAudioPrompt, setShowAudioPrompt] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Profile Modal State
  const { user } = useAuth(); // Auth Context

  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const sourceRef = useRef(null);

  // Initialize audio without auto-playing
  useEffect(() => {
    const audio = new Audio('/audio/sparkz.mpeg');
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    const setupAudioContext = () => {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        audioContextRef.current = audioCtx;

        const source = audioCtx.createMediaElementSource(audio);
        sourceRef.current = source;

        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 2048;
        analyser.smoothingTimeConstant = 0.8;

        source.connect(analyser);
        analyser.connect(audioCtx.destination);

        setAnalyser(analyser);
        return audioCtx;
      } catch (error) {
        console.error("Error setting up audio context:", error);
        return null;
      }
    };

    // Setup context but don't play yet
    setupAudioContext();

    // Show audio prompt after a delay if no interaction
    const promptTimer = setTimeout(() => {
      if (!isAudioPlaying) {
        setShowAudioPrompt(true);
      }
    }, 3000);

    return () => {
      clearTimeout(promptTimer);
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle audio playback with user interaction
  const startAudio = async () => {
    if (!audioRef.current || isAudioPlaying) return;

    try {
      await audioRef.current.play();
      setIsAudioPlaying(true);
      setShowAudioPrompt(false);

      // Resume audio context if suspended
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }
    } catch (error) {
      console.error("Failed to play audio:", error);
      setShowAudioPrompt(true);
    }
  };

  // Setup global click handler for audio start
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!isAudioPlaying) {
        startAudio();
      }
    };

    // Add event listeners for first interaction
    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('keydown', handleFirstInteraction, { once: true });
    document.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isAudioPlaying]);

  // Handle mute/unmute
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      if (isMuted) {
        audioRef.current.volume = 0;
      } else {
        audioRef.current.volume = 0.4;
      }
    }
  }, [isMuted]);

  // Update current time and handle scroll
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'
      });
      setCurrentTime(timeString);
    }, 1000);

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <MusicContext.Provider value={{ isMuted, toggleMute, analyser, isAudioPlaying, startAudio }}>
      <div className="relative w-full min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] overflow-x-hidden">

        {/* Hidden audio element */}
        <audio ref={audioRef} loop preload="auto">
          <source src="/audio/sparkz.mpeg" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        {/* Audio Play Prompt */}
        {showAudioPrompt && !isAudioPlaying && (
          <div className="fixed bottom-24 right-6 z-50 animate-pulse">
            <button
              onClick={startAudio}
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-600 to-red-600 text-white font-semibold rounded-full shadow-lg hover:from-amber-700 hover:to-red-700 transition-all duration-300 group"
            >
              <Play size={18} className="group-hover:scale-110 transition-transform" />
              <span>Play Background Music</span>
            </button>
          </div>
        )}

        <div
          className={clsx(
            "transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]",
            isSidebarOpen ? "md:mr-[350px]" : "md:mr-0"
          )}
        >
          <div className={clsx(
            "fixed top-0 left-0 z-30 flex items-center justify-between px-6 py-3 transition-all duration-300",
            isSidebarOpen ? "md:w-[calc(100%-350px)]" : "w-full",
            isScrolled
              ? "bg-black/80 backdrop-blur-md border-b border-white/10"
              : "bg-black/20 backdrop-blur-sm border-b border-white/5"
          )}>
            <Link to="/" className="flex items-center gap-4 group">
              <div className="relative">
                {/* Sparkz Logo Image */}
                <div className="w-20 h-8 flex items-center justify-center">
                  <img
                    src="/sparkz.png"
                    alt="SPARKZ Logo"
                    className="w-full h-full object-contain"
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.4))'
                    }}
                  />
                </div>
                {/* Optional glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/20 to-red-600/20 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
              </div>
              <div className="flex flex-col">
                {/* Removed SPARKZ'26 text and replaced with current time only */}
                <span className="font-mono text-[10px] text-white/60 mt-0.5">REEL: {currentTime}</span>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-6">
                <Link to="/" className="text-white/70 hover:text-white transition-colors text-sm font-medium">Home</Link>
                <Link to="/events" className="text-white/70 hover:text-white transition-colors text-sm font-medium">Events</Link>
                <Link to="/proshow" className="text-white/70 hover:text-white transition-colors text-sm font-medium">Pro Show</Link>
                <Link to="/sponsors" className="text-white/70 hover:text-white transition-colors text-sm font-medium">Sponsors</Link>
                <Link to="/hospitality" className="text-white/70 hover:text-white transition-colors text-sm font-medium">Hospitality</Link>
              </div>


              {user ? (
                <button
                  onClick={() => setIsProfileOpen(true)}
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-red-600 text-white text-sm font-semibold rounded-full hover:from-amber-700 hover:to-red-700 transition-all duration-300 group"
                >
                  <User size={16} />
                  <span>Profile</span>
                </button>
              ) : (
                <Link to="/auth" className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-red-600 text-white text-sm font-semibold rounded-full hover:from-amber-700 hover:to-red-700 transition-all duration-300 group">
                  <User size={16} />
                  <span>Login / Register</span>
                </Link>
              )}

              <div className="w-px h-6 bg-white/20 mx-2"></div>

              {/* Mute button - only show if audio is playing */}
              {isAudioPlaying && (
                <button
                  onClick={toggleMute}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors group"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-white/60 group-hover:text-amber-400 transition-colors" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-amber-400 group-hover:text-amber-300 transition-colors" />
                  )}
                </button>
              )}

              {/* Start audio button (mobile/small screens) */}
              {!isAudioPlaying && (
                <button
                  onClick={startAudio}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors group"
                  title="Play Music"
                >
                  <Play className="w-5 h-5 text-amber-400 group-hover:text-amber-300 transition-colors" />
                </button>
              )}
            </div>
          </div>

          <div className="main-content">
            <SmoothScrollWrapper>{children}</SmoothScrollWrapper>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className={clsx(
            "fixed top-20 z-[60] p-4 border-2 border-amber-500/30 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] hover:border-amber-500 hover:bg-amber-500/10",
            "uppercase font-mono text-xs tracking-widest bg-black/50 backdrop-blur-sm text-amber-200 group",
            isSidebarOpen ? "right-[360px]" : "right-6",
            "hidden md:flex"
          )}
          style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 75%, 75% 100%, 0% 100%)' }}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <div className="flex items-center gap-2">
            {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
            <span className="hidden md:inline group-hover:tracking-widest transition-all">
              {isSidebarOpen ? "CLOSE" : "DIRECTOR'S CUT"}
            </span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-amber-500 animate-pulse"></div>
        </button>

        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-500 md:hidden bg-black/90 backdrop-blur-lg border-t border-white/10">
          <div className="flex items-center justify-around p-3">
            <Link to="/" className="flex flex-col items-center p-2 text-white/60 hover:text-white transition-colors">
              <Sparkles size={18} />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link to="/events" className="flex flex-col items-center p-2 text-white/60 hover:text-white transition-colors">
              <Film size={18} />
              <span className="text-xs mt-1">Events</span>
            </Link>
            <Link to="/proshow" className="flex flex-col items-center p-2 text-white/60 hover:text-amber-400 transition-colors">
              <Spotlight size={18} />
              <span className="text-xs mt-1">Pro Show</span>
            </Link>
            <Link to="/auth" className="flex flex-col items-center p-2 text-white/60 hover:text-amber-400 transition-colors">
              <User size={18} />
              <span className="text-xs mt-1">Login</span>
            </Link>
            <button onClick={toggleSidebar} className="flex flex-col items-center p-2 text-white/60 hover:text-white transition-colors">
              <Menu size={18} />
              <span className="text-xs mt-1">Menu</span>
            </button>
          </div>
        </div>
      </div>

      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </MusicContext.Provider >
  );
};

export const MusicContext = createContext({
  isMuted: false,
  toggleMute: () => { },
  analyser: null,
  isAudioPlaying: false,
  startAudio: () => { }
});

export default AppLayout;