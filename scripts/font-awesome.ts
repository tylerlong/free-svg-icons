import { fas, IconPack } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import path from 'path';
import fs from 'fs';

let code = `import FreeIcon from '../free-icon';

export default [`;
const gather = (category: string, iconPack: IconPack) => {
  for (const key of Object.keys(iconPack)) {
    const icon = iconPack[key];
    let ds = icon.icon[4];
    if (!Array.isArray(ds)) {
      ds = [ds];
    }
    const paths = ds.map((d) => `<path d="${d}"/>`).join('');
    code += `\n  new FreeIcon(['font-awesome', '${category}', '${icon.iconName}'], '${paths}', 0.5),`;
  }
};
gather('solid', fas);
gather('regular', far);
gather('brands', fab);

code += '\n]';
fs.writeFileSync(path.join(__dirname, '..', 'src', 'generated', 'font-awesome.ts'), code);
