import { findIndex, has } from 'lodash';

const isRequired = validation => findIndex(validation, { required: true }) > -1;

const initialValues = fields => {
  return (
    fields
      /**
       * Remove fieldArray fields, we will have a separate field value for that
       * later
       */
      .filter(field => !has(field, 'fieldArray.name'))
      /**
       * Reduce down to intialValues format
       */
      .reduce(
        (acc, field) =>
          Object.assign(acc, {
            [field.name]: field.value,
          }),
        {},
      )
  );
};

export { initialValues, isRequired };
