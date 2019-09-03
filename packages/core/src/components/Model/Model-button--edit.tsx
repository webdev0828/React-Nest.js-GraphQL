import { useModal } from '@codelab/component';
import { ModalIDs } from '@codelab/system';
import { Button } from 'antd';
import React from 'react';
import ModelModalEdit from 'src/components/Model/Model-modal--edit';

export const ModelButtonEdit = ({ model }) => {
  const { openModal } = useModal(ModalIDs.ModelEdit);
  return (
    <>
      <ModelModalEdit model={model} />
      <Button onClick={openModal()}>Edit Model</Button>
    </>
  );
};
