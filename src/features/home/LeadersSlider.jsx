import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { 
  ChevronLeft, ChevronRight, ChevronDown, ChevronUp, 
  Quote, Sparkles, Award, Target, Users, Star,
  Calendar, Zap, Heart, Flag
} from 'lucide-react';

const LeadersSlider = () => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Check mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Memoize leaders data with enhanced info
  const leaders = useMemo(() => [
    {
      id: 1,
      name: '"Kalvivallal" Thiru T. Kalasalingam',
      title: 'Founder Chairman',
      image: 'https://www.kalasalingam.ac.in/wp-content/uploads/2021/04/Chairman-Sir-Photo-modified-1.png',
      bgColor: 'from-amber-900/20 via-amber-800/10 to-amber-900/20',
      gradient: 'from-amber-600 to-amber-800',
      achievements: ['Founded Kalasalingam University', 'Pioneer in Technical Education', '40+ Years of Leadership'],
      color: 'amber'
    },
    {
      id: 2,
      name: '"Illayavallal" Dr. K. Sridharan',
      title: 'Chancellor',
      image: 'https://www.kalasalingam.ac.in/wp-content/uploads/2021/04/leader-2-modified.png',
      bgColor: 'from-red-900/20 via-red-800/10 to-red-900/20',
      gradient: 'from-red-600 to-red-800',
      achievements: ['Academic Visionary', 'Research Excellence Advocate', 'Global Education Leader'],
      color: 'red'
    },
    {
      id: 3,
      name: 'Dr. S. Arivalagi',
      title: 'Pro Chancellor',
      image: 'https://www.kalasalingam.ac.in/wp-content/uploads/2021/10/Dr.-Arivalagi-modified.png',
      bgColor: 'from-amber-900/20 via-amber-800/10 to-amber-900/20',
      gradient: 'from-amber-600 to-orange-600',
      achievements: ['Administrative Excellence', 'Strategic Planning Expert', 'Student Development Focus'],
      color: 'orange'
    },
    {
      id: 4,
      name: 'Dr. S Shasi Anand',
      title: 'Vice President (Acad)',
      image: 'https://www.kalasalingam.ac.in/wp-content/uploads/2022/06/VP.png',
      bgColor: 'from-red-900/20 via-red-800/10 to-red-900/20',
      gradient: 'from-red-600 to-pink-600',
      achievements: ['Academic Innovation', 'Curriculum Development', 'Faculty Excellence'],
      color: 'pink'
    },
    {
      id: 5,
      name: 'Mr S Arjun',
      title: 'Vice President (Admin)',
      image: 'https://www.kalasalingam.ac.in/wp-content/uploads/2021/04/Arjun-Sir-1-modified-1.png',
      bgColor: 'from-amber-900/20 via-amber-800/10 to-amber-900/20',
      gradient: 'from-yellow-600 to-amber-600',
      achievements: ['Operational Excellence', 'Infrastructure Development', 'Administrative Leadership'],
      color: 'yellow'
    },
    {
      id: 6,
      name: 'Dr. S Narayanan',
      title: 'Vice-Chancellor',
      image: 'https://www.kalasalingam.ac.in/wp-content/uploads/2023/01/VC-Dr-S-Narayanan-Photo.png',
      bgColor: 'from-red-900/20 via-red-800/10 to-red-900/20',
      gradient: 'from-red-600 to-rose-600',
      achievements: ['Academic Leadership', 'Research Advancement', 'International Collaboration'],
      color: 'rose'
    },
    {
      id: 7,
      name: 'Dr. V. Vasudevan',
      title: 'Registrar',
      image: 'https://www.kalasalingam.ac.in/wp-content/uploads/2024/04/drvv.png',
      bgColor: 'from-amber-900/20 via-amber-800/10 to-amber-900/20',
      gradient: 'from-orange-600 to-amber-600',
      achievements: ['Academic Administration', 'Policy Implementation', 'Institutional Governance'],
      color: 'orange'
    }
  ], []);

  // Smooth animation for slide changes
  const animateSlide = useCallback((direction) => {
    setIsAnimating(true);
    if (direction === 'next') {
      setCurrentIndex(prev => (prev === leaders.length - 1 ? 0 : prev + 1));
    } else {
      setCurrentIndex(prev => (prev === 0 ? leaders.length - 1 : prev - 1));
    }
    setTimeout(() => setIsAnimating(false), 300);
  }, [leaders.length]);

  // Navigation functions
  const nextSlide = useCallback(() => {
    animateSlide('next');
  }, [animateSlide]);

  const prevSlide = useCallback(() => {
    animateSlide('prev');
  }, [animateSlide]);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Initialize component
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Mobile Thumbnail Navigation Component
  const MobileThumbnailNav = () => (
    <div className="md:hidden mt-6">
      {/* Toggle Button */}
      <button
        onClick={() => setShowThumbnails(!showThumbnails)}
        className="w-full flex items-center justify-center gap-3 py-3 bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-sm rounded-xl border border-gray-700 mb-3 group hover:border-amber-500/50 transition-all duration-300"
      >
        <Sparkles className="w-4 h-4 text-amber-400" />
        <span className="text-amber-300 text-sm font-medium">
          {showThumbnails ? 'Hide All Leaders' : 'View All Leaders'}
        </span>
        <Sparkles className="w-4 h-4 text-amber-400" />
      </button>

      {/* Thumbnail Grid */}
      <div className={`grid grid-cols-4 gap-2 transition-all duration-500 overflow-hidden ${
        showThumbnails ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        {leaders.map((leader, index) => (
          <button
            key={leader.id}
            onClick={() => {
              setCurrentIndex(index);
              setShowThumbnails(false);
            }}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 group ${
              currentIndex === index 
                ? `border-amber-500 scale-105 ring-2 ring-amber-500/30 shadow-lg` 
                : 'border-gray-700 opacity-80 hover:opacity-100 hover:border-gray-600'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <img
              src={leader.image}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-gradient-to-t from-black/90 to-transparent">
              <span className="text-white text-[10px] font-medium block truncate text-center">
                {leader.title.split(' ')[0]}
              </span>
            </div>
            {currentIndex === index && (
              <div className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <section 
      ref={containerRef}
      className="relative py-6 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black"
      style={{
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out'
      }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.015] bg-[size:40px_40px] bg-[linear-gradient(to_right,#f59e0b_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b_1px,transparent_1px)]"></div>
        
        {/* Dynamic Light Effects */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-tr from-red-500/10 to-transparent rounded-full blur-3xl"></div>
        
        {/* Floating Particles */}
        <div className="absolute top-10 left-10 w-1 h-1 bg-amber-500/30 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-2 h-2 bg-red-500/20 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-20 left-20 w-1 h-1 bg-amber-500/20 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Border Effects */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-900/20 to-red-900/20 rounded-full border border-amber-500/30 mb-4 md:mb-6 shadow-lg">
            <Star className="w-4 h-4 text-amber-400" />
            <span className="text-amber-300 text-sm md:text-base font-bold uppercase tracking-wider">
              VISIONARY LEADERSHIP
            </span>
            <Star className="w-4 h-4 text-red-400" />
          </div>
          
          {/* Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
            Guiding <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-500">Excellence</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-gray-300 text-base md:text-xl max-w-2xl mx-auto px-4">
            Meet the visionaries who shape the future of education and innovation
          </p>
        </div>

        {/* Progress Indicator - Mobile */}
        {isMobile && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-amber-400 text-sm font-medium">
                {currentIndex + 1} / {leaders.length}
              </span>
              <div className="flex items-center gap-1">
                <Flag className="w-3 h-3 text-amber-500" />
                <span className="text-gray-400 text-sm">
                  {leaders[currentIndex].title}
                </span>
              </div>
            </div>
            <div className="h-1.5 bg-gray-800/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-red-500 transition-all duration-500 rounded-full"
                style={{ width: `${((currentIndex + 1) / leaders.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Main Card Container */}
        <div className={`relative transition-all duration-300 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
          {/* Card */}
          <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm rounded-2xl md:rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">
            {/* Mobile Layout */}
            <div className="md:hidden">
              {/* Image Section */}
              <div className="relative p-4">
                <div className="relative aspect-square rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
                  <img
                    src={leaders[currentIndex].image}
                    alt={leaders[currentIndex].name}
                    className="relative z-10 w-full h-full object-cover"
                    loading="eager"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                
                {/* Position Badge */}
                <div className="absolute top-6 right-4">
                  <div className="px-3 py-1.5 bg-gradient-to-r from-amber-600 to-red-600 rounded-full shadow-lg">
                    <span className="text-white text-xs font-bold">
                      {leaders[currentIndex].title}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4 pt-0 space-y-4">
                {/* Name */}
                <h2 className="text-2xl font-bold text-white leading-tight">
                  {leaders[currentIndex].name}
                </h2>

                {/* Achievements */}
                <div className="space-y-2">
                  {leaders[currentIndex].achievements.slice(0, 2).map((achievement, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                      <span className="text-gray-300">{achievement}</span>
                    </div>
                  ))}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-gray-900/50 rounded-lg p-3 text-center">
                    <div className="text-amber-400 text-lg font-bold">15+</div>
                    <div className="text-gray-400 text-xs">Years</div>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3 text-center">
                    <div className="text-amber-400 text-lg font-bold">50+</div>
                    <div className="text-gray-400 text-xs">Awards</div>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3 text-center">
                    <div className="text-amber-400 text-lg font-bold">∞</div>
                    <div className="text-gray-400 text-xs">Impact</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 p-6 lg:p-8">
              {/* Image Column */}
              <div className="relative">
                <div className="relative aspect-square rounded-xl overflow-hidden border border-gray-700">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
                  <img
                    src={leaders[currentIndex].image}
                    alt={leaders[currentIndex].name}
                    className="relative z-10 w-full h-full object-cover"
                    loading="eager"
                  />
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>
                
                {/* Badge */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="px-4 py-2 bg-gradient-to-r from-amber-600 to-red-600 rounded-full shadow-xl">
                    <span className="text-white text-sm font-bold">
                      Featured Leader
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Column */}
              <div className="md:col-span-2 flex flex-col justify-center">
                <div className="space-y-6">
                  {/* Title & Name */}
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-800/50 rounded-full mb-4">
                      <Award className="w-4 h-4 text-amber-400" />
                      <span className="text-amber-400 text-sm font-medium">
                        {leaders[currentIndex].title}
                      </span>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                      {leaders[currentIndex].name}
                    </h2>
                  </div>

                  {/* Quote */}
                  <div className="relative pl-8">
                    <Quote className="absolute left-0 top-0 w-6 h-6 text-amber-500/50" />
                    <p className="text-gray-300 text-lg leading-relaxed italic">
                      "Architecting the future through innovative leadership and unwavering dedication to educational excellence."
                    </p>
                  </div>

                  {/* Achievements Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {leaders[currentIndex].achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${leaders[currentIndex].gradient}`}></div>
                        <span className="text-gray-300 text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-800">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                        15+
                      </div>
                      <div className="text-gray-400 text-sm">Years Experience</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                        100+
                      </div>
                      <div className="text-gray-400 text-sm">Initiatives</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-400">
                        ∞
                      </div>
                      <div className="text-gray-400 text-sm">Impact Scale</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Thumbnail Navigation */}
          <div className="hidden md:flex justify-center gap-3 lg:gap-4 mt-6 overflow-x-auto">
            {leaders.map((leader, index) => (
              <button
                key={leader.id}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 transition-all duration-300 ${currentIndex === index ? 'scale-110' : 'opacity-60 hover:opacity-100 hover:scale-105'}`}
              >
                <div className={`w-14 h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                  currentIndex === index 
                    ? 'border-amber-500 ring-2 ring-amber-500/30 shadow-lg' 
                    : 'border-gray-700 hover:border-gray-600'
                }`}>
                  <div className="relative w-full h-full">
                    <img
                      src={leader.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    {currentIndex === index && (
                      <div className="absolute inset-0 bg-amber-500/10"></div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Mobile Thumbnail Navigation */}
          <MobileThumbnailNav />
        </div>

        {/* Navigation Controls */}
        <div className="mt-6 md:mt-8">
          {/* Mobile Navigation */}
          {isMobile && (
            <div className="flex justify-between items-center">
              <button
                onClick={prevSlide}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-amber-500/50 transition-all duration-300 active:scale-95"
              >
                <ChevronLeft size={20} className="text-amber-400" />
                <span className="text-gray-300 text-sm">Prev</span>
              </button>
              
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[1, 2, 3].map((i) => (
                    <div 
                      key={i}
                      className={`w-1 h-1 rounded-full transition-all duration-300 ${
                        currentIndex % 3 === i - 1 ? 'bg-amber-500 scale-125' : 'bg-gray-700'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              <button
                onClick={nextSlide}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-amber-500/50 transition-all duration-300 active:scale-95"
              >
                <span className="text-gray-300 text-sm">Next</span>
                <ChevronRight size={20} className="text-amber-400" />
              </button>
            </div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-between items-center">
            <button
              onClick={prevSlide}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-amber-500/50 hover:bg-gray-900 transition-all duration-300 group"
            >
              <ChevronLeft size={20} className="text-gray-300 group-hover:text-amber-400" />
              <span className="text-gray-300 group-hover:text-amber-400 text-sm font-medium">
                Previous
              </span>
            </button>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-400" />
                <span className="text-gray-400 text-sm">
                  Leader {currentIndex + 1} of {leaders.length}
                </span>
              </div>
              <div className="flex gap-2">
                {leaders.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentIndex === index 
                        ? 'w-8 bg-gradient-to-r from-amber-500 to-red-500' 
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={nextSlide}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-amber-500/50 hover:bg-gray-900 transition-all duration-300 group"
            >
              <span className="text-gray-300 group-hover:text-amber-400 text-sm font-medium">
                Next
              </span>
              <ChevronRight size={20} className="text-gray-300 group-hover:text-amber-400" />
            </button>
          </div>
        </div>

        {/* Footer Quote */}
        <div className="mt-8 md:mt-12 lg:mt-16">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Quote Card */}
              <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-600/20 to-red-600/20 flex items-center justify-center">
                      <Heart className="w-6 h-6 text-amber-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-300 text-lg italic leading-relaxed">
                      "In the theatre of innovation, our leaders are the directors, writers, and producers of tomorrow's success stories."
                    </p>
                    <div className="mt-4 flex items-center justify-end gap-2">
                      <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
                      <span className="text-amber-400 text-sm font-bold tracking-wider">
                        LEADING EXCELLENCE
                      </span>
                      <div className="h-px w-12 bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auto-Slide Indicator */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full border border-gray-800">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></div>
            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
          </div>
          <span className="text-gray-400 text-xs">
            Auto-advancing in 6s
          </span>
        </div>
      </div>

      {/* Custom CSS for Animations */}
      <style jsx>{`
        /* Smooth animations */
        .transition-smooth {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Optimize images */
        img {
          -webkit-tap-highlight-color: transparent;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          button {
            min-height: 44px;
            min-width: 44px;
          }
          
          /* Better touch scrolling */
          .scroll-touch {
            -webkit-overflow-scrolling: touch;
          }
        }
        
        /* Gradient text animation */
        .gradient-text {
          background: linear-gradient(90deg, #f59e0b, #dc2626, #f59e0b);
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient 3s linear infinite;
        }
        
        @keyframes gradient {
          0% { background-position: 0% center; }
          50% { background-position: 100% center; }
          100% { background-position: 0% center; }
        }
      `}</style>
    </section>
  );
};

export default LeadersSlider;