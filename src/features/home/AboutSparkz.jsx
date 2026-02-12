import React, { useLayoutEffect, useRef, useState, useEffect, useContext } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Play, Calendar, MapPin, Ticket, 
  ArrowRight, Star, Film, Music, Mic, 
  Zap, Trophy, MonitorPlay
} from 'lucide-react';
import { MusicContext } from '../../components/layout/AppLayout.jsx'; // Ensure this path matches your file structure

gsap.registerPlugin(ScrollTrigger);

const AboutSparkz = () => {
  const containerRef = useRef(null);
  const videoSectionRef = useRef(null);
  const heroRef = useRef(null);
  
  // State for YouTube Video
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Access MusicContext to pause background audio
  const { handleExternalPlay } = useContext(MusicContext);

  // REPLACE THIS WITH YOUR YOUTUBE VIDEO ID
  const YOUTUBE_VIDEO_ID = "GCgcYojrDAQ"; 

  // Handle Background Music Pause/Resume
  useEffect(() => {
    if (handleExternalPlay) {
      handleExternalPlay(isVideoPlaying);
    }
    return () => {
      if (handleExternalPlay) handleExternalPlay(false);
    };
  }, [isVideoPlaying, handleExternalPlay]);

  // Mouse Parallax Effect for Logo
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Hero Logo Reveal
      gsap.from(".hero-logo", {
        scale: 0.5,
        opacity: 0,
        filter: "blur(20px)",
        duration: 1.5,
        ease: "power3.out"
      });

      // 2. Text Highlight Animation
      const splitText = gsap.utils.toArray(".highlight-text");
      splitText.forEach((text) => {
        gsap.to(text, {
          backgroundSize: "100% 100%",
          color: "#000000",
          scrollTrigger: {
            trigger: text,
            start: "top 85%",
            end: "bottom 65%",
            scrub: true,
          }
        });
      });

      // 3. Cinematic Video Expand
      const videoTl = gsap.timeline({
        scrollTrigger: {
          trigger: videoSectionRef.current,
          start: "top 80%",
          end: "center center",
          scrub: 1,
        }
      });
      
      videoTl.to(".video-container", {
        width: "100%",
        borderRadius: "0px",
        scale: 1,
        ease: "power2.inOut"
      });

      // 4. Horizontal Film Strip
      const strip = document.querySelector(".film-strip-inner");
      if (strip) {
        gsap.to(strip, {
          x: () => -(strip.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: ".film-strip-wrapper",
            start: "top top",
            end: () => `+=${strip.scrollWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1
          }
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div ref={containerRef} className="relative w-full bg-black text-white overflow-x-hidden font-sans selection:bg-amber-500 selection:text-black">
      
      {/* --- GLOBAL FX --- */}
      <div className="fixed inset-0 opacity-[0.06] pointer-events-none z-50 mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}>
      </div>
      <motion.div className="fixed top-0 left-0 right-0 h-1 md:h-2 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 origin-left z-[100]" style={{ scaleX }} />

      {/* --- SECTION 1: HERO (LOGO REVEAL) --- */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        
        {/* Dynamic Spotlight Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-gradient-to-r from-amber-900/10 via-red-900/10 to-amber-900/10 rounded-full blur-[100px] md:blur-[150px] animate-pulse duration-700"></div>

        <div className="relative z-10 flex flex-col items-center w-full max-w-7xl">
          
          {/* University Tag */}
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center gap-2 md:gap-4 mb-6 md:mb-12 border border-white/10 bg-white/5 backdrop-blur-md px-4 py-2 md:px-6 md:py-3 rounded-full"
          >
            <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
            <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-gray-300 uppercase">
              Kalasalingam University
            </span>
          </motion.div>

          {/* SPARKZ LOGO - CENTERPIECE */}
          <div className="hero-logo relative w-full max-w-[280px] md:max-w-[500px] lg:max-w-[600px] aspect-square flex items-center justify-center mb-8 md:mb-12"
               style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}>
            
            {/* Logo Glow */}
            <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-[60px] md:blur-[100px] animate-pulse"></div>
            
            <img 
              src="/sparkz.png" 
              alt="Sparkz Logo" 
              className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_35px_rgba(245,158,11,0.5)]"
            />
          </div>

          {/* Animated Date & Location */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12 w-full justify-center">
             <div className="w-full md:w-auto p-4 md:p-6 bg-[#0a0a0a] border border-white/10 rounded-xl flex items-center justify-between md:justify-start gap-4 hover:border-amber-500/50 transition-colors duration-300 group">
                <div className="p-3 bg-amber-500/10 rounded-lg text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all">
                  <Calendar className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div className="text-right md:text-left">
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Premiere</p>
                  <p className="text-xl md:text-2xl font-black text-white">FEB 27 & FEB 28</p>
                </div>
             </div>

             <div className="w-full md:w-auto p-4 md:p-6 bg-[#0a0a0a] border border-white/10 rounded-xl flex items-center justify-between md:justify-start gap-4 hover:border-red-500/50 transition-colors duration-300 group">
                <div className="p-3 bg-red-500/10 rounded-lg text-red-500 group-hover:bg-red-500 group-hover:text-black transition-all">
                  <MapPin className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div className="text-right md:text-left">
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Venue</p>
                  <p className="text-xl md:text-2xl font-black text-white">KALASALINGAM UNIVERSITY</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: THE MANIFESTO --- */}
      <section className="relative py-20 md:py-32 px-4 md:px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-amber-500 font-bold tracking-[0.3em] mb-10 text-sm md:text-xl uppercase flex items-center gap-3">
            <span className="w-8 h-[2px] bg-amber-500"></span>
            The Cinematic Experience
          </h2>
          
          <div className="text-3xl md:text-6xl lg:text-7xl font-black leading-[1.2] uppercase text-white space-y-2 md:space-y-4">
            <p>
              Welcome to the
            </p>
            <p>
              <span className="highlight-text inline-block px-1 md:px-3 bg-gradient-to-r from-amber-500 to-amber-500 bg-[length:0%_100%] bg-no-repeat transition-all">Blockbuster</span> of the year.
            </p>
            <p className="text-gray-500">
              Where 48 hours feels like
            </p>
            <p>
              <span className="highlight-text inline-block px-1 md:px-3 bg-gradient-to-r from-white to-white bg-[length:0%_100%] bg-no-repeat transition-all">A Lifetime.</span>
            </p>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: YOUTUBE VIDEO SECTION --- */}
      <section ref={videoSectionRef} className="relative py-10 md:py-20 flex flex-col items-center">
        <div className="mb-8 md:mb-12 flex items-center gap-2 uppercase tracking-widest text-sm font-bold text-gray-400">
          <MonitorPlay size={16} className="text-red-500" />
          <span>Official Teaser</span>
        </div>

        {/* Video Container - Expands on Scroll */}
        <div className="video-container relative w-[90%] md:w-[70%] aspect-video bg-gray-900 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 group">
          
          {!isVideoPlaying ? (
            /* --- 1. COVER MODE --- */
            <div className="relative w-full h-full cursor-pointer" onClick={() => setIsVideoPlaying(true)}>
              
              {/* Thumbnail Image */}
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                   style={{ backgroundImage: "url('https://images.unsplash.com/photo-1478720568477-152d9b164e63?auto=format&fit=crop&q=80')" }}>
              </div>

              {/* Dark Overlay for Text Readability */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>

              {/* Play Button & Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                 <div className="w-20 h-20 md:w-24 md:h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white group-hover:bg-amber-500 group-hover:border-amber-500 group-hover:scale-110 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <Play className="fill-current ml-2 w-8 h-8 md:w-10 md:h-10" />
                 </div>
                 <h3 className="mt-6 text-xl md:text-3xl font-black uppercase text-white tracking-widest drop-shadow-lg">
                   Watch Trailer
                 </h3>
              </div>
            </div>
          ) : (
            /* --- 2. YOUTUBE PLAYER MODE --- */
            <div className="w-full h-full bg-black">
              <iframe 
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
                title="Sparkz Official Teaser"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </section>

      {/* --- MARQUEE SEPARATOR --- */}
      <div className="py-8 md:py-16 bg-amber-500 text-black overflow-hidden whitespace-nowrap border-y-4 border-white">
        <div className="inline-flex animate-marquee">
          {[...Array(6)].map((_, i) => (
             <span key={i} className="text-4xl md:text-7xl font-black uppercase tracking-tighter mx-4 md:mx-8 italic">
               Sparkz 2K26 • Cinematic Universe •
             </span>
          ))}
        </div>
      </div>

      {/* --- SECTION 4: THE TIMELINE --- */}
      <section className="film-strip-wrapper relative h-[100vh] bg-[#050505] overflow-hidden flex flex-col justify-center">
        
        <div className="absolute top-4 left-4 md:top-10 md:left-10 z-10 px-4">
          <div className="text-amber-500 font-bold tracking-widest text-xs md:text-sm mb-2">PRODUCTION SCHEDULE</div>
          <h3 className="text-4xl md:text-8xl font-black text-white/20 select-none">TIMELINE</h3>
        </div>

        {/* Film Strip Holes Top */}
        <div className="absolute top-[18%] left-0 w-full h-4 md:h-8 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSIzMCI+PHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjIwIiB4PSIxNSIgeT0iNSIgZmlsbD0iIzIyMiIvPjwvc3ZnPg==')] z-20"></div>

        <div className="film-strip-inner flex items-center gap-0 pl-[5vw] w-max">
           {/* Timeline Cards */}
           {[
             { time: "DAY 1 • 09:00", title: "THE OPENING", subtitle: "Grand Premiere", icon: <Star />, color: "bg-amber-500", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80" },
             { time: "DAY 1 • 11:00", title: "DANCE WARS", subtitle: "Choreography", icon: <Zap />, color: "bg-red-600", img: "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80" },
             { time: "DAY 1 • 14:00", title: "BAND BLAST", subtitle: "Battle of Bands", icon: <Music />, color: "bg-purple-600", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80" },
             { time: "DAY 1 • 19:00", title: "STAR NIGHT", subtitle: "Pro Show", icon: <Mic />, color: "bg-blue-600", img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80" },
             { time: "DAY 2 • 09:00", title: "FILM FIESTA", subtitle: "Short Films", icon: <Film />, color: "bg-green-600", img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80" },
             { time: "DAY 2 • 16:00", title: "THE CLIMAX", subtitle: "Valedictory", icon: <Trophy />, color: "bg-yellow-500", img: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&q=80" },
           ].map((item, idx) => (
             <div key={idx} className="relative w-[85vw] md:w-[35vw] h-[55vh] flex-shrink-0 border-r border-white/10 bg-gray-900 group overflow-hidden">
               <div className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-50 transition-all duration-500 scale-110 group-hover:scale-100 grayscale group-hover:grayscale-0"
                    style={{ backgroundImage: `url(${item.img})` }}></div>
               
               <div className="relative z-10 flex flex-col justify-between h-full p-6 md:p-10">
                 <div className="flex justify-between items-start">
                   <span className="text-sm md:text-base font-mono text-white bg-black/50 px-2 py-1 rounded backdrop-blur-sm border-l-2 border-amber-500">
                     {item.time}
                   </span>
                   <div className={`p-3 md:p-4 rounded-full ${item.color} text-white shadow-lg transform group-hover:rotate-12 transition-transform duration-500`}>
                     {React.cloneElement(item.icon, { size: 24 })}
                   </div>
                 </div>
                 
                 <div>
                   <h4 className="text-sm md:text-lg text-amber-500 font-bold mb-1 uppercase tracking-wider">{item.subtitle}</h4>
                   <h3 className="text-4xl md:text-6xl font-black uppercase leading-[0.9] text-white mix-blend-difference">
                     {item.title}
                   </h3>
                 </div>
               </div>
             </div>
           ))}
           
           {/* Final CTA Card */}
           <div className="w-[85vw] md:w-[30vw] h-[55vh] flex-shrink-0 bg-amber-500 flex flex-col items-center justify-center p-8 text-black text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSIjMDAwIi8+PC9zdmc+')]"></div>
              <h4 className="text-4xl md:text-5xl font-black mb-4 relative z-10">THE END?</h4>
              <p className="text-lg md:text-xl font-bold mb-6 relative z-10">NO, JUST THE BEGINNING.</p>
              <Link to="/auth" className="bg-black text-white px-8 py-3 font-bold rounded-full hover:scale-105 transition-transform relative z-10 flex items-center gap-2">
                Register Now <ArrowRight size={18} />
              </Link>
           </div>
        </div>

        {/* Film Strip Holes Bottom */}
        <div className="absolute bottom-[18%] left-0 w-full h-4 md:h-8 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSIzMCI+PHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjIwIiB4PSIxNSIgeT0iNSIgZmlsbD0iIzIyMiIvPjwvc3ZnPg==')] z-20"></div>
      </section>

      {/* --- SECTION 5: FOOTER CTA --- */}
      <section className="relative py-24 md:py-32 px-4 flex flex-col items-center justify-center text-center bg-black border-t border-white/10">
        
        <div className="max-w-5xl mx-auto relative group">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-r from-amber-600/20 via-red-600/20 to-amber-600/20 blur-[80px] rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-700"></div>
          
          <h2 className="text-4xl md:text-8xl font-black uppercase text-white mb-8 relative z-10 leading-none">
            CLAIM YOUR <br/> 
            <span className="text-transparent stroke-white stroke-2" style={{ WebkitTextStroke: '1px white' }}>TICKET</span>
          </h2>
          
          <div className="relative z-20 mt-8 md:mt-12 flex flex-col items-center gap-6">
            <Link to="/auth" className="group relative bg-white text-black px-10 py-5 md:px-14 md:py-6 text-xl md:text-2xl font-black uppercase tracking-widest hover:bg-amber-500 transition-all duration-300 hover:scale-105 shadow-[0_0_50px_rgba(255,255,255,0.2)] flex items-center gap-4 overflow-hidden">
              <span className="relative z-10 flex items-center gap-3">
                <Ticket size={28} /> Register Now
              </span>
              <div className="absolute inset-0 bg-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .stroke-white { -webkit-text-stroke: 1px white; }
        .stroke-2 { -webkit-text-stroke-width: 1px; }
        @media (min-width: 768px) {
          .stroke-2 { -webkit-text-stroke-width: 2px; }
        }
      `}</style>

    </div>
  );
};

export default AboutSparkz;