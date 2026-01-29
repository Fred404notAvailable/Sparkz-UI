import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, MapPin, Ticket, Sparkles, 
  Users, Award, Crown, Heart, Share2, Bookmark,
  Zap, Music, Palette, Camera, Video, Theater, 
  BookOpen, Film, Trophy, UserCheck, Globe
} from 'lucide-react';

// Import icons for different categories
const categoryIcons = {
  'music': Music,
  'drama': Theater,
  'arts': Palette,
  'literary': BookOpen,
  'photo': Camera,
  'video': Video,
  'film': Film,
  'sports': Trophy,
  'dance': Zap, // Added dance category
  'gaming': Zap,
  'default': Sparkles
};

const EventCard = ({ 
  event, 
  isMobile, 
  setSelectedEvent, 
  setHoveredCard, 
  isHovered
}) => {
  // Get category icon based on event category
  const CategoryIcon = categoryIcons[event.category?.toLowerCase()] || categoryIcons.default;
  const isFeatured = event.featured;
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Color schemes based on category
  const getCategoryColor = (category) => {
    const colors = {
      'music': { gradient: 'from-purple-600 to-pink-600', bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
      'drama': { gradient: 'from-red-600 to-rose-600', bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' },
      'arts': { gradient: 'from-green-600 to-emerald-600', bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' },
      'literary': { gradient: 'from-blue-600 to-cyan-600', bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
      'photo': { gradient: 'from-cyan-600 to-teal-600', bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30' },
      'video': { gradient: 'from-pink-600 to-rose-600', bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/30' },
      'film': { gradient: 'from-amber-600 to-orange-600', bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
      'sports': { gradient: 'from-orange-600 to-red-600', bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30' },
      'dance': { gradient: 'from-blue-600 via-purple-600 to-blue-900', bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' }, // Added dance
      'default': { gradient: 'from-amber-600 to-red-600', bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' }
    };
    return colors[category?.toLowerCase()] || colors.default;
  };

  const colors = getCategoryColor(event.category);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: { 
      y: isMobile ? 0 : -8,
      scale: isMobile ? 1 : 1.02,
      transition: { duration: 0.3 }
    },
    exit: { opacity: 0, scale: 0.9 }
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Handle card click to open modal
  const handleCardClick = () => {
    setSelectedEvent(event);
  };

  // Handle button clicks with stopPropagation
  const handleButtonClick = (e, action) => {
    e.stopPropagation();
    switch(action) {
      case 'like':
        setIsLiked(!isLiked);
        break;
      case 'bookmark':
        setIsBookmarked(!isBookmarked);
        break;
      case 'register':
        // Handle registration logic
        console.log('Register for event:', event.title);
        break;
      default:
        break;
    }
  };

  // Handle share
  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.tagline,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${event.title} - ${event.tagline}`);
      alert('Event link copied to clipboard!');
    }
  };

  return (
    <>
      <motion.div
        layout
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        whileHover="hover"
        onMouseEnter={() => !isMobile && setHoveredCard(event.id)}
        onMouseLeave={() => !isMobile && setHoveredCard(null)}
        className={`relative cursor-pointer group ${isMobile ? 'w-full' : 'w-full'}`}
        onClick={handleCardClick}
      >
        {/* Main Card Container */}
        <div className="relative overflow-hidden rounded-xl md:rounded-2xl transition-all duration-500 will-change-transform h-full min-h-[380px]">
          {/* Background with event gradient or image */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {event.image ? (
              <motion.div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${event.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                animate={{
                  scale: isHovered && !isMobile ? 1.1 : 1,
                }}
                transition={{ duration: 0.7 }}
              />
            ) : event.gradient ? (
              <div 
                className="absolute inset-0"
                style={{
                  background: event.gradient,
                }}
              />
            ) : (
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${event.posterColor || colors.gradient} opacity-80`}
              />
            )}
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div 
                className="absolute inset-0" 
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: '30px 30px',
                }}
              />
            </div>
          </div>

          {/* Glassmorphism Overlay */}
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/20 to-black/60 backdrop-blur-[1px] border border-white/10" />

          {/* Card Content */}
          <motion.div 
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="relative z-20 h-full flex flex-col p-4 md:p-5"
          >
            {/* Top Section */}
            <div className="flex justify-between items-start mb-3">
              {/* Day Badge */}
              <motion.div
                variants={itemVariants}
                className="px-3 py-1.5 bg-gradient-to-r from-black/80 to-black/60 backdrop-blur-sm rounded-full border border-white/20 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3 text-amber-300" />
                  <span className="text-white text-xs font-bold">DAY {event.day}</span>
                </div>
              </motion.div>

              {/* Right Side - Featured & Mode */}
              <div className="flex items-center gap-1.5">
                {/* Featured Badge */}
                {isFeatured && (
                  <motion.div
                    variants={itemVariants}
                    className="px-2 py-1 bg-gradient-to-r from-amber-600/90 to-red-600/90 backdrop-blur-sm rounded-full border border-amber-500/40 shadow-lg"
                  >
                    <div className="flex items-center gap-1">
                      <Crown className="w-3 h-3 text-white" />
                      <span className="text-white text-xs font-bold">FEATURED</span>
                    </div>
                  </motion.div>
                )}

                {/* Mode Badge */}
                <motion.div
                  variants={itemVariants}
                  className={`px-2 py-1 ${
                    event.eventMode === 'Online' 
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600' 
                      : 'bg-gradient-to-r from-blue-600 to-cyan-600'
                  } backdrop-blur-sm rounded-full border border-white/20 shadow-lg`}
                >
                  <div className="flex items-center gap-1">
                    <Globe className="w-3 h-3 text-white" />
                    <span className="text-white text-xs font-bold">{event.eventMode}</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Middle Section */}
            <div className="flex-1 flex flex-col justify-center mb-4">
              {/* Category */}
              <motion.div
                variants={itemVariants}
                className="mb-3"
              >
                <div className="flex items-center gap-2 px-3 py-2 bg-black/50 backdrop-blur-sm rounded-lg border border-white/20 w-fit">
                  <div className={`p-1.5 rounded-md ${colors.bg}`}>
                    <CategoryIcon className={`w-4 h-4 ${colors.text}`} />
                  </div>
                  <span className={`text-sm font-bold ${colors.text} uppercase tracking-wide`}>
                    {event.category}
                  </span>
                </div>
              </motion.div>

              {/* Title */}
              <motion.h3
                variants={itemVariants}
                className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight line-clamp-2"
              >
                {event.title}
              </motion.h3>

              {/* Tagline */}
              <motion.p
                variants={itemVariants}
                className="text-amber-100/80 text-sm mb-3 font-medium line-clamp-2"
              >
                {event.tagline}
              </motion.p>

              {/* Divider */}
              <motion.div
                variants={itemVariants}
                className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-red-500 mb-3 shadow-lg"
              />

              {/* Quick Info Grid */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 gap-2 mb-3"
              >
                {/* Date */}
                <div className="flex items-center gap-2 p-2 bg-black/40 backdrop-blur-sm rounded-lg border border-white/10">
                  <Calendar className="w-4 h-4 text-amber-300" />
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-xs font-medium">DATE</div>
                    <div className="text-white text-sm font-bold truncate">{event.date}</div>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-center gap-2 p-2 bg-black/40 backdrop-blur-sm rounded-lg border border-white/10">
                  <Clock className="w-4 h-4 text-amber-300" />
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-xs font-medium">TIME</div>
                    <div className="text-white text-sm font-bold truncate">{event.time}</div>
                  </div>
                </div>

                {/* Venue */}
                <div className="flex items-center gap-2 p-2 bg-black/40 backdrop-blur-sm rounded-lg border border-white/10">
                  <MapPin className="w-4 h-4 text-amber-300" />
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-xs font-medium">VENUE</div>
                    <div className="text-white text-sm font-bold truncate">{event.venue}</div>
                  </div>
                </div>

                {/* Club */}
                <div className="flex items-center gap-2 p-2 bg-black/40 backdrop-blur-sm rounded-lg border border-white/10">
                  <Award className="w-4 h-4 text-amber-300" />
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-xs font-medium">CLUB</div>
                    <div className="text-white text-sm font-bold truncate">{event.club}</div>
                  </div>
                </div>

                {/* Seats */}
                <div className="flex items-center gap-2 p-2 bg-black/40 backdrop-blur-sm rounded-lg border border-white/10">
                  <Users className="w-4 h-4 text-amber-300" />
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-xs font-medium">SEATS</div>
                    <div className="text-white text-sm font-bold truncate">{event.seats}</div>
                  </div>
                </div>

                {/* Participants */}
                <div className="flex items-center gap-2 p-2 bg-black/40 backdrop-blur-sm rounded-lg border border-white/10">
                  <UserCheck className="w-4 h-4 text-amber-300" />
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-xs font-medium">PARTICIPANTS</div>
                    <div className="text-white text-sm font-bold truncate">{event.participants}</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* Left - Price */}
              <motion.div
                variants={itemVariants}
                className="flex items-center"
              >
                {/* Price - Show only if exists */}
                {event.price && (
                  <div className="px-3 py-1.5 bg-gradient-to-r from-amber-600 to-red-600 rounded-lg shadow-lg">
                    <div className="flex items-center gap-1.5">
                      <Ticket className="w-4 h-4 text-white" />
                      <span className="text-white text-sm font-bold">{event.price}</span>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Right - Action Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-2"
              >
                {/* Book Now Button */}
                <button 
                  onClick={(e) => handleButtonClick(e, 'register')}
                  className="px-4 py-2 bg-gradient-to-r from-amber-600 to-red-600 text-white font-bold rounded-lg shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
                >
                  <Ticket className="w-4 h-4" />
                  <span className="text-sm">Book Now</span>
                </button>

                {/* Desktop Only Actions */}
                {!isMobile && (
                  <>
                    {/* Like Button */}
                    <button 
                      onClick={(e) => handleButtonClick(e, 'like')}
                      className={`p-2 rounded-lg border transition-all ${
                        isLiked 
                          ? 'bg-red-500/20 border-red-500/40 text-red-400' 
                          : 'bg-black/40 border-white/20 text-gray-400 hover:text-red-400'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    </button>

                    {/* Bookmark Button */}
                    <button 
                      onClick={(e) => handleButtonClick(e, 'bookmark')}
                      className={`p-2 rounded-lg border transition-all ${
                        isBookmarked 
                          ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' 
                          : 'bg-black/40 border-white/20 text-gray-400 hover:text-amber-400'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Hover Effects */}
          {!isMobile && (
            <>
              {/* Hover Glow */}
              <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-red-500/5" />
              </div>

              {/* Click Indicator */}
              <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/80 backdrop-blur-sm rounded-full border border-white/20">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-xs font-medium">Click for Details</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Mobile Quick Actions */}
        {isMobile && (
          <div className="mt-2 flex items-center justify-between gap-2">
            <button 
              onClick={(e) => handleButtonClick(e, 'like')}
              className={`flex-1 py-2 rounded-lg border flex items-center justify-center gap-1.5 ${
                isLiked 
                  ? 'bg-red-500/20 border-red-500/40 text-red-400' 
                  : 'bg-black/40 border-white/20 text-gray-400'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-xs">Like</span>
            </button>
            
            <button 
              onClick={(e) => handleButtonClick(e, 'bookmark')}
              className={`flex-1 py-2 rounded-lg border flex items-center justify-center gap-1.5 ${
                isBookmarked 
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' 
                  : 'bg-black/40 border-white/20 text-gray-400'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              <span className="text-xs">Save</span>
            </button>
            
            <button 
              onClick={handleShare}
              className="flex-1 py-2 rounded-lg border border-white/20 bg-black/40 flex items-center justify-center gap-1.5 text-gray-400"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-xs">Share</span>
            </button>
          </div>
        )}
      </motion.div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Performance optimizations */
        .will-change-transform {
          will-change: transform;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .event-card {
            min-height: auto;
          }
          
          button {
            min-height: 44px;
            min-width: 44px;
          }
        }
      `}</style>
    </>
  );
};

export default EventCard;