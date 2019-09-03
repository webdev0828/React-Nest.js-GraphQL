import { useModal } from '@codelab/component';
import { ModalIDs } from '@codelab/system';
import { Button } from 'antd';
import React from 'react';
import withUser from 'src/hoc/withUser';

const AppButtonCreate = ({ user }) => {
  const { toggleModal } = useModal(ModalIDs.AppCreate);

  return (
    <Button type="primary" onClick={toggleModal({ data: { user } })}>
      Create App
    </Button>
  );
};

export default withUser(AppButtonCreate);
