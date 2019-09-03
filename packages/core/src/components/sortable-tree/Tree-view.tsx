import { Form, INPUT_TYPES, Modal, useModal } from '@codelab/component';
import { ModalIDs } from '@codelab/system';
import { Button } from 'antd';
import React, { Component } from 'react';
import { ApolloConsumer, Mutation } from 'react-apollo';
import SortableTree, {
  addNodeUnderParent,
  changeNodeAtPath,
  getNodeAtPath,
  removeNodeAtPath,
} from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import NodeView from 'src/components/sortable-tree/Node-view';
import NodeTitle from 'src/components/sortable-tree/Node-view--title';
import { MUTATION_UPDATE_PAGE } from 'src/state/apollo-local-state/layout/layoutState';
import { DomModelUtil } from 'src/utils/Dom/Dom-model';
import uuidv1 from 'uuid/v1';

const fields = [
  {
    name: 'title',
    inputType: INPUT_TYPES.Text,
    value: 'My Node',
    type: 'string',
    validation: [
      { required: true, msg: 'Required!!' },
      { min: 2, msg: 'Too Short!' },
      { max: 10, msg: 'Too Long!' },
    ],
  },
];

const submitButton = {
  text: 'Add Node',
};

const MapGridKeysUpdate = {
  Element: 'elements',
  Grid: 'grids',
};

interface IDropMenuProps {
  addNode(): void;

  deleteNode(): void;

  editNode(): void;
}

class TreeView extends Component<any, any> {
  client: any = null;
  oldTreeData: any[];

  constructor(props) {
    super(props);
    this.state = {
      treeData: [this.props.treeData],
    };
    this.oldTreeData = [this.props.treeData];
  }

  setEditPath(path) {
    this.setState({
      editingPath: path,
    });
  }

  getNodeKey = ({ node }) => node.id;

  onSubmit(currentNode, data) {
    data.id = uuidv1();
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newTree = addNodeUnderParent({
          treeData: this.state.treeData,
          newNode: data,
          parentKey: currentNode.id,
          getNodeKey: this.getNodeKey,
        });
        this.setState({ treeData: newTree.treeData });
        resolve();
      }, 0);
    });
  }

  /**
   * Delete current and all children nodes
   */
  deleteNode(path) {
    const treeData = removeNodeAtPath({
      path,
      treeData: this.state.treeData,
      getNodeKey: this.getNodeKey,
    });
    this.setState({ treeData });
  }

  editNode(path) {
    const newNode = null;
    changeNodeAtPath({
      path,
      newNode,
      treeData: this.state.treeData,
    });
  }

  setCurrentNode = node => {
    this.setState({ currentNode: node });
  };

  render() {
    const { toggleModal, closeModal } = useModal(ModalIDs.AddNode);

    return (
      <ApolloConsumer>
        {client => {
          this.client = client;

          return (
            <div style={{ height: '600px' }}>
              <SortableTree
                treeData={this.state.treeData}
                onChange={treeData => {
                  this.oldTreeData = this.state.treeData;
                  this.setState({ treeData });
                }}
                getNodeKey={this.getNodeKey}
                nodeContentRenderer={NodeView}
                onMoveNode={({ node, nextParentNode, prevPath }) => {
                  // path= array of node ids [rootId, ..., parentId,
                  // nodeId]
                  const oldParentNodeId = prevPath[prevPath.length - 2];
                  const oldParentPath = prevPath.slice(0, prevPath.length - 1);
                  const oldParentNode = getNodeAtPath({
                    treeData: this.oldTreeData,
                    path: oldParentPath,
                    getNodeKey: this.getNodeKey,
                  }).node;
                  const sameParent = oldParentNodeId === nextParentNode.id;
                  if (!sameParent) {
                    const domModelUtil = DomModelUtil.createInstance(
                      oldParentNode.typename,
                      { client, node: oldParentNode, childNode: node },
                    );
                    domModelUtil.disconnectChildNode();
                  }

                  const domModelUtil = DomModelUtil.createInstance(
                    nextParentNode.typename,
                    { client, node: nextParentNode, childNode: node },
                  );
                  domModelUtil.updateChildNodePosition(sameParent);
                }}
                generateNodeProps={({ node, path }) => {
                  const editingNode = getNodeAtPath({
                    path: this.state.editingPath,
                    treeData: this.state.treeData,
                    getNodeKey: this.getNodeKey,
                  });

                  if (editingNode) {
                    console.log(editingNode.node.title, node.title);
                  }
                  return {
                    toggleModal,
                    title: () => (
                      <Mutation mutation={MUTATION_UPDATE_PAGE}>
                        {updatePage => {
                          return (
                            <NodeTitle
                              node={node}
                              path={path}
                              editingNode={editingNode}
                              setEditNode={this.setEditPath.bind(this)}
                              setNodeTitle={title => {
                                if (node.typename === 'Page') {
                                  updatePage({
                                    variables: {
                                      data: {
                                        title,
                                      },
                                      where: {
                                        id: node.id,
                                      },
                                    },
                                    refetchQueries: ['getPages'],
                                  });
                                }
                                this.setState({
                                  treeData: changeNodeAtPath({
                                    path,
                                    getNodeKey: this.getNodeKey,
                                    treeData: this.state.treeData,
                                    newNode: { ...node, title },
                                  }),
                                });
                              }}
                            />
                          );
                        }}
                      </Mutation>
                    ),
                    deleteNode: this.deleteNode.bind(this),
                    setCurrentNode: this.setCurrentNode.bind(this),
                  };
                }}
              />

              <Modal id={ModalIDs.AddNode} title="Add Node">
                <Form
                  fields={fields}
                  submitButton={submitButton}
                  onSubmit={this.onSubmit.bind(this, this.state.currentNode)}
                  onComplete={closeModal}
                />
              </Modal>
              <Button type="primary" block={true}>
                Save to Graphcms
              </Button>
            </div>
          );
        }}
      </ApolloConsumer>
    );
  }
}

export default TreeView;
