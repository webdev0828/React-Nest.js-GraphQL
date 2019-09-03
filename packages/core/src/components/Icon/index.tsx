import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from '@emotion/styled';
import * as _ from 'lodash';

const properCase = str =>
  `fa${str
    .split('-')
    .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
    .join('')}`;

const registerIcon = icon => {
  const requiredIcon = require('@fortawesome/free-solid-svg-icons')[
    properCase(icon)
  ];
  library.add(requiredIcon);
};

const Icon = ({ icon }) => {
  registerIcon(icon);
  return <FontAwesomeIcon icon={icon} />;
};

export default Icon;
