// import * as fs from 'fs';
// import * as path from 'path';

// const prismaReplicaSchemaPath = path.resolve(__dirname, '../../prisma/replica/schema.prisma');
// const outputDir = path.resolve(__dirname, '../replica/src/dtos'); // Change if needed


// if (!fs.existsSync(outputDir)) {
//     fs.mkdirSync(outputDir, { recursive: true });
//   }
  
//   const schema = fs.readFileSync(prismaReplicaSchemaPath, 'utf-8');
  
//   const modelRegex = /model\s+(\w+)\s+{([^}]*)}/g;
//   const fieldRegex = /^\s*([\w_]+)\s+([\w_]+)(\?)?[^@=]*(?:@.*)?$/gm;
// //   const fieldRegex = /^\s*(\w+)\s+([\w\d]+)(\?)?[^@=]*(?:@.*)?$/gm;
  
//   const swaggerTypeMap: Record<string, string> = {
//     String: 'string',
//     Int: 'number',
//     Float: 'number',
//     Boolean: 'boolean',
//     DateTime: 'string',
//     Json: 'object',
//   };
  
//   function toSwaggerType(prismaType: string): string {
//     return swaggerTypeMap[prismaType] || 'any';
//   }
  
//   let match;
//   while ((match = modelRegex.exec(schema)) !== null) {
//     console.log('MATCH:', match[1], match[2], match[3] === '?' ? 'optional' : 'required');
//     const [_, modelName, body] = match;
  
//     const createFields: string[] = [];
  
//     let fieldMatch;
//     while ((fieldMatch = fieldRegex.exec(body)) !== null) {
//       const [__, name, type, optionalFlag] = fieldMatch;
  
//       // Skip these fields unless you want them
//       if (['id', 'createdAt', 'updatedAt'].includes(name)) continue;
  
//       const isOptional = optionalFlag === '?';
//       const swaggerType = toSwaggerType(type);
  
//       createFields.push(
//         `  @ApiProperty(${isOptional ? '{ required: false }' : ''})\n  ${name}${isOptional ? '?' : ''}: ${swaggerType};`
//       );
//     }
  
//     const createDto = `
//   import { ApiProperty } from '@nestjs/swagger';
  
//   export class Create${modelName}Dto {
//   ${createFields.join('\n')}
//   }
//   `.trim();
  
//     const updateDto = `
//   import { PartialType } from '@nestjs/swagger';
//   import { Create${modelName}Dto } from './create-${modelName.toLowerCase()}.dto';
  
//   export class Update${modelName}Dto extends PartialType(Create${modelName}Dto) {}
//   `.trim();
  
//     fs.writeFileSync(path.join(outputDir, `create-${modelName.toLowerCase()}.dto.ts`), createDto);
//     fs.writeFileSync(path.join(outputDir, `update-${modelName.toLowerCase()}.dto.ts`), updateDto);
  
//     console.log(`✔ Generated DTOs for model: ${modelName}`);
// }
import * as fs from 'fs';
import * as path from 'path';

const prismaReplicaSchemaPath = path.resolve(__dirname, '../../prisma/replica/schema.prisma');
const outputDir = path.resolve(__dirname, '../replica/src/dtos');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const schema = fs.readFileSync(prismaReplicaSchemaPath, 'utf-8');

const modelRegex = /model\s+(\w+)\s+{([\s\S]*?)}/g; // Handles multi-line model bodies

const swaggerTypeMap: Record<string, string> = {
  String: 'string',
  Int: 'number',
  Float: 'number',
  Boolean: 'boolean',
  DateTime: 'string',
  Json: 'object',
};

function toSwaggerType(prismaType: string): string {
  return swaggerTypeMap[prismaType] || 'any';
}

let match;
while ((match = modelRegex.exec(schema)) !== null) {
  const [_, modelName, body] = match;

  const lines = body.split('\n').map(l => l.trim());
  const createFields: string[] = [];

  for (const line of lines) {
    // Skip empty, comment, map, and index lines
    if (
      !line ||
      line.startsWith('//') ||
      line.startsWith('@@') ||
      line.includes('@relation') ||
      line.includes('Account ') || // example relation model
      line.includes('[]') || // likely relation array
      line.includes('@default') ||
      line.includes('@id')
    ) continue;

    const parts = line.split(/\s+/);
    if (parts.length < 2) continue;

    const [name, rawType] = parts;
    if (['id', 'createdAt', 'updatedAt'].includes(name)) continue;

    const isOptional = rawType.endsWith('?');
    const prismaType = isOptional ? rawType.slice(0, -1) : rawType;
    const swaggerType = toSwaggerType(prismaType);

    createFields.push(
      `  @ApiProperty(${isOptional ? '{ required: false }' : ''})\n  ${name}${isOptional ? '?' : ''}: ${swaggerType};`
    );
  }

  const createDto = `
import { ApiProperty } from '@nestjs/swagger';

export class Create${modelName}Dto {
${createFields.join('\n')}
}
`.trim();

  const updateDto = `
import { PartialType } from '@nestjs/swagger';
import { Create${modelName}Dto } from './create-${modelName.toLowerCase()}.dto';

export class Update${modelName}Dto extends PartialType(Create${modelName}Dto) {}
`.trim();

  fs.writeFileSync(path.join(outputDir, `create-${modelName.toLowerCase()}.dto.ts`), createDto);
  fs.writeFileSync(path.join(outputDir, `update-${modelName.toLowerCase()}.dto.ts`), updateDto);

  console.log(`✔ Generated DTOs for model: ${modelName}`);
}
