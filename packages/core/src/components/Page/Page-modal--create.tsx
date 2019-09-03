import { Form, Modal, useModal } from '@codelab/component';
import { ModalIDs } from '@codelab/system';
import { useRouter } from 'next/router';
import React from 'react';
import { Page } from 'src/components/Page/Page';
import { CREATE_PAGE_MUTATION } from 'src/components/Page/Page--queries';
import { IRouterPage } from 'src/route/Router';

const PageModalCreate = () => {
  const modalID = ModalIDs.PageCreate;
  const { closeModal, data } = useModal(modalID);
  const fields = Page.getCreatPageFields();
  const { query } = useRouter<IRouterPage>();

  return (
    <Modal id={modalID}>
      <Form
        mutation={CREATE_PAGE_MUTATION}
        fields={fields}
        onSubmit={(values, { mutate }) => {
          const data = {
            id: '',
            title: values.title,
            containers: [],
          };
          const page = new Page(data);
          const pageSlug = page.slug;
          return page.createPage({ pageSlug, mutate, appSlug: query!.app });
        }}
        onComplete={closeModal()}
      />
    </Modal>
  );
};

export default PageModalCreate;
