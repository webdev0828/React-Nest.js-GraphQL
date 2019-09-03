import { Form, Modal, useModal } from '@codelab/component';
import { ModalIDs } from '@codelab/system';
import { useRouter } from 'next/router';
import React from 'react';
import { Global } from 'src/components/BuilderComponents/Global';
import { CREATE_GLOBAL_MUTATION } from 'src/components/Global/Global--queries';
import { IRouterPage } from 'src/route/Router';

const GlobalModalCreate = () => {
  const modalID = ModalIDs.GlobalCreate;
  const fields = Global.getCreateFormFields();
  const { closeModal } = useModal(ModalIDs.GridCreate);
  const { query } = useRouter<IRouterPage>();

  return (
    <Modal id={modalID}>
      <Form
        mutation={CREATE_GLOBAL_MUTATION}
        fields={fields}
        onSubmit={(values, { mutate }) =>
          Global.createGlobal({ query, values, mutate })
        }
        onComplete={closeModal()}
      />
    </Modal>
  );
};

export default GlobalModalCreate;
