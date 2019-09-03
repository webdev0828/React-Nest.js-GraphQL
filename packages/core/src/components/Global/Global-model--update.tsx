import { Form, Modal, TabPane, Tabs, useModal } from '@codelab/component';
import { ModalIDs } from '@codelab/system';
import { useRouter } from 'next/router';
import React from 'react';
import { UPDATE_CONFIGGLOBAL_MUTATION } from 'src/components/Global/Global--queries';

const GlobalModalUpdate = () => {
  const modalID = ModalIDs.GlobalUpdate;
  const { closeModal, data } = useModal(modalID);
  const { global } = data;
  const layout = global ? global.layout : [];
  const router = useRouter();
  const app = router.query!.app;

  return (
    <Modal id={modalID}>
      <Tabs
        defaultActiveKey="0"
        style={{ height: '100%' }}
        onChange={() => console.log('')}
      >
        {layout.map((configGlobal, idx) => (
          <TabPane tab={<span>{configGlobal.screenSize}</span>} key={idx}>
            <Form
              fields={configGlobal.getUpdateFormFieldsForConfigGrid()}
              mutation={UPDATE_CONFIGGLOBAL_MUTATION}
              submitButton={{ text: 'Update Global Config' }}
              onSubmit={(values, { mutate }) =>
                configGlobal.updateConfig({ app, values, mutate })
              }
              onComplete={closeModal()}
            />
          </TabPane>
        ))}
      </Tabs>
    </Modal>
  );
};

export default GlobalModalUpdate;
