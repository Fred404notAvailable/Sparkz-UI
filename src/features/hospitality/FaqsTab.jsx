import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
    { q: 'What is included in the accommodation package?', a: 'The package includes lodging, meals, 24/7 security, Wi-Fi, and basic amenities.' },
    { q: 'How do I book accommodation?', a: 'You can book accommodation through our main registration portal online.' },
    { q: 'What are the check-in/check-out timings?', a: 'Check-in is at 2 PM on day one, and check-out is by 11 AM on the final day.' },
    { q: 'Is transportation provided from stations/airport?', a: 'Yes, we provide shuttle services. Please inform us of your arrival details in advance.' },
];

const FaqsTab = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-['Cinzel'] text-white">Frequently Asked Questions</h2>
        <p className="text-white/70 mt-4">Quick answers to common questions about hospitality.</p>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full px-6 py-4 flex items-center justify-between text-left">
              <span className="text-lg font-semibold text-white">{faq.q}</span>
              <ChevronDown className={`text-amber-400 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {openFaq === index && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                  <p className="text-white/70 px-6 pb-4">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default FaqsTab;