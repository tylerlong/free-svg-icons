import fs from 'fs';
import path from 'path';

let code = `import FreeIcon from '../free-icon';

export default [`;

const folderPath = path.join(__dirname, '..', 'node_modules', 'feather-icons', 'dist', 'icons');
const files = fs.readdirSync(folderPath);
for (const filePath of files) {
  if (!filePath.endsWith('.svg')) {
    continue;
  }
  const iconName = filePath.substring(0, filePath.length - 4);
  const svg = fs.readFileSync(path.join(folderPath, filePath), 'utf-8');
  const m = svg.match(/<svg .+?>(.+?)<\/svg>/);
  if (m === null) {
    throw new Error('Cannot find the matched SVG Pattern: ' + svg);
  }
  code += `\n  new FreeIcon(['feather-icons', '${iconName}'], '${m[1]}', 12),`;
}

code += '\n]';
fs.writeFileSync(path.join(__dirname, '..', 'src', 'generated', 'feather-icons.ts'), code);
