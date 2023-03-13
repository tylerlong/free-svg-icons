import FreeIcon from './free-icon';
import fontawesome from './generated/font-awesome';
import materialIcons from './generated/material-icons';
import ionicons from './generated/ionicons';
import featherIcons from './generated/feather-icons';
import bootstrapIcons from './generated/bootstrap-icons';
import { convertArrayToTree, TreeNode } from './utils';

const icons = [...fontawesome, ...materialIcons, ...ionicons, ...featherIcons, ...bootstrapIcons];
icons.sort((a, b) => {
  return a.path.join('').localeCompare(b.path.join(''));
});

export const tree: TreeNode[] = convertArrayToTree(icons.map((icon) => icon.path));

export const map: { [key: string]: FreeIcon } = {};
for (const icon of icons) {
  map[icon.path.join('>')] = icon;
}

// for (const icon of icons) {
//   if (icon.path[0] === 'bootstrap-icons') {
//     console.log(icon);
//     break;
//   }
// }

export default icons;
