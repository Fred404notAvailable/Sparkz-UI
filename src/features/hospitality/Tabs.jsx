import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bed, Shield, MapPin, Phone, ChevronDown, Film, Camera } from 'lucide-react';
import gsap from 'gsap';

const Tabs = ({ activeTab, setActiveTab, isMobile }) => {
  const tabBarRef = useRef(null);

  const tabsConfig = [
    { id: 'instructions', label: 'Instructions', icon: Shield, color: 'text-blue-400' },
    { id: 'how-to-reach', label: 'How to Reach', icon: MapPin, color: 'text-green-400' },
    { id: 'accommodation', label: 'Accommodation', icon: Bed, color: 'text-amber-400' },
    { id: 'contacts', label: 'Contacts', icon: Phone, color: 'text-purple-400' },
    { id: 'faqs', label: 'FAQ\'s', icon: ChevronDown, color: 'text-red-400' },
  ];

  useEffect(() => {
    if (tabBarRef.current) {
      const activeTabElement = tabBarRef.current.querySelector('.tab-active');
      if (activeTabElement) {
        gsap.to('.tab-indicator', {
          x: activeTabElement.offsetLeft,
          width: activeTabElement.offsetWidth,
          duration: 0.5,
          ease: 'power2.out',
        });
      }
    }
  }, [activeTab]);

  return (
    <div className="sticky top-[72px] md:top-20 z-40 bg-black/80 backdrop-blur-lg border-y border-white/10">
      <div ref={tabBarRef} className="relative max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="tab-indicator absolute top-0 h-full bg-gradient-to-r from-amber-500/10 to-red-500/10 border-x border-amber-500/30 rounded-lg"></div>
        <div className="relative flex items-center justify-between gap-1 sm:gap-2 py-3 overflow-x-auto no-scrollbar">
          {tabsConfig.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`tab-item relative flex-1 min-w-[110px] p-3 rounded-lg z-10 ${isActive ? 'tab-active' : ''}`}
              >
                <div className={`flex flex-col items-center gap-2 transition-colors ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}`}>
                  <Icon size={isMobile ? 20 : 22} className={isActive ? tab.color : ''} />
                  <span className={`font-medium text-xs sm:text-sm ${isActive ? 'font-semibold' : ''}`}>{tab.label}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tabs;