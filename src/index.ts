import fontawesome from './generated/font-awesome';
import materialIcons from './generated/material-icons';
import { convertArrayToTree, TreeNode } from './utils';

const icons = [...fontawesome, ...materialIcons];

export const tree: TreeNode[] = convertArrayToTree(icons.map((icon) => icon.cascade));

export const map: { [key: string]: string } = {};
for (const icon of icons) {
  map[icon.cascade.join('>')] = icon.svgPath;
}

export default icons;
