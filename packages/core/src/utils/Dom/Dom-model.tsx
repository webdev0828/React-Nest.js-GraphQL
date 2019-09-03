import { filter, includes } from 'lodash';
import {
  MUTATION_UPDATE_CONTAINER,
  MUTATION_UPDATE_GRID,
  MUTATION_UPDATE_PAGE,
} from 'src/state/apollo-local-state/layout/layoutState';

export class DomModelUtil {
  query: any;
  mutation: any;
  client: any;
  node: any;
  childNode: any;

  updateChildNodePosition(sameParent) {
    const where = {
      id: this.node.id,
    };
    const updateMany = this.generateChildrenOrderInput();
    const childrenKeys = this.getChildrenKeys();
    const dataUpdate: any = {
      [childrenKeys]: {
        updateMany,
      },
    };
    if (!sameParent) {
      dataUpdate[childrenKeys].connect = [{ id: this.childNode.id }];
    }
    return this.client!.mutate({
      mutation: this.mutation.update,
      variables: {
        where,
        data: dataUpdate,
      },
      refetchQueries: ['getPages'],
    });
  }

  disconnectChildNode() {
    const childrenKeys = this.getChildrenKeys();
    return this.client.mutate({
      mutation: this.mutation.update,
      variables: {
        where: {
          id: this.node.id,
        },
        data: {
          [childrenKeys]: {
            disconnect: [
              {
                id: this.childNode.id,
              },
            ],
          },
        },
      },
      refetchQueries: ['getPages'],
    });
  }

  delete() {}

  generateChildrenOrderInput = () => {
    const childTypes = [this.childNode.typename];
    return filter(this.node.children, ({ __typename }) =>
      includes(childTypes, __typename),
    ).map(({ id }: any, index: any) => {
      return {
        data: {
          index,
        },
        where: {
          id,
        },
      };
    });
  };

  public static createInstance(type, { node, childNode, client }) {
    switch (type) {
      case 'Grid.tsx':
        return new GridModel(node, childNode, client);
      case 'Container':
        return new ContainerModel(node, childNode, client);
      case 'Page':
        return new PageModel(node, childNode, client);
      default: {
        throw new Error('type of node must be specificed');
      }
    }
  }

  getChildrenKeys() {
    switch (this.childNode.typename) {
      case 'Container':
        return 'containers';
      case 'Grid.tsx':
        return 'grids';
      case 'ElementFactory.tsx':
        return 'elements';
      default:
        throw new Error("child does'nt exists ");
    }
  }
}

class PageModel extends DomModelUtil {
  mutation = {
    update: MUTATION_UPDATE_PAGE,
  };

  constructor(node = null, childNode = null, client = null) {
    super();
    this.node = node;
    this.childNode = childNode;
    this.client = client;
  }
}

class ContainerModel extends DomModelUtil {
  mutation = {
    update: MUTATION_UPDATE_CONTAINER,
  };

  constructor(node = null, childNode = null, client = null) {
    super();
    this.node = node;
    this.childNode = childNode;
    this.client = client;
  }
}

class GridModel extends DomModelUtil {
  mutation = {
    update: MUTATION_UPDATE_GRID,
  };

  constructor(node = null, childNode = null, client = null) {
    super();
    this.node = node;
    this.childNode = childNode;
    this.client = client;
  }
}
