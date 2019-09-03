import React from 'react';
import styled from 'styled-components';
import { isObject, isEmpty } from 'lodash';
import {
  isLeafNode,
  ELEMENT_TYPES,
  CONTAINER_TYPES,
} from 'src/components/DomComponent/Dom-config--types';
import { Button } from 'antd';

// ultils component
const BorderBox: any = styled.div`
  border: ${(props: any) =>
    props.isContainer && !props.hasChildren
      ? '2px solid #108ee9'
      : '2px dashed gray'};
  padding: 10px;
  min-height: 150px;
  overflow: auto !important;
`;

export const ELEMENT_COMPONENTS = {
  [ELEMENT_TYPES.BUTTON]: Button,
  [ELEMENT_TYPES.TEXT]: ({ children, ...props }) => (
    <p {...props}>{children}</p>
  ),
  [ELEMENT_TYPES.LINK]: ({ children, ...props }) => (
    <a {...props}>{children}</a>
  ),
  [ELEMENT_TYPES.IMAGE]: ({ children, ...props }) => (
    <img {...props} alt="image" />
  ),
};

export class Wrapper extends React.Component<any, any> {
  render() {
    const { node, children, className, ...rest } = this.props;
    // prevent case node is array of grids
    if (Array.isArray(node)) return <>{children}</>;

    const { __typename } = node;
    const isContainer = __typename === CONTAINER_TYPES.CONTAINER;
    const hasChildren = node.grids && node.grids.length > 0;
    return (
      <BorderBox
        hasChildren={hasChildren}
        isContainer={isContainer}
        className={className}
        {...rest}
      >
        {children}
      </BorderBox>
    );
  }
}
