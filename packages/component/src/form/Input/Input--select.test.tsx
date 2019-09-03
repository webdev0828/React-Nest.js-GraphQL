import { mountForm } from 'src/form/utils/utils';

describe('Select', () => {
  const field = {
    inputType: 'select',
    name: 'OS_select',
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
  };

  const formWrapper = mountForm({ fields: [field] });
  const SelectWrapper = formWrapper.find('Select').first();

  it('has the correct default value', () => {
    expect(SelectWrapper.props()).toMatchObject({
      value: field.value,
    });
  });

  // it('has the correct name attribute', () => {
  //   expect(SelectWrapper.props()).toMatchObject({
  //     name: field.name,
  //   });
  // });

  it('has enough options', () => {
    expect(SelectWrapper.prop('children')).toHaveLength(field.options.length);
  });
});
