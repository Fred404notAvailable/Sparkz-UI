import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'framer-motion';
import { 
  Play, Pause, Calendar, MapPin, Clock, Users, Trophy, Star, Award, 
  ChevronRight, Sparkles, Film, Camera, Clapperboard, Video, Mic, 
  Music, Palette, Theater, Zap, Globe, Drum, Headphones,
  Radio, Guitar, Volume2, Disc, CameraIcon, FilmIcon, Ticket, UserPlus,
  Youtube, Instagram, Facebook, Twitter, Map, Phone, Mail
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSparkz = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const statsRef = useRef(null);
  const timelineRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Detect mobile devices for responsive adjustments
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useLayoutEffect(() => {
    if (!isInView) return;

    const ctx = gsap.context(() => {
      // Logo animation
      gsap.from(headlineRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headlineRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      });

      // Stats counter animation
      const stats = statsRef.current?.querySelectorAll('.stat-number');
      if (stats) {
        stats.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-value'));
          gsap.to(stat, {
            innerText: target,
            duration: 2.5,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: stat,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          });
        });
      }

      // Timeline items animation
      const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
      if (timelineItems) {
        timelineItems.forEach((item, index) => {
          gsap.from(item, {
            opacity: 0,
            x: isMobile ? 0 : 30,
            y: isMobile ? 20 : 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none reverse",
            }
          });
        });
      }

      // Feature cards animation
      const cards = gsap.utils.toArray('.feature-card');
      cards.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [isInView, isMobile]);

  const toggleAnimation = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      ScrollTrigger.getAll().forEach(trigger => trigger.disable());
    } else {
      ScrollTrigger.getAll().forEach(trigger => trigger.enable());
    }
  };

  return (
    <section ref={sectionRef} className="relative w-full bg-gradient-to-b from-gray-950 via-black to-gray-950 overflow-hidden py-8 md:py-20 z-10">
      
      {/* Responsive Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Optimized grid for mobile */}
        <div className="absolute inset-0 opacity-[0.02] bg-[size:20px_20px] md:bg-[size:40px_40px] bg-[linear-gradient(to_right,#f59e0b_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b_1px,transparent_1px)]"></div>
        
        {/* Dynamic light beams - optimized for mobile */}
        <div className="absolute top-0 left-0 w-full h-32 md:h-64 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent blur-2xl md:blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-full h-32 md:h-64 bg-gradient-to-t from-red-500/10 via-transparent to-transparent blur-2xl md:blur-3xl"></div>
      </div>

      {/* Film reel edges - responsive */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-red-500/20 to-transparent"></div>

      {/* Animation Control - Mobile Optimized */}
      <div className="absolute top-3 right-3 md:top-6 md:right-6 z-20">
        <button
          onClick={toggleAnimation}
          className="flex items-center gap-2 px-3 py-2 bg-black/80 backdrop-blur-sm border border-amber-500/40 rounded-full text-amber-300 hover:text-white hover:border-amber-400 transition-all duration-300 group shadow-lg shadow-amber-500/10 min-h-[44px] min-w-[44px]"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          <span className="text-xs md:text-sm font-bold uppercase tracking-wider hidden sm:inline-block" style={{fontFamily: "'Orbitron', sans-serif"}}>
            {isPlaying ? 'Pause' : 'Play'}
          </span>
        </button>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section - Responsive */}
        <div className="mb-8 md:mb-16 relative text-center">
          {/* Cinematic Title Banner - Responsive */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-900/20 to-red-900/20 border border-amber-500/40 rounded-full mb-4 md:mb-6 shadow-lg">
            <FilmIcon className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
            <span className="text-amber-300 text-sm md:text-base font-bold uppercase tracking-wider" style={{fontFamily: "'Orbitron', sans-serif"}}>
              CINEMATIC EXPERIENCE
            </span>
            <Clapperboard className="w-4 h-4 md:w-5 md:h-5 text-red-400" />
          </div>
          
          {/* Large Logo Display - Responsive - UPDATED: Removed badge and increased size */}
          <div className="relative mb-6 md:mb-8">
            <div 
              ref={headlineRef}
              className="inline-block w-full max-w-4xl md:max-w-5xl mx-auto relative"
            >
              {/* Responsive Logo - UPDATED: Increased size */}
              <div className="relative p-4 md:p-8 lg:p-12">
                <img 
                  src="/sparkz.png" 
                  alt="SPARKZ 2K26"
                  className="w-full h-auto max-h-56 md:max-h-64 lg:max-h-72 xl:max-h-80 object-contain drop-shadow-[0_0_30px_rgba(245,158,11,0.4)]"
                  loading="eager"
                />
                {/* Glow effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-red-500/10 blur-xl md:blur-2xl opacity-40 -z-10"></div>
              </div>
              
              {/* REMOVED: Edition Badge */}
            </div>
          </div>
          
          {/* Event Details - Stacked on Mobile */}
          <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center md:gap-6 lg:gap-10 mb-6 md:mb-8">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-black/70 backdrop-blur-sm border border-amber-500/30 rounded-lg w-full max-w-xs md:w-auto">
              <Calendar className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <span className="text-white text-base md:text-lg font-medium text-center md:text-left" style={{fontFamily: "'Rajdhani', sans-serif"}}>Feb 27 & 28, 2026</span>
            </div>
            
            {/* Mobile separator */}
            <div className="flex items-center justify-center gap-1 md:hidden">
              <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
              <div className="w-1 h-1 bg-red-500 rounded-full"></div>
              <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2.5 bg-black/70 backdrop-blur-sm border border-red-500/30 rounded-lg w-full max-w-xs md:w-auto">
              <MapPin className="w-5 h-5 text-red-400 flex-shrink-0" />
              <span className="text-white text-base md:text-lg font-medium text-center md:text-left" style={{fontFamily: "'Rajdhani', sans-serif"}}>Kalasalingam University</span>
            </div>
          </div>
          
          {/* Cinematic Tagline - Responsive */}
          <p className="text-gray-200 text-base md:text-xl lg:text-2xl max-w-2xl md:max-w-3xl mx-auto leading-relaxed italic px-4" style={{fontFamily: "'Playfair Display', serif"}}>
            "Where every frame tells a story, and every moment becomes cinematic legend"
          </p>
        </div>

        {/* Feature Highlights Grid - Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-20">
          {[
            {
              icon: <Camera className="w-7 h-7 md:w-8 md:h-8" />,
              title: "48-Hour Marathon",
              description: "Non-stop cinematic experience with continuous entertainment",
              stats: "48 HOURS",
              gradient: "from-amber-500 to-orange-500"
            },
            {
              icon: <Clapperboard className="w-7 h-7 md:w-8 md:h-8" />,
              title: "Grand Production",
              description: "Multiple competition categories for all talents",
              stats: "25+ EVENTS",
              gradient: "from-orange-500 to-red-500"
            },
            {
              icon: <Video className="w-7 h-7 md:w-8 md:h-8" />,
              title: "Star Performances",
              description: "Celebrity shows and professional entertainment",
              stats: "MAIN EVENT",
              gradient: "from-red-500 to-purple-500"
            }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="feature-card p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 rounded-xl md:rounded-2xl hover:border-amber-500/40 transition-all duration-300 group"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-start gap-4 md:gap-5 mb-4 md:mb-6">
                  <div className={`p-3 md:p-4 bg-gradient-to-br ${item.gradient} rounded-lg md:rounded-xl shadow-lg flex-shrink-0`}>
                    <div className="text-white">{item.icon}</div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 md:mb-3">
                      <h4 className="text-white font-bold text-lg md:text-xl lg:text-2xl mb-1 md:mb-0" style={{fontFamily: "'Orbitron', sans-serif"}}>{item.title}</h4>
                      <div className="text-amber-300 text-base md:text-lg font-bold" style={{fontFamily: "'Rajdhani', sans-serif"}}>{item.stats}</div>
                    </div>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed" style={{fontFamily: "'Rajdhani', sans-serif"}}>{item.description}</p>
                  </div>
                </div>
                <div className="mt-auto pt-4 border-t border-gray-800">
                  <div className="h-1 w-full bg-gradient-to-r from-transparent via-gray-800 to-transparent group-hover:via-amber-500 transition-all duration-300"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
          
          {/* Left Column: About Description & Categories - UPDATED: Combined into single box */}
          <div className="space-y-8 md:space-y-12">
            {/* Theme Section */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-900/20 to-red-900/20 rounded-full border border-gray-700">
                <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="text-amber-300 text-sm md:text-base font-bold uppercase tracking-wider" style={{fontFamily: "'Orbitron', sans-serif"}}>THE CINEMATIC UNIVERSE</span>
              </div>
              
              {/* About Text - Responsive */}
              <div className="space-y-4 md:space-y-6">
                <p className="text-gray-200 text-base md:text-lg lg:text-xl leading-relaxed" style={{fontFamily: "'Rajdhani', sans-serif"}}>
                  <span className="text-amber-400 font-bold">SPARKZ 2K26</span> presents its most spectacular edition yet, themed <span className="text-amber-400 font-bold" style={{fontFamily: "'Cinzel', serif"}}>"Cinematic Universe"</span>. Step into a world where every performance is a scene, every competition a climax, and every participant a star in the making.
                </p>
                
                <p className="text-gray-200 text-base md:text-lg lg:text-xl leading-relaxed" style={{fontFamily: "'Rajdhani', sans-serif"}}>
                  Over two epic days, Kalasalingam University transforms into a vibrant studio lot where talent from across India converges. From sunrise to midnight, experience a symphony of creativity that blurs the line between reality and cinema.
                </p>
              </div>
            </div>
            
            {/* Category Box - UPDATED: Combined categories and description into single box */}
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8">
                <h4 className="text-white text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-0" style={{fontFamily: "'Orbitron', sans-serif"}}>
                  <Globe className="w-5 h-5 md:w-6 md:h-6 text-amber-400 inline mr-2" />
                  Event Categories
                </h4>
                <div className="text-amber-400 text-sm font-medium px-3 py-1 bg-amber-500/10 rounded-full">8 Categories</div>
              </div>
              
              {/* Categories Description */}
              <div className="mb-6 md:mb-8 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                <p className="text-gray-200 text-base md:text-lg leading-relaxed" style={{fontFamily: "'Rajdhani', sans-serif"}}>
                  Live music performances and band competitions
                </p>
              </div>
              
              {/* Category Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-8 md:mb-10">
                {[
                  { icon: <Music className="w-6 h-6 md:w-7 md:h-7" />, label: "Music", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
                  { icon: <Theater className="w-6 h-6 md:w-7 md:h-7" />, label: "Drama", color: "bg-red-500/20 text-red-400 border-red-500/30" },
                  { icon: <Palette className="w-6 h-6 md:w-7 md:h-7" />, label: "Arts", color: "bg-green-500/20 text-green-400 border-green-500/30" },
                  { icon: <Mic className="w-6 h-6 md:w-7 md:h-7" />, label: "Literary", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
                  { icon: <CameraIcon className="w-6 h-6 md:w-7 md:h-7" />, label: "Photo", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
                  { icon: <Video className="w-6 h-6 md:w-7 md:h-7" />, label: "Video", color: "bg-pink-500/20 text-pink-400 border-pink-500/30" },
                  { icon: <Film className="w-6 h-6 md:w-7 md:h-7" />, label: "Film", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
                  { icon: <Trophy className="w-6 h-6 md:w-7 md:h-7" />, label: "Sports", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" }
                ].map((item, idx) => (
                  <div key={idx} className="text-center group">
                    <div className={`p-3 md:p-4 rounded-lg border ${item.color} mb-2 group-hover:scale-105 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <div className="text-white text-sm md:text-base font-medium" style={{fontFamily: "'Rajdhani', sans-serif"}}>{item.label}</div>
                  </div>
                ))}
              </div>
              
              {/* Additional Event Highlights - Fills the blank space */}
              <div className="space-y-4 md:space-y-6 pt-6 border-t border-gray-800">
                <div className="space-y-3">
                  <h5 className="text-white text-lg md:text-xl font-bold flex items-center gap-2" style={{fontFamily: "'Orbitron', sans-serif"}}>
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
                    Day 2 Highlights
                  </h5>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div className="p-3 md:p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-amber-500/40 transition-all duration-300">
                      <div className="text-amber-400 text-sm font-bold mb-1" style={{fontFamily: "'Rajdhani', sans-serif"}}>DAY 2 • MORNING</div>
                      <div className="text-white font-semibold mb-1" style={{fontFamily: "'Orbitron', sans-serif"}}>Art & Photography</div>
                      <div className="text-gray-300 text-sm" style={{fontFamily: "'Rajdhani', sans-serif"}}>Exhibitions and competitions with professional judging</div>
                    </div>
                    
                    <div className="p-3 md:p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-red-500/40 transition-all duration-300">
                      <div className="text-amber-400 text-sm font-bold mb-1" style={{fontFamily: "'Rajdhani', sans-serif"}}>DAY 2 • AFTERNOON</div>
                      <div className="text-white font-semibold mb-1" style={{fontFamily: "'Orbitron', sans-serif"}}>Drama & Theater</div>
                      <div className="text-gray-300 text-sm" style={{fontFamily: "'Rajdhani', sans-serif"}}>Stage performances and acting competitions</div>
                    </div>
                  </div>
                  
                  <div className="p-3 md:p-4 bg-gradient-to-r from-amber-900/20 to-red-900/20 rounded-lg border border-amber-500/30 hover:border-amber-500/60 transition-all duration-300">
                    <div className="text-amber-300 text-sm font-bold mb-1" style={{fontFamily: "'Rajdhani', sans-serif"}}>DAY 2 • NIGHT</div>
                    <div className="text-white font-semibold mb-1 flex items-center gap-2" style={{fontFamily: "'Orbitron', sans-serif"}}>
                      <Star className="w-4 h-4" />
                      Awards Ceremony
                    </div>
                    <div className="text-gray-200 text-sm" style={{fontFamily: "'Rajdhani', sans-serif"}}>Pro show and prize distribution with celebrity guests</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Timeline Only - UPDATED: Removed duplicate stats */}
          <div className="h-full">
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 shadow-xl h-full">
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                <Camera className="w-5 h-5 md:w-6 md:h-6 text-amber-400" />
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white" style={{fontFamily: "'Orbitron', sans-serif"}}>Festival Timeline</h3>
              </div>
              
              <div ref={timelineRef} className="space-y-4 md:space-y-6 lg:space-y-8 relative">
                {/* Timeline line - hidden on mobile */}
                <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500 via-red-500 to-transparent hidden md:block"></div>
                
                {[
                  { 
                    time: 'DAY 1 • MORNING',
                    icon: <Sparkles className="w-5 h-5 md:w-6 md:h-6" />,
                    title: 'Opening Ceremony', 
                    description: 'Grand premiere with cinematic parade and guest appearances',
                    gradient: 'from-amber-500 to-amber-600'
                  },
                  { 
                    time: 'DAY 1 • AFTERNOON',
                    icon: <Drum className="w-5 h-5 md:w-6 md:h-6" />,
                    title: 'Music & Dance Competitions', 
                    description: 'Multiple genres and styles across different stages',
                    gradient: 'from-orange-500 to-red-500'
                  },
                  { 
                    time: 'DAY 1 • EVENING',
                    icon: <Headphones className="w-5 h-5 md:w-6 md:h-6" />,
                    title: 'Battle of Bands', 
                    description: 'Live music performances and band competitions',
                    gradient: 'from-red-500 to-purple-500'
                  },
                  { 
                    time: 'DAY 2 • MORNING',
                    icon: <Palette className="w-5 h-5 md:w-6 md:h-6" />,
                    title: 'Art & Photography', 
                    description: 'Exhibitions and competitions with professional judging',
                    gradient: 'from-purple-500 to-pink-500'
                  },
                  { 
                    time: 'DAY 2 • AFTERNOON',
                    icon: <Theater className="w-5 h-5 md:w-6 md:h-6" />,
                    title: 'Drama & Theater', 
                    description: 'Stage performances and acting competitions',
                    gradient: 'from-pink-500 to-indigo-500'
                  },
                  { 
                    time: 'DAY 2 • NIGHT',
                    icon: <Star className="w-5 h-5 md:w-6 md:h-6" />,
                    title: 'Awards Ceremony', 
                    description: 'Pro show and prize distribution with celebrity guests',
                    gradient: 'from-indigo-500 to-blue-500'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="timeline-item flex items-start gap-3 md:gap-4 lg:gap-6 group cursor-pointer relative pl-2">
                    <div className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg md:rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg`}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-amber-400 text-xs md:text-sm lg:text-base font-bold mb-1" style={{fontFamily: "'Rajdhani', sans-serif"}}>{item.time}</div>
                      <div className="text-white font-semibold text-base md:text-lg lg:text-xl mb-1 md:mb-2" style={{fontFamily: "'Orbitron', sans-serif"}}>{item.title}</div>
                      <div className="text-gray-300 text-sm md:text-base leading-relaxed" style={{fontFamily: "'Rajdhani', sans-serif"}}>{item.description}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-600 group-hover:text-amber-500 transition-colors duration-300 flex-shrink-0 mt-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section - Responsive */}
        <div 
          ref={statsRef}
          className="mt-12 md:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6"
        >
          {[
            { value: '50', label: 'Colleges', suffix: '+', icon: <Ticket className="w-6 h-6 md:w-8 md:h-8" />, color: 'from-purple-500/20 to-purple-600/20' },
            { value: '8000', label: 'Participants', suffix: '+', icon: <UserPlus className="w-6 h-6 md:w-8 md:h-8" />, color: 'from-blue-500/20 to-cyan-500/20' },
            { value: '25', label: 'Categories', suffix: '+', icon: <Trophy className="w-6 h-6 md:w-8 md:h-8" />, color: 'from-amber-500/20 to-orange-500/20' },
            { value: '500000', label: 'Prize Pool', suffix: '+', icon: <Award className="w-6 h-6 md:w-8 md:h-8" />, color: 'from-red-500/20 to-pink-500/20' }
          ].map((stat, idx) => (
            <div key={idx} className={`p-4 md:p-6 bg-gradient-to-br ${stat.color} backdrop-blur-sm border border-gray-800 rounded-xl hover:border-amber-500/40 transition-all duration-300 group`}>
              <div className="flex flex-col items-center text-center">
                <div className="text-amber-400 mb-3">{stat.icon}</div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1" style={{fontFamily: "'Orbitron', sans-serif"}}>
                  <span className="stat-number" data-value={stat.value}>
                    0
                  </span>
                  <span className="text-amber-400">{stat.suffix}</span>
                </div>
                <div className="text-gray-300 text-base md:text-lg font-medium" style={{fontFamily: "'Rajdhani', sans-serif"}}>{stat.label}</div>
                <div className="mt-3 h-1 w-0 group-hover:w-full bg-gradient-to-r from-amber-500 to-red-500 transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section - Responsive */}
        <div className="mt-12 md:mt-20 text-center">
          <div className="max-w-2xl md:max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-900/20 to-red-900/20 border border-amber-500/40 rounded-full mb-4 md:mb-6">
              <Clapperboard className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-amber-300 text-sm md:text-base font-bold uppercase tracking-wider" style={{fontFamily: "'Orbitron', sans-serif"}}>JOIN NOW</span>
              <Clapperboard className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6" style={{fontFamily: "'Orbitron', sans-serif"}}>
              Be Part of Cinematic History
            </h3>
            <p className="text-gray-200 mb-6 md:mb-8 text-base md:text-lg leading-relaxed px-4" style={{fontFamily: "'Rajdhani', sans-serif"}}>
              Register now for SPARKZ 2K26 and showcase your talent on the grandest stage. Limited spots available!
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 md:gap-4">
              <button className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-amber-600 to-red-600 text-white font-bold rounded-lg md:rounded-xl hover:from-amber-700 hover:to-red-700 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 md:gap-3 group shadow-lg min-h-[50px]">
                <Film className="w-5 h-5 md:w-6 md:h-6" />
                <span className="text-base md:text-lg" style={{fontFamily: "'Orbitron', sans-serif"}}>Register Now</span>
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-6 py-3 md:px-8 md:py-4 bg-gray-900/70 backdrop-blur-sm border border-gray-700 text-white font-semibold rounded-lg md:rounded-xl hover:bg-gray-800 hover:border-amber-500/50 transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 group min-h-[50px]">
                <span className="text-base md:text-lg" style={{fontFamily: "'Rajdhani', sans-serif"}}>View Schedule</span>
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            {/* Registration Status */}
            <div className="mt-6 md:mt-8 inline-flex items-center gap-2 md:gap-3 px-4 py-2 md:px-5 md:py-3 bg-black/70 backdrop-blur-sm border border-gray-800 rounded-full">
              <div className="flex gap-1 md:gap-2">
                <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
              <span className="text-gray-200 text-xs md:text-sm font-medium" style={{fontFamily: "'Rajdhani', sans-serif"}}>
                Open until Feb 25, 2026
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Optimization */}
      <style jsx>{`
        /* Mobile-specific optimizations */
        @media (max-width: 640px) {
          /* Improve touch targets */
          button, [role="button"], .clickable {
            min-height: 44px;
            min-width: 44px;
          }
          
          /* Prevent text overflow */
          * {
            word-wrap: break-word;
            overflow-wrap: break-word;
          }
          
          /* Optimize font rendering */
          body {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }
          
          /* Better tap highlight */
          * {
            -webkit-tap-highlight-color: rgba(245, 158, 11, 0.1);
          }
        }
        
        /* Small mobile devices (iPhone SE, etc.) */
        @media (max-width: 375px) {
          .text-responsive {
            font-size: 90%;
          }
          
          .padding-responsive {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
          }
        }
        
        /* Medium mobile devices */
        @media (min-width: 376px) and (max-width: 767px) {
          .text-responsive {
            font-size: 95%;
          }
        }
        
        /* Tablet optimization */
        @media (min-width: 768px) and (max-width: 1023px) {
          .text-responsive {
            font-size: 100%;
          }
        }
        
        /* Smooth animations for all devices */
        .transition-smooth {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Font loading optimization */
        @font-face {
          font-family: 'Orbitron';
          font-style: normal;
          font-weight: 400 900;
          font-display: swap;
        }
        
        @font-face {
          font-family: 'Rajdhani';
          font-style: normal;
          font-weight: 300 700;
          font-display: swap;
        }
        
        @font-face {
          font-family: 'Playfair Display';
          font-style: italic;
          font-weight: 400 700;
          font-display: swap;
        }
      `}</style>
    </section>
  );
};

export default AboutSparkz;