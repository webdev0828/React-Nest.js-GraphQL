import { cloneDeep, get, isEmpty, set } from 'lodash';
import { CONTAINER_TYPES } from 'src/components/DomComponent/Dom-config--types';

const mapTypenameToChildrenKeys = {
  [CONTAINER_TYPES.PAGE]: ['containers'],
  [CONTAINER_TYPES.CONTAINER]: ['grids'],
  [CONTAINER_TYPES.GRID]: ['grids', 'elements'],
};

const haveChildren = node => {
  if (!mapTypenameToChildrenKeys[node.typename]) return false;
  const childrenKeys = mapTypenameToChildrenKeys[node.typename];
  for (let i = 0; i < childrenKeys.length; i += 1) {
    const key = childrenKeys[i];
    const children = node[key];
    if (!isEmpty(children)) return true;
  }
  return false;
};

const getNodeTitle = node => {
  if (node.typename === 'ElementFactory.tsx') {
    return `${node.typename}-${node.component.type}`;
  }
  return `${node.typename}`;
};

export const toTreeModel = (domNode, model: any = {}) => {
  const clonedNode = cloneDeep(domNode);
  // if have children
  if (haveChildren(clonedNode)) {
    const childrenKeys = mapTypenameToChildrenKeys[clonedNode.typename];
    if (!model.children) model.children = [];
    childrenKeys.forEach(key => {
      model.children = model.children.concat(clonedNode[key]);
      // .map(childNode => {
      //   const key = childNode.id;
      //   const title = getNodeTitle(childNode);
      //   const childrenKeys = mapTypenameToChildrenKeys[childNode.__typename];
      //   let children = [];
      //   if (haveChildren(childNode)) {
      //     childrenKeys.forEach(key => {
      //       children = children.concat(childNode[key]);
      //     });
      //   }

      //   return {
      //     key,
      //     title,
      //     children,
      //   };
      // });
    });
  }
  if (!isEmpty(model.children)) {
    model.children.forEach(childNode => {
      const domNode = { ...childNode };
      toTreeModel(domNode, childNode);
    });
  }
  if (!model.key) model.key = clonedNode.id;

  model.title = clonedNode.title || getNodeTitle(domNode);
  model.key = clonedNode.key || clonedNode.id;

  delete model.containers;
  delete model.grids;
  delete model.elements;

  return model;
};

export const traverseDom = (domNode, callback, path = '') => {
  // pick up wanted property except children
  const shouldPickKeys = ['id', 'title', '__typename', 'type', 'component'];

  shouldPickKeys.forEach(shouldPickKey => {
    const keyPath = path === '' ? shouldPickKey : `${path}.${shouldPickKey}`;
    const keyValue = domNode[shouldPickKey];
    if (keyValue) {
      callback(keyValue, keyPath);
    }
  });

  const childrenKeys = mapTypenameToChildrenKeys[domNode.typename] || [];
  let children: any = [];

  childrenKeys.forEach(childrenKey => {
    children = children.concat(domNode[childrenKey]);
  });

  children.forEach((child, index) => {
    const nextPath =
      path === '' ? `children[${index}]` : `${path}.children[${index}]`;
    if (child) {
      traverseDom(child, callback, nextPath);
    }
  });
};

export const domToTreeModel = page => {
  const treeModel = {};
  traverseDom(page, (value, keyPath: string) => {
    if (keyPath.includes('component')) {
      // update title of element type
      const titlePath = keyPath.replace('component', 'title');
      const titleValue = `${get(treeModel, titlePath)}-${value.type}`;
      set(treeModel, titlePath, titleValue);
      return;
    }
    if (!(keyPath.includes('__typename') && value === 'Page')) {
      set(treeModel, keyPath.replace('__typename', 'title'), value);
    }
    set(treeModel, keyPath, value);
  });
  return treeModel;
};
