import { Form, INPUT_TYPES, Modal, useModal } from '@codelab/component';
import { ModalIDs } from '@codelab/system';
import React from 'react';
import { APP_UPDATE_MUTATION } from 'src/components/App/App--queries';
import withUser from 'src/hoc/withUser';

const AppModalUpdate = ({ user }) => {
  const modalID = ModalIDs.AppUpdate;
  const { toggleModal, data } = useModal(modalID);
  const { app } = data;

  const fields = [
    {
      name: 'name',
      inputType: INPUT_TYPES.Text,
      value: app ? app.name : '',
      type: 'string',
      validation: [
        { required: true, msg: 'Required!!' },
        { min: 2, msg: 'Too Short!' },
        { max: 30, msg: 'Too Long!' },
      ],
    },
  ];
  const submitButton = {
    text: 'Update App',
  };
  return (
    <Modal id={modalID}>
      <Form
        mutation={APP_UPDATE_MUTATION}
        fields={fields}
        submitButton={submitButton}
        onComplete={toggleModal()}
        onSubmit={(values, { mutate }) => {
          const username = user.username;
          app.name = values.name;
          return app.update(username, { mutate });
        }}
      />
    </Modal>
  );
};

export default withUser(AppModalUpdate);
