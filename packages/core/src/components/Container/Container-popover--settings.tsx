import { Form, useModal } from '@codelab/component';
import { ModalIDs } from '@codelab/system';
import { Button, Icon, Popover } from 'antd';
import React from 'react';
import { IElement } from 'src/components/Element/Element';
import { UPDATE_CONFIGCONTAINER_MUTATION } from 'src/state/apollo-local-state/container/containerState';

const EditPopoverForContainer = container => {
  const fields = container.getUpdateFormFieldsForContainer();
  return (
    <Form
      fields={fields}
      mutation={UPDATE_CONFIGCONTAINER_MUTATION}
      submitButton={{ text: 'Update Config' }}
      onSubmit={(values, { mutate }) => {
        const config = container.config;
        return config.updateConfig(values, { mutate });
      }}
      onComplete={() => Promise.resolve(console.log('onComplete'))}
    />
  );
};

const SelectPopoverOnContainer = container => {
  const { openModal } = useModal(ModalIDs.GridCreate);
  const id = container.id;
  return (
    <>
      <Popover
        placement="right"
        content={EditPopoverForContainer(container)}
        trigger="click"
      >
        <Button>Edit Container</Button>
      </Popover>
      <Button onClick={openModal({ data: { id } })}>Create Grid</Button>
    </>
  );
};

const ContainerPopoverSettings = ({ container }: { container: IElement }) => (
  <Popover
    placement="right"
    content={SelectPopoverOnContainer(container)}
    trigger="click"
  >
    <Icon type="setting" />
  </Popover>
);

export default ContainerPopoverSettings;
