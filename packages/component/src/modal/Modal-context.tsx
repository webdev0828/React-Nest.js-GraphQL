import React, { useContext } from 'react';
import useModalState from 'src/modal/Modal-hook';

interface IModalContext {
  isVisible: (modalID: string) => boolean;
  toggleModal: (modalID: string, data?: any) => void;
  openModal: (modalID: string, data?: any) => void;
  closeModal: (modalID: string, data?: any) => void;
  data: any;
}

const ModalContext = React.createContext<IModalContext>({
  isVisible: () => false,
  toggleModal: () => {},
  openModal: () => {},
  closeModal: () => {},
  data: {},
});

/**
 * isVisible(id: ModalIDs)
 */
export const ModalProvider = ({ children, ModalIDs }) => {
  const { isVisible, toggleModal, openModal, closeModal, data } = useModalState(
    Object.values(ModalIDs),
  );
  return (
    <ModalContext.Provider
      value={{ isVisible, openModal, closeModal, toggleModal, data }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (modalID: string) => {
  const context = useContext(ModalContext);

  return {
    isVisible: context.isVisible(modalID),
    toggleModal: ({ data }: { data?: any } = { data: {} }) => e => {
      context.toggleModal(modalID, data);
    },
    openModal: ({ data }: { data?: any } = { data: {} }) => e => {
      context.openModal(modalID, data);
    },
    closeModal: ({ data }: { data?: any } = { data: {} }) => e => {
      context.closeModal(modalID, data);
    },
    data: context.data(modalID),
  };
};
