import { withMediator } from '@codelab/system';
import { Formik, FormikProps } from 'formik';
import React from 'react';
import { withApollo } from 'react-apollo';
import { compose } from 'recompose';
import {
  createFieldsFrom2DMatrix,
  createHandleSubmitFromMutation,
  mergeOrderedFields,
} from 'src/form/Form/Form--actions';
import {
  ApolloFormProps,
  FormModes,
  FormProps,
  IFormField,
  InnerFormProps,
  OnSubmitType,
  TableFormProps,
} from 'src/form/Form/Form--interface';
import { initialValues } from 'src/form/Form/Form--validation';
import { FormButtonsWrapper } from 'src/form/Form/Form-buttons--wrapper';
import {
  FieldsWrapper,
  FormButton,
  FormWrapper,
} from 'src/form/Form/Form-components';
import ProgressBar from 'src/form/Form/Form-progressBar';
import FormFields from 'src/form/Form/FormFields';
import { withStepProvider } from 'src/form/Form/Step-context';
import { validationSchema } from 'src/form/Validation/validationSchema';
import { TableFormWrapper } from './Form-table';
import './Form.scss';

const OuterForm: React.FC<ApolloFormProps> = props => {
  /**
   * Merge Fields
   */
  const fieldsProps: {
    fields: IFormField[];
    customFields?: IFormField[];
  } = props;

  const fields = mergeOrderedFields(fieldsProps);

  /**
   *  Create props for submitting
   */
  const onSubmitProps: {
    client?;
    mutation?;
    onSubmit;
    onComplete?;
  } = props;

  const handleSubmit: OnSubmitType = createHandleSubmitFromMutation(
    onSubmitProps,
  );
  /**
   *  Form layout
   */
  const { layout } = props;
  const innerFormProps: InnerFormProps = {
    layout,
    fields,
    className: props.className,
    mode: props.mode,
    children: props.children,
    submitButton: props.submitButton,
    submitOnChange: props.submitOnChange,
    sections: props.sections,
    steps: props.steps,
    table: props.table,
  };

  // Formik shared config
  const { enableReinitialize = true } = props;
  const initValues = initialValues(fields);

  return (
    <Formik
      initialValues={initValues}
      validationSchema={validationSchema({
        fields,
        steps: props.steps,
      })}
      enableReinitialize={enableReinitialize}
      onSubmit={handleSubmit}
      render={(props: FormikProps<any>) => {
        const mergedProps = { ...props, ...innerFormProps };
        return <InnerForm {...mergedProps} />;
      }}
    />
  );
};

export const InnerForm: React.FC<InnerFormProps & FormikProps<any>> = props => {
  const Fields: JSX.Element[] | any = FormFields(props);
  const {
    handleChange,
    handleBlur,
    isSubmitting,
    submitButton,
    className,
    children,
    mode,
    values,
    handleSubmit,
    validateForm,
    setFieldTouched,
    resetForm,
    setValues,
    layout,
    steps = [],
    table,
  } = props;

  const DefaultForm = (
    <FormWrapper onSubmit={handleSubmit} layout={layout}>
      <ProgressBar steps={steps} />
      {table ? (
        <TableFormWrapper
          table={table}
          EditableCells={Fields as JSX.Element[]}
        />
      ) : (
        Fields
      )}
      <FormButtonsWrapper
        validateForm={validateForm}
        steps={steps}
        values={values}
        submitButton={props.submitButton}
        isSubmitting={props.isSubmitting}
        setFieldValue={props.setFieldValue}
      />
    </FormWrapper>
  );

  return mode === FormModes.RenderProps
    ? children!({
        FormWrapper,
        FormButton,
        FormFields: FieldsWrapper,
        Fields: FormFields,
        formController: {
          className,
          values,
          isSubmitting,
          handleSubmit,
          setFieldTouched,
          handleChange,
          handleBlur,
          resetForm,
          setValues,
        },
      })
    : DefaultForm;
};

export const Form = compose<ApolloFormProps, FormProps>(
  withApollo,
  withMediator,
  withStepProvider,
)(OuterForm);

export const TableForm: React.FC<TableFormProps> = (props: TableFormProps) => {
  const { table } = props;
  const fields = createFieldsFrom2DMatrix(table);
  return <Form fields={fields} {...props} />;
};
