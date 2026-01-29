import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// Import the new modular components
import Hero from '../features/hospitality/Hero';
import Tabs from '../features/hospitality/Tabs';
import InstructionsTab from '../features/hospitality/InstructionsTab';
import HowToReachTab from '../features/hospitality/HowToReachTab';
import AccommodationTab from '../features/hospitality/AccommodationTab';
import ContactsTab from '../features/hospitality/ContactsTab';
import FaqsTab from '../features/hospitality/FaqsTab';
import ActionButtons from '../features/hospitality/ActionButtons';

const HospitalityPage = () => {
  const [activeTab, setActiveTab] = useState('instructions');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'instructions':
        return <InstructionsTab />;
      case 'how-to-reach':
        return <HowToReachTab />;
      case 'accommodation':
        return <AccommodationTab />;
      case 'contacts':
        return <ContactsTab />;
      case 'faqs':
        return <FaqsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-24 overflow-hidden">
      <Hero />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} isMobile={isMobile} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {renderTabContent()}
        </AnimatePresence>
      </main>

      <ActionButtons />
    </div>
  );
};

export default HospitalityPage;