import { Button, Col, Form, Row, Steps } from 'antd';
import React from 'react';
import {
  IFormWrapperProps,
  FormProps,
  ButtonGroupProps,
} from 'src/form/Form/Form--interface';
import ThemeProvider from 'src/form/ThemeProvider';
import styled from 'styled-components';
import { isEmpty } from 'lodash';

const StyledFormWrapper = styled.section`
  // margin: ${props => props.theme.padding.md};
`;
export const FormButtonGroups = styled.div`
  display: inline-flex;
  > button {
    margin: 0 4px;
    min-width: 80px;
    display: inline-block;
  }
`;
const StyledForm = styled(props => (
  <StyledFormWrapper>
    <Form onSubmit={props.onSubmit} {...props} />
  </StyledFormWrapper>
))``;
// margin: ${props => props.theme.padding.md};

const FormWrapper = ({ onSubmit, ...props }: IFormWrapperProps) => {
  return (
    <ThemeProvider>
      <StyledForm onSubmit={onSubmit} {...props} />
    </ThemeProvider>
  );
};

const FieldsWrapper = ({ Fields, children, gutter }) => {
  return (
    <ThemeProvider>
      <Row gutter={gutter || 10}>
        {Fields}
        {children}
      </Row>
    </ThemeProvider>
  );
};

const FormButton = ({
  isSubmitting,
  handleClick,
  tailFormItemLayout,
  htmlType,
  layout,
  disabled,
  ...props
}: any) => {
  return (
    <Row className="form__component--button">
      <Col {...layout} span={12}>
        <ThemeProvider>
          {/* isValid doesn't work with initialValues, we won't disable button based on isValid */}
          <Button
            {...props}
            type="primary"
            htmlType={htmlType || 'submit'}
            disabled={isSubmitting || disabled}
            onClick={handleClick}
          >
            {isSubmitting ? 'Loading' : props.children || 'Submit'}
          </Button>
        </ThemeProvider>
      </Col>
    </Row>
  );
};

export { FormWrapper, FieldsWrapper, FormButton };
