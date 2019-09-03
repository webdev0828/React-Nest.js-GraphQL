import { useState } from 'react';
import { Map } from 'immutable';
import { get } from 'lodash';

type ModalData = {
  visibility: boolean;
  data: any;
};

const useModalState = (modalIDs: string[]) => {
  // Init map of modal ids and their data
  const modalMap: Map<string, ModalData> = Map(
    modalIDs.map(id => [id, { visibility: false, data: {} }]),
  );
  // Create state
  const [modalData, setModalData] = useState(modalMap);

  const toggleModal = (modalID: string, data: any = {}) => {
    const newModalData = modalData.set(modalID, {
      data,
      visibility: !get(modalData.get(modalID), 'visibility', false),
    });
    setModalData(newModalData);
  };

  const closeModal = (modalID: string, data: any = {}) => {
    const newModalData = modalData.set(modalID, {
      data,
      visibility: false,
    });
    setModalData(newModalData);
  };

  const openModal = (modalID: string, data: any = {}) => {
    const newModalData = modalData.set(modalID, {
      data,
      visibility: true,
    });
    setModalData(newModalData);
  };

  const isVisible = (modalID: string): boolean => {
    return modalData.get(modalID)!.visibility;
  };

  const data = (modalID: string) => {
    return modalData.get(modalID)!.data;
  };

  return {
    data,
    isVisible,
    toggleModal,
    openModal,
    closeModal,
  };
};

export default useModalState;
