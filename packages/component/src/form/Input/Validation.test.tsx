import { mountForm } from 'src/form/utils/utils';
import wait from 'waait';
import { validationSchema } from 'src/form/Validation/validationSchema';

describe('Validation Errors', () => {
  describe('Text Validation', () => {
    let wrapper;

    const field = {
      name: 'name',
      inputType: 'text',
      value: '',
      type: 'string',
      validation: [
        { required: true, msg: 'Required!!' },
        { min: 2, msg: 'Too Short!' },
        { max: 10, msg: 'Too Long!' },
      ],
    };

    it.only('is required', async () => {
      wrapper = mountForm({ fields: [field] });
      wrapper.find('Form').simulate('submit');
      await wait(0);

      /**
       * Get validation error
       */
      const schemaValidate = validationSchema({ fields: [field] });
      const expectedError = await schemaValidate
        .validate({ [field.name]: field.value })
        .catch(({ path, message }) => {
          return {
            [path]: message,
          };
        });

      const actualErrors = wrapper
        .update()
        .find('InnerForm .ValidationErrors')
        .text();

      expect(actualErrors).toBe(expectedError[field.name]);
    });

    it('has a minimum length', async done => {
      field.value = '1';
      wrapper = mountForm({ fields: [field] });
      wrapper.find('form').simulate('submit');

      const schemaValidate = validationSchema({ fields: [field] });
      const expectedError = await schemaValidate
        .validate({ [field.name]: field.value })
        .catch(({ path, message }) => {
          return {
            [path]: message,
          };
        });

      setTimeout(() => {
        wrapper.find('InnerForm').update();
        const actualErrors = wrapper.find('InnerForm').prop('errors');
        expect(actualErrors[field.name]).toBe(expectedError[field.name]);
        done();
      }, 100);
    });

    it('has a max length', async done => {
      field.value = '1234567891011';
      wrapper = mountForm({ fields: [field] });
      wrapper.find('form').simulate('submit');

      const schemaValidate = validationSchema({ fields: [field] });
      const expectedError = await schemaValidate
        .validate({ [field.name]: field.value })
        .catch(({ path, message }) => {
          return {
            [path]: message,
          };
        });

      setTimeout(() => {
        wrapper.find('InnerForm').update();
        const actualErrors = wrapper.find('InnerForm').prop('errors');
        expect(actualErrors[field.name]).toBe(expectedError[field.name]);
        done();
      }, 100);
    });
  });
});
