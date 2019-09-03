import React from 'react';
import { Cascader } from 'antd';

interface ICascaderInput {
  options: [any];
  value: any;
  style?: React.CSSProperties;
  name: string;
  setFieldValue: any;
  placeholder: string;
}

const AppCascader = ({
  options,
  value,
  style,
  name,
  setFieldValue,
  placeholder,
}: ICascaderInput) => {
  return (
    <Cascader
      value={value}
      onChange={value => {
        setFieldValue(name, value);
      }}
      style={style}
      placeholder={placeholder}
      options={options}
    />
  );
};

export default AppCascader;
