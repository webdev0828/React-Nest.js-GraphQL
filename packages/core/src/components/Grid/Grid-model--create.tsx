import { Form, Modal, useModal } from '@codelab/component';
import { ModalIDs } from '@codelab/system';
import { useRouter } from 'next/router';
import React from 'react';
import { Grid } from 'src/components/Grid/Grid';
import { CREATE_GRID_MUTATION } from 'src/components/Grid/Grid--queries';
import { IRouterPage } from 'src/route/Router';

const GridModalCreate = () => {
  const modalID = ModalIDs.GridCreate;
  const fields = Grid.getCreateFormFields();
  const { closeModal, data } = useModal(ModalIDs.GridCreate);
  const { id } = data;
  const { query } = useRouter<IRouterPage>();

  return (
    <Modal id={modalID}>
      <Form
        mutation={CREATE_GRID_MUTATION}
        fields={fields}
        onSubmit={(values, { mutate }) =>
          Grid.createGrid({
            values,
            mutate,
            containerId: id,
            pageSlug: query!.page,
          })
        }
        onComplete={closeModal()}
      />
    </Modal>
  );
};

export default GridModalCreate;
