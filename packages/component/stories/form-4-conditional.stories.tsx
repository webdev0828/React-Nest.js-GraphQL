import { storiesOf } from '@storybook/react';
import 'antd/dist/antd.css';
import React from 'react';
import { Form } from 'src/form/Form/Form';
import { IFormField } from 'src/form/Form/Form--interface';
import { INPUT_TYPES } from 'src/form/Input/Input';
import { FormDecorator, ON_COMPLETE, ON_SUBMIT } from 'src/utils/utils';

storiesOf('Conditional Form', module)
  .addDecorator(FormDecorator)
  .add('Conditional fields ', () => {
    const fields: IFormField[] = [
      {
        inputType: INPUT_TYPES.Text,
        name: 'name',
        placeholder: 'name',
        validation: [
          // {
          //   required: true,
          //   msg: 'Required',
          // },
        ],
      },
      {
        inputType: INPUT_TYPES.Select,
        name: 'os_type',
        label: 'which mobile OSs are you using?',
        value: 'ios',
        options: [
          {
            label: 'IOS',
            value: 'ios',
          },
          {
            label: 'Android',
            value: 'android',
          },
          {
            label: 'Other',
            value: 'other',
          },
        ],
        placeholder: 'Choose OS',
      },
      {
        name: 'ios_only',
        inputType: INPUT_TYPES.Text,
        value: '',
        label: 'ios',
        // conditional: {
        //   name: 'os_type',
        //   value: 'ios',
        //   operator: '=',
        // },
        validation: [
          { min: 2, msg: 'Too Short!' },
          { max: 20, msg: 'Too Long!' },
          { required: true, msg: 'Required!!' },
          { when: ['os_type', 'name'] }, // when: string | array<string>
        ],
        shouldRender: values => {
          // console.log(values)
          return values.os_type === 'ios';
        },
      },
      {
        name: 'android_only',
        inputType: INPUT_TYPES.Text,
        value: '',
        label: 'android',
        shouldRender: values => values.os_type === 'android',
        validation: [
          { min: 2, msg: 'Too Short!' },
          { max: 20, msg: 'Too Long!' },
          { required: true, msg: 'Required!!' },
          { when: ['os_type'] },
        ],
      },
    ];
    return (
      <Form fields={fields} onSubmit={ON_SUBMIT} onComplete={ON_COMPLETE} />
    );
  });
