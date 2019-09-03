import { Button } from 'antd';
import { Field, FieldArray, FormikProps } from 'formik';
import { default as _, has, isEmpty, omit } from 'lodash';
import React from 'react';
import FieldSection from 'src/form/Form/Field-section';
import { FieldProps, InnerFormProps } from 'src/form/Form/Form--interface';
import { FieldLayout } from 'src/form/Form/Form--layout';
import { useStep } from 'src/form/Form/Step-context';
import Input from 'src/form/Input/Input';

/**
 * Need to inject non-fields separately, because callback is for field object
 * only.
 */
export const AppField = (props: FieldProps) => {
  const {
    handleChange,
    handleBlur,
    submitOnChange,
    submitForm,
    inputType,
    id,
    name,
    placeholder,
    attributes,
    label,
    options,
    optionGutter,
    disabled,
    min,
    max,
    layout,
    sections,
    step,
    style,
    validation,
    mode,
    isCreatable,
    onCreate,
    shouldRender,
    values,
  } = props;

  const fieldLayoutProps = {
    inputType, // If hidden need to apply hidden
    layout,
    name,
    id,
    label,
    validation,
  };

  if (shouldRender && !shouldRender(values)) return null;

  return (
    <>
      <FieldSection.Before sections={sections} name={name} />
      <FieldLayout
        key={name}
        {...fieldLayoutProps}
        className="Form-field ant-form-item"
      >
        <Field
          // Basic
          id={id || name}
          inputType={inputType}
          name={name}
          placeholder={placeholder}
          label={label}
          // Style
          optionGutter={optionGutter}
          style={style}
          mode={mode}
          // Attributes
          attributes={attributes}
          options={options}
          // defaultChecked={defaultChecked}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          // Values
          values={values}
          // defaultValue={defaultValue}
          // formik handlers
          onChange={handleChange}
          onBlur={handleBlur}
          // custom handler
          submitOnChange={submitOnChange}
          // formil actions
          submitForm={submitForm}
          // System
          component={Input}
          isCreatable={isCreatable}
          onCreate={onCreate}
        />
      </FieldLayout>
      <FieldSection.After sections={sections} name={name} />
    </>
  );
};

const FormFields: React.FC<InnerFormProps & FormikProps<any>> = props => {
  const { fields, values, steps } = props;
  /**
   * Split fields into "repeatable" and default
   *
   * There is a field component, along with general form props, attach form
   * props under fields
   */
  let defaultFields: any = fields
    .filter(field => !has(field, 'fieldArray.name'))
    .map(field => ({ ...field, ...omit(props, 'layout') })); // omit form layout

  if (!isEmpty(steps)) {
    const { currentStep } = useStep({ steps });
    defaultFields = defaultFields.filter(
      field => field!.formStep === currentStep,
    );
  }

  const arrayFields = fields
    .filter(field => has(field, 'fieldArray.name'))
    .map(field => ({ ...field, ...props }));

  /**
   * For just array fields, we want to group by fieldArrayName
   */
  const groupedArrayFields: any = _(arrayFields)
    .groupBy('fieldArray.name')
    .map((fields, fieldArrayName) => ({
      fieldArrayName,
      fields,
    }))
    .value();

  const arrayFieldsButtonText = _.reduce(
    arrayFields,
    (acc, cur) => {
      const buttonText = _.get(cur, 'fieldArray.buttonText');
      return buttonText ? buttonText : acc;
    },
    '',
  );

  return (
    groupedArrayFields
      .map(({ fieldArrayName, fields }) => {
        return (
          <FieldArray
            key={fieldArrayName}
            name={fieldArrayName}
            render={arrayHelpers => (
              <div className="ant-form-item">
                {values[fieldArrayName] && values[fieldArrayName].length > 0 ? (
                  values[fieldArrayName].map((fieldValue, rowIndex) => (
                    <div key={rowIndex}>
                      {fields.map(field => {
                        const name = `${fieldArrayName}.${rowIndex}.${
                          field.name
                        }`;

                        if (has(field, 'sync') && field.values) {
                          Object.keys(field.values).forEach(syncKey => {
                            field[syncKey] =
                              field.values[syncKey][fieldValue[field.sync]] ||
                              field[syncKey];
                          });
                        }

                        return (
                          <AppField
                            {...field}
                            name={name} // overide name
                            key={`${rowIndex}.${field.name}`}
                          />
                        );
                      })}

                      <Button onClick={() => arrayHelpers.remove(rowIndex)}>
                        -
                      </Button>

                      <Button
                        onClick={() => {
                          arrayHelpers.insert(rowIndex, '');
                        }}
                      >
                        +
                      </Button>
                    </div>
                  ))
                ) : (
                  <Button onClick={() => arrayHelpers.push('')}>
                    {arrayFieldsButtonText || 'Add Field'}
                  </Button>
                )}
              </div>
            )}
          />
        );
      })
      // Add on non-array fields to array fields
      .concat(
        defaultFields.map((field: FieldProps, index: number) => {
          const key = field.key ? `${field.key}--${index}` : `${index}`;
          return <AppField {...field} key={key} />;
        }),
      )
  );
};

export default FormFields;
