import { useState } from 'react';
import { motion } from 'framer-motion';

// Datos de ejemplo - más adelante esto vendrá de una base de datos
const guestList = [
  { id: 1, apellido: 'García', nombreCompleto: 'Familia García', personas: 4 },
  { id: 2, apellido: 'Rodríguez', nombreCompleto: 'Familia Rodríguez', personas: 3 },
  { id: 3, apellido: 'Martínez', nombreCompleto: 'Familia Martínez', personas: 5 },
  { id: 4, apellido: 'López', nombreCompleto: 'Familia López', personas: 2 },
  { id: 5, apellido: 'González', nombreCompleto: 'Familia González', personas: 6 },
  // ... aquí irían los 200 invitados
];

export const RSVPSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGuests, setFilteredGuests] = useState<typeof guestList>([]);
  const [selectedGuest, setSelectedGuest] = useState<typeof guestList[0] | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.length >= 2) {
      const filtered = guestList.filter(guest =>
        guest.apellido.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredGuests(filtered);
      setShowResults(true);
    } else {
      setShowResults(false);
      setFilteredGuests([]);
    }
  };

  const handleSelectGuest = (guest: typeof guestList[0]) => {
    setSelectedGuest(guest);
    setSearchTerm(guest.apellido);
    setShowResults(false);
  };

  const handleViewInvitation = () => {
    if (selectedGuest) {
      // Redirigir a la invitación personalizada
      window.location.href = `/invitacion/${selectedGuest.nombreCompleto.toLowerCase().replace(/ /g, '-')}`;
    }
  };

  return (
    <section className="py-24 bg-[#f4f3ef]" id="confirmar-asistencia">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#1d1d1d]/50 tracking-[0.3em] uppercase text-sm mb-4">
            Encuentra tu invitación
          </p>
          <h2
            className="text-4xl md:text-5xl text-[#1d1d1d] mb-4"
            style={{ fontFamily: "'Reina Neue Display', serif" }}
          >
            Confirmar Asistencia
          </h2>
          <p className="text-[#1d1d1d]/70 max-w-2xl mx-auto">
            Busca tu apellido para acceder a tu invitación personalizada
          </p>
        </motion.div>

        <motion.div
          className="max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Buscador */}
          <div className="relative mb-6">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Escribe tu apellido..."
                className="w-full px-6 py-4 pr-12 text-lg bg-white border-2 border-[#1d1d1d]/10 rounded-lg focus:outline-none focus:border-[#b8894e] transition-colors"
                style={{ fontFamily: "'Reina Neue Display', serif" }}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <svg className="w-6 h-6 text-[#1d1d1d]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Resultados de búsqueda */}
            {showResults && filteredGuests.length > 0 && (
              <motion.div
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-[#1d1d1d]/10 overflow-hidden z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {filteredGuests.map((guest) => (
                  <button
                    key={guest.id}
                    onClick={() => handleSelectGuest(guest)}
                    className="w-full px-6 py-4 text-left hover:bg-[#f4f3ef] transition-colors border-b border-[#1d1d1d]/5 last:border-0"
                  >
                    <p className="text-[#1d1d1d] font-medium">{guest.nombreCompleto}</p>
                    <p className="text-[#1d1d1d]/50 text-sm">{guest.personas} personas</p>
                  </button>
                ))}
              </motion.div>
            )}

            {showResults && filteredGuests.length === 0 && searchTerm.length >= 2 && (
              <motion.div
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-[#1d1d1d]/10 p-6 z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-[#1d1d1d]/60 text-center">
                  No se encontraron resultados. Intenta con otro apellido.
                </p>
              </motion.div>
            )}
          </div>

          {/* Tarjeta de invitación seleccionada */}
          {selectedGuest && (
            <motion.div
              className="bg-white rounded-lg shadow-lg border border-[#1d1d1d]/10 p-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#b8894e]/10 mb-4">
                  <svg className="w-8 h-8 text-[#b8894e]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm-1-11h2v6h-2zm0 8h2v2h-2z"/>
                  </svg>
                </div>
                <h3
                  className="text-2xl text-[#1d1d1d] mb-2"
                  style={{ fontFamily: "'Reina Neue Display', serif" }}
                >
                  {selectedGuest.nombreCompleto}
                </h3>
                <p className="text-[#1d1d1d]/60">
                  Invitación para {selectedGuest.personas} {selectedGuest.personas === 1 ? 'persona' : 'personas'}
                </p>
              </div>

              <button
                onClick={handleViewInvitation}
                className="w-full bg-[#1d1d1d] text-white py-4 px-6 rounded-lg hover:bg-[#1d1d1d]/90 transition-all duration-300 font-medium tracking-wide"
              >
                Ver Mi Invitación
              </button>
            </motion.div>
          )}

          {/* Mensaje de ayuda */}
          <motion.p
            className="text-center text-[#1d1d1d]/50 text-sm mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            ¿No encuentras tu apellido? Contáctanos por WhatsApp
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
