import fs from 'fs';
import path from 'path';

const categories = ['filled', 'outlined', 'round', 'sharp', 'two-tone'];

let code = `import FreeIcon from '../free-icon';

export default [`;

for (const category of categories) {
  const folderPath = path.join(__dirname, '..', 'node_modules', '@material-design-icons', 'svg', category);
  const files = fs.readdirSync(folderPath);
  for (const filePath of files) {
    if (!filePath.endsWith('.svg')) {
      continue;
    }
    const iconName = filePath.substring(0, filePath.length - 4).replace(/_/g, '-');
    const svg = fs.readFileSync(path.join(folderPath, filePath), 'utf-8');
    const m = svg.match(/<svg .+?>(.+?)<\/svg>/);
    if (m === null) {
      throw new Error('Cannot find the matched SVG Pattern: ' + svg);
    }
    code += `\n  new FreeIcon(['material-icons', '${category}', '${iconName}'], '${m[1].trim()}', 12),`;
  }
}

code += '\n]';
fs.writeFileSync(path.join(__dirname, '..', 'src', 'generated', 'material-icons.ts'), code);
