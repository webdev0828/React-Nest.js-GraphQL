---
to: src/containers/<%= h.capitalize(name) %>/<%= h.capitalize(name) %>-list.jsx
---
import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import withLifecycle from '@hocs/with-lifecycle';
import { Button, Modal } from 'antd';

import {
  withModelList,
  withModelDelete,
} from 'src/containers/<%= h.capitalize(name) %>/<%= h.capitalize(name) %>-container';
import Link from 'src/universal/Link';
import Breadcrumb from 'src/components/snippets/Breadcrumb';
import <%= name.toLowerCase() %>Links from 'src/containers/<%= h.capitalize(name) %>/<%= h.capitalize(name) %>-links';

const <%= h.capitalize(name) %>List = ({ <%= name.toLowerCase() %>s, editModel, deleteModel, isDeleting, setDeleting, url, ...props }) => (
  <div>
    <Breadcrumb links={<%= name.toLowerCase() %>Links} url={url} />
    <div>
      <Link prefetch route="<%= name.toLowerCase() %>.create" href="/<%= name.toLowerCase() %>/create">
        <Button type="primary">
        Create
        </Button>
      </Link>
    </div>
    {<%= name.toLowerCase() %>s.map(<%= name.toLowerCase() %> => (
      <div key={<%= name.toLowerCase() %>.id}>
        <Link route="<%= name.toLowerCase() %>.detail" params={{ id: <%= name.toLowerCase() %>.id }}>
          <a>{<%= name.toLowerCase() %>.name}</a>
        </Link>
        <Link route="<%= name.toLowerCase() %>.update" params={{ id: <%= name.toLowerCase() %>.id }}>
          <Button
            type="primary"
          >
          Edit
          </Button>
        </Link>
        <Button
          type="primary"
          onClick={() => {
            // setDeleting(true);
            // deleteModel(<%= name.toLowerCase() %>.id);
            props.setModalState({
              visible: true,
              data: {
                id: <%= name.toLowerCase() %>.id,
              },
            });
          }}
        >
          Delete
        </Button>
      </div>
    ))}
    {console.log(props)}
    <Modal
      title="Delete <%= h.capitalize(name) %>"
      visible={props.modalState.visible}
      width={320}
      onOk={props.handleOk()}
      onCancel={props.handleCancel}
      okButtonProps={{ type: 'danger' }}
      okText="Delete"
    >
      Confirm Delete?
    </Modal>
  </div>
);

export default compose(
  // withState('isDeleting', 'setDeleting', false),
  withState('modalState', 'setModalState', {
    visible: false,
    data: {
      id: null,
    },
  }),
  withModelList,
  withModelDelete,
  withLifecycle({
    onDidMount: (props) => {
      console.log('mount');
      // console.log(props);
      props.subscribeToNewModels();
    },
  }),
  withHandlers({
    handleOk: props => id => (event) => {
      console.log('handleOk');
      console.log(props);
      props.deleteModel(props.modalState.data.id, () => {
        props.setModalState({ visible: false });
      });
    },
    handleCancel: props => (event) => {
      console.log('handleCancel');
      props.setModalState({ visible: false });
    },
  }),
)(<%= h.capitalize(name) %>List);
