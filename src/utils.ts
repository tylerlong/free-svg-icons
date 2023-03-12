const convertArrayToObject = (arr: string[][]): any => {
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
};

export interface TreeNode {
  value: string;
  label: string;
  children?: TreeNode[];
}

const convertObjectToTree = (obj: any): TreeNode[] => {
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
};

export const convertArrayToTree = (arr: string[][]): TreeNode[] => {
  return convertObjectToTree(convertArrayToObject(arr));
};
