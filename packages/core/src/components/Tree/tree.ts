class TreeModel {
  tree: any;

  constructor() {
    this.tree = {};
  }

  insertNode(tree, nodeToInsert, rootNodeName) {
    for (const k in tree) {
      if (k === 'name' && tree[k] === rootNodeName) {
        if (!tree.children) {
          tree.children = [];
        }
        tree.children.push(nodeToInsert);
        return this.tree;
      }
      if (tree[k] && typeof tree[k] === 'object') {
        this.insertNode(tree[k], nodeToInsert, rootNodeName);
      }
    }
  }
  addRoot(rootNode) {
    this.tree = rootNode;
  }
}

const exampleTree = new TreeModel();

exampleTree.addRoot({ name: 'Container' });
exampleTree.insertNode(exampleTree.tree, { name: 'HomePage' }, 'Container');
exampleTree.insertNode(exampleTree.tree, { name: 'AboutPage' }, 'Container');
exampleTree.insertNode(exampleTree.tree, { name: 'Contact' }, 'Container');
exampleTree.insertNode(
  exampleTree.tree,
  { name: 'AboutPageDeveloper' },
  'AboutPage',
);

export default exampleTree.tree;
