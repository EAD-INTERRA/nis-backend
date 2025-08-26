import * as fs from 'fs';
import * as path from 'path';

const schemaPath = path.join(__dirname, '../../../../prisma/core/schema.prisma');

console.log('Generating Resource enum from Prisma schema... ', schemaPath);

const schema = fs.readFileSync(schemaPath, 'utf8');

const modelRegex = /^model\s+([^\s{]+)/gm;
let match;
const models: { key: string; value: string }[] = [];
while ((match = modelRegex.exec(schema)) !== null) {
  const original = match[1];
  const key = original
    .replace(/([A-Z])/g, '_$1')
    .replace(/^\_/, '')
    .toUpperCase();
  const value = original.replace(/([A-Z])/g, '_$1').replace(/^\_/, '').toLowerCase();
  models.push({ key, value });
}

const permissionLevels = ['VIEW', 'LIST', 'CREATE', 'UPDATE', 'ARCHIVE'];

const enumContent = `export enum RESOURCE {
${models.map(m => `  ${m.key} = '${m.value}'`).join(',\n')}
}

export enum PERMISSION {
${permissionLevels.map(lvl => `  ${lvl} = '${lvl.toLowerCase()}'`).join(',\n')}
}
`;

const permissionSeedData = [];
for (const resource of models) {
  for (const level of permissionLevels) {
    permissionSeedData.push(`  { resource: RESOURCE.${resource.key}, level: PERMISSION.${level} }`);
  }
}

const permissionSeedContent = `import { RESOURCE, PERMISSION } from "./resource.enum";

export const PERMISSION_SEED_DATA = [
${permissionSeedData.join(',\n')}
];
`;

const outputDir = path.join(__dirname, '../data/generated');
const enumOutputPath = path.join(outputDir, 'resource.enum.ts');
const seedOutputPath = path.join(__dirname, '../data/generated/permission.data.ts');

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(enumOutputPath, enumContent);
fs.writeFileSync(seedOutputPath, permissionSeedContent);

console.log('Resource enum and PERMISSION_SEED_DATA generated!');