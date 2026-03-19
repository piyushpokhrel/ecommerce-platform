import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const FloatingNavbar = () => {
  const location = useLocation();
  const [hoveredPath, setHoveredPath] = useState(location.pathname);

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="relative bg-white/10 backdrop-blur-lg border border-white/10 rounded-full px-6 py-3 flex items-center space-x-6">
        {navItems.map((item) => (
          <a
            key={item.path}
            href={item.path}
            onMouseEnter={() => setHoveredPath(item.path)}
            className={`relative text-white/80 hover:text-white transition-colors duration-300 z-10`}
          >
            {item.name}
            <AnimatePresence>
              {hoveredPath === item.path && (
                <motion.div
                  className="absolute bottom-0 left-0 h-full bg-white/10 rounded-full -z-10"
                  layoutId="navbar"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.3 } }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                />
              )}
            </AnimatePresence>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default FloatingNavbar;
