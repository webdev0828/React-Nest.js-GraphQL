import React from 'react';
import { Slider } from 'antd';

interface ISliderInput {
  name: string;
  // defaultValue: number;
  setFieldValue: any;
  max: number;
  min: number;
  value: number;
  step: number;
}

const AppSlider = ({
  name,
  // defaultValue,
  setFieldValue,
  max,
  min,
  value,
  step,
}: ISliderInput) => {
  // console.log(min);
  // console.log(max);
  // console.log(value);
  // debugger;
  return (
    <Slider
      max={max}
      min={min}
      value={value}
      // defaultValue={defaultValue || 0}
      step={step || 1}
      onChange={value => {
        setFieldValue(name, value);
      }}
    />
  );
};
export default AppSlider;
