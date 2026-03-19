import React from 'react';
import { motion } from 'framer-motion';

const BentoCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: '0px 0px 30px rgba(120, 81, 255, 0.3)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};

const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <header className="text-center mb-16">
        <h1 className="text-6xl font-bold tracking-tight">Digital Craftsman</h1>
        <p className="text-xl text-white/70 mt-4">Building next-gen experiences, one pixel at a time.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <BentoCard className="md:col-span-2">
          <h2 className="text-2xl font-bold">Project 1</h2>
          <p>A short description of the project.</p>
        </BentoCard>
        <BentoCard>
          <h2 className="text-2xl font-bold">Project 2</h2>
          <p>A short description of the project.</p>
        </BentoCard>
        <BentoCard>
          <h2 className="text-2xl font-bold">Project 3</h2>
          <p>A short description of the project.</p>
        </BentoCard>
        <BentoCard className="md:col-span-2">
          <h2 className="text-2xl font-bold">Project 4</h2>
          <p>A short description of the project.</p>
        </BentoCard>
      </div>
    </div>
  );
};

export default PortfolioPage;

