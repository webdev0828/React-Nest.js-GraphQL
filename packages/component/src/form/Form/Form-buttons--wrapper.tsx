import { Button } from 'antd';
import { isEmpty } from 'lodash';
import React from 'react';
import { FormButtonsStep } from 'src/form/Form/Form-buttons--step';

export const FormButtonsWrapper = ({
  validateForm,
  steps,
  values,
  submitButton,
  isSubmitting,
  setFieldValue,
}) => (
  <>
    {isEmpty(steps) ? (
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
    ) : (
      <FormButtonsStep
        validateForm={validateForm}
        steps={steps}
        values={values}
        submitButton={submitButton}
        setFieldValue={setFieldValue}
        isSubmitting={isSubmitting}
      />
    )}
  </>
);
