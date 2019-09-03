import { mountForm } from 'src/form/utils/utils';

describe('Text Input', () => {
  const field = {
    name: 'input-with-label',
    inputType: 'text',
    type: 'string',
    label: 'Name Field',
  };

  const formWrapper = mountForm({ fields: [field] });
  const inputWrapper = formWrapper.find(`input[name="${field.name}"]`);

  it('has a label property ', () => {
    expect(inputWrapper.props()).toHaveProperty('label');
  });

  it('has the correct label  value  ', () => {
    expect(inputWrapper.props()).toHaveProperty('label', field.label);
  });
});
