import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';

const ActionButtons = () => {
    return (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-14 h-14 bg-gradient-to-br from-amber-600 to-red-600 text-white rounded-full shadow-2xl flex items-center justify-center">
                <Phone size={24} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-14 h-14 bg-gradient-to-br from-amber-600 to-red-600 text-white rounded-full shadow-2xl flex items-center justify-center">
                <Mail size={24} />
            </motion.button>
        </div>
    );
};

export default ActionButtons;