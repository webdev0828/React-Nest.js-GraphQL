import { Divider, Icon, Select } from 'antd';
import React from 'react';

const { Option } = Select;

export interface ISelectOption {
  label: string;
  value: string;
}

interface ISelectInput {
  options: [ISelectOption];
  style?: React.CSSProperties;
  name: string;
  setFieldValue: any;
  placeholder: string;
  mode: string;
  onComplete?: any;
  isCreatable?: Boolean;
  onCreate?: any;
  value?: any;
  disabled?: boolean;
}

const AppSelect = ({
  options,
  style,
  name,
  setFieldValue,
  placeholder,
  mode,
  onComplete,
  isCreatable,
  onCreate,
  value,
  disabled,
}: ISelectInput) => {
  return (
    <div
      onMouseDown={e => {
        e.preventDefault();
        return false;
      }}
    >
      <Select
        disabled={disabled}
        placeholder={placeholder}
        onChange={ev => {
          if (onComplete) onComplete(ev);
          setFieldValue(name, ev);
        }}
        style={style}
        mode={mode}
        dropdownRender={menu => {
          return (
            <div>
              {menu}
              {isCreatable ? (
                <div>
                  <Divider style={{ margin: 0 }} />
                  <a
                    href="javascript:;"
                    style={{ padding: 8, display: 'block' }}
                    onClick={() => {
                      if (onCreate) {
                        onCreate();
                      }
                    }}
                  >
                    <Icon type="plus" /> Add Item
                  </a>
                </div>
              ) : null}
            </div>
          );
        }}
        value={value}
      >
        {options.map(({ label, value }, index) => {
          return (
            <Option key={`${label}_${index}`} value={value}>
              {label}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};
export default AppSelect;
