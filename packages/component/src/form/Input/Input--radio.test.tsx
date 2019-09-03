import { Radio } from 'antd';
import { mountForm } from 'src/form/utils/utils';

/**
 * Radio Group
 */
describe('Radio Group', () => {
  const field = {
    inputType: 'radio',
    name: 'OS',
    label: 'which mobile OSs are you using?',
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
    value: 'ios',
  };

  const mockOnSubmit = jest.fn(() => Promise.resolve());
  const formWrapper = mountForm({
    fields: [field],
    submitOnChange: true,
    onSubmit: mockOnSubmit,
  });
  const radioWrapper = formWrapper.find('RadioGroup').first();

  const formWrapper2 = mountForm({ fields: [field], submitOnChange: false });
  const radioWrapper2 = formWrapper2.find('RadioGroup').first();

  it('has the correct default value', () => {
    expect(radioWrapper.props()).toMatchObject({
      value: field.value,
    });
  });

  it('has the correct name attribute', () => {
    expect(radioWrapper.props()).toMatchObject({
      name: field.name,
    });
  });

  it('has enough options', () => {
    expect(radioWrapper.find(Radio)).toHaveLength(field.options.length);
  });

  // it('submits on change should be true ', async () => {
  //   radioWrapper.simulate('change', {
  //     target: {
  //       name: 'OS',
  //     },
  //   });
  //
  //   await wait(0);
  //   expect(mockOnSubmit.mock.calls.length).toBe(1);
  // });

  // it('submits on change should be false ', async () => {
  //   const submitOnChange = await radioWrapper2.props().onChange({
  //     preventDefault() {
  //     },
  //     target: { name: 'OS' },
  //   });
  //   expect(submitOnChange).toBeFalsy();
  // });
});
