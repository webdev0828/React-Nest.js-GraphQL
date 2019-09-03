import { storiesOf } from '@storybook/react';
import { Tabs } from 'antd';
import { default as _, filter, includes } from 'lodash';
import React from 'react';
import { Form } from 'src/form/Form/Form';
import { INPUT_TYPES } from 'src/form/Input/Input';
import {
  FormDecorator,
  ON_COMPLETE,
  ON_SUBMIT,
  StorybookFormWrapper,
} from 'src/utils/utils';

storiesOf('Form Attributes', module)
  .addDecorator(FormDecorator)
  .add('Hidden input', () => {
    const fields = [
      {
        inputType: INPUT_TYPES.Text,
        name: 'name',
        value: 'Some Value',
        attributes: { hidden: true },
      },
    ];
    return <StorybookFormWrapper fields={fields} />;
  })
  .add('Sync fields', () => {
    const fields = [
      {
        name: 'inputA',
        inputType: INPUT_TYPES.Text,
        value: '',
      },
      {
        name: 'inputB',
        inputType: INPUT_TYPES.Text,
        value: '',
        attributes: {
          sync: 'inputA', // Syncs to target field name's value
        },
      },
    ];
    return <StorybookFormWrapper fields={fields} />;
  })
  // .add('dynamic generate field', () => <GenerationForm />)
  .add('Render props', () => {
    const ExampleTabs = {
      Tab1: {
        key: '0',
        title: 'Tab1',
      },
      Tab2: {
        key: '1',
        title: 'Tab2',
      },
    };

    const fields = [
      {
        inputType: INPUT_TYPES.Text,
        name: 'untabed',
        placeholder: 'Untabbed field',
      },
      {
        inputType: INPUT_TYPES.Text,
        name: 'myUsername',
        key: `tab-${ExampleTabs.Tab1.key}`,
      },
      {
        inputType: INPUT_TYPES.Color,
        name: 'background',
        value: '#fff',
        key: `tab-${ExampleTabs.Tab2.key}`,
      },
      {
        inputType: INPUT_TYPES.Number,
        name: 'counter',
        value: '1',
        key: `tab-${ExampleTabs.Tab2.key}`,
      },
    ];
    return (
      <Form
        mode="renderProps"
        fields={fields}
        onSubmit={ON_SUBMIT}
        onComplete={ON_COMPLETE}
      >
        {({ FormWrapper, FormFields, Fields, FormButton, ...rest }) => {
          // filter by element key
          const UnTabbedFields = _(Fields)
            .filter(Field => !includes(Field.key, 'tab'))
            .value();
          const TabbedFields = _(Fields)
            .filter(Field => includes(Field.key, 'tab'))
            .value();

          return (
            <FormWrapper>
              <FormFields Fields={UnTabbedFields} className={''} />
              <Tabs defaultActiveKey={ExampleTabs.Tab1.key}>
                {Object.keys(ExampleTabs).map(key => (
                  <Tabs.TabPane
                    tab={ExampleTabs[key].title}
                    key={ExampleTabs[key].key}
                  >
                    {filter(TabbedFields, Field =>
                      includes(Field.key, `tab-${ExampleTabs[key].key}`),
                    )}
                  </Tabs.TabPane>
                ))}
              </Tabs>
              <FormButton handleSubmit={() => {}}>Click me</FormButton>
            </FormWrapper>
          );
        }}
      </Form>
    );
  });
