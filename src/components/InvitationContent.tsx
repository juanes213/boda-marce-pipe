import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Envelope } from './Envelope';
import { BackgroundGradient } from './BackgroundGradient';

interface InvitationContentProps {
  guestId?: string;
}

// Decorative corner ornament component
const CornerOrnament = ({ position = 'top-left' }: { position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) => {
  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4 rotate-90';
      case 'bottom-left':
        return 'bottom-4 left-4 -rotate-90';
      case 'bottom-right':
        return 'bottom-4 right-4 rotate-180';
      default:
        return 'top-4 left-4';
    }
  };

  return (
    <motion.div
      className={`absolute ${getPositionClasses()} w-16 h-16 md:w-20 md:h-20 opacity-30`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 0.3, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Ornate corner design */}
        <path
          d="M0 0 Q20 0 30 10 T40 30 Q40 20 50 20 T60 30 Q60 40 70 50 T90 60 Q100 60 100 70 T90 80 Q80 80 70 90 T50 100"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="15" cy="15" r="2" fill="url(#goldGradient)" />
        <circle cx="30" cy="30" r="1.5" fill="url(#goldGradient)" opacity="0.7" />
        <circle cx="45" cy="45" r="1" fill="url(#goldGradient)" opacity="0.5" />
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4a574" />
            <stop offset="50%" stopColor="#b8894e" />
            <stop offset="100%" stopColor="#8b6914" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

// Floating floral element
const FloralElement = ({ delay = 0, side = 'left' }: { delay?: number; side?: 'left' | 'right' }) => {
  return (
    <motion.div
      className={`absolute ${side === 'left' ? 'left-0' : 'right-0'} w-24 md:w-32 opacity-20`}
      style={{ top: '30%' }}
      initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
      animate={{ opacity: 0.2, x: 0 }}
      transition={{ duration: 1.5, delay }}
    >
      <svg viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Floral branch design */}
        <path
          d="M50 0 Q45 30 50 50 Q55 70 50 90 Q48 110 50 130 Q52 145 50 150"
          stroke="url(#floralGradient)"
          strokeWidth="1"
          fill="none"
        />
        {/* Leaves */}
        <ellipse cx="35" cy="30" rx="8" ry="15" fill="url(#floralGradient)" opacity="0.6" transform="rotate(-45 35 30)" />
        <ellipse cx="65" cy="50" rx="8" ry="15" fill="url(#floralGradient)" opacity="0.6" transform="rotate(45 65 50)" />
        <ellipse cx="30" cy="70" rx="8" ry="15" fill="url(#floralGradient)" opacity="0.6" transform="rotate(-30 30 70)" />
        <ellipse cx="70" cy="90" rx="8" ry="15" fill="url(#floralGradient)" opacity="0.6" transform="rotate(30 70 90)" />
        {/* Small flowers */}
        <circle cx="35" cy="30" r="3" fill="url(#goldAccent)" />
        <circle cx="65" cy="50" r="3" fill="url(#goldAccent)" />
        <circle cx="30" cy="70" r="3" fill="url(#goldAccent)" />
        <defs>
          <linearGradient id="floralGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c4b5a0" />
            <stop offset="100%" stopColor="#8b7d6b" />
          </linearGradient>
          <radialGradient id="goldAccent">
            <stop offset="0%" stopColor="#e8c896" />
            <stop offset="100%" stopColor="#b8894e" />
          </radialGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

export const InvitationContent = ({ guestId }: InvitationContentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const guestName = guestId ? guestId.replace(/-/g, ' ') : 'Invitado';

  useEffect(() => {
    // Auto-open envelope after 1.5 seconds
    const openTimer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);

    return () => clearTimeout(openTimer);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#f4f3ef] overflow-hidden">
      {/* Background */}
      <BackgroundGradient />

      {/* Decorative corner ornaments */}
      <CornerOrnament position="top-left" />
      <CornerOrnament position="top-right" />
      <CornerOrnament position="bottom-left" />
      <CornerOrnament position="bottom-right" />

      {/* Floating floral elements */}
      <FloralElement delay={0.8} side="left" />
      <FloralElement delay={1} side="right" />

      {/* Decorative golden line at top */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px"
        style={{
          background: 'linear-gradient(to right, transparent, #d4a574 20%, #b8894e 50%, #d4a574 80%, transparent)'
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Decorative golden line at bottom */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px"
        style={{
          background: 'linear-gradient(to right, transparent, #d4a574 20%, #b8894e 50%, #d4a574 80%, transparent)'
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-8 md:py-12">
        {/* Header text with decorative elements */}
        <motion.div
          className="text-center mb-10 md:mb-12 relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Small decorative dots above */}
          <motion.div
            className="flex justify-center gap-2 mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="w-1 h-1 rounded-full bg-[#d4a574]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#b8894e]" />
            <span className="w-1 h-1 rounded-full bg-[#d4a574]" />
          </motion.div>

          <motion.p
            className="text-[#1d1d1d]/60 text-sm md:text-base tracking-widest mb-4 italic"
            style={{ fontFamily: "'Reina Neue Display', serif" }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            El día más importante de nuestras vidas ha llegado
          </motion.p>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#1d1d1d] tracking-wide relative"
            style={{ fontFamily: "'Reina Neue Display', serif" }}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            ¡NOS CASAMOS!
            {/* Decorative underline */}
            <motion.div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-px"
              style={{
                background: 'linear-gradient(to right, transparent, #d4a574, #b8894e, #d4a574, transparent)'
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
          </motion.h1>

          {/* Small decorative dots below */}
          <motion.div
            className="flex justify-center gap-2 mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <span className="w-1 h-1 rounded-full bg-[#d4a574]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#b8894e]" />
            <span className="w-1 h-1 rounded-full bg-[#d4a574]" />
          </motion.div>
        </motion.div>

        {/* Envelope Container with decorative frame */}
        <div className="relative w-full max-w-md mx-auto flex-1 flex items-center justify-center mt-8 md:mt-12">
          {/* Subtle decorative frame around envelope */}
          <motion.div
            className="absolute inset-0 -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 0 : 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="absolute inset-0 rounded-lg"
              style={{
                background: 'radial-gradient(circle at center, transparent 60%, rgba(212, 165, 116, 0.1) 100%)'
              }}
            />
          </motion.div>

          <Envelope isOpen={isOpen} />
        </div>

        {/* Logo at bottom with decorative elements */}
        <motion.div
          className="mt-8 md:mt-12 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Decorative line above logo */}
          <motion.div
            className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-px"
            style={{
              background: 'linear-gradient(to right, transparent, #d4a574, #b8894e, #d4a574, transparent)'
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />

          <img
            src="/Recurso 1@1000x.png"
            alt="Marce & Pipe"
            className="h-12 md:h-16 lg:h-20 w-auto"
          />

          {/* Decorative line below logo */}
          <motion.div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-px"
            style={{
              background: 'linear-gradient(to right, transparent, #d4a574, #b8894e, #d4a574, transparent)'
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />
        </motion.div>

        {/* Guest name greeting with decorative background */}
        <motion.div
          className="mt-8 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="absolute inset-0 -z-10 rounded-full blur-xl"
            style={{
              background: 'radial-gradient(circle, rgba(212, 165, 116, 0.15), transparent)'
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <p className="text-[#1d1d1d]/50 text-sm tracking-wide px-6 py-2">
            Invitación para: <span className="font-medium capitalize text-[#1d1d1d]/70">{guestName}</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
