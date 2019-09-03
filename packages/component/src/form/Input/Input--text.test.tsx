import { mountForm } from 'src/form/utils/utils';

describe('Text Input', () => {
  const field = {
    // id: 'name',
    name: 'name',
    inputType: 'text',
    placeholder: 'text abc',
    value: '',
    attributes: {
      id: 'name',
    },
  };

  const formWrapper = mountForm({ fields: [field] });
  const inputWrapper = formWrapper.find(`input[name="${field.name}"]`);

  it('has the correct id attribute', () => {
    expect(inputWrapper.props()).toMatchObject({
      id: 'name',
    });
  });

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

describe('Hidden Text Input', () => {
  const field = {
    name: 'name',
    inputType: 'text',
    placeholder: 'text abc',
    value: '',
    attributes: { hidden: true },
  };

  const formWrapper = mountForm({ fields: [field] });
  const inputWrapper = formWrapper.find(`input[name="${field.name}"]`);

  it('has the correct placeholder attribute', () => {
    expect(inputWrapper.props()).toMatchObject({
      hidden: true,
    });
  });
});
