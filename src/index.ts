import fontawesome from './generated/font-awesome';
import materialIcons from './generated/material-icons';
import { convertArrayToTree, TreeNode } from './utils';

const icons = [...fontawesome, ...materialIcons];
icons.sort((a, b) => {
  return a.path.join('').localeCompare(b.path.join(''));
});

export const tree: TreeNode[] = convertArrayToTree(icons.map((icon) => icon.path));

export const map: { [key: string]: string } = {};
for (const icon of icons) {
  map[icon.path.join('>')] = icon.svgGroup;
}

export default icons;
