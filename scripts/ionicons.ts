import fs from 'fs';
import path from 'path';

let code = `import FreeIcon from '../free-icon';

export default [`;

const folderPath = path.join(__dirname, '..', 'node_modules', 'ionicons', 'dist', 'svg');
const files = fs.readdirSync(folderPath);
for (const filePath of files) {
  if (!filePath.endsWith('.svg')) {
    continue;
  }
  let iconName = filePath.substring(0, filePath.length - 4);
  let category = 'filled';
  if (iconName.endsWith('-outline')) {
    category = 'outline';
    iconName = iconName.substring(0, iconName.length - 8);
  } else if (iconName.endsWith('-sharp')) {
    category = 'sharp';
    iconName = iconName.substring(0, iconName.length - 6);
  }
  const svg = fs.readFileSync(path.join(folderPath, filePath), 'utf-8');
  const m = svg.match(/<svg .+?>(.+?)<\/svg>/);
  if (m === null) {
    throw new Error('Cannot find the matched SVG Pattern: ' + svg);
  }
  code += `\n  new FreeIcon(['ionicons', '${category}', '${iconName}'], '${m[1]}', 0.5),`;
}

code += '\n]';
fs.writeFileSync(path.join(__dirname, '..', 'src', 'generated', 'ionicons.ts'), code);
