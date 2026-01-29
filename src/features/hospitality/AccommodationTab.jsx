import React from 'react';
import { motion } from 'framer-motion';
import { Bed, Shield, Wifi, Utensils, Users, Star, ArrowRight } from 'lucide-react';

const amenities = [
    { icon: Bed, label: 'Furnished Rooms' }, { icon: Shield, label: '24/7 Security' },
    { icon: Wifi, label: 'High-speed Wi-Fi' }, { icon: Utensils, label: 'Food Facilities' },
    { icon: Users, label: 'Common Rooms' }, { icon: Star, label: 'Housekeeping' },
];

const AccommodationTab = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-['Cinzel'] text-white">Premium Accommodation</h2>
            <p className="text-white/70 max-w-2xl mx-auto mt-4">Comfortable stays with all amenities for a perfect experience.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Package Details</h3>
                <p className="text-white/70 mb-6">Comfortable accommodation in campus hostels with all necessary amenities.</p>
                <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="text-center p-4 bg-white/5 rounded-xl"><div className="text-3xl font-bold text-amber-400">₹500</div><div className="text-white/60 text-sm">Per Night</div></div>
                    <div className="text-center p-4 bg-white/5 rounded-xl"><div className="text-3xl font-bold text-amber-400">3</div><div className="text-white/60 text-sm">Days Package</div></div>
                </div>
                <button className="w-full py-4 bg-gradient-to-r from-amber-600 to-red-600 text-white font-bold rounded-xl group flex items-center justify-center gap-3">
                    <span>Book Now</span><ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
            <div>
                <h3 className="text-2xl font-bold text-white mb-6">Amenities Included</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {amenities.map((amenity, index) => {
                        const Icon = amenity.icon;
                        return (
                            <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                                <Icon className="text-amber-400 mx-auto mb-3" size={28} />
                                <h4 className="text-white font-semibold text-sm">{amenity.label}</h4>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    </motion.div>
  );
};

export default AccommodationTab;