import { storiesOf } from '@storybook/react';
import 'antd/dist/antd.css';
import React from 'react';
import { Form } from 'src/form/Form/Form';
import { INPUT_TYPES } from 'src/form/Input/Input';
import { FormDecorator, ON_COMPLETE, ON_SUBMIT } from 'src/utils/utils';

storiesOf('Custom Fields', module)
  .addDecorator(FormDecorator)
  .add('Custom fields index ', () => {
    const fields = [
      {
        inputType: INPUT_TYPES.Text,
        name: 'input_0',
        type: 'string',
        label: 'Index 0',
      },
      {
        inputType: INPUT_TYPES.Text,
        name: 'input_3',
        type: 'string',
        label: 'Index 3',
      },
    ];
    const customFields = [
      {
        index: 1,
        inputType: INPUT_TYPES.Text,
        name: 'input_1',
        type: 'string',
        label: 'Index 1',
      },
      {
        index: 2,
        inputType: INPUT_TYPES.Text,
        name: 'input_2',
        type: 'string',
        label: 'Index 2',
      },
    ];
    return (
      <Form
        fields={fields}
        customFields={customFields}
        onSubmit={ON_SUBMIT}
        onComplete={ON_COMPLETE}
      />
    );
  })
  .add('Repeater fieldArrays', () => {
    const fields = [
      {
        inputType: INPUT_TYPES.Text,
        name: 'Random',
        type: 'string',
        label: 'Random',
      },
      {
        inputType: INPUT_TYPES.Text,
        fieldArray: {
          name: 'CssPropertyValue',
        },
        name: 'CssProperty',
        type: 'string',
        label: 'CSS Property',
      },
      {
        inputType: INPUT_TYPES.Text,
        fieldArray: {
          name: 'CssPropertyValue',
        },
        name: 'CssValue',
        type: 'string',
        label: 'CSS Value',
      },
    ];

    return (
      <Form fields={fields} onSubmit={ON_SUBMIT} onComplete={ON_COMPLETE} />
    );
  });
