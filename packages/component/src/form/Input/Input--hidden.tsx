import React from 'react';
import { Input } from 'antd';

interface IHiddenInput {
  name: string;
  value: number;
}

const AppHiddenInput = ({ name, value }: IHiddenInput) => {
  return <Input type="hidden" name={name} value={value} />;
};
export default AppHiddenInput;
