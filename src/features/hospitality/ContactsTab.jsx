import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Clock } from 'lucide-react';

const contacts = [
    { name: 'Hospitality Head', role: 'Accommodation', phone: '+91 98765 43210', email: 'hospitality@sparkz26.com' },
    { name: 'Travel Coordinator', role: 'Transport', phone: '+91 98765 43211', email: 'travel@sparkz26.com' },
    { name: 'Support Desk', role: 'General Queries', phone: '+91 98765 43212', email: 'support@sparkz26.com' },
];

const ContactsTab = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-['Cinzel'] text-white">Contact Our Team</h2>
            <p className="text-white/70 max-w-2xl mx-auto mt-4">Reach out to our dedicated team for any assistance.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contacts.map((contact, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-8">
                    <h3 className="text-xl font-bold text-white mb-1">{contact.name}</h3>
                    <p className="text-amber-400 mb-6">{contact.role}</p>
                    <div className="space-y-4">
                        <a href={`tel:${contact.phone}`} className="flex items-center gap-3 text-white hover:text-amber-400"><Phone size={16} /><span>{contact.phone}</span></a>
                        <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-white hover:text-amber-400 break-all"><Mail size={16} /><span>{contact.email}</span></a>
                    </div>
                </div>
            ))}
        </div>
    </motion.div>
  );
};

export default ContactsTab;