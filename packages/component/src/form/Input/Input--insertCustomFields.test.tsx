import { mountForm } from 'src/form/utils/utils';

describe('insert custom fields ', () => {
  const fields = Object.freeze([
    {
      name: 'input_1',
      inputType: 'text',
      type: 'string',
    },
    {
      name: 'input_2',
      inputType: 'text',
      type: 'string',
    },
  ]);

  const customFields = [
    {
      index: 1,
      name: 'input_3',
      inputType: 'text',
      type: 'string',
    },
    {
      index: 2,
      name: 'input_4',
      inputType: 'text',
      type: 'string',
    },
  ];

  const formWrapper = mountForm({ fields, customFields });

  it('A custom field with index property is inserted in right order', () => {
    const firstInput = formWrapper
      .find('div.Form-field')
      .at(0)
      .find(`input[name="${fields[0].name}"]`);

    expect(firstInput.exists()).toBeTruthy();

    const secondInput = formWrapper
      .find('div.Form-field')
      .at(1)
      .find(`input[name="${customFields[0].name}"]`);

    expect(secondInput.exists()).toBeTruthy();

    const thirdInput = formWrapper
      .find('div.Form-field')
      .at(2)
      .find(`input[name="${customFields[1].name}"]`);

    expect(thirdInput.exists()).toBeTruthy();

    const fourthInput = formWrapper
      .find('div.Form-field')
      .at(3)
      .find(`input[name="${fields[1].name}"]`);

    expect(fourthInput.exists()).toBeTruthy();
  });
});
