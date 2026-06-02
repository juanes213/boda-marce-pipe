import { motion } from 'framer-motion';

export const RSVPSection = () => {
  return (
    <section className="py-16 md:py-24 bg-[#f4f3ef]" id="confirmar-asistencia">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#1d1d1d]/50 tracking-[0.3em] uppercase text-xs md:text-sm mb-4">
            Invitación personalizada
          </p>
          <h2
            className="text-3xl md:text-5xl text-[#1d1d1d] mb-4"
            style={{ fontFamily: "'Reina Neue Display', serif" }}
          >
            Tu enlace es único
          </h2>
          <p className="text-[#1d1d1d]/70 max-w-2xl mx-auto text-sm md:text-base">
            Cada invitado recibirá un enlace personal con su nombre y cupo asignado.
          </p>
        </motion.div>

        <motion.div
          className="max-w-xl mx-auto bg-white border border-[#1d1d1d]/10 rounded-lg p-6 md:p-8 text-center shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#b8894e]/10 mb-5 md:mb-6">
            <svg className="w-7 h-7 md:w-8 md:h-8 text-[#b8894e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5A2.25 2.25 0 0119.5 19.5h-15A2.25 2.25 0 012.25 17.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0l-7.5-4.615A2.25 2.25 0 012.25 6.993V6.75" />
            </svg>
          </div>

          <h3
            className="text-2xl text-[#1d1d1d] mb-3"
            style={{ fontFamily: "'Reina Neue Display', serif" }}
          >
            Revisa el link que recibiste
          </h3>
          <p className="text-[#1d1d1d]/60 mb-6 text-sm md:text-base">
            Si tienes dudas sobre tu invitación o cupo, contacta directamente a los novios.
          </p>

          <a
            href="https://wa.me/573001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center bg-[#1d1d1d] text-white py-4 px-6 rounded-lg hover:bg-[#1d1d1d]/90 transition-all duration-300 font-medium tracking-wide"
          >
            Contactar por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
};
