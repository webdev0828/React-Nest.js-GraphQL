import { Col, Radio, Row } from 'antd';
import React from 'react';

interface IRadioOption {
  label: string;
  value: string;
  col: number;
}

interface IRadioInput {
  name: string;
  value: boolean;
  style: string;
  label: string;
  onChange: any;
  submitOnChange: boolean;
  options: [IRadioOption];
  submitForm: any;
}

const AppRadio = ({
  onChange,
  options,
  name,
  value,
  submitOnChange,
  submitForm,
  style,
}: IRadioInput) => {
  return (
    <div className={style}>
      <Radio.Group
        onChange={async e => {
          await onChange(e);
          if (submitOnChange) {
            submitForm();
          }
        }}
        name={name}
        value={value}
      >
        <Row gutter={5}>
          {options.map(({ label, value, col }, index) => {
            const deafultWidth: number = Math.floor(
              Number(24 / options.length),
            );
            const width = col || deafultWidth;
            return (
              <Col span={width} key={index}>
                <Radio value={value}>{label}</Radio>
              </Col>
            );
          })}
        </Row>
      </Radio.Group>
    </div>
  );
};

export default AppRadio;
