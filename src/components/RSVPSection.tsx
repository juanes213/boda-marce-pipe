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
      </div>
    </section>
  );
};
