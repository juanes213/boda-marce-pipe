import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { getInvitationPath, guests, type Guest } from '../data/guests';

const normalizeSearch = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const repairMojibake = (value: string) => {
  if (!/[ÃÂ]/.test(value)) return value;

  try {
    const bytes = Uint8Array.from(value, (char) => char.charCodeAt(0));
    return new TextDecoder('utf-8').decode(bytes);
  } catch {
    return value;
  }
};

const getGuestName = (guest: Guest) => repairMojibake(guest.name);

const getScore = (query: string, guest: Guest) => {
  const name = normalizeSearch(getGuestName(guest));
  const slug = normalizeSearch(guest.id.replace(/-/g, ' '));

  if (!query) return 0;
  if (name === query || slug === query) return 100;
  if (name.startsWith(query) || slug.startsWith(query)) return 80;
  if (name.includes(query) || slug.includes(query)) return 60;

  const tokens = query.split(' ').filter(Boolean);
  if (tokens.length && tokens.every((token) => name.includes(token) || slug.includes(token))) {
    return 40;
  }

  return 0;
};

export const GuestSearch = () => {
  const [query, setQuery] = useState('');
  const normalizedQuery = normalizeSearch(query);

  const suggestions = useMemo(() => {
    if (normalizedQuery.length < 2) return [];

    return guests
      .map((guest) => ({ guest, score: getScore(normalizedQuery, guest) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score || getGuestName(a.guest).localeCompare(getGuestName(b.guest)))
      .slice(0, 5)
      .map(({ guest }) => guest);
  }, [normalizedQuery]);

  const showNoResults = normalizedQuery.length >= 2 && suggestions.length === 0;

  const handleSelect = (guest: Guest) => {
    window.location.href = getInvitationPath(guest);
  };

  return (
    <section id="buscar-invitacion" className="bg-[#f4f3ef] px-4 py-16 md:py-24">
      <motion.div
        className="mx-auto max-w-3xl text-center"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >
        <p className="mb-3 text-xs uppercase tracking-[0.32em] text-[#213500]/70">
          Listado de invitados
        </p>
        <h2 className="font-['Reina_Neue_Display',serif] text-4xl text-[#1d1d1d] md:text-5xl">
          Busca tu invitación
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#1d1d1d]/65 md:text-base">
          Escribe tu nombre y selecciona tu resultado para abrir tu carta personalizada.
        </p>

        <div className="relative mx-auto mt-8 max-w-xl">
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Escribe tu nombre"
            aria-label="Buscar invitación por nombre"
            className="w-full rounded-full border border-[#1d1d1d]/15 bg-white px-6 py-4 text-center text-base text-[#1d1d1d] shadow-[0_18px_45px_rgba(29,29,29,0.08)] outline-none transition focus:border-[#213500] focus:ring-4 focus:ring-[#213500]/10"
          />

          {(suggestions.length > 0 || showNoResults) && (
            <div className="absolute left-0 right-0 top-[calc(100%+0.75rem)] z-20 overflow-hidden rounded-2xl border border-[#1d1d1d]/10 bg-white text-left shadow-[0_22px_55px_rgba(29,29,29,0.14)]">
              {suggestions.map((guest) => (
                <button
                  key={guest.id}
                  type="button"
                  onClick={() => handleSelect(guest)}
                  className="block w-full border-b border-[#1d1d1d]/8 px-5 py-4 text-left transition last:border-b-0 hover:bg-[#f4f3ef] focus:bg-[#f4f3ef] focus:outline-none"
                >
                  <span className="block text-base font-medium text-[#1d1d1d]">{getGuestName(guest)}</span>
                  <span className="mt-1 block text-xs uppercase tracking-[0.18em] text-[#213500]/65">
                    Abrir invitación
                  </span>
                </button>
              ))}

              {showNoResults && (
                <div className="px-5 py-5 text-center text-sm text-[#1d1d1d]/65">
                  No encontramos tu nombre. Contacta a los novios.
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};
