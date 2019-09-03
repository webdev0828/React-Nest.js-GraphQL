import { Form, Modal, useModal } from '@codelab/component';
import { Screen } from '@codelab/layout';
import { ModalIDs } from '@codelab/system';
import { Tabs } from 'antd';
import { default as _, filter, includes } from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';
import { UPDATE_GRID_MUTATION } from 'src/components/Grid/Grid--queries';
import { IRouterPage } from 'src/route/Router';

const GridModalUpdate = () => {
  const modalID = ModalIDs.GridUpdate;
  const { closeModal, data } = useModal(modalID);
  const { grid } = data;
  const { query } = useRouter<IRouterPage>();
  if (!grid) return null;
  const fields = grid.getUpdateFormFields();

  return (
    <Modal id={modalID}>
      <Form
        mode="renderProps"
        mutation={UPDATE_GRID_MUTATION}
        fields={fields}
        onSubmit={(values, { mutate }) =>
          grid.updateGrid({
            values,
            mutate,
            containerId: data.id,
            pageSlug: query!.page,
          })
        }
        onComplete={closeModal()}
      >
        {({ FormWrapper, FormFields, Fields, FormButton, formController }) => {
          const UnTabbedFields = _(Fields)
            .filter(Field => !includes(Field.key, 'tab'))
            .value();
          const TabbedFields = _(Fields)
            .filter(Field => includes(Field.key, 'tab'))
            .value();
          const { isSubmitting, handleSubmit } = formController;

          return (
            <FormWrapper onSubmit={handleSubmit}>
              <FormFields Fields={UnTabbedFields} className={''} />
              <Tabs>
                {Object.keys(Screen.Size).map(size => (
                  <Tabs.TabPane tab={size} key={size}>
                    {filter(TabbedFields, Field =>
                      includes(Field.key, `tab-${size}`),
                    )}
                  </Tabs.TabPane>
                ))}
              </Tabs>
              <FormButton isSubmitting={isSubmitting}>Update Grid</FormButton>
            </FormWrapper>
          );
        }}
      </Form>
    </Modal>
  );
};

export default GridModalUpdate;
