export const ELEMENT_TYPES = {
  TEXT: 'TEXT',
  BUTTON: 'BUTTON',
  LINK: 'LINK',
  IMAGE: 'IMAGE',
};

export const CONTAINER_TYPES = {
  PAGE: 'Page',
  CONTAINER: 'Container',
  ELEMENT: 'ElementFactory.tsx',
  GRID: 'Grid.tsx',
};

const LEAF_NODES = [
  ELEMENT_TYPES.BUTTON,
  ELEMENT_TYPES.IMAGE,
  ELEMENT_TYPES.LINK,
  ELEMENT_TYPES.TEXT,
];

export const isLeafNode = type => type && LEAF_NODES.includes(type);
