import { Modal, useModal } from '@codelab/component';
import { ModalIDs } from '@codelab/system';
import React from 'react';
import BuilderElementEdit from 'src/components/Builder/Builder-element--edit';

const ElementModalUpdate = () => {
  const modalID = ModalIDs.ElementUpdate;
  const { closeModal, data } = useModal(modalID);
  const { element } = data;

  return (
    <Modal id={modalID}>
      <BuilderElementEdit element={element} />
    </Modal>
  );
};

export default ElementModalUpdate;
