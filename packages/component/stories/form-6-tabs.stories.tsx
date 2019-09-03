import { storiesOf } from '@storybook/react';
import { Tabs } from 'antd';
import { default as _, filter, includes } from 'lodash';
import React from 'react';
import { Form, TableForm } from 'src/form/Form/Form';
import { INPUT_TYPES } from 'src/form/Input/Input';
import { FormDecorator, ON_COMPLETE, ON_SUBMIT } from 'src/utils/utils';

interface IFormTable {
  table: {
    xLabel: String[]; // columns
    yLabel: String[]; // first cell of row
    data: (String[] | Number[])[]; // data source
  };
}

storiesOf('Form Tabs & Table', module)
  .addDecorator(FormDecorator)
  .add('With tabs', () => {
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
  })
  .add('Form-table', () => {
    // raw data can get from config grid
    // const rawData = [
    //   { id: 0, x: 0, y: 0, w: 4, h: 2, screenSize: 'XXS' },
    //   { id: 1, x: 0, y: 0, w: 4, h: 2, screenSize: 'XS' },
    //   { id: 2, x: 0, y: 0, w: 4, h: 2, screenSize: 'SM' },
    //   { id: 3, x: 0, y: 0, w: 4, h: 2, screenSize: 'MD' },
    //   { id: 4, x: 0, y: 0, w: 4, h: 2, screenSize: 'LG' },
    // ];

    const table = {
      legendCol: 'config',
      xLabels: ['XXS', 'XS', 'SM', 'MD', 'LG'],
      yLabels: ['x', 'y', 'w', 'h'],
      data: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ],
    };
    return (
      <>
        <h1>Form table</h1>
        <TableForm
          onSubmit={values =>
            new Promise(resolve => {
              console.log(values);
              resolve();
            })
          }
          table={table}
        />
      </>
    );
  });
