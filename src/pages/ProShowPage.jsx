import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Crown, Star, Ticket, Sparkles, Users, Calendar, ChevronRight, Play, CheckCircle, Music, Zap, Theater } from 'lucide-react';

// Actor-focused proshow data with high-quality actor images
const proShowData = [
  {
    id: 1,
    title: "DANCE BATTLE",
    subtitle: "Featuring International Dance Crews",
    category: "",
    actorImage: "https://images.unsplash.com/photo-1547153760-18fc86324498?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
    gradient: "from-blue-900/90 via-purple-900/80 to-indigo-900/90",
    featured: true,
    featuredActors: ["International Dance Crews", "Professional Choreographers", "Celebrity Judges"],
    icon: Zap
  },
  {
    id: 2,
    title: "ROCK CONCERT",
    subtitle: "Starring Top Rock Bands",
    category: "",
    actorImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
    gradient: "from-red-900/90 via-rose-900/80 to-red-900/90",
    featured: true,
    featuredActors: ["Top Rock Bands", "National Artists", "Special Guests"],
    icon: Music
  },
  {
    id: 3,
    title: "COMEDY NIGHT",
    subtitle: "With Celebrity Comedians",
    category: "",
    actorImage: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
    gradient: "from-amber-900/90 via-orange-900/80 to-amber-900/90",
    featured: true,
    featuredActors: ["Stand-up Comedians", "Improv Artists", "TV Celebrities"],
    icon: Theater
  }
];

// Performance-optimized image component
const ActorImage = React.memo(({ src, alt, isLoaded, onLoad }) => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
        }`}
        style={{
          imageRendering: 'crisp-edges',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)'
        }}
        onLoad={onLoad}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
      )}
    </div>
  );
});

// Actor Card Component - Minimal and focused
const ActorCard = React.memo(({ show, index, isActive, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const Icon = show.icon;
  
  return (
    <div
      onClick={() => onClick(index)}
      className={`relative cursor-pointer group transition-all duration-500 ease-out ${
        isActive ? 'transform-gpu scale-105' : 'transform-gpu scale-100'
      }`}
      style={{
        willChange: 'transform, opacity',
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      {/* Card Container */}
      <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
        {/* Actor Image with Gradient Overlay */}
        <div className="absolute inset-0">
          <ActorImage
            src={show.actorImage}
            alt={show.title}
            isLoaded={imageLoaded}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${show.gradient} mix-blend-multiply opacity-80`} />
          
          {/* Subtle vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </div>

        {/* Premium Glow Effect */}
        <div className={`absolute inset-0 rounded-3xl transition-all duration-500 ${
          isActive 
            ? 'shadow-[0_0_60px_rgba(251,191,36,0.4)] ring-2 ring-amber-400/50' 
            : 'shadow-[0_0_30px_rgba(0,0,0,0.8)] group-hover:shadow-[0_0_40px_rgba(251,191,36,0.3)]'
        }`} />

        {/* Card Content - Only Title */}
        <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
          {/* Category Icon */}
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-2 bg-black/60 backdrop-blur-sm rounded-full border border-white/20">
              <Icon className="w-4 h-4 text-white" />
              <span className="text-white text-xs font-medium uppercase tracking-wider">
                {show.category}
              </span>
            </div>
          </div>

          {/* Main Title */}
          <motion.div
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0.9,
              y: isActive ? 0 : 10
            }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2 leading-tight tracking-tight drop-shadow-2xl">
              {show.title}
            </h3>
            
            {/* Subtitle appears on hover/active */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isActive ? 1 : 0,
                y: isActive ? 0 : 20
              }}
              transition={{ duration: 0.4 }}
              className="text-lg md:text-xl text-amber-200 font-medium drop-shadow-lg"
            >
              {show.subtitle}
            </motion.p>
          </motion.div>

          {/* Featured Badge */}
          {show.featured && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-6 right-6"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-600/90 to-yellow-600/90 backdrop-blur-sm rounded-full border border-amber-500/40">
                <Star className="w-3 h-3 text-white" />
                <span className="text-white text-xs font-bold">FEATURED</span>
              </div>
            </motion.div>
          )}

          {/* Hover Indicator */}
          {!isActive && (
            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center gap-2 px-4 py-2 bg-black/80 backdrop-blur-md rounded-full border border-white/20">
                <Play className="w-4 h-4 text-amber-400" />
                <span className="text-white text-sm font-medium">VIEW</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

const ProShowPage = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const containerRef = useRef(null);

  // Detect mobile with debounce
  useEffect(() => {
    let timeoutId;
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 150);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timeoutId);
    };
  }, []);

  // Auto-rotate cards on desktop
  useEffect(() => {
    if (isMobile) return;
    
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % proShowData.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isMobile]);

  const handleCardClick = useCallback((index) => {
    setActiveCard(index);
  }, []);

  const handleRegister = useCallback(() => {
    setShowRegister(true);
    setTimeout(() => {
      setShowRegister(false);
      // Open registration page
      window.open('#register', '_blank');
    }, 800);
  }, []);

  // Stats data
  const stats = useMemo(() => [
    { icon: Crown, label: "PREMIUM", value: "VIP Access", color: "text-amber-400" },
    { icon: Users, label: "CAPACITY", value: "5000+ Seats", color: "text-purple-400" },
    { icon: Calendar, label: "DATES", value: "Feb 27 - Mar 1", color: "text-blue-400" },
    { icon: Star, label: "FEATURED", value: "3 Shows", color: "text-red-400" }
  ], []);

  // VIP Features
  const vipFeatures = useMemo(() => [
    { text: "Front Row Seating", icon: "🎯" },
    { text: "Backstage Access", icon: "🎪" },
    { text: "Meet & Greet", icon: "🤝" },
    { text: "VIP Lounge", icon: "👑" },
    { text: "Premium Merchandise", icon: "🎁" },
    { text: "Priority Entry", icon: "🚀" }
  ], []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black overflow-x-hidden">
      {/* Simple Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        {/* Subtle moving gradients */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-900/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-900/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section with GET PASS button */}
        <section className="relative pt-20 pb-12 md:pt-28 md:pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left Column - Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Premium Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600/20 to-yellow-600/20 backdrop-blur-sm rounded-full border border-amber-500/30">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-300 text-sm font-bold tracking-widest">EXCLUSIVE PRO SHOW</span>
                </div>

                {/* Main Title */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
                  <span className="block">STAR</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400">
                    STUDIO
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-amber-100/80 font-light">
                  Experience world-class performances featuring top artists and entertainers
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="flex items-center gap-3"
                    >
                      <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10">
                        <stat.icon className={`w-4 h-4 ${stat.color}`} />
                      </div>
                      <div>
                        <div className="text-white/60 text-xs font-medium tracking-wider">{stat.label}</div>
                        <div className={`text-sm font-bold ${stat.color}`}>{stat.value}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right Column - GET PASS Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-amber-600/20 via-yellow-600/20 to-amber-600/20 blur-3xl rounded-3xl" />
                
                {/* VIP Pass Card */}
                <div className="relative bg-gradient-to-br from-black/90 to-black/70 backdrop-blur-sm rounded-3xl border border-amber-500/30 p-6 md:p-8 shadow-2xl">
                  {/* VIP Header */}
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600/20 to-yellow-600/20 backdrop-blur-sm rounded-full border border-amber-500/30 mb-4">
                      <Crown className="w-4 h-4 text-amber-400" />
                      <span className="text-amber-300 text-sm font-bold tracking-widest">VIP ALL-ACCESS</span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      Get Your VIP Pass
                    </h3>
                    
                    <p className="text-white/70 text-sm md:text-base">
                      Access all three star performances with premium benefits
                    </p>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-6">
                    <div className="inline-block p-4 bg-gradient-to-br from-amber-900/30 to-yellow-900/30 rounded-2xl border border-amber-500/20">
                      <div className="text-white/60 text-xs mb-1 uppercase tracking-wider">All 3 Shows</div>
                      <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-1">₹500</div>
                      <div className="text-white/50 text-xs">Limited passes available</div>
                    </div>
                  </div>

                  {/* GET PASS Button */}
                  <button
                    onClick={handleRegister}
                    disabled={showRegister}
                    className={`group relative w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold text-lg rounded-2xl shadow-2xl transition-all duration-300 ${
                      showRegister ? 'opacity-90 cursor-not-allowed' : 'hover:shadow-[0_0_40px_rgba(251,191,36,0.4)] hover:scale-105'
                    }`}
                    style={{ transform: 'translateZ(0)' }}
                  >
                    {showRegister ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span className="text-base md:text-lg">PROCESSING...</span>
                      </>
                    ) : (
                      <>
                        <Ticket className="w-5 h-5" />
                        <span className="text-base md:text-lg">GET VIP PASS</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  {/* Features List */}
                  <div className="mt-6 space-y-2">
                    {vipFeatures.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-white/70">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span>{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Actor Cards Section */}
        <section className="relative py-8 md:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-12 md:mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-4">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-amber-300 text-sm font-medium">FEATURED PERFORMANCES</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Star Lineup 2026
              </h2>
              
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                Three nights of spectacular performances by top artists and entertainers
              </p>
            </motion.div>

            {/* Actor Cards Grid */}
            <div className="relative">
              <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-3 gap-4 md:gap-6'}`}>
                {proShowData.map((show, index) => (
                  <ActorCard
                    key={show.id}
                    show={show}
                    index={index}
                    isActive={activeCard === index}
                    onClick={handleCardClick}
                  />
                ))}
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center gap-2 mt-8">
                {proShowData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleCardClick(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeCard === index 
                        ? 'bg-amber-400 scale-125' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Select ${proShowData[index].title}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Additional Info Section */}
        <section className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm rounded-3xl border border-amber-500/30 p-8 md:p-12">
                <div className="text-center mb-8">
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">
                    Why Choose VIP?
                  </h3>
                  <p className="text-white/70 text-lg max-w-2xl mx-auto">
                    Get the ultimate Sparkz experience with exclusive benefits and premium access
                  </p>
                </div>

                {/* VIP Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {vipFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-amber-500/30 transition-colors"
                    >
                      <span className="text-2xl">{feature.icon}</span>
                      <div>
                        <div className="text-white font-medium">{feature.text}</div>
                        <div className="text-white/50 text-sm">Included in VIP pass</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button at Bottom */}
                <div className="text-center mt-8">
                  <button
                    onClick={handleRegister}
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <Ticket className="w-5 h-5" />
                    <span>GET YOUR VIP PASS NOW</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative py-8 px-4 sm:px-6 lg:px-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Brand */}
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-r from-amber-600/20 to-yellow-600/20 rounded-xl border border-amber-500/30">
                  <Crown className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <div className="text-white font-bold text-xl">SPARKZ'26 PRO SHOW</div>
                  <div className="text-amber-300/60 text-sm">Star Studio Experience</div>
                </div>
              </div>
              
              {/* Copyright */}
              <div className="text-center md:text-right">
                <div className="text-white/60 text-sm">KALASALINGAM ACADEMY OF RESEARCH AND EDUCATION</div>
                <div className="text-white/40 text-xs mt-1">© 2026 SPARKZ CULTURAL FEST</div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Performance Optimized Styles */}
      <style jsx>{`
        /* Optimize for performance */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Hardware acceleration */
        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
        
        /* Image optimization */
        img {
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          *, ::before, ::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default React.memo(ProShowPage);