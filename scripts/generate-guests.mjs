import fs from 'node:fs';
import path from 'node:path';

const inputPath = process.argv[2] ?? 'LISTA DE INVITADOS - Hoja 1.csv';
const outputPath = process.argv[3] ?? 'src/data/guests.ts';

const excludedHeaders = new Set([
  '',
  'NOVIOS',
  'TOTAL',
  'DUDOSOS',
  'POSIBLEMENTE',
  'MUSICOS',
]);

const parseCsvLine = (line) => {
  const values = [];
  let current = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const nextChar = line[index + 1];

    if (char === '"' && inQuotes && nextChar === '"') {
      current += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === ',' && !inQuotes) {
      values.push(current);
      current = '';
      continue;
    }

    current += char;
  }

  values.push(current);
  return values;
};

const toId = (name) =>
  name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const csv = fs.readFileSync(inputPath, 'utf8').replace(/^\uFEFF/, '');
const rows = csv.trimEnd().split(/\r?\n/).map(parseCsvLine);
const headers = rows[0].map((header) => header.trim());
const includedColumns = headers
  .map((header, index) => ({ header, index }))
  .filter(({ header }) => !excludedHeaders.has(header));

const guests = rows
  .slice(1)
  .flatMap((row) =>
    includedColumns.map(({ header, index }) => ({
      group: header,
      name: (row[index] ?? '').trim(),
    }))
  )
  .filter((guest) => guest.name && !/^\d+$/.test(guest.name))
  .map((guest) => ({
    id: toId(guest.name),
    name: guest.name,
    seats: 1,
    group: guest.group,
  }));

const duplicateIds = guests
  .map((guest) => guest.id)
  .filter((id, index, ids) => ids.indexOf(id) !== index);

if (duplicateIds.length > 0) {
  throw new Error(`Duplicate guest ids found: ${[...new Set(duplicateIds)].join(', ')}`);
}

const source = `export interface Guest {
  id: string;
  name: string;
  seats: number;
  group: string;
}

export const guests = ${JSON.stringify(guests, null, 2)} as const satisfies readonly Guest[];

const guestsById = new Map<string, Guest>(guests.map((guest) => [guest.id, guest]));

export const getGuestById = (guestId: string | undefined): Guest | undefined => {
  if (!guestId) return undefined;

  return guestsById.get(guestId);
};

export const getInvitationPath = (guest: Guest) => \`/invitacion/\${guest.id}\`;
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, source, 'utf8');

console.log(`Generated ${guests.length} guests in ${outputPath}`);
