import { Form, Modal, useModal } from '@codelab/component';
import { ModalIDs } from '@codelab/system';
import { useRouter } from 'next/router';
import React from 'react';
import { ConfigComponent } from 'src/components/Element/ConfigComponent/ConfigComponent';
import Element from 'src/components/Element/Element';
import { IRouterPage } from 'src/route/Router';
import { GET_CURRENT_COMPONENT } from 'src/state/apollo-local-state/component/componentState';
import { CREATE_ELEMENT_MUTATION } from 'src/state/apollo-local-state/element/elementState';
import Query from 'src/utils/Query';

const ConfigComponentModalCreate = () => {
  const modalID = ModalIDs.ConfigComponentCreate;
  const { toggleModal, data } = useModal(modalID);
  const { gridID } = data;
  const { query } = useRouter<IRouterPage>();
  const pageSlug = query!.page;

  return (
    <Modal id={modalID}>
      <Query query={GET_CURRENT_COMPONENT}>
        {({ data: { component } }) => {
          const fields = ConfigComponent.getCreateFormFields(
            component.currentComponentType,
          );
          return (
            <Form
              mutation={CREATE_ELEMENT_MUTATION}
              fields={fields}
              submitButton={{ text: 'Create Element' }}
              onSubmit={(values, { mutate }) =>
                Element.createElement({
                  pageSlug,
                  gridID,
                  component,
                  values,
                  mutate,
                })
              }
              onComplete={toggleModal()}
            />
          );
        }}
      </Query>
    </Modal>
  );
};

export default ConfigComponentModalCreate;
