import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const artifactToolModule = process.env.ARTIFACT_TOOL_MODULE ?? '@oai/artifact-tool';
const { SpreadsheetFile, Workbook } = await import(artifactToolModule);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const guestsPath = path.join(projectRoot, 'src', 'data', 'guests.ts');
const outputDir = path.join(projectRoot, 'outputs');
const outputPath = path.join(outputDir, 'links-invitados-marce-pipe.xlsx');
const baseUrl = process.argv[2] ?? 'http://localhost:4321';

const guestsSource = await fs.readFile(guestsPath, 'utf8');
const match = guestsSource.match(/export const guests = (\[[\s\S]*?\]) as const satisfies/);

if (!match) {
  throw new Error('Could not read guests array from src/data/guests.ts');
}

const guests = JSON.parse(match[1]);
const workbook = Workbook.create();
const sheet = workbook.worksheets.add('Links Invitados');

sheet.getRange('A1:B1').values = [['Nombre invitado', 'Link invitacion']];
sheet.getRangeByIndexes(1, 0, guests.length, 2).values = guests.map((guest) => [
  guest.name,
  `${baseUrl.replace(/\/$/, '')}/invitacion/${guest.id}`,
]);

const usedRange = sheet.getRangeByIndexes(0, 0, guests.length + 1, 2);
usedRange.format.borders = { preset: 'all', style: 'thin', color: '#D9D9D9' };
sheet.getRange('A1:B1').format = {
  fill: '#1d1d1d',
  font: { bold: true, color: '#FFFFFF' },
};
sheet.getRangeByIndexes(1, 1, guests.length, 1).format.font = { color: '#1f4903' };
sheet.getRange('A:B').format.autofitColumns();

await fs.mkdir(outputDir, { recursive: true });
const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(outputPath);

console.log(`Created ${outputPath}`);
