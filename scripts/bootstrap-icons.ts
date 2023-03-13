import fs from 'fs';
import path from 'path';

let code = `import FreeIcon from '../free-icon';

export default [`;

const folderPath = path.join(__dirname, '..', 'node_modules', 'bootstrap-icons', 'icons');
const files = fs.readdirSync(folderPath);
for (const filePath of files) {
  if (!filePath.endsWith('.svg')) {
    continue;
  }
  let iconName = filePath.substring(0, filePath.length - 4);
  let category = 'outline';
  if (iconName.endsWith('-fill')) {
    category = 'fill';
    iconName = iconName.substring(0, iconName.length - 5);
  }
  const svg = fs.readFileSync(path.join(folderPath, filePath), 'utf-8');
  const m = svg.match(/<svg .+?>(.+?)<\/svg>/s);
  if (m === null) {
    throw new Error('Cannot find the matched SVG Pattern: ' + svg);
  }
  code += `\n  new FreeIcon(['bootstrap-icons', '${category}', '${iconName}'], '${m[1]
    .split('\n')
    .map((l) => l.trim())
    .join('')}', 18),`;
}

code += '\n]';
fs.writeFileSync(path.join(__dirname, '..', 'src', 'generated', 'bootstrap-icons.ts'), code);
