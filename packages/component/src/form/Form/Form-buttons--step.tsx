import { Button } from 'antd';
import { isEmpty } from 'lodash';
import React from 'react';
import { ButtonGroupProps } from 'src/form/Form/Form--interface';
import { useStep } from 'src/form/Form/Step-context';
import styled from 'styled-components';

export const FormButtonGroupStyle = styled.div`
  display: inline-flex;
  > button {
    margin: 0 4px;
    min-width: 80px;
    display: inline-block;
  }
`;

export const FormButtonsStep: React.FC<ButtonGroupProps> = ({
  validateForm,
  steps,
  submitButton,
  isSubmitting,
}) => {
  // return if it is non-steps form
  if (!steps) {
    return (
      <Button
        type="primary"
        htmlType="submit"
        disabled={isSubmitting}
        style={{ display: submitButton && submitButton.hide ? 'none' : '' }}
      >
        {submitButton && submitButton.text ? submitButton.text : 'Submit'}
      </Button>
    );
  }

  const { onLastStep, canBack, canNext, handleNext, handleBack } = useStep({
    steps,
  });

  return (
    <FormButtonGroupStyle>
      {canBack && (
        <Button type="primary" onClick={handleBack} disabled={isSubmitting}>
          Back
        </Button>
      )}
      {canNext && (
        <Button
          type="primary"
          onClick={() => {
            validateForm().then(validationError => {
              if (isEmpty(validationError)) {
                handleNext();
              }
            });
          }}
        >
          Next
        </Button>
      )}
      {onLastStep && (
        <Button
          type="primary"
          htmlType="submit"
          disabled={isSubmitting}
          style={{
            display: submitButton && submitButton.hide ? 'none' : '',
          }}
        >
          {submitButton && submitButton.text ? submitButton.text : 'Submit'}
        </Button>
      )}
    </FormButtonGroupStyle>
  );
};
