import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { RSVPSection } from './RSVPSection';
import { GuestSearch } from './GuestSearch';
import { galleryImages } from '../data/galleryImages';

// Navbar with scroll-aware background
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3 md:px-6 md:py-4 transition-all duration-500"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      style={{
        backgroundColor: scrolled ? 'rgba(244, 243, 239, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 rgba(29, 29, 29, 0.05)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <motion.img 
          src="/Recurso 6@1000x.png" 
          alt="M&P" 
          className={`h-9 md:h-12 w-auto transition-all duration-500 ${scrolled ? '' : 'invert brightness-0 invert'}`}
          style={{ 
            opacity: scrolled ? 1 : 0.95,
            filter: scrolled ? 'none' : 'brightness(0) invert(1)',
          }}
        />
        <div className="hidden md:flex gap-8 text-sm tracking-widest uppercase">
          {['La Boda', 'Vestimenta', 'Galería'].map((item) => {
            const href = item === 'Vestimenta' ? '#codigo-vestimenta' : `#${item.toLowerCase().replace(' ', '-')}`;
            return (
            <a
              key={item}
              href={href} 
              className={`relative py-1 transition-colors duration-500 group ${
                scrolled 
                  ? 'text-[#1d1d1d]/70 hover:text-[#1d1d1d]' 
                  : 'text-white/90 hover:text-white'
              }`}
              style={{
                textShadow: scrolled ? 'none' : '0 1px 3px rgba(0,0,0,0.3)',
              }}
            >
              {item}
              <span className={`absolute bottom-0 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
                scrolled ? 'bg-[#1d1d1d]' : 'bg-white'
              }`} />
            </a>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

// Section wrapper for consistent animations
const Section = ({ children, className = '', id, delay = 0 }: { 
  children: React.ReactNode; 
  className?: string; 
  id?: string; 
  delay?: number 
}) => {
  const ref = useRef(null);
  
  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.section>
  );
};

const HeroSection = () => {
  const ref = useRef(null);
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroImages = [
    ...galleryImages.filter((image) => image.src.includes('DSC02785')),
    ...galleryImages.filter((image) => !image.src.includes('DSC02785')),
  ].slice(0, 8);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroImageIndex((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden">
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#1d1d1d]/30 via-transparent to-[#f4f3ef]" />
        {heroImages.map((image, index) => (
          <motion.img
            key={image.src}
            src={image.src}
            alt={image.alt}
            className="absolute inset-0 w-full h-full object-cover object-center"
            initial={false}
            animate={{ opacity: index === heroImageIndex ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#f4f3ef] via-[#f4f3ef]/50 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-10 min-h-[100svh] px-4 text-center"
        style={{ opacity }}
      >
        <div className="absolute left-1/2 top-[30%] w-full max-w-[34rem] -translate-x-1/2 px-4">
          <motion.p
            className="text-[#1d1d1d] text-lg md:text-2xl tracking-[0.3em] uppercase drop-shadow-[0_1px_6px_rgba(244,243,239,0.65)]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            ¡Nos casamos!
          </motion.p>
        </div>

        <div className="absolute left-1/2 top-[48%] w-full max-w-[36rem] -translate-x-1/2 -translate-y-1/2 px-6">
          <motion.p
            className="text-[#1d1d1d] text-sm md:text-base leading-relaxed drop-shadow-[0_1px_6px_rgba(244,243,239,0.7)]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            Con la bendición de Dios y el amor de nuestras familias, tenemos el honor de invitarte a celebrar nuestro matrimonio
          </motion.p>
        </div>

        <div className="absolute left-1/2 bottom-14 md:bottom-16 flex w-full -translate-x-1/2 flex-col items-center px-4">
          <motion.img 
            src="/Recurso 1@1000x.png" 
            alt="Marce & Pipe"
            className="h-16 sm:h-20 md:h-28 lg:h-36 w-auto mb-5 md:mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          <motion.p
            className="text-[#213500] text-base md:text-xl tracking-widest drop-shadow-[0_1px_6px_rgba(244,243,239,0.85)]"
            style={{ fontFamily: "'Reina Neue Display', serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            31 de Octubre, 2026
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-[#1d1d1d]/30 rounded-full flex justify-center pt-2">
            <motion.div 
              className="w-1.5 h-1.5 bg-[#1d1d1d]/50 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const CountdownSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Wedding date: October 31, 2026 at 4:30 PM (16:30) in Cartagena, Colombia (UTC-5)
      const weddingDate = new Date('2026-10-31T16:30:00-05:00');
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: 'días' },
    { value: timeLeft.hours, label: 'horas' },
    { value: timeLeft.minutes, label: 'minutos' },
    { value: timeLeft.seconds, label: 'segundos' }
  ];

  return (
    <Section className="py-14 md:py-20 bg-[#0D2100] text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.p
          className="text-white/60 tracking-[0.3em] uppercase text-xs md:text-sm mb-8 md:mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Faltan
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-8">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative">
                {/* Decorative border */}
                <motion.div
                  className="absolute inset-0 border border-white/10 rounded-lg"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                />

                {/* Number */}
                <div className="relative py-5 md:py-8">
                  <motion.div
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tabular-nums"
                    style={{ fontFamily: "'Reina Neue Display', serif" }}
                    key={unit.value}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {String(unit.value).padStart(2, '0')}
                  </motion.div>

                  {/* Label */}
                  <p className="text-white/60 tracking-[0.18em] md:tracking-[0.2em] uppercase text-[10px] md:text-sm mt-2 md:mt-3">
                    {unit.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative line separator */}
        <motion.div
          className="mt-8 md:mt-12 mx-auto w-full max-w-xs h-px"
          style={{
            background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.2) 50%, transparent)'
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
    </Section>
  );
};



const WeddingDetailsSection = () => (
  <Section id="la-boda" className="py-16 md:py-24 bg-white">
    <div className="max-w-6xl mx-auto px-4 md:px-6">
      <motion.div
        className="text-center mb-10 md:mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="max-w-3xl mx-auto text-[#1d1d1d]/70 text-base md:text-lg leading-relaxed mb-6">
          Después de un camino compartido lleno de amor, fe, servicio y gratitud, ha llegado el día con el que desde hace 9 años soñamos
        </p>
        <p className="text-[#1d1d1d]/50 tracking-[0.3em] uppercase text-xs md:text-sm mb-4">Reserva esta fecha especial</p>
        <p className="text-[#1d1d1d]/60 text-base md:text-lg tracking-wide mt-3 md:mt-4">Sábado, 31 de Octubre de 2026</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-8">
        {/* Ceremony */}
        <motion.div
          className="bg-[#f4f3ef] p-6 md:p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3
            className="text-2xl md:text-3xl text-[#1d1d1d] mb-4 md:mb-6"
            style={{ fontFamily: "'Reina Neue Display', serif" }}
          >
            Ceremonia religiosa
          </h3>
          <p className="text-[#1d1d1d] text-lg md:text-xl mb-3 md:mb-4">4:30pm</p>
          <a 
            href="https://maps.google.com/?q=Parroquia+Santa+Cruz+de+Manga,+Cartagena" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#1d1d1d]/70 font-medium hover:text-[#1d1d1d] hover:underline transition-colors"
          >
            Parroquia Santa Cruz de Manga
          </a>
          <p className="text-[#1d1d1d]/50 text-sm">Cartagena de Indias, Colombia</p>
        </motion.div>

        {/* Reception */}
        <motion.div
          className="bg-[#f4f3ef] p-6 md:p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <h3
            className="text-2xl md:text-3xl text-[#1d1d1d] mb-4 md:mb-6"
            style={{ fontFamily: "'Reina Neue Display', serif" }}
          >
            Cóctel y Recepción
          </h3>
          <p className="text-[#1d1d1d] text-lg md:text-xl mb-3 md:mb-4">6:30pm</p>
          <a 
            href="https://maps.google.com/?q=Hotel+Intercontinental,+Cartagena" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#1d1d1d]/70 font-medium hover:text-[#1d1d1d] hover:underline transition-colors"
          >
            Hotel Intercontinental
          </a>
          <p className="text-[#1d1d1d]/50 text-sm">Cartagena de Indias, Colombia</p>
        </motion.div>
      </div>
    </div>
  </Section>
);

const DressCodeSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menCarouselIndex, setMenCarouselIndex] = useState(0);
  const [womenCarouselIndex, setWomenCarouselIndex] = useState(0);
  const [menAvoidCarouselIndex, setMenAvoidCarouselIndex] = useState(0);
  const [womenAvoidCarouselIndex, setWomenAvoidCarouselIndex] = useState(0);
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

  const handlePrevMen = () => {
    setMenCarouselIndex((prev) => (prev === 0 ? menImages.length - 1 : prev - 1));
  };

  const handleNextMen = () => {
    setMenCarouselIndex((prev) => (prev === menImages.length - 1 ? 0 : prev + 1));
  };

  const handlePrevWomen = () => {
    setWomenCarouselIndex((prev) => (prev === 0 ? womenImages.length - 1 : prev - 1));
  };

  const handleNextWomen = () => {
    setWomenCarouselIndex((prev) => (prev === womenImages.length - 1 ? 0 : prev + 1));
  };

  const handlePrevMenAvoid = () => {
    setMenAvoidCarouselIndex((prev) => (prev === 0 ? menAvoidImages.length - 1 : prev - 1));
  };

  const handleNextMenAvoid = () => {
    setMenAvoidCarouselIndex((prev) => (prev === menAvoidImages.length - 1 ? 0 : prev + 1));
  };

  const handlePrevWomenAvoid = () => {
    setWomenAvoidCarouselIndex((prev) => (prev === 0 ? womenAvoidImages.length - 1 : prev - 1));
  };

  const handleNextWomenAvoid = () => {
    setWomenAvoidCarouselIndex((prev) => (prev === womenAvoidImages.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (!isModalOpen) return;

    const timer = setInterval(() => {
      setMenCarouselIndex((prev) => (prev === menImages.length - 1 ? 0 : prev + 1));
      setWomenCarouselIndex((prev) => (prev === womenImages.length - 1 ? 0 : prev + 1));
      setMenAvoidCarouselIndex((prev) => (prev === menAvoidImages.length - 1 ? 0 : prev + 1));
      setWomenAvoidCarouselIndex((prev) => (prev === womenAvoidImages.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(timer);
  }, [isModalOpen, menImages.length, womenImages.length, menAvoidImages.length, womenAvoidImages.length]);

  return (
    <>
      <Section id="codigo-vestimenta" className="py-16 md:py-24 bg-[#f4f3ef]">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-10 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-3xl md:text-5xl text-[#1d1d1d] mb-3 md:mb-4"
              style={{ fontFamily: "'Reina Neue Display', serif" }}
            >
              Código de Vestimenta
            </h2>
            <p className="text-[#1d1d1d]/70 text-lg md:text-xl mb-6 md:mb-8" style={{ fontFamily: "'Reina Neue Display', serif" }}>
              Black Tie (Etiqueta de gala)
            </p>
            <motion.button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex min-h-12 items-center gap-2 px-7 md:px-8 py-3 bg-[#1d1d1d] text-white hover:bg-[#1d1d1d]/90 transition-all duration-300 rounded-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="tracking-wide">Ver detalles</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 md:gap-12 max-w-3xl mx-auto">
            {/* Hombres */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="text-xl md:text-2xl text-[#1d1d1d] mb-2 md:mb-4" style={{ fontFamily: "'Reina Neue Display', serif" }}>
                Caballeros
              </h3>
              <p className="text-[#1d1d1d] text-sm md:text-lg">Esmoquin negro</p>
            </motion.div>

            {/* Mujeres */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h3 className="text-xl md:text-2xl text-[#1d1d1d] mb-2 md:mb-4" style={{ fontFamily: "'Reina Neue Display', serif" }}>
                Damas
              </h3>
              <p className="text-[#1d1d1d] text-sm md:text-lg">Vestido largo de gala unicolor</p>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Modal */}
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            className="relative w-full max-w-4xl bg-white rounded-t-2xl sm:rounded-lg overflow-hidden max-h-[92svh] sm:max-h-[90vh] overflow-y-auto border border-[#32470c]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 md:top-4 md:right-4 z-10 w-11 h-11 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-[#213500]/10 hover:bg-[#3b5110]/20 transition-colors shadow-lg"
              aria-label="Cerrar código de vestimenta"
            >
              <svg className="w-5 h-5 text-[#1d1d1d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-5 pt-8 sm:p-8 md:p-12">
              <div className="text-center mb-8 md:mb-12 pb-5 md:pb-6 border-b border-[#1d1d1d]/20">
                <h2 className="text-3xl md:text-4xl text-[#1d1d1d] mb-2 pr-10 sm:pr-0" style={{ fontFamily: "'Reina Neue Display', serif" }}>
                  Código de Vestimenta
                </h2>
                <p className="text-[#1d1d1d]/70">Black Tie (Etiqueta de gala)</p>
              </div>

              <p className="max-w-2xl mx-auto text-center text-[#1d1d1d]/60 text-sm md:text-base italic -mt-4 md:-mt-8 mb-8 md:mb-12">
                Te agradecemos acompañarnos siguiendo el código de vestimenta sugerido para esta celebración
              </p>

              {/* Color Reservado */}
              <div className="mb-10 md:mb-12 pb-8 md:pb-10 border-b border-[#1d1d1d]/20 text-center">
                <p className="text-[#1d1d1d]/60 text-xs tracking-widest uppercase mb-2">Color Reservado</p>
                <p className="text-[#1d1d1d]/80 text-sm font-medium">Verde</p>
                <div className="mt-5 flex flex-wrap justify-center gap-3 md:gap-4">
                  {reservedGreenColors.map((color) => (
                    <div key={color} className="flex flex-col items-center gap-2">
                      <span
                        className="block h-9 w-9 md:h-10 md:w-10 rounded-full border border-[#1d1d1d]/10 shadow-sm"
                        style={{ backgroundColor: color }}
                        aria-label={`Tono reservado ${color}`}
                      />
                      <span className="text-[#1d1d1d]/45 text-[10px] font-mono">{color}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mb-8">
                <p className="text-[#1d1d1d]/60 text-xs tracking-widest uppercase mb-2">
                  Inspiración
                </p>
                <h3
                  className="text-2xl md:text-3xl text-[#1d1d1d]"
                  style={{ fontFamily: "'Reina Neue Display', serif" }}
                >
                  Referencias sugeridas
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-10 md:gap-12 mb-10 md:mb-12">
                {/* Caballeros Carrusel */}
                <div className="space-y-5 md:space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl text-[#1d1d1d] mb-3 md:mb-4" style={{ fontFamily: "'Reina Neue Display', serif" }}>
                      Para Caballeros
                    </h3>
                  </div>

                  {/* Carrusel de imágenes */}
                  <div className="relative aspect-[3/4] max-h-[70svh] rounded-lg overflow-hidden bg-[#f4f3ef] group">
                    <motion.img
                      key={menCarouselIndex}
                      src={menImages[menCarouselIndex]}
                      alt={`Hombre ${menCarouselIndex + 7}`}
                      className="w-full h-full object-contain"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Controles del carrusel */}
                    <button
                      onClick={handlePrevMen}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-white/85 hover:bg-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shadow"
                      aria-label="Ver referencia anterior de hombres"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={handleNextMen}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-white/85 hover:bg-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shadow"
                      aria-label="Ver siguiente referencia de hombres"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    {/* Indicador */}
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/35 px-2 py-1.5">
                      {menImages.map((image, index) => (
                        <button
                          key={image}
                          onClick={() => setMenCarouselIndex(index)}
                          className={`h-1.5 rounded-full transition-all ${index === menCarouselIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/55'}`}
                          aria-label={`Ver referencia de hombres ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Referencias de tiendas */}
                  <div className="text-center pt-4 border-t border-[#1d1d1d]/20">
                    <p className="text-[#1d1d1d]/70 text-sm mb-3">Referencias sugeridas</p>
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
                          className={`block text-[#1d1d1d]/80 text-sm hover:text-[#1f4903] transition-colors ${brand.featured ? 'font-bold' : 'font-medium'}`}
                        >
                          {brand.handle}
                        </a>
                      ))}
                    </div>
                    <p className="mt-5 text-[#1d1d1d]/60 text-sm leading-relaxed">
                      Si deseas ir a D&apos;Clase por tu esmoquin, solo menciona nuestros nombres -Marce&Pipe- y obtendrás un descuento especial en tu alquiler para nuestra boda.
                    </p>
                  </div>
                </div>

                {/* Damas Carrusel */}
                <div className="space-y-5 md:space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl text-[#1d1d1d] mb-3 md:mb-4" style={{ fontFamily: "'Reina Neue Display', serif" }}>
                      Para Damas
                    </h3>
                  </div>

                  {/* Carrusel de imágenes */}
                  <div className="relative aspect-[3/4] max-h-[70svh] rounded-lg overflow-hidden bg-[#f4f3ef] group">
                    <motion.img
                      key={womenCarouselIndex}
                      src={womenImages[womenCarouselIndex]}
                      alt={`Mujer ${womenCarouselIndex + 1}`}
                      className="w-full h-full object-contain"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Controles del carrusel */}
                    <button
                      onClick={handlePrevWomen}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-white/85 hover:bg-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shadow"
                      aria-label="Ver referencia anterior de mujeres"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={handleNextWomen}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-white/85 hover:bg-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shadow"
                      aria-label="Ver siguiente referencia de mujeres"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    {/* Indicador */}
                    <div className="absolute bottom-3 left-1/2 flex max-w-[80%] -translate-x-1/2 flex-wrap justify-center gap-1.5 rounded-full bg-black/35 px-2 py-1.5">
                      {womenImages.map((image, index) => (
                        <button
                          key={image}
                          onClick={() => setWomenCarouselIndex(index)}
                          className={`h-1.5 rounded-full transition-all ${index === womenCarouselIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/55'}`}
                          aria-label={`Ver referencia de mujeres ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Estilos no sugeridos */}
              <div className="border-t border-[#1d1d1d]/20 pt-6 md:pt-8 text-center">
                <p className="text-[#1d1d1d]/60 text-xs tracking-widest uppercase mb-2">
                  Consideraciones
                </p>
                <h3
                  className="text-2xl md:text-3xl text-[#1d1d1d] mb-6"
                  style={{ fontFamily: "'Reina Neue Display', serif" }}
                >
                  Estilos no sugeridos
                </h3>

                <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                  <div>
                    <p className="text-center text-[#1d1d1d]/70 text-sm font-medium mb-4">
                      Caballeros
                    </p>
                    <div className="relative aspect-[3/4] max-h-[62svh] rounded-lg overflow-hidden bg-[#f4f3ef] border border-[#1d1d1d]/10 group">
                      <motion.img
                        key={menAvoidCarouselIndex}
                        src={menAvoidImages[menAvoidCarouselIndex]}
                        alt={`Ejemplo no recomendado para hombres ${menAvoidCarouselIndex + 1}`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <button
                        onClick={handlePrevMenAvoid}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-white/85 hover:bg-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shadow"
                        aria-label="Ver ejemplo anterior no recomendado para hombres"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={handleNextMenAvoid}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-white/85 hover:bg-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shadow"
                        aria-label="Ver siguiente ejemplo no recomendado para hombres"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/35 px-2 py-1.5">
                        {menAvoidImages.map((image, index) => (
                          <button
                            key={image}
                            onClick={() => setMenAvoidCarouselIndex(index)}
                            className={`h-1.5 rounded-full transition-all ${index === menAvoidCarouselIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/55'}`}
                            aria-label={`Ver ejemplo no recomendado para hombres ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-center text-[#1d1d1d]/70 text-sm font-medium mb-4">
                      Damas
                    </p>
                    <div className="relative aspect-[3/4] max-h-[62svh] rounded-lg overflow-hidden bg-[#f4f3ef] border border-[#1d1d1d]/10 group">
                      <motion.img
                        key={womenAvoidCarouselIndex}
                        src={womenAvoidImages[womenAvoidCarouselIndex]}
                        alt={`Ejemplo no recomendado para mujeres ${womenAvoidCarouselIndex + 1}`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <button
                        onClick={handlePrevWomenAvoid}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-white/85 hover:bg-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shadow"
                        aria-label="Ver ejemplo anterior no recomendado para mujeres"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={handleNextWomenAvoid}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-white/85 hover:bg-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shadow"
                        aria-label="Ver siguiente ejemplo no recomendado para mujeres"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      <div className="absolute bottom-3 left-1/2 flex max-w-[80%] -translate-x-1/2 flex-wrap justify-center gap-1.5 rounded-full bg-black/35 px-2 py-1.5">
                        {womenAvoidImages.map((image, index) => (
                          <button
                            key={image}
                            onClick={() => setWomenAvoidCarouselIndex(index)}
                            className={`h-1.5 rounded-full transition-all ${index === womenAvoidCarouselIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/55'}`}
                            aria-label={`Ver ejemplo no recomendado para mujeres ${index + 1}`}
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
    </>
  );
};

const GallerySection = () => {
  const images = galleryImages.slice(0, 6);

  const handleImageClick = () => {
    window.location.href = '/galeria';
  };

  return (
    <Section id="galeria" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#1d1d1d]/50 tracking-[0.3em] uppercase text-xs md:text-sm mb-4">Momentos que llevamos en el corazón</p>
          <h2
            className="text-3xl md:text-5xl text-[#1d1d1d]"
            style={{ fontFamily: "'Reina Neue Display', serif" }}
          >
            Galería
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="aspect-[5/6] sm:aspect-[4/5] overflow-hidden group cursor-pointer relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={handleImageClick}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-700 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-700 text-sm tracking-wider">
                  Ver galería completa
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const FooterSection = () => (
  <footer className="py-12 md:py-16 bg-[#1d1d1d] text-white">
    <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
      <motion.img 
        src="/Recurso 1@1000x.png" 
        alt="Marce & Pipe"
        className="h-14 md:h-20 w-auto mx-auto mb-6 md:mb-8 invert opacity-80"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 0.8, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      />
      
      <motion.p
        className="text-white/60 mb-6 md:mb-8 text-sm md:text-base"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Nos encantará compartir contigo un día inolvidable
      </motion.p>
      <motion.p 
        className="text-white/30 text-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        #MarceYPipe2026
      </motion.p>
    </div>
  </footer>
);

interface HomePageProps {
  showGuestSearch?: boolean;
}

export const HomePage = ({ showGuestSearch = false }: HomePageProps) => {
  return (
    <div className="bg-[#f4f3ef]">
      <Navbar />
      <HeroSection />
      <CountdownSection />
      <WeddingDetailsSection />
      <DressCodeSection />
      <GallerySection />
      {showGuestSearch ? <GuestSearch /> : <RSVPSection />}
      <FooterSection />
    </div>
  );
};
