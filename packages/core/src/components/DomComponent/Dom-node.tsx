import { Col } from 'antd';
import { isEmpty, isObject } from 'lodash';
import React from 'react';
import { CONTAINER_TYPES } from 'src/components/DomComponent/Dom-config--types';
import { DomConsumer, modes } from 'src/components/DomComponent/Dom-context';
import {
  ELEMENT_COMPONENTS,
  Wrapper,
} from 'src/components/DomComponent/Dom-elements';
import { useForceUpdate } from 'src/components/DomComponent/Dom-hooks';

const getColSpan = (typename, length) =>
  typename === CONTAINER_TYPES.GRID ? Math.floor(24 / length) : 24;

const invalidChildKeys = ['id', '__typename'];

export const NodeComponent = (props: any) => {
  const forceUpdate = useForceUpdate();
  const { node } = props;
  const { __typename } = node;
  // if node is element type
  if (__typename === CONTAINER_TYPES.ELEMENT) {
    const ConcreteComponent =
      ELEMENT_COMPONENTS[node.component.type] ||
      (() => <span>Unknown now {node.component.type}</span>);

    return <ConcreteComponent>{node.component.type}</ConcreteComponent>;
  }
  // if node is Container type
  const childKeys = Object.keys(node);
  return (
    <DomConsumer>
      {mode => {
        return (
          <Wrapper
            node={node}
            className={__typename}
            onDrop={ev => {
              if (mode === modes.READ_ONLY) return;
              const datakey = ev.dataTransfer.types[0];
              const dataTransfered = JSON.parse(
                ev.dataTransfer.getData(datakey),
              );

              if (
                node.typename === CONTAINER_TYPES.CONTAINER &&
                dataTransfered.typename === CONTAINER_TYPES.GRID
              ) {
                if (!node.grids) node.grids = [];
                node.grids.push({
                  __typename: CONTAINER_TYPES.GRID,
                });
                forceUpdate();
                return;
              }

              if (
                node.typename === CONTAINER_TYPES.GRID &&
                dataTransfered.typename === CONTAINER_TYPES.ELEMENT
              ) {
                if (!node.elements) {
                  node.elements = [];
                }
                node.elements.push({
                  __typename: CONTAINER_TYPES.ELEMENT,
                  component: {
                    type: dataTransfered.elementType,
                  },
                });
                forceUpdate();
                return;
              }
            }}
            onDragOver={e => e.preventDefault()}
          >
            {__typename}
            {childKeys.map((key, index) => {
              const childNode = node[key];
              // ignore key is not valid key or is empty object
              if (invalidChildKeys.includes(key) || isEmpty(childNode)) {
                return null;
              }
              // align grids into their container
              const span = getColSpan(childNode.typename, childKeys.length);

              return (
                <Col key={index} className={key} span={span}>
                  {isObject(childNode) && <NodeComponent node={node[key]} />}
                </Col>
              );
            })}
          </Wrapper>
        );
      }}
    </DomConsumer>
  );
};
