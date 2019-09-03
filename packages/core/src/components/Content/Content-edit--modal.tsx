import { Form, Modal, useModal } from '@codelab/component';
import { ModalIDs } from '@codelab/system';
import React from 'react';
import { Content } from 'src/components/BuilderComponents/Content';
import { UPDATE_CONTENT } from 'src/state/apollo-local-state/content/contentState';

const ContentEditModal = () => {
  const modalID = ModalIDs.ContentEdit;
  const { closeModal, data } = useModal(modalID);
  const { id, content, columns, record } = data;
  const fields = record
    ? Content.getEditContentFormFields(columns, record)
    : [];
  return (
    <Modal id={modalID}>
      <Form
        fields={fields}
        mutation={UPDATE_CONTENT}
        submitButton={{ text: 'Edit...' }}
        onComplete={closeModal()}
        onSubmit={(values, { mutate }) =>
          content.editContent(id, values, { mutate })
        }
      />
    </Modal>
  );
};

export default ContentEditModal;
