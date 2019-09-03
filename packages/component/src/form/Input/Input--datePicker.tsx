import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

interface IDateTimePicker {
  name: string;
  setFieldValue: any;
  value: string;
}

const AppDatetimePicker = ({ name, setFieldValue, value }: IDateTimePicker) => {
  return (
    <DatePicker
      defaultValue={moment(value, 'YYYY/MM/DD')}
      onChange={(dateObj, dateString) => setFieldValue(name, dateString)}
    />
  );
};
export default AppDatetimePicker;
