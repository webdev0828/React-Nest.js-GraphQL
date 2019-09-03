import { Form, Modal, useModal } from '@codelab/component';
import { ModalIDs } from '@codelab/system';
import { withRouter } from 'next/router';
import React from 'react';
import { ModelT } from 'src/components/BuilderComponents/Model';
import { ADD_NEW_MODEL } from 'src/components/Model/Model--queries';

const ModelModalCreate = withRouter(({ router }) => {
  const slug = router!.query!.app;
  const modalID = ModalIDs.ModelCreate;
  const { closeModal, data } = useModal(modalID);
  const fields = ModelT.createModelFormField();
  const params = data;
  return (
    <Modal id={modalID}>
      <Form
        fields={fields}
        mutation={ADD_NEW_MODEL}
        submitButton={{ text: 'Create New Model' }}
        onComplete={closeModal()}
        onSubmit={(values, { mutate }) =>
          ModelT.createModel(slug, params, values, { mutate })
        }
      />
    </Modal>
  );
});

export default ModelModalCreate;
