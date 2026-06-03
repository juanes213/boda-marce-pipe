import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

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
  const compactGuestName = guestName.length > 34 ? `${guestName.slice(0, 31).trim()}...` : guestName;
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isDressCodeOpen, setIsDressCodeOpen] = useState(false);
  const [menCarouselIndex, setMenCarouselIndex] = useState(0);
  const [womenCarouselIndex, setWomenCarouselIndex] = useState(0);
  const [menAvoidCarouselIndex, setMenAvoidCarouselIndex] = useState(0);
  const [womenAvoidCarouselIndex, setWomenAvoidCarouselIndex] = useState(0);
  const videoDialogRef = useRef<HTMLVideoElement>(null);

  const reservedGreenColors = ['#213500', '#293e06', '#32470c', '#3b5110', '#214300', '#1f4903'];
  const menImages = ['/referencias-h/Esto si Hombre .PNG'];
  const womenImages = [
    '/referencias/1.PNG',
    '/referencias/2.PNG',
    '/referencias/3.PNG',
    '/referencias/4.PNG',
    '/referencias/5 .PNG',
    '/referencias/6.PNG',
    '/referencias/7.PNG',
    '/referencias/8.PNG',
    '/referencias/9.PNG',
    '/referencias/10.PNG',
    '/referencias/11.PNG',
    '/referencias/12 .PNG',
  ];
  const menAvoidImages = [
    '/no-referencias-h/Esto no H 1 .PNG',
    '/no-referencias-h/Esto no H 2 .PNG',
    '/no-referencias-h/Esto no H 3.PNG',
  ];
  const womenAvoidImages = [
    '/no-referencias-m/Esto no 1.PNG',
    '/no-referencias-m/Esto no 2.PNG',
    '/no-referencias-m/Esto no 3.PNG',
    '/no-referencias-m/Esto no 4.PNG',
    '/no-referencias-m/Esto no 5 .PNG',
    '/no-referencias-m/Esto no 6 .PNG',
    '/no-referencias-m/Esto no 7 .PNG',
  ];

  useEffect(() => {
    if (!isDressCodeOpen) return;

    const timer = setInterval(() => {
      setMenCarouselIndex((prev) => (prev === menImages.length - 1 ? 0 : prev + 1));
      setWomenCarouselIndex((prev) => (prev === womenImages.length - 1 ? 0 : prev + 1));
      setMenAvoidCarouselIndex((prev) => (prev === menAvoidImages.length - 1 ? 0 : prev + 1));
      setWomenAvoidCarouselIndex((prev) => (prev === womenAvoidImages.length - 1 ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(timer);
  }, [isDressCodeOpen, menImages.length, womenImages.length, menAvoidImages.length, womenAvoidImages.length]);

  useEffect(() => {
    if (!isOpen) {
      setIsVideoOpen(false);
      setIsDressCodeOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const video = videoDialogRef.current;
    if (!video) return;

    if (!isVideoOpen) {
      video.pause();
      return;
    }

    video.muted = false;
    video.volume = 1;
    video.currentTime = 0;
    void video.play().catch(() => {
      // Some mobile browsers require a second tap on the native control to start audio.
    });
  }, [isVideoOpen]);

  return (
    <div className="relative w-full max-w-[420px] sm:max-w-[500px] md:max-w-[560px] mx-auto">
      {/* Envelope wrapper with fixed aspect ratio */}
      <div className="relative w-full" style={{ paddingBottom: '56%' }}>

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
                className="absolute left-[-2%] bottom-[8%] w-[40%] bg-white shadow-xl p-2 md:p-3 origin-bottom-left"
                style={{ zIndex: 10 }}
                initial={{ rotate: -8, scale: 0.95 }}
                animate={{
                  rotate: isOpen ? -15 : -8,
                  x: isOpen ? -8 : 0,
                  y: isOpen ? -14 : 0,
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
                  <p className="text-[#1d1d1d]/50 text-[6px] sm:text-[7px] md:text-[10px] tracking-wider uppercase mb-1">Invitado</p>
                  <h3 className="text-[#1d1d1d] font-medium text-[9px] sm:text-[10px] md:text-xs mb-1 md:mb-2 leading-tight px-0.5 sm:px-1 break-words" style={{ fontFamily: "'Reina Neue Display', serif" }}>
                    {compactGuestName}
                  </h3>
                  <div className="w-6 md:w-8 h-px bg-[#b8894e]/30 mb-1 md:mb-2" />
                  <p className="text-[#1d1d1d]/70 text-[8px] sm:text-[9px] md:text-[11px] leading-tight">
                    {guestCount}<br/>{guestCount === 1 ? 'cupo' : 'cupos'}
                  </p>
                </div>
                <div className="h-2 md:h-3" />
              </motion.div>

              {/* Card 2 - Center (Video) */}
              <motion.div
                className="absolute left-[27%] bottom-[8%] w-[46%] bg-white shadow-2xl p-2 origin-bottom-center"
                style={{ zIndex: 30 }}
                initial={{ rotate: 0, scale: 0.95 }}
                animate={{
                  rotate: isOpen ? 2 : 0,
                  y: isOpen ? -28 : 0,
                  scale: isOpen ? 1 : 0.95
                }}
                transition={{
                  duration: 0.8,
                  delay: isOpen ? 0.3 : 0,
                  ease: smoothEase
                }}
              >
                <button
                  type="button"
                  onClick={() => isOpen && setIsVideoOpen(true)}
                  className="group block w-full"
                  aria-label="Reproducir video de invitación"
                  disabled={!isOpen}
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#1d1d1d]">
                    <img
                      src="/galeria/DSC02785.jpg"
                      alt=""
                      className="h-full w-full object-cover opacity-80"
                      aria-hidden="true"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/25 text-white">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#1d1d1d] shadow-lg transition-transform group-hover:scale-105 md:h-14 md:w-14">
                        <svg className="h-5 w-5 translate-x-0.5 md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                      <span className="mt-2 text-[8px] uppercase tracking-[0.25em] sm:text-[9px] md:text-[11px]">
                        Ver video
                      </span>
                    </div>
                  </div>
                </button>
                <div className="h-4" />
              </motion.div>

              {/* Card 3 - Right (Dress Code) */}
              <motion.button
                type="button"
                onClick={() => isOpen && setIsDressCodeOpen(true)}
                className="absolute right-[-2%] bottom-[8%] w-[40%] bg-white shadow-xl p-2 md:p-3 origin-bottom-right"
                style={{ zIndex: 20 }}
                initial={{ rotate: 8, scale: 0.95 }}
                animate={{
                  rotate: isOpen ? 14 : 8,
                  x: isOpen ? 8 : 0,
                  y: isOpen ? -14 : 0,
                  scale: isOpen ? 1 : 0.95
                }}
                transition={{
                  duration: 0.8,
                  delay: isOpen ? 0.4 : 0,
                  ease: smoothEase
                }}
                disabled={!isOpen}
                aria-label="Ver detalles del código de vestimenta"
              >
                <div className="aspect-[4/5] flex flex-col items-center justify-center text-center px-1 md:px-2">
                  <div className="mb-1 md:mb-2">
                    <svg className="w-5 h-5 md:w-7 md:h-7 mx-auto text-[#b8894e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                    </svg>
                  </div>
                  <p className="text-[#1d1d1d]/50 text-[6px] sm:text-[7px] md:text-[10px] tracking-wider uppercase mb-1">Código de</p>
                  <h3 className="text-[#1d1d1d] font-medium text-[9px] sm:text-[10px] md:text-xs mb-1 md:mb-2 leading-tight" style={{ fontFamily: "'Reina Neue Display', serif" }}>
                    Vestimenta
                  </h3>
                  <div className="w-6 md:w-8 h-px bg-[#b8894e]/30 mb-1 md:mb-2" />
                  <p className="text-[#1d1d1d]/70 text-[8px] sm:text-[9px] md:text-[11px] font-medium leading-tight">
                    Black Tie<br/>(Etiqueta)
                  </p>
                  <span className="mt-1 text-[6px] sm:text-[7px] md:text-[9px] text-[#b8894e] uppercase tracking-widest">
                    Ver detalle
                  </span>
                </div>
                <div className="h-2 md:h-3" />
              </motion.button>

            </div>
          </motion.div>
        </motion.div>

        {/* === LAYER 3: FRONT FLAP (Bottom V) - Always on top of photos === */}
        <div className="absolute inset-0 z-20 pointer-events-none rounded-sm overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, #252525, #1d1d1d)',
              clipPath: 'polygon(0 62%, 50% 76%, 100% 62%, 100% 100%, 0 100%)',
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
            className="absolute inset-0 origin-top"
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
                clipPath: 'polygon(0 0, 100% 0, 50% 76%)',
                backfaceVisibility: 'hidden',
                background: 'linear-gradient(to bottom, #2a2a2a, #1d1d1d)'
              }}
            />
            {/* Back face of flap */}
            <div
              className="absolute inset-0 rounded-t-sm"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 76%)',
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
            style={{ height: '64%' }}
          />
        </motion.div>

        {/* === LAYER 6: WAX SEAL === */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
          style={{ top: '76%' }}
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
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-full shadow-lg"
              style={{
                background: 'radial-gradient(circle at 35% 35%, #e8c896, #d4a574 30%, #b8894e 60%, #8b6914)'
              }}
            />
            <div className="absolute inset-1 rounded-full border border-[#8b6914]/30" />
            <img
              src="/Recurso 6@1000x.png"
              alt="Marce & Pipe"
              className="relative w-[72%] opacity-80"
              style={{ mixBlendMode: 'multiply' }}
            />
          </div>
        </motion.div>

      </div>

      {isVideoOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsVideoOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsVideoOpen(false)}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#1d1d1d] shadow-lg transition-colors hover:bg-white"
            aria-label="Cerrar video"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
          <motion.div
            className="w-full max-w-5xl overflow-hidden rounded-lg bg-black shadow-2xl"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25, ease: smoothEase }}
            onClick={(event) => event.stopPropagation()}
          >
            <video
              ref={videoDialogRef}
              className="max-h-[86svh] w-full bg-black"
              controls
              playsInline
              preload="metadata"
              aria-label="Video de invitación de Marce y Pipe"
            >
              <source src="/invitacion-marce-pipe-1080p.mp4" type="video/mp4" />
              Tu navegador no puede reproducir este video.
            </video>
          </motion.div>
        </motion.div>
      )}

      {isDressCodeOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsDressCodeOpen(false)}
        >
          <motion.div
            className="relative max-h-[92svh] w-full max-w-4xl overflow-y-auto rounded-t-2xl border border-[#32470c] bg-white sm:max-h-[90vh] sm:rounded-lg"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25, ease: smoothEase }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsDressCodeOpen(false)}
              className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-[#213500]/10 text-[#1d1d1d] shadow-lg transition-colors hover:bg-[#3b5110]/20 md:right-4 md:top-4 md:h-10 md:w-10"
              aria-label="Cerrar código de vestimenta"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-5 pt-8 sm:p-8 md:p-12">
              <div className="mb-8 border-b border-[#1d1d1d]/20 pb-5 text-center md:mb-12 md:pb-6">
                <h2 className="mb-2 pr-10 text-3xl text-[#1d1d1d] sm:pr-0 md:text-4xl" style={{ fontFamily: "'Reina Neue Display', serif" }}>
                  Código de Vestimenta
                </h2>
                <p className="text-[#1d1d1d]/70">Black Tie (Etiqueta de gala)</p>
              </div>

              <p className="-mt-4 mb-8 max-w-2xl mx-auto text-center text-sm italic text-[#1d1d1d]/60 md:-mt-8 md:mb-12 md:text-base">
                Te agradecemos acompañarnos siguiendo el código de vestimenta sugerido para esta celebración
              </p>

              <div className="mb-10 border-b border-[#1d1d1d]/20 pb-8 text-center md:mb-12 md:pb-10">
                <p className="mb-2 text-xs uppercase tracking-widest text-[#1d1d1d]/60">Color Reservado</p>
                <p className="text-sm font-medium text-[#1d1d1d]/80">Verde</p>
                <div className="mt-5 flex flex-wrap justify-center gap-3 md:gap-4">
                  {reservedGreenColors.map((color) => (
                    <div key={color} className="flex flex-col items-center gap-2">
                      <span
                        className="block h-9 w-9 rounded-full border border-[#1d1d1d]/10 shadow-sm md:h-10 md:w-10"
                        style={{ backgroundColor: color }}
                        aria-label={`Tono reservado ${color}`}
                      />
                      <span className="font-mono text-[10px] text-[#1d1d1d]/45">{color}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8 text-center">
                <p className="mb-2 text-xs uppercase tracking-widest text-[#1d1d1d]/60">Inspiración</p>
                <h3 className="text-2xl text-[#1d1d1d] md:text-3xl" style={{ fontFamily: "'Reina Neue Display', serif" }}>
                  Referencias sugeridas
                </h3>
              </div>

              <div className="mb-10 grid gap-10 md:mb-12 md:grid-cols-2 md:gap-12">
                <div className="space-y-5 md:space-y-6">
                  <h3 className="text-center text-2xl text-[#1d1d1d]" style={{ fontFamily: "'Reina Neue Display', serif" }}>
                    Para Caballeros
                  </h3>
                  <div className="relative aspect-[3/4] max-h-[70svh] overflow-hidden rounded-lg bg-[#f4f3ef]">
                    <img src={menImages[menCarouselIndex]} alt="Referencia sugerida para caballeros" className="h-full w-full object-contain" />
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/35 px-2 py-1.5">
                      {menImages.map((image, index) => (
                        <button
                          key={image}
                          type="button"
                          onClick={() => setMenCarouselIndex(index)}
                          className={`h-1.5 rounded-full transition-all ${index === menCarouselIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/55'}`}
                          aria-label={`Ver referencia de caballeros ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-[#1d1d1d]/20 pt-4 text-center">
                    <p className="mb-3 text-sm text-[#1d1d1d]/70">Referencias sugeridas</p>
                    <div className="space-y-4">
                      {[
                        { handle: 'boutiquegabriel', url: 'https://www.instagram.com/boutiquegabriel/' },
                        { handle: 'dclase.co', url: 'https://www.instagram.com/dclase.co/', featured: true },
                        { handle: 'valserdiseno', url: 'https://www.instagram.com/valsersdisenos/' },
                        { handle: 'adrianavergara', url: 'https://www.instagram.com/adrianavergara/' },
                      ].map((brand) => (
                        <a
                          key={brand.handle}
                          href={brand.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`block text-sm text-[#1d1d1d]/80 transition-colors hover:text-[#1f4903] ${brand.featured ? 'font-bold' : 'font-medium'}`}
                        >
                          {brand.handle}
                        </a>
                      ))}
                    </div>
                    <p className="mt-5 text-sm leading-relaxed text-[#1d1d1d]/60">
                      Si deseas ir a D&apos;Clase por tu smoking, solo menciona nuestros nombres -Marce&Pipe- y obtendrás un descuento especial en tu alquiler para nuestra boda.
                    </p>
                  </div>
                </div>

                <div className="space-y-5 md:space-y-6">
                  <h3 className="text-center text-2xl text-[#1d1d1d]" style={{ fontFamily: "'Reina Neue Display', serif" }}>
                    Para Damas
                  </h3>
                  <div className="relative aspect-[3/4] max-h-[70svh] overflow-hidden rounded-lg bg-[#f4f3ef]">
                    <img src={womenImages[womenCarouselIndex]} alt="Referencia sugerida para damas" className="h-full w-full object-contain" />
                    <div className="absolute bottom-3 left-1/2 flex max-w-[80%] -translate-x-1/2 flex-wrap justify-center gap-1.5 rounded-full bg-black/35 px-2 py-1.5">
                      {womenImages.map((image, index) => (
                        <button
                          key={image}
                          type="button"
                          onClick={() => setWomenCarouselIndex(index)}
                          className={`h-1.5 rounded-full transition-all ${index === womenCarouselIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/55'}`}
                          aria-label={`Ver referencia de damas ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#1d1d1d]/20 pt-6 text-center md:pt-8">
                <p className="mb-2 text-xs uppercase tracking-widest text-[#1d1d1d]/60">Consideraciones</p>
                <h3 className="mb-6 text-2xl text-[#1d1d1d] md:text-3xl" style={{ fontFamily: "'Reina Neue Display', serif" }}>
                  Estilos no sugeridos
                </h3>
                <div className="grid gap-8 md:grid-cols-2 md:gap-10">
                  <div>
                    <p className="mb-4 text-center text-sm font-medium text-[#1d1d1d]/70">Caballeros</p>
                    <div className="relative aspect-[3/4] max-h-[62svh] overflow-hidden rounded-lg border border-[#1d1d1d]/10 bg-[#f4f3ef]">
                      <img src={menAvoidImages[menAvoidCarouselIndex]} alt="Estilo no sugerido para caballeros" className="h-full w-full object-contain" />
                      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/35 px-2 py-1.5">
                        {menAvoidImages.map((image, index) => (
                          <button
                            key={image}
                            type="button"
                            onClick={() => setMenAvoidCarouselIndex(index)}
                            className={`h-1.5 rounded-full transition-all ${index === menAvoidCarouselIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/55'}`}
                            aria-label={`Ver estilo no sugerido para caballeros ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="mb-4 text-center text-sm font-medium text-[#1d1d1d]/70">Damas</p>
                    <div className="relative aspect-[3/4] max-h-[62svh] overflow-hidden rounded-lg border border-[#1d1d1d]/10 bg-[#f4f3ef]">
                      <img src={womenAvoidImages[womenAvoidCarouselIndex]} alt="Estilo no sugerido para damas" className="h-full w-full object-contain" />
                      <div className="absolute bottom-3 left-1/2 flex max-w-[80%] -translate-x-1/2 flex-wrap justify-center gap-1.5 rounded-full bg-black/35 px-2 py-1.5">
                        {womenAvoidImages.map((image, index) => (
                          <button
                            key={image}
                            type="button"
                            onClick={() => setWomenAvoidCarouselIndex(index)}
                            className={`h-1.5 rounded-full transition-all ${index === womenAvoidCarouselIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/55'}`}
                            aria-label={`Ver estilo no sugerido para damas ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
