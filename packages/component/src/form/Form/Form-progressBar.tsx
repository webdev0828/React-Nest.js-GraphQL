import { Steps } from 'antd';
import { isEmpty } from 'lodash';
import React from 'react';
import { FormProps } from 'src/form/Form/Form--interface';
import { useStep } from 'src/form/Form/Step-context';

const ProgressBar: React.FC<Pick<FormProps, 'steps'>> = ({ steps }) => {
  if (isEmpty(steps)) return null;

  const { currentStep } = useStep({ steps });

  return (
    <Steps current={currentStep}>
      {steps!.map(({ title }, index) => (
        <Steps.Step key={index} title={title} />
      ))}
    </Steps>
  );
};

export default ProgressBar;
