import { useModal } from '@codelab/component';
import { ModalIDs } from '@codelab/system';
import { Button } from 'antd';
import React from 'react';
import FieldModalCreate from 'src/components/Field/Field-modal--create';

export const FieldButtonAdd = ({ model }) => {
  const { openModal } = useModal(ModalIDs.ModelAddField);
  return (
    <>
      <FieldModalCreate model={model} />
      <Button onClick={openModal()}>Add Field</Button>
    </>
  );
};
