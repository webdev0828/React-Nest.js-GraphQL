import { Button } from 'antd';
import { mount } from 'enzyme';
import React from 'react';
import { Modal } from 'src/modal/Modal-component';
import { ModalProvider, useModal } from 'src/modal/Modal-context';

enum ModalIDs {
  Testing = 'Testing',
}

describe('Modal', () => {
  const TestModal = () => {
    const modalID = ModalIDs.Testing;
    const { toggleModal } = useModal(modalID);
    return (
      <>
        <Button onClick={toggleModal()}>Toggle</Button>
        <Modal id={modalID}>
          <h1>Working!</h1>
        </Modal>
      </>
    );
  };

  const modalWrapper = mount(
    <ModalProvider ModalIDs={ModalIDs}>
      <TestModal />
    </ModalProvider>,
  );

  it('is not visible by default', () => {
    expect(modalWrapper.find('h1')).toHaveLength(0);
  });

  it('is visible after toggle', () => {
    modalWrapper.find(Button).simulate('click');
    const updatedModalWrapper = modalWrapper.update();
    expect(updatedModalWrapper.find('h1')).toHaveLength(1);
  });
});
