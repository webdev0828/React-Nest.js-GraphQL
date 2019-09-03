import { Form } from '@codelab/component';
import { Card, Icon } from 'antd';
import React from 'react';
import { ELEMENT_CREATE_MUTATION } from 'src/components/Element/Element-mutation--create';
import { VariantSteps } from 'src/state/apollo-local-state/variant/variantState';

const VariantPopoverSelect = ({ setCurrentStep, component }) => {
  const variantFormFields = component.variantTemplateFormFields;

  return (
    <Card
      title="Select a Variant (Create an Element with Variant)"
      bordered={false}
      extra={
        <a
          href="javascript:;"
          onClick={() => {
            setCurrentStep(VariantSteps.CreateVariant);
          }}
        >
          <Icon type="plus" />
        </a>
      }
    >
      <Form
        fields={variantFormFields}
        mutation={ELEMENT_CREATE_MUTATION}
        onSubmit={(values, { mutate }) =>
          component.createElement(values, { mutate })
        }
      />
    </Card>
  );
};

export default VariantPopoverSelect;
