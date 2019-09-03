import { Form, Modal, useModal } from '@codelab/component';
import { ModalIDs } from '@codelab/system';
import React from 'react';
import { Container } from 'src/components/BuilderComponents/Layout/Container';
import { CREATE_CONTAINER_MUTATION } from 'src/state/apollo-local-state/container/containerState';

const ContainerModalCreate = () => {
  const modalID = ModalIDs.ContainerCreate;
  const { toggleModal } = useModal(modalID);
  const fields = Container.getCreateFormFields();

  const submitButton = {
    text: 'Create Container',
  };

  return (
    <Modal id={modalID}>
      <Form
        mutation={CREATE_CONTAINER_MUTATION}
        fields={fields}
        submitButton={submitButton}
        onComplete={toggleModal()}
        onSubmit={(values, { mutate }) => {
          return Container.createContainer({ values, mutate });
        }}
      />
    </Modal>
  );
};

export default ContainerModalCreate;
