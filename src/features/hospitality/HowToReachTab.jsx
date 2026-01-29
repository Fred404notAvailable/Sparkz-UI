import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Train, Bus, Clock } from 'lucide-react';

const travelOptions = [
    { type: 'By Air', icon: Plane, details: 'Madurai Airport (IXM) is 80km away. Shuttle service is available.', time: '2-3 hours', cost: '₹500-1500', color: 'from-blue-500/20' },
    { type: 'By Train', icon: Train, details: 'Madurai Junction (MDU) is 75km away. Regular buses are available.', time: '3-4 hours', cost: '₹200-500', color: 'from-green-500/20' },
    { type: 'By Bus', icon: Bus, details: 'Direct buses to Srivilliputhur. Pickup available from the bus stand.', time: '1-2 hours', cost: '₹100-300', color: 'from-amber-500/20' },
];

const HowToReachTab = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-['Cinzel'] text-white">How to Reach Us</h2>
        <p className="text-white/70 max-w-2xl mx-auto mt-4">Travel options to ensure you arrive comfortably at SPARKZ 2026.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          {travelOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <div key={index} className={`bg-gradient-to-br ${option.color} to-transparent border border-white/10 rounded-xl p-6`}>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-lg"><Icon className="text-white" size={24} /></div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{option.type}</h4>
                    <p className="text-white/70 mb-4">{option.details}</p>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2"><Clock size={16} className="text-white/60" /><span>{option.time}</span></div>
                      <div className="flex items-center gap-2"><span className="text-white/60">Cost:</span><span className="text-amber-400 font-semibold">{option.cost}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden h-96">
            <iframe title="SPARKZ Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.507574416501!2d77.54784917504503!3d9.90398559016478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b070adc3b00c255%3A0xdff915a7154d5f1!2sKalasalingam%20Academy%20of%20Research%20and%20Education!5e0!3m2!1sen!2sin!4v1705921234567!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HowToReachTab;