import { storiesOf } from '@storybook/react';
import 'antd/dist/antd.css';
import React from 'react';
import { FormDecorator, StorybookFormWrapper } from 'src/utils/utils';

storiesOf('Submit button', module)
  .addDecorator(FormDecorator)
  .add('Custom submit text', () => {
    const fields = [
      {
        inputType: 'text',
        name: 'name',
        placeholder: 'Name',
        type: 'string',
      },
    ];
    return (
      <StorybookFormWrapper
        submitButton={{ text: 'Custom Text' }}
        fields={fields}
      />
    );
  })
  .add('Hidden submit button ', () => {
    const fields = [
      {
        inputType: 'text',
        name: 'name',
        value: '',
      },
    ];
    return (
      <StorybookFormWrapper
        submitButton={{
          hide: true,
        }}
        fields={fields}
      />
    );
  });
