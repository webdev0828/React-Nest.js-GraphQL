import React, { useContext, useState } from 'react';

interface IStepContext {
  currentStep: number;
  canBack: Boolean;
  canNext: Boolean;
  handleNext: Function;
  handleBack: Function;
  setStep: Function;
}

const StepContext = React.createContext<IStepContext>({
  currentStep: 0,
  canBack: false,
  canNext: false,
  handleNext: () => null,
  handleBack: () => null,
  setStep: () => null,
});

export const withStepProvider = Component => ({ children, ...props }: any) => {
  const [currentStep, setStep] = useState(0);

  return (
    <StepContext.Provider
      value={{
        setStep,
        currentStep,
        canBack: false,
        canNext: false,
        handleNext: () => null,
        handleBack: () => null,
      }}
    >
      <Component {...props}>{children}</Component>
    </StepContext.Provider>
  );
};

export const useStep = ({ steps }) => {
  const context = useContext(StepContext);
  const { currentStep, setStep } = context;

  const firstStep = 0;
  const lastStep = steps!.length - 1;

  const canNext = currentStep < lastStep;
  const canBack = currentStep > firstStep && currentStep <= lastStep;

  const handleNext = () => {
    if (canNext) {
      setStep(currentStep + 1);
    }
    return;
  };

  const handleBack = () => {
    if (canBack) {
      setStep(currentStep - 1);
    }
    return;
  };

  const onLastStep = currentStep === lastStep;

  return {
    currentStep,
    canBack,
    canNext,
    handleNext,
    handleBack,
    onLastStep,
  };
};
