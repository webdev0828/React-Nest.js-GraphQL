import Input, { INPUT_TYPES } from 'src/form/Input/Input';
import { mountForm } from 'src/form/utils/utils';

describe('Form conditional fields', () => {
  const fields = [
    {
      inputType: INPUT_TYPES.Radio,
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
      shouldRender: values => values.os_type === 'ios',
    },
    {
      name: 'android_only',
      inputType: INPUT_TYPES.Text,
      value: '',
      label: 'android',
      shouldRender: values => values.os_type === 'android',
    },
  ];

  const formWrapper = mountForm({ fields });

  it('has correct number of input', () => {
    const inputWrapper = formWrapper.find(Input);
    expect(inputWrapper).toHaveLength(fields.length - 1);
    expect(formWrapper.find('input[name="ios_only"]')).toHaveLength(1);
    // ios input rendered at the first time
  });

  it('change value', () => {
    const inputWrapper = formWrapper.find(
      'input[name="os_type"][value="android"]',
    );
    inputWrapper.simulate('change'); // checked

    expect(formWrapper.find('input[name="ios_only"]')).toHaveLength(0);
    expect(formWrapper.find('input[name="android_only"]')).toHaveLength(1);
  });
});
