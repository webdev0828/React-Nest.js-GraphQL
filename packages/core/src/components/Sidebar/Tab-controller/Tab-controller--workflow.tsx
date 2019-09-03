import React from 'react';
import AddAction from 'src/components/Workflow/Form-action--create';
import AddEvent from 'src/components/Workflow/Form-event--create';
import AddWorkflow from 'src/components/Workflow/Form-workflow--create';

const TabControllerWorkflow = () => {
  return (
    <>
      <AddWorkflow />
      <AddEvent />
      <AddAction />
    </>
  );
};

export default TabControllerWorkflow;
