import { forIn, get, last } from 'lodash';
import { useStep } from 'src/form/Form/Step-context';
import * as Yup from 'yup';

export const validationSchema = ({ fields, steps }) => {
  const schemaShape = fields.reduce((acc, field) => {
    const type = get(field, 'type', 'string');
    const fieldValidation = get(field, 'validation', []);

    let validation: Yup = {};

    /**
     * Don't validate if step is enabled & not current step
     */
    if (steps) {
      const { currentStep } = useStep({ steps });
      if (field.formStep !== currentStep) {
        return Object.assign(acc, { [field.name]: Yup.mixed() });
      }
    }

    switch (type) {
      case 'number':
        validation = Yup.number();
        break;
      case 'string':
        validation = Yup.string();

        // validator -> { min: 2, msg: 'Too Short!' }
        fieldValidation.forEach(validator => {
          const message = get(validator, 'msg');

          forIn(validator, (value, key) => {
            switch (key) {
              // Ignores the 'msg' key
              case 'msg': {
                break;
              }
              case 'required': {
                validation = validation[key](message);
                break;
              }
              case 'when': {
                // value -> ['os_type']
                validation = validation.when(value, (...args: any[]) => {
                  // Map inputName -> value
                  const subscribedFormValues = value.reduce(
                    (acc, currentValue, index) => {
                      return Object.assign(acc, {
                        [currentValue]: args[index],
                      });
                    },
                    {},
                  );
                  if (!field.shouldRender(subscribedFormValues)) {
                    return Yup.mixed();
                  }
                  return last(args);
                });
                break;
              }
              default: {
                validation = validation[key](value, message);
                break;
              }
            }
          });
        });
        break;
      default:
        validation = Yup.mixed();
        break;
    }

    return Object.assign(acc, { [field.name]: validation });
  }, {});
  return Yup.object().shape(schemaShape);
};
