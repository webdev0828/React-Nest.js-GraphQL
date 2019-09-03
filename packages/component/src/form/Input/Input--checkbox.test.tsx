import { mountForm } from 'src/form/utils/utils';
const waitForExpect = require('wait-for-expect');
// import addons, { mockChannel } from '@storybook/addons';

describe('Checkbox', () => {
  const onChangedFn = jest.fn(); // jest.fn(() => Promise.resolve());

  const field = {
    inputType: 'checkbox',
    name: 'gender',
    label: 'Is Male?',
    value: true,
    placeholder: '',
    onChange: onChangedFn,
  };

  //  addons.setChannel(mockChannel());
  const formWrapper = mountForm({ fields: [field] });
  const inputWrapper = formWrapper.find(`input[name="${field.name}"]`);

  it('exepct onChange event', async () => {
    inputWrapper.simulate('change');
    // await waitForExpect(() => {
    //   expect(onChangedFn).toHaveBeenCalledTimes(1);
    // });
  });

  it('has the correct name attribute', async () => {
    expect(inputWrapper.exists()).toBeTruthy();
  });

  it('has a default value', () => {
    expect(inputWrapper.props()).toMatchObject({
      checked: field.value,
    });
  });
});
