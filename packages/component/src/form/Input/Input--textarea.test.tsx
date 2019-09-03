import { mountForm } from 'src/form/utils/utils';

describe('Textarea Input', () => {
  const field = {
    name: 'name',
    inputType: 'textarea',
    placeholder: 'Textarea Placeholder:',
    value: '',
    type: 'string',
  };

  const formWrapper = mountForm({ fields: [field] });
  const inputWrapper = formWrapper.find(`textarea[name="${field.name}"]`);

  it('has the correct name attribute', () => {
    expect(inputWrapper.props()).toMatchObject({
      name: field.name,
    });
  });

  it('has the correct value attribute', () => {
    expect(inputWrapper.props()).toMatchObject({
      value: field.value,
    });
  });

  it('has the correct placeholder attribute', () => {
    expect(inputWrapper.props()).toMatchObject({
      placeholder: field.placeholder,
    });
  });

  it('has the correct html attributes', () => {
    expect(inputWrapper.props()).toMatchObject({
      placeholder: field.placeholder,
    });
  });
});
