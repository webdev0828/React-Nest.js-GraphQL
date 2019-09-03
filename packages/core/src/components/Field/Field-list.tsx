import React from 'react';
import { FieldItem } from 'src/components/Field/Field-item';

export const FieldList = ({ fields, model }) => {
  return fields.map((field, idx) => (
    <FieldItem field={field} model={model} key={idx} />
  ));
};
