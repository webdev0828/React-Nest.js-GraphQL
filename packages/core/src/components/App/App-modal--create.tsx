import { Form, Modal, useModal } from '@codelab/component';
import { ModalIDs } from '@codelab/system';
import React from 'react';
import { App } from 'src/components/App/App';
import { APP_CREATE_MUTATION } from 'src/components/App/App--queries';

const AppModalCreate = () => {
  const modalID = ModalIDs.AppCreate;
  const { toggleModal, data } = useModal(modalID);
  const { user } = data;
  const fields = App.getCreateAppFormFields();

  // const mediator = new ComponentMediator();

  return (
    <Modal id={modalID}>
      <Form
        // enableMediator={true}
        mutation={APP_CREATE_MUTATION}
        // action={Event.CRUD.Create}
        // module={ModelType.App}
        fields={fields}
        submitButton={{ text: 'Create App' }}
        onComplete={toggleModal()}
        onSubmit={(values, { mutate }) => {
          const data = {
            id: '',
            name: values.name,
            pages: [],
          };
          const app = new App(data);
          const username = user.username;
          return app.create(username, { mutate });
          // ComponentMediator.notify(ModelType.App, 'Create');
        }}
      />
    </Modal>
  );
};

export default AppModalCreate;
