import { Form, Modal, useModal } from '@codelab/component';
import { ModalIDs } from '@codelab/system';
import React from 'react';
import { UPDATE_MODEL } from 'src/components/Model/Model--queries';

const ModelModalEdit = ({ model }) => {
  const modalID = ModalIDs.ModelEdit;
  const { closeModal } = useModal(modalID);
  const fields = model.editModelFormFields();
  return (
    <Modal id={modalID} title="Edit Model">
      <Form
        fields={fields}
        mutation={UPDATE_MODEL}
        submitButton={{ text: 'OK' }}
        onSubmit={(values, { mutate }) => model.editModel(values, { mutate })}
        onComplete={closeModal()}
      />
    </Modal>
  );
};

export default ModelModalEdit;
