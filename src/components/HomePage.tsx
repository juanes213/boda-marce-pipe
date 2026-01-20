import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// Navbar with scroll-aware background
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-500"
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
          className={`h-10 md:h-12 w-auto transition-all duration-500 ${scrolled ? '' : 'invert brightness-0 invert'}`}
          style={{ 
            opacity: scrolled ? 1 : 0.95,
            filter: scrolled ? 'none' : 'brightness(0) invert(1)',
          }}
        />
        <div className="hidden md:flex gap-8 text-sm tracking-widest uppercase">
          {['Nuestra Historia', 'La Boda', 'Galería'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`} 
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
          ))}
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#1d1d1d]/30 via-transparent to-[#f4f3ef]" />
        <img 
          src="/DSC09599.jpg" 
          alt="Marce & Pipe"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f4f3ef] via-[#f4f3ef]/50 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-10 h-full flex flex-col justify-end items-center pb-20 px-4"
        style={{ opacity }}
      >
        <motion.p
          className="text-[#1d1d1d]/70 text-sm md:text-base tracking-[0.3em] uppercase mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          ¡Nos casamos!
        </motion.p>
        
        <motion.img 
          src="/Recurso 1@1000x.png" 
          alt="Marce & Pipe"
          className="h-20 md:h-28 lg:h-36 w-auto mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        <motion.p
          className="text-[#1d1d1d] text-lg md:text-xl tracking-widest"
          style={{ fontFamily: "'Reina Neue Display', serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          31 de Octubre, 2026
        </motion.p>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
      // Wedding date: October 31, 2026 at 4:00 PM (16:00) in Cartagena, Colombia (UTC-5)
      const weddingDate = new Date('2026-10-31T16:00:00-05:00');
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
    <Section className="py-20 bg-[#1d1d1d] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          className="text-white/60 tracking-[0.3em] uppercase text-sm mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Faltan
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
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
                <div className="relative py-6 md:py-8">
                  <motion.div
                    className="text-5xl md:text-6xl lg:text-7xl font-light tabular-nums"
                    style={{ fontFamily: "'Reina Neue Display', serif" }}
                    key={unit.value}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {String(unit.value).padStart(2, '0')}
                  </motion.div>

                  {/* Label */}
                  <p className="text-white/60 tracking-[0.2em] uppercase text-xs md:text-sm mt-3">
                    {unit.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative line separator */}
        <motion.div
          className="mt-12 mx-auto w-full max-w-xs h-px"
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

const OurStorySection = () => (
  <Section id="nuestra-historia" className="py-24 bg-[#f4f3ef]">
    <div className="max-w-6xl mx-auto px-6">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-[#1d1d1d]/50 tracking-[0.3em] uppercase text-sm mb-4">Cómo comenzó todo</p>
        <h2 
          className="text-4xl md:text-5xl text-[#1d1d1d]"
          style={{ fontFamily: "'Reina Neue Display', serif" }}
        >
          Nuestra Historia
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="aspect-[4/5] overflow-hidden">
            <img 
              src="/DSC09127.jpg" 
              alt="Marce & Pipe"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Decorative frame */}
          <motion.div 
            className="absolute -inset-4 border border-[#1d1d1d]/10 -z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </motion.div>

        <div className="space-y-8">
          {[
            { year: '2020', title: 'El comienzo', text: 'Nos conocimos en un momento inesperado, cuando menos lo buscábamos. Desde el primer instante supimos que había algo especial entre nosotros.' },
            { year: '2024', title: 'La propuesta', text: 'Después de años construyendo recuerdos juntos, llegó el momento de dar el siguiente paso. Con el corazón lleno de amor, decidimos comenzar esta nueva aventura.' },
            { year: '2026', title: 'Para siempre', text: 'Y ahora, estamos listos para celebrar nuestro amor rodeados de las personas más importantes en nuestras vidas.' },
          ].map((item, index) => (
            <motion.div
              key={item.year}
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="flex items-center gap-4">
                <motion.div 
                  className="w-12 h-px bg-[#1d1d1d]/30"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                  style={{ originX: 0 }}
                />
                <span className="text-[#1d1d1d]/50 text-sm tracking-widest">{item.year}</span>
              </div>
              <h3 className="text-2xl text-[#1d1d1d]" style={{ fontFamily: "'Reina Neue Display', serif" }}>
                {item.title}
              </h3>
              <p className="text-[#1d1d1d]/70 leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </Section>
);

const WeddingDetailsSection = () => (
  <Section id="la-boda" className="py-24 bg-white">
    <div className="max-w-6xl mx-auto px-6">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-[#1d1d1d]/50 tracking-[0.3em] uppercase text-sm mb-4">Guarda la fecha</p>
        <h2 
          className="text-4xl md:text-5xl text-[#1d1d1d]"
          style={{ fontFamily: "'Reina Neue Display', serif" }}
        >
          La Boda
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Ceremony */}
        <motion.div
          className="bg-[#f4f3ef] p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="w-16 h-16 mx-auto mb-6 flex items-center justify-center"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <svg className="w-12 h-12 text-[#1d1d1d]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </motion.div>
          <h3 
            className="text-2xl md:text-3xl text-[#1d1d1d] mb-4"
            style={{ fontFamily: "'Reina Neue Display', serif" }}
          >
            Ceremonia
          </h3>
          <p className="text-[#1d1d1d]/70 mb-2">Domingo, 15 de Marzo de 2026</p>
          <p className="text-[#1d1d1d] text-xl mb-4">4:00 PM</p>
          <p className="text-[#1d1d1d]/70 font-medium">Iglesia Santa María</p>
          <p className="text-[#1d1d1d]/50 text-sm">Calle Principal #123, Ciudad</p>
        </motion.div>

        {/* Reception */}
        <motion.div
          className="bg-[#f4f3ef] p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <motion.div 
            className="w-16 h-16 mx-auto mb-6 flex items-center justify-center"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.35 }}
          >
            <svg className="w-12 h-12 text-[#1d1d1d]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
            </svg>
          </motion.div>
          <h3 
            className="text-2xl md:text-3xl text-[#1d1d1d] mb-4"
            style={{ fontFamily: "'Reina Neue Display', serif" }}
          >
            Recepción
          </h3>
          <p className="text-[#1d1d1d]/70 mb-2">Después de la ceremonia</p>
          <p className="text-[#1d1d1d] text-xl mb-4">6:00 PM</p>
          <p className="text-[#1d1d1d]/70 font-medium">Hacienda Los Jardines</p>
          <p className="text-[#1d1d1d]/50 text-sm">Carretera Norte Km 5, Ciudad</p>
        </motion.div>
      </div>

      {/* Dress Code */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <p className="text-[#1d1d1d]/50 tracking-widest text-sm uppercase mb-2">Código de vestimenta</p>
        <p className="text-[#1d1d1d] text-xl" style={{ fontFamily: "'Reina Neue Display', serif" }}>
          Formal Elegante
        </p>
      </motion.div>
    </div>
  </Section>
);

const GallerySection = () => {
  const images = [
    { src: '/DSC09127.jpg', alt: 'Marce & Pipe' },
    { src: '/DSC08445.jpg', alt: 'Flores' },
    { src: '/DSC09599.jpg', alt: 'Atardecer' },
  ];

  return (
    <Section id="galeria" className="py-24 bg-[#f4f3ef]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#1d1d1d]/50 tracking-[0.3em] uppercase text-sm mb-4">Momentos especiales</p>
          <h2 
            className="text-4xl md:text-5xl text-[#1d1d1d]"
            style={{ fontFamily: "'Reina Neue Display', serif" }}
          >
            Galería
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="aspect-[4/5] overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const FooterSection = () => (
  <footer className="py-16 bg-[#1d1d1d] text-white">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <motion.img 
        src="/Recurso 1@1000x.png" 
        alt="Marce & Pipe"
        className="h-16 md:h-20 w-auto mx-auto mb-8 invert opacity-80"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 0.8, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      />
      
      <motion.p
        className="text-white/60 mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Esperamos celebrar este día tan especial junto a ti
      </motion.p>

      <motion.div
        className="flex justify-center gap-6 mb-8"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <a 
          href="https://wa.me/573001234567" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white transition-colors duration-300"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
        <a 
          href="mailto:marceypipe@email.com"
          className="text-white/60 hover:text-white transition-colors duration-300"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </a>
      </motion.div>

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

export const HomePage = () => {
  return (
    <div className="bg-[#f4f3ef]">
      <Navbar />
      <HeroSection />
      <CountdownSection />
      <OurStorySection />
      <WeddingDetailsSection />
      <GallerySection />
      <FooterSection />
    </div>
  );
};
