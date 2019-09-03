import styled from '@emotion/styled';
import React from 'react';

export const StyleGrid = styled.div(props => ({
  border: '1px solid blue',
  ...props.style,
  // Change y to min-height instead of height
  minHeight: props.style ? props.style.height : '',
  height: 'auto!important',
  // overflowX: 'scroll',
  // paddingTop: '27px',
}));
