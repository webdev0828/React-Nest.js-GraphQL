import { Event, ModelType } from '@codelab/system';
import {
  FormikActions,
  FormikHandlers,
  FormikSharedConfig,
  FormikState,
} from 'formik';
import {
  MutationOptions,
  OperationVariables,
  WithApolloClient,
} from 'react-apollo';
import { IInputLayout } from 'src/form/Form/Form--layout';
import { INPUT_TYPES } from 'src/form/Input/Input';

// type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>; // enable
// this line if it has any problem with Omit

/**
 * FormContainer is Form + Apollo
 */
export type ApolloFormProps = WithApolloClient<FormProps>;

export type TableFormProps = {
  table: IFormTable;
} & Omit<FormProps, 'fields'>;

export interface IFormTable {
  legendCol?: string;
  xLabels: string[]; // columns
  yLabels: string[]; // first cell of row
  data: (String | Number)[][]; // data source
}

export enum FormModes {
  RenderProps = 'renderProps',
}

export enum FormLayout {
  Inline = 'INLINE',
  Horizontal = 'HORIZONTAL',
  Vertical = 'VERTICAL',
}

export type OnSubmitValue = {
  [key: string]: string;
};

export type OnSubmitType = (values: OnSubmitValue, props: any) => void;

export type ModuleType = {
  action?: Event.CRUD;
  module?: ModelType;
};

export type FormProps = {
  // Enable mediator
  enableMediator?: boolean;

  customFields?: IFormField[]; // Allow additional fields to be inserted
  layout?: FormLayout;
  mutation?: any; // Apollo mutation
  client?: any; // Apollo client
  onSubmit: OnSubmitType; // Promise callback on submit
  onComplete?: (any) => void; // Callback on complete`
} & InnerFormProps &
  FormikSharedConfig &
  MutationOptions<any, OperationVariables>;

export type InnerFormProps = {
  fields: IFormField[];
  sections?: IFormSection[];
  className?: string;
  mode?: String;
  layout?: FormLayout;
  submitOnChange?: boolean;
  submitButton?: any;
  children?: (any) => JSX.Element; // Insert extra content inside form
  steps?: {
    title: React.ReactNode;
    key?: string;
  }[];
  // bem?: BEM; // Used for CSS class
  // columns?: (ColumnProps<any> & { editable?: boolean })[];
  // dataSource?: any[];
  table?: IFormTable;
};

/**
 * Used for adding section labels to fields
 */
export type IFormSection = {
  label: string;
  position: string;
  order: 'before' | 'after';
};

/**
 * Used for form fields
 */
export type IFormField = {
  name: string;
  value?: string | number | boolean | string[];
  inputType: INPUT_TYPES;
  placeholder?: string;
  label?: string;
  optionGutter?: number;

  // attr
  index?: number;
  id?: string;
  attributes?: any;
  disabled?: boolean;
  style?: string;
  sync?: string; // Allow conditional dropdown

  // Field array options
  // fieldArrayName?: string;
  fieldArray?: {
    name: string;
    buttonText?: string; // Button text of button to add
  };
  // checkbox
  max?: number;
  min?: number;
  step?: number; // step slider
  options?: { label: string; value: string }[];
  // [propName: string]: any;
  layout?: IInputLayout;
  validation?: any[];

  // Multiple select
  mode?: string;

  // Creatable Select
  isCreatable?: Boolean;
  onCreate?: any;
  key?: string;
  shouldRender?: (values) => boolean;
  formStep?: number;
};

export interface IFormWrapperProps {
  onSubmit: () => void;
  className?: string;
  children?: React.ReactNode;
  layout?: FormLayout;
}

export type FieldProps = InnerFormProps &
  IFormField &
  FormikHandlers &
  FormikActions<any> &
  FormikState<any>;

export type ButtonGroupProps = Pick<
  FormikActions<any>,
  'validateForm' | 'setFieldValue'
> &
  Pick<FormikState<any>, 'isSubmitting' | 'values'> &
  Pick<FormProps, 'submitButton' | 'steps'>;
