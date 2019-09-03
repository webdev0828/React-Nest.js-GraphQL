import { FormikActions } from 'formik';
import React from 'react';
import { MutationOptions } from 'react-apollo';
import {
  IFormField,
  ModuleType,
  OnSubmitType,
  IFormTable,
} from 'src/form/Form/Form--interface';
import { default as _ } from 'lodash';
import { INPUT_TYPES } from 'src/form/Input/Input';

/**
 * Takes customFields and insert into fields with correct order.
 *
 * @param customFields
 * @param fields
 */
const mergeOrderedFields = ({
  customFields = [],
  fields,
}: {
  customFields?: IFormField[];
  fields: IFormField[];
}) => {
  const mergedFields = Object.assign([], fields);

  for (const field of customFields) {
    if ((field as any).index && (field as any).index <= fields.length) {
      mergedFields.splice((field as any).index, 0, field);
    } else {
      mergedFields.push(field);
    }
  }

  return mergedFields;
};

export type PropsForHandleSubmit = {
  /**
   * Mediator
   */
  enableMediator?: boolean;
  mediator?: any;
  /**
   * Other
   */
  client?: any;
  mutation?: any;
  onSubmit: any;
  onComplete?: any;
} & ModuleType;

const createHandleSubmitFromMutation = ({
  enableMediator,
  mediator,
  action,
  module,
  client,
  mutation,
  onSubmit,
  onComplete = res => {},
}: PropsForHandleSubmit): OnSubmitType => {
  /**
   * If using mediator
   */
  if (enableMediator) {
    return () => mediator.notify(module, action);
  }

  let mutate: (mutationOptions: MutationOptions) => Promise<any> = () =>
    Promise.resolve();

  if (mutation) {
    mutate = mutationOptions => {
      /**
       * Take in mutation from props on Form, the rest is passed in inside
       * onSubmit()
       */
      return client!.mutate({ mutation, ...mutationOptions });
    };
  }

  /**
   * Combine props from formik submit handler & mutation
   */
  const handleSubmit = (
    values: any,
    props: FormikActions<any> & MutationOptions,
  ) => {
    props.setSubmitting(true);

    /**
     * Expose Apollo Client, Mutate HOC with arguments curried in, and
     * remaining Formik props
     */
    onSubmit(values, { mutate, client, ...props }).then(async res => {
      await onComplete(res);
      setTimeout(() => {
        props.setSubmitting(false);
      }, 1000);
    });
  };

  return handleSubmit;
};

const createFieldsFrom2DMatrix = (table: IFormTable) => {
  const fields: IFormField[] = _(table.data)
    .map((row, rowIndex) => {
      return row.map((value, colIndex) => {
        const name = `${table.yLabels[rowIndex]}--${table.xLabels[colIndex]}`;
        const type =
          typeof value === 'string' ? INPUT_TYPES.Text : INPUT_TYPES.Number;

        return {
          value,
          name,
          inputType: type,
        } as IFormField;
      });
    })
    .flatten()
    .value();
  return fields;
};

export {
  mergeOrderedFields,
  createHandleSubmitFromMutation,
  createFieldsFrom2DMatrix,
};
