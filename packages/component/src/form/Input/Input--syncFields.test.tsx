import { mountForm } from 'src/form/utils/utils';

describe('Input Value From', () => {
  const fields = [
    {
      name: 'inputA',
      inputType: 'text',
      value: '',
    },
    {
      name: 'inputB',
      inputType: 'text',
      value: '',
      attributes: {
        sync: 'inputA', // Syncs to target field name's value
      },
    },
  ];

  it('syncs the value to another input', () => {
    const formWrapper = mountForm({ fields });
    let inputAWrapper = formWrapper.find('input[name="inputA"]');
    let inputBWrapper;

    inputAWrapper.simulate('change', {
      target: { name: 'inputA', value: 'New Value' },
    });
    formWrapper.update();

    inputAWrapper = formWrapper.find('input[name="inputA"]');
    expect(inputAWrapper.props()).toMatchObject({
      value: 'New Value',
    });

    inputBWrapper = formWrapper.find('input[name="inputB"]');
    expect(inputBWrapper.props()).toMatchObject({
      value: 'New Value',
    });
  });
});
