import { storiesOf } from '@storybook/react';
import React from 'react';
import { Form } from 'src/form/Form/Form';
import { IFormField } from 'src/form/Form/Form--interface';
import { INPUT_TYPES } from 'src/form/Input/Input';
import {
  FormDecorator,
  ON_COMPLETE,
  StorybookFormWrapper,
} from 'src/utils/utils';
import './form.custom.scss';

storiesOf('Form Layout', module)
  .addDecorator(FormDecorator)
  .add('2 column layout with label', () => {
    const fields = [
      {
        name: 'top',
        inputType: INPUT_TYPES.Number,
        value: 0,
        label: 'top',
        layout: {
          wrapperLayout: {
            xs: 24,
            sm: 12,
          },
          labelLayout: {
            xs: 24,
            sm: 5,
          },
        },
        validation: [{ required: true, msg: 'Required!!' }],
      },
      {
        name: 'right',
        inputType: INPUT_TYPES.Number,
        placeholder: 'right',
        label: 'right',
        value: 0,
        layout: {
          wrapperLayout: {
            xs: 24,
            sm: 12,
          },
          labelLayout: {
            xs: 24,
            sm: 5,
          },
        },
        validation: [{ required: true, msg: 'Required!!' }],
      },
      {
        name: 'bottom',
        inputType: INPUT_TYPES.Number,
        placeholder: 'bottom',
        label: 'bottom',
        layout: {
          wrapperLayout: {
            xs: 24,
            sm: 12,
          },
          labelLayout: {
            xs: 24,
            sm: 5,
          },
        },
      },
      {
        name: 'left',
        inputType: INPUT_TYPES.Number,
        placeholder: 'left',
        label: 'left',
        layout: {
          wrapperLayout: {
            xs: 24,
            sm: 12,
          },
          labelLayout: {
            xs: 24,
            sm: 5,
          },
        },
      },
    ];
    return (
      <Form
        fields={fields}
        onSubmit={() =>
          new Promise(resolve => {
            setTimeout(() => {
              console.log('submitting'), resolve();
            }, 1000);
          })
        }
      />
    );
  })
  .add('Inline form', () => {
    const fields = [
      {
        name: 'first_name',
        inputType: INPUT_TYPES.Text,
        placeholder: 'First Name',
        label: 'FirstName',
        layout: {
          labelLayout: {
            sm: 10,
          },
        },
      },
      {
        name: 'last_name',
        inputType: INPUT_TYPES.Text,
        placeholder: 'Last Name',
        label: 'LastName',
        layout: {
          labelLayout: {
            sm: 10,
          },
        },
      },
    ];
    return (
      <StorybookFormWrapper
        fields={fields}
        submitButton={{ text: 'Register' }}
        layout="inline"
      />
    );
  })
  .add('Form sections', () => {
    const fields = [
      {
        name: 'first_name',
        inputType: INPUT_TYPES.Text,
        placeholder: 'First Name',
        label: 'FirstName',
      },
      {
        name: 'last_name',
        inputType: INPUT_TYPES.Text,
        placeholder: 'Last Name',
        label: 'LastName',
      },
      {
        name: 'street_address',
        inputType: INPUT_TYPES.Text,
        placeholder: 'Street Address',
        label: 'Street Address',
      },
    ];

    const sections = [
      {
        label: 'Personal Information',
        position: 'first_name',
        order: 'before',
      },
      {
        label: 'Address Info',
        position: 'street_address',
        order: 'before',
      },
    ];
    return (
      <StorybookFormWrapper
        fields={fields}
        sections={sections}
        submitButton={{ text: 'Add' }}
      />
    );
  })
  .add('Form sections-example', () => {
    const infoSectionFields: IFormField[] = [
      {
        name: 'first_name',
        inputType: INPUT_TYPES.Text,
        placeholder: 'First Name',
        label: 'FirstName',
        validation: [{ required: true, msg: 'Required' }],
        layout: {
          wrapperLayout: {
            xs: 24,
            sm: 12,
          },
          labelLayout: {
            xs: 24,
            // sm: 6,
          },
        },
      },
      {
        name: 'last_name',
        inputType: INPUT_TYPES.Text,
        placeholder: 'Last Name',
        label: 'LastName',
        validation: [{ required: true, msg: 'Required' }],
        layout: {
          wrapperLayout: {
            xs: 24,
            sm: 12,
          },
          labelLayout: {
            xs: 24,
            // sm: 6,
          },
        },
      },
      {
        name: 'email',
        inputType: INPUT_TYPES.Text,
        placeholder: 'Email',
        label: 'Email',
        validation: [{ required: true, msg: 'Required' }],
        layout: {
          wrapperLayout: {
            xs: 24,
            sm: 12,
          },
          labelLayout: {
            xs: 24,
            // sm: 6,
          },
        },
      },
      {
        name: 'contract_phone',
        inputType: INPUT_TYPES.Text,
        placeholder: 'Contract Phone',
        label: 'Contract Phone',
        validation: [{ required: true, msg: 'Required' }],
        layout: {
          wrapperLayout: {
            xs: 24,
            sm: 12,
          },
          labelLayout: {
            xs: 24,
            // sm: 6,
          },
        },
      },
    ];
    const addressSectionFields: IFormField[] = [
      {
        name: 'address',
        inputType: INPUT_TYPES.Text,
        placeholder: 'Address',
        label: 'Address',
        validation: [{ required: true, msg: 'Required' }],
        layout: {
          wrapperLayout: {
            xs: 24,
            sm: 16,
          },
          labelLayout: {
            xs: 24,
            // sm: 6,
          },
        },
      },
      {
        name: 'postal_code',
        inputType: INPUT_TYPES.Text,
        placeholder: 'Postal code',
        label: 'Postal code',
        validation: [{ required: true, msg: 'Required' }],
        layout: {
          wrapperLayout: {
            xs: 24,
            sm: 8,
          },
          labelLayout: {
            xs: 24,
            // sm: 9,
          },
        },
      },
      {
        name: 'city',
        inputType: INPUT_TYPES.Text,
        placeholder: 'City',
        validation: [{ required: true, msg: 'Required' }],
        label: 'City',
        layout: {
          wrapperLayout: {
            xs: 24,
            sm: 12,
          },
          labelLayout: {
            xs: 24,
            // sm: 6,
          },
        },
      },
      {
        name: 'country',
        inputType: INPUT_TYPES.Select,
        validation: [{ required: true, msg: 'Required' }],
        placeholder: '',
        value: 'USA',
        options: [
          { label: 'USA', value: 'USA' },
          { label: 'Afghanistan', value: 'Afghanistan' },
          { label: 'England', value: 'England' },
        ],
        label: 'Country',
        layout: {
          wrapperLayout: {
            xs: 24,
            sm: 12,
          },
          labelLayout: {
            xs: 24,
            // sm: 6,
          },
        },
      },
      {
        name: 'desired_position',
        inputType: INPUT_TYPES.Select,
        validation: [{ required: true, msg: 'Required' }],
        label: 'Desired Position',
        value: 'Tech lead',
        placeholder: '',
        options: [
          {
            label: 'Tech lead',
            value: 'Tech lead',
          },
          {
            label: 'Senior',
            value: 'Senior',
          },
        ],
        layout: {
          wrapperLayout: {
            xs: 24,
            sm: 24,
          },
          labelLayout: {
            xs: 24,
            // sm: 3,
          },
        },
      },
      {
        name: 'additional_detail',
        inputType: INPUT_TYPES.Textarea,
        label: 'Additional Detail',
        value: '...',
        placeholder: '',
        layout: {
          wrapperLayout: {
            xs: 24,
            sm: 24,
          },
          labelLayout: {
            xs: 24,
            // sm: 3,
          },
        },
      },
    ];
    const fields = infoSectionFields.concat(addressSectionFields);

    const sections = [
      {
        label: 'Personal Information',
        position: 'first_name',
        order: 'before',
      },
      {
        label: 'Address Info',
        position: 'address',
        order: 'before',
      },
    ];
    return (
      <StorybookFormWrapper
        fields={fields}
        sections={sections}
        submitButton={{ text: 'Add' }}
        className="custom-form"
      />
    );
  })
  .add('Steps Form', () => {
    const steps = [
      {
        title: 'First',
      },
      {
        title: 'Second',
      },
      {
        title: 'Last',
      },
    ];

    const fields1 = [
      {
        name: 'first_name',
        inputType: INPUT_TYPES.Text,
        placeholder: 'First Name',
        label: 'FirstName',
        validation: [
          {
            required: true,
            msg: 'Required',
          },
        ],
        formStep: 0,
      },
      {
        name: 'phone',
        inputType: INPUT_TYPES.Text,
        placeholder: 'contract phone',
        label: 'phone',
        formStep: 0,
      },
    ];

    const fields2 = [
      {
        name: 'last_name',
        inputType: INPUT_TYPES.Text,
        placeholder: 'Last Name',
        label: 'LastName',
        validation: [
          {
            required: true,
            msg: 'Required',
          },
        ],
        formStep: 1,
      },
    ];

    const fields3 = [
      {
        name: 'street_address',
        inputType: INPUT_TYPES.Text,
        placeholder: 'Street Address',
        label: 'Street Address',
        validation: [
          {
            required: true,
            msg: 'Required',
          },
        ],
        formStep: 2,
      },
    ];

    const fields = [...fields1, ...fields2, ...fields3];

    return (
      <Form
        fields={fields}
        steps={steps}
        onSubmit={values => {
          return new Promise(resolve => {
            setTimeout(() => {
              console.log(values);
              resolve();
            }, 300);
          });
        }}
        enableReinitialize={true}
        onComplete={ON_COMPLETE}
      />
    );
  });
