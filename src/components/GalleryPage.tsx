import { motion } from 'framer-motion';

export const GalleryPage = () => {
  const images = [
    { src: '/DSC09127.jpg', alt: 'Marce & Pipe' },
    { src: '/DSC08445.jpg', alt: 'Flores' },
    { src: '/DSC09599.jpg', alt: 'Atardecer' },
  ];

  return (
    <div className="min-h-screen bg-[#f4f3ef]">
      {/* Header with back button */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 bg-[#f4f3ef]/95 backdrop-blur-sm border-b border-[#1d1d1d]/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.a
            href="/"
            className="flex items-center gap-2 text-[#1d1d1d]/70 hover:text-[#1d1d1d] transition-colors"
            whileHover={{ x: -5 }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="tracking-wide">Volver</span>
          </motion.a>

          <h1
            className="text-2xl text-[#1d1d1d]"
            style={{ fontFamily: "'Reina Neue Display', serif" }}
          >
            Galería
          </h1>

          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </motion.div>

      {/* Main content */}
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-[#1d1d1d]/50 tracking-[0.3em] uppercase text-sm mb-4">
              Nuestros momentos especiales
            </p>
            <h2
              className="text-4xl md:text-5xl text-[#1d1d1d]"
              style={{ fontFamily: "'Reina Neue Display', serif" }}
            >
              Marce & Pipe
            </h2>
          </motion.div>

          {/* Image grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="aspect-[4/5] overflow-hidden rounded-sm"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
