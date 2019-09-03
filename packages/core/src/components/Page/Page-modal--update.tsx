import { Form, Modal, useModal } from '@codelab/component';
import { ModalIDs } from '@codelab/system';
import { useRouter } from 'next/router';
import React from 'react';
import { UPDATE_PAGE_MUTATION } from 'src/components/Page/Page--queries';
import { IRouterPage } from 'src/route/Router';

const PageModalUpdate = () => {
  const modalID = ModalIDs.PageUpdate;
  const { closeModal, data } = useModal(modalID);
  const { page } = data;
  const fields = page ? page.getUpdatePageFields() : [];
  const { query } = useRouter<IRouterPage>();

  return (
    <Modal id={modalID}>
      <Form
        mutation={UPDATE_PAGE_MUTATION}
        fields={fields}
        onSubmit={(values, { mutate }) =>
          page.updatePage({
            values,
            mutate,
            appSlug: query!.app,
          })
        }
        onComplete={closeModal()}
      />
    </Modal>
  );
};

export default PageModalUpdate;
