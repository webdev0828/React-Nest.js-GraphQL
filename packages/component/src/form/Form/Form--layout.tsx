import { Col, Row } from 'antd';
import { get } from 'lodash';
import React from 'react';
import { isRequired } from 'src/form/Form/Form--validation';
import { INPUT_TYPES, InputLabel } from 'src/form/Input/Input';

interface ILayout {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
}

export interface IInputLayout {
  wrapperLayout: ILayout;
  labelLayout?: ILayout;
}

const getFormLayout = layout => {
  const getInnerInputLayout = span => (span === 24 ? 24 : 24 - span);

  const wrapperLayout: any = get(layout, 'wrapperLayout', {});
  const labelLayout: any = get(layout, 'labelLayout', {});
  const inputLayout = {
    xs: getInnerInputLayout(labelLayout.xs),
    sm: getInnerInputLayout(labelLayout.sm),
    md: getInnerInputLayout(labelLayout.md),
    lg: getInnerInputLayout(labelLayout.lg),
    xl: getInnerInputLayout(labelLayout.xl),
  };

  return {
    wrapperLayout,
    labelLayout,
    inputLayout,
  };
};

const FieldLayout = ({
  layout,
  name,
  id,
  label,
  validation,
  children,
  className,
  inputType,
}) => {
  const { wrapperLayout, labelLayout, inputLayout } = getFormLayout(layout);
  // Hide if input type is hidden
  const visibilityStyle =
    inputType === INPUT_TYPES.Hidden ? { display: 'none' } : {};
  return (
    <div className={className} style={visibilityStyle}>
      <Col key={name} {...wrapperLayout} span={24}>
        <Row>
          {label && (
            <Col {...labelLayout} span={6}>
              <InputLabel
                label={label}
                isRequired={isRequired(validation)}
                id={id || name}
              />
            </Col>
          )}
          <Col {...inputLayout} span={label ? 18 : 24}>
            {children}
          </Col>
        </Row>
      </Col>
    </div>
  );
};

export { FieldLayout };
