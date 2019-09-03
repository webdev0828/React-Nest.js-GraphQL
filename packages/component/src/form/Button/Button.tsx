import React from 'react';
import styled from 'styled-components';
import { Button as AntButton } from 'antd';
import { NativeButtonProps } from 'antd/lib/button/button';

type Dimension = {
  height?: string;
  width?: string;
};

type Spacing = {
  margin?: string;
  marginbottom?: string;
  padding?: string;
};

type Color = {
  backgroundColor?: string;
};

const Button = styled((props: NativeButtonProps & Dimension & Spacing) => (
  <AntButton {...props} />
))`
  height: ${({ height }) => (height ? height : '')};
  width: ${({ width }) => (width ? width : '')};
  margin-bottom: ${({ marginbottom }) => (marginbottom ? marginbottom : '')};
`;

export default Button;
