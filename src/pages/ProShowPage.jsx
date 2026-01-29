import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Crown, Star, Ticket, Sparkles, Users, Calendar, MapPin, 
  Clock, Award, Film, Home, Music, Gamepad2, ChefHat, 
  Globe, Zap, X, Search, Filter, TrendingUp, Eye, Heart, 
  Share2, Bookmark, ChevronRight, Tag, Play, Mic, Headphones,
  Volume2, Radio, Guitar, Drum, Theater, Palette, Camera,
  Video, BookOpen, Trophy, Smartphone, ExternalLink, Download,
  CheckCircle, AlertCircle, Lock, Unlock, CreditCard, UserCheck
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import proShowData from '../assets/data/proshow.json';

// Import components
import {
  ProShowHero,
  ProShowGrid,
  ProShowModal,
  ComingSoon,
  ActionButtons
} from '../features/proshow';

gsap.registerPlugin(ScrollTrigger);

const ProShowPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const sectionRef = useRef(null);
  const heroRef = useRef(null);

  // Ensure proShowData is an array
  const validProShowData = Array.isArray(proShowData) ? proShowData : [];

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Helper function to get category icon
  const getCategoryIcon = (category) => {
    if (!category) return Crown;
    
    const iconMap = {
      'concert': Music,
      'comedy': Mic,
      'dance': Sparkles,
      'dj': Headphones,
      'band': Guitar,
      'celebrity': Star,
      'performance': Theater,
      'all': Crown,
      'default': Crown
    };
    return iconMap[category.toLowerCase()] || iconMap.default;
  };

  // Helper function to get category color
  const getCategoryColor = (category) => {
    if (!category) return 'from-amber-600 to-yellow-600';
    
    const colorMap = {
      'concert': 'from-purple-600 to-pink-600',
      'comedy': 'from-amber-600 to-orange-600',
      'dance': 'from-blue-600 to-cyan-600',
      'dj': 'from-green-600 to-emerald-600',
      'band': 'from-red-600 to-rose-600',
      'celebrity': 'from-yellow-600 to-amber-600',
      'performance': 'from-indigo-600 to-purple-600',
      'all': 'from-amber-600 to-yellow-600',
      'default': 'from-amber-600 to-yellow-600'
    };
    return colorMap[category.toLowerCase()] || colorMap.default;
  };

  // Generate categories from events data
  const categories = useMemo(() => {
    if (!validProShowData || validProShowData.length === 0) return [];
    
    // Count events per category
    const categoryCounts = {};
    validProShowData.forEach(event => {
      const cat = (event?.category || 'other').toLowerCase();
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    // Convert to array
    const categoryArray = Object.keys(categoryCounts).map(cat => ({
      id: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1),
      icon: getCategoryIcon(cat),
      gradient: getCategoryColor(cat),
      color: getCategoryColor(cat),
      count: categoryCounts[cat]
    }));

    // Sort by count (descending)
    categoryArray.sort((a, b) => b.count - a.count);

    // Add "All" category
    const allCategory = {
      id: 'all',
      label: 'All Pro Shows',
      icon: Crown,
      gradient: 'from-amber-600 to-yellow-600',
      color: 'from-amber-600 to-yellow-600',
      count: validProShowData.length
    };

    return [allCategory, ...categoryArray];
  }, [validProShowData]);

  // Filter events based on category and search
  const updateFilteredEvents = useMemo(() => {
    return validProShowData.filter(event => {
      if (!event) return false;
      
      // Get safe values with fallbacks
      const eventCategory = (event.category || '').toLowerCase();
      const eventTitle = (event.title || '').toLowerCase();
      const eventTagline = (event.tagline || '').toLowerCase();
      const eventDescription = Array.isArray(event.description) 
        ? event.description.join(' ').toLowerCase() 
        : (event.description || '').toLowerCase();
      const eventClub = (event.club || '').toLowerCase();
      const searchLower = searchQuery.toLowerCase();
      
      // Filter by category
      const matchesCategory = activeCategory === 'all' || 
        eventCategory === activeCategory;
      
      // Filter by search query
      const matchesSearch = searchQuery === '' || 
        eventTitle.includes(searchLower) ||
        eventTagline.includes(searchLower) ||
        eventDescription.includes(searchLower) ||
        eventCategory.includes(searchLower) ||
        eventClub.includes(searchLower);
      
      return matchesCategory && matchesSearch;
    });
  }, [validProShowData, activeCategory, searchQuery]);

  // Update filtered events when dependencies change
  useEffect(() => {
    setFilteredEvents(updateFilteredEvents);
  }, [updateFilteredEvents]);

  // GSAP animations
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Premium intro animation
      gsap.from('.premium-intro', {
        opacity: 0,
        scale: 1.1,
        duration: 1.8,
        ease: 'power3.out',
      });

      // Gold shimmer effect
      gsap.to('.gold-shimmer', {
        backgroundPosition: '200% 0',
        duration: 3,
        repeat: -1,
        ease: 'linear',
      });

      // Hero section animation
      if (heroRef.current) {
        gsap.from(heroRef.current, {
          opacity: 0,
          y: 50,
          duration: 1.2,
          delay: 0.3,
          ease: 'power3.out'
        });
      }

      // Staggered animation for premium cards
      gsap.from('.premium-card', {
        opacity: 0,
        y: 100,
        duration: 1,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      // Floating animation for premium cards
      gsap.to('.premium-card', {
        y: -8,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.15,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setHoveredCard(null);
  };

  // Handle search change
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setHoveredCard(null);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setHoveredCard(null);
  };

  // Handle modal close
  const handleModalClose = () => {
    setSelectedEvent(null);
  };

  // Get total events count
  const totalEvents = validProShowData.length;

  // Get event stats
  const eventStats = useMemo(() => {
    const stats = {
      total: validProShowData.length,
      featured: validProShowData.filter(e => e?.featured).length,
      vip: validProShowData.filter(e => e?.ticketType === 'VIP').length,
      byCategory: {}
    };

    validProShowData.forEach(event => {
      if (!event) return;
      const cat = (event.category || 'other').toLowerCase();
      stats.byCategory[cat] = (stats.byCategory[cat] || 0) + 1;
    });

    return stats;
  }, [validProShowData]);

  // Add error boundary for data loading
  if (!validProShowData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Crown className="w-16 h-16 text-amber-400/50 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Loading Premium Shows...</h2>
          <p className="text-white/60">Please wait while we load the premium shows data.</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="min-h-screen bg-black premium-intro">
      {/* Luxury Overlay Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-purple-900/5 to-rose-900/10" />
        <div className="absolute inset-0 opacity-5 mix-blend-overlay film-grain"></div>
        {/* Gold Dust Particles */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(2px 2px at 20px 30px, rgba(255, 215, 0, 0.3), transparent),
                          radial-gradient(2px 2px at 40px 70px, rgba(255, 215, 0, 0.3), transparent),
                          radial-gradient(2px 2px at 60px 20px, rgba(255, 215, 0, 0.3), transparent),
                          radial-gradient(3px 3px at 90px 40px, rgba(255, 215, 0, 0.3), transparent)`,
          backgroundSize: '100px 100px'
        }} />
      </div>

      {/* Page Header - Sticky */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/95 to-transparent backdrop-blur-xl border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-amber-600/20 to-yellow-600/20 rounded-lg border border-amber-500/30">
                <Crown className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold font-['Cinzel'] text-white">
                  SPARKZ<span className="text-amber-400">'26</span> <span className="text-amber-300">PREMIUM</span>
                </h1>
                <div className="flex items-center gap-2 text-xs text-amber-300/80">
                  <Crown size={12} className="text-amber-400" />
                  <span className="font-mono tracking-wider">VIP ACCESS: PRO SHOW</span>
                </div>
              </div>
            </div>
            
            {/* Premium Counter */}
            <div className="hidden md:block">
              <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-black/60 to-black/40 backdrop-blur-sm rounded-lg border border-amber-500/20">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm">
                    PREMIUM: <span className="font-bold text-amber-400">{filteredEvents.length}</span> SHOWS
                  </span>
                </div>
                {eventStats.featured > 0 && (
                  <>
                    <div className="w-px h-4 bg-amber-500/30"></div>
                    <div className="flex items-center gap-2">
                      <Star className="w-3 h-3 text-amber-400" />
                      <span className="text-white text-sm">
                        <span className="font-bold text-amber-400">{eventStats.featured}</span> FEATURED
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-28 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Premium Hero Section */}
          <div className="mb-8 md:mb-12">
            <div ref={heroRef}>
              <ProShowHero isMobile={isMobile} />
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search premium shows by title, artist, or category..."
                className="w-full px-6 py-4 bg-black/60 backdrop-blur-xl text-white rounded-2xl border border-amber-500/30 focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all duration-300"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="p-2 text-amber-400/50 hover:text-amber-300"
                  >
                    <X size={20} />
                  </button>
                )}
                <Search className="text-amber-400/50" size={20} />
              </div>
            </div>
          </div>

          {/* Categories Filter */}
          <div className="mb-8">
            <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all whitespace-nowrap ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white border-amber-500'
                      : 'bg-black/40 backdrop-blur-sm text-white/70 border-white/10 hover:border-amber-500/30'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{category.label}</span>
                  <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Results Summary */}
          {(searchQuery || activeCategory !== 'all') && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-gradient-to-r from-amber-900/20 to-yellow-900/20 backdrop-blur-sm rounded-xl border border-amber-500/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-amber-600/30 to-yellow-600/30 rounded-lg">
                    <Crown className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">
                      Showing <span className="font-bold text-amber-400">{filteredEvents.length}</span> of {totalEvents} premium shows
                    </div>
                    {activeCategory !== 'all' && (
                      <div className="text-sm text-amber-200">
                        Filtered by: <span className="font-bold">{categories.find(c => c.id === activeCategory)?.label}</span>
                      </div>
                    )}
                    {searchQuery && (
                      <div className="text-sm text-amber-200">
                        Search: <span className="font-bold">"{searchQuery}"</span>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={clearSearch}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600/20 to-yellow-600/20 hover:from-amber-600/30 hover:to-yellow-600/30 backdrop-blur-sm rounded-lg border border-amber-500/30 hover:border-amber-500/50 transition-all duration-300"
                >
                  <X size={16} className="text-amber-400" />
                  <span className="text-amber-300 text-sm">Clear Filters</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Premium Stats */}
          {filteredEvents.length > 0 && (
            <div className="mb-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-amber-600/20 to-amber-900/20 backdrop-blur-sm p-4 rounded-xl border border-amber-500/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-500/20 rounded-lg">
                      <Crown className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{filteredEvents.length}</div>
                      <div className="text-sm text-amber-200">Premium Shows</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-600/20 to-purple-900/20 backdrop-blur-sm p-4 rounded-xl border border-purple-500/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Star className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">
                        {filteredEvents.filter(e => e?.featured).length}
                      </div>
                      <div className="text-sm text-purple-200">Featured</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-900/20 backdrop-blur-sm p-4 rounded-xl border border-yellow-500/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-500/20 rounded-lg">
                      <Ticket className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">
                        {filteredEvents.filter(e => e?.ticketType === 'VIP').length}
                      </div>
                      <div className="text-sm text-yellow-200">VIP Events</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-rose-600/20 to-rose-900/20 backdrop-blur-sm p-4 rounded-xl border border-rose-500/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-rose-500/20 rounded-lg">
                      <Calendar className="w-5 h-5 text-rose-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">
                        {new Set(filteredEvents.map(e => e?.day || '')).size}
                      </div>
                      <div className="text-sm text-rose-200">Show Days</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pro Shows Grid */}
          <ProShowGrid
            proShows={filteredEvents}
            hoveredCard={hoveredCard}
            setHoveredCard={setHoveredCard}
            setSelectedEvent={setSelectedEvent}
            isMobile={isMobile}
            searchQuery={searchQuery}
            clearSearch={clearSearch}
          />

          {/* VIP Benefits Section */}
          {filteredEvents.length > 0 && (
            <div className="mt-16 mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold font-['Cinzel'] text-white mb-3">
                  <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 bg-clip-text text-transparent gold-shimmer" 
                        style={{backgroundSize: '200% 100%'}}>
                    VIP EXCLUSIVE BENEFITS
                  </span>
                </h2>
                <p className="text-white/60 text-lg">Experience the ultimate Sparkz premium package</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { 
                    icon: Star, 
                    title: "Front Row Seating", 
                    desc: "Best views with premium seating arrangement", 
                    color: "from-amber-500 to-yellow-500",
                    features: ["Priority seating", "Best stage view", "Comfortable chairs"]
                  },
                  { 
                    icon: Users, 
                    title: "Meet & Greet", 
                    desc: "Exclusive access to artists and performers", 
                    color: "from-purple-500 to-pink-500",
                    features: ["Artist interactions", "Photo opportunities", "Autograph sessions"]
                  },
                  { 
                    icon: Crown, 
                    title: "VIP Lounge Access", 
                    desc: "Access to exclusive VIP lounge with refreshments", 
                    color: "from-blue-500 to-cyan-500",
                    features: ["Private lounge", "Complimentary food", "Premium drinks"]
                  }
                ].map((benefit, index) => (
                  <div key={index} className="bg-gradient-to-br from-white/5 to-transparent p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-amber-500/30 transition-all duration-300 group">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${benefit.color} mb-4`}>
                      <benefit.icon className="text-white" size={24} />
                    </div>
                    <h3 className="text-white text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-white/60 mb-4">{benefit.desc}</p>
                    <ul className="space-y-2">
                      {benefit.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-white/70">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Results Message */}
          {filteredEvents.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 md:py-24"
            >
              <div className="inline-block p-8 bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl rounded-2xl border border-amber-500/30 shadow-2xl">
                <div className="relative inline-block mb-6">
                  <Crown className="w-16 h-16 text-amber-400/30 mx-auto mb-4" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent animate-pulse rounded-full blur-xl" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  No Premium Shows Found
                </h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto text-base">
                  {searchQuery 
                    ? `No premium shows match "${searchQuery}". Try a different search term or browse categories.`
                    : 'No premium shows match your current filters. Try selecting a different category.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={clearSearch}
                    className="px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold rounded-xl hover:from-amber-700 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Clear Filters & Show All Shows
                  </button>
                  <button
                    onClick={() => setActiveCategory('all')}
                    className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
                  >
                    Browse All Categories
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Category Distribution */}
          {filteredEvents.length > 0 && (
            <div className="mt-16">
              <div className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl rounded-2xl border border-amber-500/30 p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <Tag className="w-5 h-5 text-amber-400" />
                  Show Categories
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {categories.filter(c => c.id !== 'all').map(category => {
                    const count = filteredEvents.filter(e => 
                      (e?.category || '').toLowerCase() === category.id
                    ).length;
                    const percentage = filteredEvents.length > 0 
                      ? Math.round((count / filteredEvents.length) * 100) 
                      : 0;
                    
                    if (count === 0) return null;
                    
                    return (
                      <div key={category.id} className="bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-white/10 hover:border-amber-500/30 transition-all">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${category.gradient} bg-opacity-20`}>
                            <category.icon className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-white font-medium text-sm">{category.label}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-white">{count}</div>
                          <div className="text-sm text-white/60">{percentage}%</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Coming Soon Section */}
          <div className="mt-16">
            <ComingSoon isMobile={isMobile} proShow={true} />
          </div>
        </div>
      </div>

      {/* Premium Action Buttons */}
      <ActionButtons isMobile={isMobile} />

      {/* Pro Show Modal */}
      <AnimatePresence mode="wait">
        {selectedEvent && (
          <ProShowModal 
            event={selectedEvent} 
            onClose={handleModalClose}
            getCategoryIcon={getCategoryIcon}
          />
        )}
      </AnimatePresence>

      {/* Premium Footer */}
      <footer className="relative z-10 w-full bg-black/95 backdrop-blur-sm text-center p-6 border-t border-amber-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-amber-600/20 to-yellow-600/20 rounded-lg border border-amber-500/30">
                <Crown className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-left">
                <div className="text-white font-bold font-['Cinzel']">SPARKZ'26 PREMIUM</div>
                <div className="text-amber-300/60 text-sm font-mono">VIP ACCESS • {totalEvents} EXCLUSIVE SHOWS</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-white/80 text-sm">Total Shows</div>
                <div className="text-2xl font-bold text-amber-400">{totalEvents}</div>
              </div>
              <div className="w-px h-8 bg-amber-500/30"></div>
              <div className="text-right">
                <div className="text-white/80 text-sm">VIP Events</div>
                <div className="text-2xl font-bold text-purple-400">
                  {validProShowData.filter(e => e?.ticketType === 'VIP').length}
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-amber-500/10">
            <div className="text-amber-400/40 text-xs font-mono">
              © 2026 KALASALINGAM ACADEMY OF RESEARCH AND EDUCATION • SPARKZ PREMIUM PRO SHOW
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #f59e0b, #eab308);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #d97706, #ca8a04);
        }
        
        /* Film grain effect */
        .film-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E");
        }
        
        /* Hide scrollbar for category filters */
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        /* Gold shimmer animation */
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        .gold-shimmer {
          animation: shimmer 3s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default ProShowPage;