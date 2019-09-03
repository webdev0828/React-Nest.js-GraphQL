import { Input as AntdInput } from 'antd';
import React from 'react';
import ThemeProvider from 'src/form/ThemeProvider';
import styled from 'styled-components';
import './_input.scss';
import AppCascader from './Input--cascader';
import AppCheckbox from './Input--checkbox';
import AppColorPicker from './Input--colorPicker';
import AppDatetimePicker from './Input--datePicker';
import AppHiddenInput from './Input--hidden';
import AppNumberInput from './Input--number';
import AppRadio from './Input--radio';
import AppRadioButton from './Input--radioButton';
import AppSelect from './Input--select';
import AppSlider from './Input--slider';

const { TextArea } = AntdInput;

const ValidationErrors = styled.div.attrs({
  className: 'ValidationErrors',
})`
  min-height: 1.5rem;
  color: ${props => props.theme.color.danger};
`;

/**
 * Value needs to be lowered case to match HTML field values
 */
export enum INPUT_TYPES {
  Text = 'text',
  Password = 'password',
  Textarea = 'textarea',
  Select = 'select',
  Checkbox = 'checkbox',
  Radio = 'radio',
  Datetime = 'datetime',
  Slider = 'slider',
  Cascader = 'cascader',
  RadioButton = 'radioButton',
  Color = 'color',
  Number = 'number',
  Hidden = 'hidden',
}

const inputComponents = {
  text: AntdInput,
  password: AntdInput.Password,
  textarea: TextArea,
  checkbox: AppCheckbox,
  radio: AppRadio,
  slider: AppSlider,
  select: AppSelect,
  datetime: AppDatetimePicker,
  color: AppColorPicker,
  number: AppNumberInput,
  cascader: AppCascader,
  radioButton: AppRadioButton,
  hidden: AppHiddenInput,
};

const DynamicInput = ({
  inputType,
  placeholder,
  field,
  values,
  value,
  setFieldValue,
  attributes, // HTML attributes
  submitOnChange,
  submitForm,
  mode, // This is for mode of select - multiple or tags
  onComplete,
  isCreatable,
  onCreate,
  ...props
}) => {
  const InputInstance = inputComponents[inputType];

  switch (inputType) {
    case INPUT_TYPES.Text:
    case INPUT_TYPES.Password:
    case INPUT_TYPES.Textarea:
      return (
        <InputInstance
          placeholder={placeholder}
          {...attributes}
          {...props}
          autoComplete="off"
          value={
            attributes && attributes.sync ? values[attributes.sync] : value
          }
        />
      );
    case INPUT_TYPES.Select:
      return (
        <InputInstance
          setFieldValue={setFieldValue}
          placeholder={placeholder}
          submitOnChange={submitOnChange}
          submitForm={submitForm}
          {...attributes}
          {...props}
          autoComplete="off"
          value={value}
          mode={mode}
          onComplete={onComplete}
          isCreatable={isCreatable}
          onCreate={onCreate}
        />
      );
    default:
      return (
        <InputInstance
          setFieldValue={setFieldValue}
          placeholder={placeholder}
          submitOnChange={submitOnChange}
          submitForm={submitForm}
          {...attributes}
          {...props}
          autoComplete="off"
          value={value}
        />
      );
  }
};

class Input extends React.Component {
  render() {
    const {
      placeholder,
      inputType,
      field,
      form: { touched, errors, setFieldValue },
      options,
      label,
      // defaultChecked,
      // defaultValue,
      attributes,
      disabled,
      min,
      max,
      step,
      values,
      mode,
      onComplete,
      isCreatable,
      onCreate,
      // Submit
      submitOnChange,
      submitForm,
      style,
    }: any = this.props;
    const { name, id } = field;

    return (
      <ThemeProvider>
        <React.Fragment>
          {/* {label && inputType !== "checkbox" && <div>{label}</div>} */}
          {/* <AntdForm.Item label={label && lbElement}> */}
          <DynamicInput
            inputType={inputType}
            values={values}
            placeholder={placeholder}
            setFieldValue={setFieldValue}
            attributes={attributes}
            {...field}
            label={label}
            options={options}
            // defaultChecked={defaultChecked}
            // defaultValue={defaultValue}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            mode={mode}
            onComplete={onComplete}
            isCreatable={isCreatable}
            onCreate={onCreate}
            // Form submission
            submitOnChange={submitOnChange}
            submitForm={submitForm}
            style={style}
            id={id || name}
          />
          <ValidationErrors>
            {touched[name] && errors[name] ? errors[name] : null}
          </ValidationErrors>
          {/* </AntdForm.Item> */}
        </React.Fragment>
      </ThemeProvider>
    );
  }
}

export const InputLabel = ({ label, isRequired, id }: any) => (
  <div className="form-label-wrapper ant-form-item-label">
    <label htmlFor={id} className={isRequired ? 'ant-form-item-required' : ''}>
      {label}
    </label>
  </div>
);

export default Input;
