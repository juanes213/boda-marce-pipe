import { motion } from 'framer-motion';

interface EnvelopeProps {
  isOpen: boolean;
  guestName?: string;
  guestCount?: number;
}

// Curva de easing suave y natural (similar a ease-out-expo)
const smoothEase = [0.16, 1, 0.3, 1];
// Curva para movimientos que necesitan "peso" (como las fotos emergiendo)
const heavyEase = [0.34, 1.56, 0.64, 1]; // Con ligero rebote
// Curva para el flap del sobre (más dramático)
const flapEase = [0.65, 0, 0.35, 1];

export const Envelope = ({ isOpen, guestName = 'Familia Invitada', guestCount = 3 }: EnvelopeProps) => {
  return (
    <div className="relative w-full max-w-[360px] md:max-w-[420px] mx-auto">
      {/* Envelope wrapper with fixed aspect ratio */}
      <div className="relative w-full" style={{ paddingBottom: '75%' }}>

        {/* === LAYER 1: ENVELOPE BACK (black base) === */}
        <div className="absolute inset-0 rounded-sm overflow-hidden drop-shadow-2xl z-0">
          <div className="absolute inset-0 bg-[#1d1d1d]" />
          {/* Lining (cream interior) - only visible when open */}
          <motion.div
            className="absolute inset-x-2 top-2 bottom-[35%] bg-[#f4f3ef] rounded-t-sm"
            initial={{ opacity: 0, scaleY: 0.8 }}
            animate={{
              opacity: isOpen ? 1 : 0,
              scaleY: isOpen ? 1 : 0.8
            }}
            style={{ originY: 0 }}
            transition={{
              duration: 0.4,
              delay: isOpen ? 0.1 : 0,
              ease: smoothEase
            }}
          />
        </div>

        {/* === LAYER 2: PHOTOS (emerge from inside) === */}
        <motion.div
          className="absolute inset-0 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3, delay: isOpen ? 0.2 : 0, ease: smoothEase }}
        >
          <motion.div
            className="absolute inset-0 flex justify-center items-end"
            initial={{ y: '80%' }}
            animate={{ y: isOpen ? '-18%' : '80%' }}
            transition={{
              duration: 0.9,
              delay: isOpen ? 0.25 : 0,
              ease: heavyEase
            }}
          >
            <div className="relative w-full h-full max-w-[90%] mx-auto">

              {/* Card 1 - Left (Invitados) */}
              <motion.div
                className="absolute left-[0%] bottom-[8%] w-[38%] bg-white shadow-xl p-2 md:p-3 origin-bottom-left"
                style={{ zIndex: 10 }}
                initial={{ rotate: -8, scale: 0.95 }}
                animate={{
                  rotate: isOpen ? -15 : -8,
                  x: isOpen ? -8 : 0,
                  scale: isOpen ? 1 : 0.95
                }}
                transition={{
                  duration: 0.8,
                  delay: isOpen ? 0.35 : 0,
                  ease: smoothEase
                }}
              >
                <div className="aspect-[4/5] flex flex-col items-center justify-center text-center px-1 md:px-2">
                  <div className="mb-1 md:mb-2">
                    <svg className="w-5 h-5 md:w-7 md:h-7 mx-auto text-[#b8894e]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <p className="text-[#1d1d1d]/50 text-[7px] md:text-[10px] tracking-wider uppercase mb-1">Invitados</p>
                  <h3 className="text-[#1d1d1d] font-medium text-[10px] md:text-xs mb-1 md:mb-2 leading-tight px-1" style={{ fontFamily: "'Reina Neue Display', serif" }}>
                    {guestName}
                  </h3>
                  <div className="w-6 md:w-8 h-px bg-[#b8894e]/30 mb-1 md:mb-2" />
                  <p className="text-[#1d1d1d]/70 text-[9px] md:text-[11px] leading-tight">
                    {guestCount}<br/>{guestCount === 1 ? 'persona' : 'personas'}
                  </p>
                </div>
                <div className="h-2 md:h-3" />
              </motion.div>

              {/* Card 2 - Center (Photo) */}
              <motion.div
                className="absolute left-[28%] bottom-[5%] w-[44%] bg-white shadow-2xl p-2 origin-bottom-center"
                style={{ zIndex: 30 }}
                initial={{ rotate: 0, scale: 0.95 }}
                animate={{
                  rotate: isOpen ? 2 : 0,
                  y: isOpen ? -15 : 0,
                  scale: isOpen ? 1 : 0.95
                }}
                transition={{
                  duration: 0.8,
                  delay: isOpen ? 0.3 : 0,
                  ease: smoothEase
                }}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img src="/DSC09127.jpg" alt="Marce & Pipe" className="w-full h-full object-cover" />
                </div>
                <div className="h-4" />
              </motion.div>

              {/* Card 3 - Right (Dress Code) */}
              <motion.div
                className="absolute right-[0%] bottom-[8%] w-[38%] bg-white shadow-xl p-2 md:p-3 origin-bottom-right"
                style={{ zIndex: 20 }}
                initial={{ rotate: 8, scale: 0.95 }}
                animate={{
                  rotate: isOpen ? 14 : 8,
                  x: isOpen ? 8 : 0,
                  scale: isOpen ? 1 : 0.95
                }}
                transition={{
                  duration: 0.8,
                  delay: isOpen ? 0.4 : 0,
                  ease: smoothEase
                }}
              >
                <div className="aspect-[4/5] flex flex-col items-center justify-center text-center px-1 md:px-2">
                  <div className="mb-1 md:mb-2">
                    <svg className="w-5 h-5 md:w-7 md:h-7 mx-auto text-[#b8894e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                    </svg>
                  </div>
                  <p className="text-[#1d1d1d]/50 text-[7px] md:text-[10px] tracking-wider uppercase mb-1">Código de</p>
                  <h3 className="text-[#1d1d1d] font-medium text-[10px] md:text-xs mb-1 md:mb-2 leading-tight" style={{ fontFamily: "'Reina Neue Display', serif" }}>
                    Vestimenta
                  </h3>
                  <div className="w-6 md:w-8 h-px bg-[#b8894e]/30 mb-1 md:mb-2" />
                  <p className="text-[#1d1d1d]/70 text-[9px] md:text-[11px] font-medium leading-tight">
                    Formal<br/>Elegante
                  </p>
                </div>
                <div className="h-2 md:h-3" />
              </motion.div>

            </div>
          </motion.div>
        </motion.div>

        {/* === LAYER 3: FRONT FLAP (Bottom V) - Always on top of photos === */}
        <div className="absolute inset-0 z-20 pointer-events-none rounded-sm overflow-hidden">
          <div
            className="absolute inset-x-0 bottom-0 h-[50%]"
            style={{
              background: 'linear-gradient(to bottom, #252525, #1d1d1d)',
              clipPath: 'polygon(0 0, 50% 50%, 100% 0, 100% 100%, 0 100%)',
            }}
          />
        </div>

        {/* === LAYER 4: TOP FLAP (Triangle that opens) === */}
        <motion.div
          className="absolute inset-0 z-30 pointer-events-none"
          style={{ perspective: '1500px' }}
          initial={{ opacity: 1 }}
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.2, delay: isOpen ? 0.4 : 0 }}
        >
          <motion.div
            className="absolute inset-x-0 top-0 h-[52%] origin-top"
            style={{ transformStyle: 'preserve-3d' }}
            initial={{ rotateX: 0 }}
            animate={{ rotateX: isOpen ? -180 : 0 }}
            transition={{
              duration: 0.7,
              ease: flapEase
            }}
          >
            {/* Front face of flap */}
            <div
              className="absolute inset-0 rounded-t-sm"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 58%)',
                backfaceVisibility: 'hidden',
                background: 'linear-gradient(to bottom, #2a2a2a, #1d1d1d)'
              }}
            />
            {/* Back face of flap */}
            <div
              className="absolute inset-0 rounded-t-sm"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 58%)',
                backfaceVisibility: 'hidden',
                transform: 'rotateX(180deg)',
                background: '#1a1a1a'
              }}
            />
          </motion.div>
        </motion.div>

        {/* === LAYER 5: SOLID COVER (hides photos completely when closed) === */}
        <motion.div
          className="absolute inset-0 z-[25] pointer-events-none rounded-sm overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.3, delay: isOpen ? 0.25 : 0, ease: smoothEase }}
        >
          {/* This covers the area where photos might peek through */}
          <div
            className="absolute inset-x-0 top-0 bg-[#1d1d1d]"
            style={{ height: '60%' }}
          />
        </motion.div>

        {/* === LAYER 6: WAX SEAL === */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          style={{ top: '24%' }}
          initial={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
          animate={{
            y: isOpen ? -60 : 0,
            opacity: isOpen ? 0 : 1,
            scale: isOpen ? 0.6 : 1,
            rotate: isOpen ? -10 : 0
          }}
          transition={{
            duration: 0.5,
            ease: smoothEase,
            opacity: { duration: 0.25, delay: isOpen ? 0.15 : 0 }
          }}
        >
          <div className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-full shadow-lg"
              style={{
                background: 'radial-gradient(circle at 35% 35%, #e8c896, #d4a574 30%, #b8894e 60%, #8b6914)'
              }}
            />
            <div className="absolute inset-1 rounded-full border border-[#8b6914]/30" />
            <span className="relative font-serif font-bold text-[#5a4a2a] text-base md:text-lg">MP</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
