import { Form, INPUT_TYPES } from '@codelab/component';
import React from 'react';
import BaseCustomUI from 'src/components/custom-ui/custom-ui--types';

const defaultFormFieldLayout = {
  wrapperLayout: {
    xs: 24,
    sm: 12,
  },
  labelLayout: {
    xs: 24,
    sm: 5,
  },
};

const appearanceFields = [
  {
    name: 'placeHolder',
    inputType: INPUT_TYPES.Text,
    validation: [],
    label: 'placeholder',
    layout: defaultFormFieldLayout,
  },
];

const conditionalFields = [
  {
    name: 'when',
    inputType: INPUT_TYPES.Text,
    label: 'When',
    placeholder: 'This Input is focused',
    validation: [],
    layout: defaultFormFieldLayout,
  },
];

const transitionFields = [
  {
    name: 'newTransition',
    inputType: INPUT_TYPES.Select,
    placeholder: 'This Input is focused',
    options: [
      {
        label: 'Background-style',
        value: 'BACKGROUD_STYLE',
      },
    ],
    validation: [],
    layout: defaultFormFieldLayout,
  },
];

class CustomUIInput extends BaseCustomUI {
  static AppearanceTab = props => {
    return (
      <Form fields={appearanceFields} mode="renderProps" onSubmit={() => {}}>
        {({ FormFields, Fields, FormWrapper }) => {
          return (
            <FormWrapper>
              <FormFields Fields={Fields} />
            </FormWrapper>
          );
        }}
      </Form>
    );
  };

  static ConditionalTab = props => {
    return (
      <Form fields={conditionalFields} mode="renderProps" onSubmit={() => {}}>
        {({ FormFields, Fields, FormWrapper }) => {
          return (
            <FormWrapper>
              <FormFields Fields={Fields} />
            </FormWrapper>
          );
        }}
      </Form>
    );
  };

  static TransitionsTab = props => {
    return (
      <div>
        <div>
          {/* old transitions */}
          <p>Border color - all borders</p>
          <p>Transition defined in the style Standard Input</p>
        </div>
        <Form fields={transitionFields} mode="renderProps" onSubmit={() => {}}>
          {({ FormFields, Fields, FormWrapper }) => {
            return (
              <FormWrapper>
                <FormFields Fields={Fields} />
              </FormWrapper>
            );
          }}
        </Form>
      </div>
    );
  };
}

export default CustomUIInput;
