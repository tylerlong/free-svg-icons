import fontawesome from './font-awesome';
import materialIcons from './material-icons';

const icons = [...fontawesome, ...materialIcons];

function convertArrayToObject(arr: string[][]): any {
  const obj: any = {};
  for (const subArr of arr) {
    let currentNode = obj;
    for (const value of subArr) {
      if (!currentNode[value]) {
        currentNode[value] = {};
      }
      currentNode = currentNode[value];
    }
  }
  return obj;
}

interface TreeNode {
  value: string;
  label: string;
  children?: TreeNode[];
}

function convertObjectToTree(obj: any): TreeNode[] {
  const tree: TreeNode[] = [];
  for (const key of Object.keys(obj)) {
    const node: TreeNode = { value: key, label: key };
    const children = obj[key];
    if (children && typeof children === 'object' && Object.keys(children).length > 0) {
      node.children = convertObjectToTree(children);
    }
    tree.push(node);
  }
  return tree;
}

export const tree = convertObjectToTree(convertArrayToObject(icons.map((icon) => icon.cascade)));

export const map: { [key: string]: string } = {};
for (const icon of icons) {
  map[icon.cascade.join('>')] = icon.svgPath;
}

export default icons;
