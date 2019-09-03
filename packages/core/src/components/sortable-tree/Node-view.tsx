/* tslint:disable */
import { ModalIDs } from '@codelab/system';
import { Button, Popconfirm, Popover } from 'antd';
import classnames from 'classnames';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
// import { isDescendant } from '/utils/tree-data-utils';
import { isDescendant } from 'react-sortable-tree';

const MUTATION_DELETE_GRID = gql`
  mutation DeleteGrid($where: GridWhereUniqueInput!) {
    deleteGrid(where: $where) {
      id
    }
  }
`;
const MUTATION_DELETE_ELEMENT = gql`
  mutation DeleteGrid($where: GridWhereUniqueInput!) {
    deleteGrid(where: $where) {
      id
    }
  }
`;
const MUTATION_DELETE_CONTAINER = gql`
  mutation DeleteGrid($where: GridWhereUniqueInput!) {
    deleteGrid(where: $where) {
      id
    }
  }
`;

//
class NodeView extends Component<any, any> {
  render() {
    const {
      scaffoldBlockPxWidth,
      toggleChildrenVisibility,
      connectDragPreview,
      connectDragSource,
      isDragging,
      canDrop,
      canDrag,
      node,
      title,
      subtitle,
      draggedNode,
      path,
      treeIndex,
      isSearchMatch,
      isSearchFocus,
      buttons,
      className,
      style,
      didDrop,
      treeId,
      isOver, // Not needed, but preserved for other renderers
      parentNode, // Needed for dndManager
      rowDirection,
      deleteNode,
      setCurrentNode,
      toggleModal,
      ...otherProps
    } = this.props;
    const nodeTitle = title || node.title;
    const nodeSubtitle = subtitle || node.subtitle;
    const rowDirectionClass = rowDirection === 'rtl' ? 'rst__rtl' : null;

    let handle;
    if (canDrag) {
      if (typeof node.children === 'function' && node.expanded) {
        // Show a loading symbol on the handle when the children are expanded
        //  and yet still defined by a function (a callback to fetch the
        // children)
        handle = (
          <div className="rst__loadingHandle">
            <div className="rst__loadingCircle">
              {[...new Array(12)].map((_, index) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className={classnames(
                    'rst__loadingCirclePoint',
                    rowDirectionClass,
                  )}
                />
              ))}
            </div>
          </div>
        );
      } else {
        // Show the handle used to initiate a drag-and-drop
        handle = connectDragSource(<div className="rst__moveHandle" />, {
          dropEffect: 'copy',
        });
      }
    }

    const isDraggedDescendant = draggedNode && isDescendant(draggedNode, node);
    const isLandingPadActive = !didDrop && isDragging;

    let buttonStyle: any = { left: -0.5 * scaffoldBlockPxWidth };
    if (rowDirection === 'rtl') {
      buttonStyle = { right: -0.5 * scaffoldBlockPxWidth };
    }
    let mutation = MUTATION_DELETE_ELEMENT;
    if (node.typename === 'Grid.tsx') {
      mutation = MUTATION_DELETE_GRID;
    }
    if (node.typename === 'Container') {
      mutation = MUTATION_DELETE_CONTAINER;
    }
    const ActionPopover = () => (
      <div>
        <Mutation mutation={mutation}>
          {mutate => (
            <Button icon="close" block>
              <Popconfirm
                placement="topLeft"
                title="Are you sure delete this task?"
                onConfirm={() => {
                  mutate({
                    variables: {
                      where: {
                        id: node.id,
                      },
                    },
                    refetchQueries: ['getPages'],
                  });
                  deleteNode(path);
                }}
                onCancel={() => {}}
                okText="Yes"
                cancelText="No"
              >
                <a>Delete</a>
              </Popconfirm>
            </Button>
          )}
        </Mutation>

        <br />
        <Button
          icon="plus"
          block
          onClick={() => {
            setCurrentNode(node);
            toggleModal(ModalIDs.AddNode);
          }}
        >
          Add
        </Button>
      </div>
    );
    return (
      <Popover placement="topRight" content={<ActionPopover />}>
        <div style={{ height: '100%' }} {...otherProps}>
          {toggleChildrenVisibility &&
            node.children &&
            (node.children.length > 0 ||
              typeof node.children === 'function') && (
              <div>
                <button
                  type="button"
                  aria-label={node.expanded ? 'Collapse' : 'Expand'}
                  className={classnames(
                    node.expanded ? 'rst__collapseButton' : 'rst__expandButton',
                    rowDirectionClass,
                  )}
                  style={buttonStyle}
                  onClick={() =>
                    toggleChildrenVisibility({
                      node,
                      path,
                      treeIndex,
                    })
                  }
                />

                {node.expanded && !isDragging && (
                  <div
                    style={{ width: scaffoldBlockPxWidth }}
                    className={classnames(
                      'rst__lineChildren',
                      rowDirectionClass,
                    )}
                  />
                )}
              </div>
            )}

          <div className={classnames('rst__rowWrapper', rowDirectionClass)}>
            {/* Set the row preview to be used during drag and drop */}
            {connectDragPreview(
              <div
                className={classnames(
                  'rst__row',
                  isLandingPadActive && 'rst__rowLandingPad',
                  isLandingPadActive && !canDrop && 'rst__rowCancelPad',
                  isSearchMatch && 'rst__rowSearchMatch',
                  isSearchFocus && 'rst__rowSearchFocus',
                  rowDirectionClass,
                  className,
                )}
                style={{
                  opacity: isDraggedDescendant ? 0.5 : 1,
                  ...style,
                }}
              >
                {handle}

                <div
                  className={classnames(
                    'rst__rowContents',
                    !canDrag && 'rst__rowContentsDragDisabled',
                    rowDirectionClass,
                  )}
                >
                  <div
                    className={classnames('rst__rowLabel', rowDirectionClass)}
                  >
                    <span
                      className={classnames(
                        'rst__rowTitle',
                        node.subtitle && 'rst__rowTitleWithSubtitle',
                      )}
                    >
                      {typeof nodeTitle === 'function'
                        ? nodeTitle({
                            node,
                            path,
                            treeIndex,
                          })
                        : nodeTitle}
                    </span>

                    {nodeSubtitle && (
                      <span className="rst__rowSubtitle">
                        {typeof nodeSubtitle === 'function'
                          ? nodeSubtitle({
                              node,
                              path,
                              treeIndex,
                            })
                          : nodeSubtitle}
                      </span>
                    )}
                  </div>

                  <div className="rst__rowToolbar">
                    {buttons.map((btn, index) => (
                      <div
                        key={index} // eslint-disable-line
                        // react/no-array-index-key
                        className="rst__toolbarButton"
                      >
                        custom here
                        {btn}
                      </div>
                    ))}
                  </div>
                </div>
              </div>,
            )}
          </div>
        </div>
      </Popover>
    );
  }
}

// NodeView.defaultProps = {
//   isSearchMatch: false,
//   isSearchFocus: false,
//   canDrag: false,
//   toggleChildrenVisibility: null,
//   buttons: [],
//   className: '',
//   style: {},
//   parentNode: null,
//   draggedNode: null,
//   canDrop: false,
//   title: null,
//   subtitle: null,
//   rowDirection: 'ltr',
// };

// NodeRendererDefault.propTypes = {
//   node: PropTypes.shape({}).isRequired,
//   title: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
//   subtitle: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
//   path: PropTypes.arrayOf(
//     PropTypes.oneOfType([PropTypes.string, PropTypes.number])
//   ).isRequired,
//   treeIndex: PropTypes.number.isRequired,
//   treeId: PropTypes.string.isRequired,
//   isSearchMatch: PropTypes.bool,
//   isSearchFocus: PropTypes.bool,
//   canDrag: PropTypes.bool,
//   scaffoldBlockPxWidth: PropTypes.number.isRequired,
//   toggleChildrenVisibility: PropTypes.func,
//   buttons: PropTypes.arrayOf(PropTypes.node),
//   className: PropTypes.string,
//   style: PropTypes.shape({}),

//   // Drag and drop API functions
//   // Drag source
//   connectDragPreview: PropTypes.func.isRequired,
//   connectDragSource: PropTypes.func.isRequired,
//   parentNode: PropTypes.shape({}), // Needed for dndManager
//   isDragging: PropTypes.bool.isRequired,
//   didDrop: PropTypes.bool.isRequired,
//   draggedNode: PropTypes.shape({}),
//   // Drop target
//   isOver: PropTypes.bool.isRequired,
//   canDrop: PropTypes.bool,

//   // rtl support
//   rowDirection: PropTypes.string,
// };

export default NodeView;
