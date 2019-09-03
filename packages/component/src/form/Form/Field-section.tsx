import { default as _ } from 'lodash';
import React from 'react';

const FieldSection = ({ children }) => <>{children}</>;

const Before = ({ name, sections }) => {
  const groupedSections = _(sections)
    .groupBy('position')
    .value();

  if (!groupedSections[name] || groupedSections[name][0].order === 'after') {
    return null;
  }

  return <h4> {groupedSections[name][0].label} </h4>;
};

const After = ({ name, sections }) => {
  const groupedSections = _(sections)
    .groupBy('position')
    .value();

  if (!groupedSections[name] || groupedSections[name][0].order === 'before') {
    return null;
  }

  return <h4> {groupedSections[name][0].label} </h4>;
};

FieldSection.Before = Before;
FieldSection.After = After;

export default FieldSection;
