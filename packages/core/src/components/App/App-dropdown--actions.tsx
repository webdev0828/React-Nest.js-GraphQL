import { useModal } from '@codelab/component';
import { ModalIDs } from '@codelab/system';
import { Button, Menu } from 'antd';
import React from 'react';
import { Mutation } from 'react-apollo';
import { APP_DELETE_MUTATION } from 'src/components/App/App--queries';

const AppDropdownActions = ({ app, user }) => {
  const { toggleModal } = useModal(ModalIDs.AppUpdate);
  return (
    <Menu>
      <Menu.Item>
        <Button
          block={true}
          icon="edit"
          onClick={toggleModal({ data: { app } })}
        >
          Edit
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Mutation mutation={APP_DELETE_MUTATION}>
          {deleteApp => (
            <Button
              block={true}
              icon="close"
              onClick={() => {
                const username = user.username;
                app.delete(username, deleteApp);
              }}
            >
              Delete
            </Button>
          )}
        </Mutation>
      </Menu.Item>
    </Menu>
  );
};

export default AppDropdownActions;
