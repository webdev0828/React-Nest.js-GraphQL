import { INPUT_TYPES } from 'src/form/Input/Input';
import { mountForm } from 'src/form/utils/utils';
const waitForExpect = require('wait-for-expect');
import addons, { mockChannel } from '@storybook/addons';

/**
 * Radio Group
 */
describe('Radio Group', () => {
  const fields = [
    {
      inputType: INPUT_TYPES.Radio,
      name: 'os_type',
      submitOnChange: true,
      label: 'which mobile OSs are you using?',
      value: 'other',
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
  ];

  addons.setChannel(mockChannel());
  it('submits on change should be true ', async () => {
    const onSubmitFn = jest.fn(() => Promise.resolve());

    const formWrapper = mountForm({
      fields,
      onSubmit: onSubmitFn,
      submitOnChange: true,
    });

    const radioWrapper = formWrapper.find('input[name="os_type"]').first();
    radioWrapper.simulate('change');

    await waitForExpect(() => {
      expect(onSubmitFn).toHaveBeenCalledTimes(1);
    });
  });
});
