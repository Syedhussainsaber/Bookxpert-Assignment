import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export const Layout: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black z-40 md:hidden"
                        />
                        <motion.aside
                            initial={{ x: -280 }}
                            animate={{ x: 0 }}
                            exit={{ x: -280 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-50 md:hidden border-r border-gray-200"
                        >
                            <div className="p-4 flex justify-end">
                                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                                    <X size={24} className="text-gray-500" />
                                </button>
                            </div>
                            <div className="h-full mt-[-60px]">
                                <Sidebar />
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            <div className="md:pl-64 flex flex-col min-h-screen transition-all duration-300">
                <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
