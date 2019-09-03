import { Form, Modal, useModal } from '@codelab/component';
import { ModalIDs } from '@codelab/system';
import React from 'react';
import { Content } from 'src/components/BuilderComponents/Content';
import { ADD_NEW_CONTENT } from 'src/state/apollo-local-state/content/contentState';

const ContentCreateModal = () => {
  const modalID = ModalIDs.ContentCreate;
  const { closeModal, data } = useModal(modalID);
  const { model, columns } = data;
  const fields = columns ? Content.getAddContentFormFields(columns) : [];
  return (
    <Modal id={modalID}>
      <Form
        fields={fields}
        mutation={ADD_NEW_CONTENT}
        submitButton={{ text: 'Create New Content' }}
        onComplete={closeModal()}
        onSubmit={(values, { mutate }) =>
          Content.createContent(model, columns, values, { mutate })
        }
      />
    </Modal>
  );
};

export default ContentCreateModal;
