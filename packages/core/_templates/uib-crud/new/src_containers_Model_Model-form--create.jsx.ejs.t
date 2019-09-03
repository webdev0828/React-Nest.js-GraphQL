---
to: src/containers/<%= h.capitalize(name) %>/<%= h.capitalize(name) %>-form--create.jsx
---
import React from 'react';
import { compose, withHandlers, defaultProps } from 'recompose';
import { Modal } from 'antd';
import { Form } from '@codelab/component';
import { BehaviorSubject } from 'rxjs';
import Router from 'src/universal/Router';
import { withModelCreate, withModelList } from 'src/containers/<%= h.capitalize(name) %>/<%= h.capitalize(name) %>-container';


const <%= h.capitalize(name) %>FormCreate = ({ createModel, url, handleOk, handleCancel, ...props }) => (
  <Modal
    title="Basic Modal"
    visible
    onOk={handleOk}
    onCancel={handleCancel}
  >
    <Form
      create={createModel}
      onComplete={props.onComplete}
    />
  </Modal>
);

export default compose(
  defaultProps({
    // When complete with mutation
    mutationSubscription: new BehaviorSubject(false),
  }),
  withHandlers({
    redirectTo: props => (route) => {
      console.log(props);
      Router.pushRoute(route);
    },
  }),
  withHandlers({
    handleOk: props => (event) => {
      console.log('handleOk');
      props.redirectTo('<%= name.toLowerCase() %>.index');
    },
    handleCancel: props => (event) => {
      console.log('handleCancel');
      props.redirectTo('<%= name.toLowerCase() %>.index');
    },
    onComplete: props => () => {
      props.mutationSubscription.subscribe({
        next: (val) => {
          console.log(`received sub value of ${val}`);
          if (val) {
            props.redirectTo('<%= name.toLowerCase() %>.index');
          }
        },
      });
    },
  }),
  withModelList,
  withModelCreate,
)(<%= h.capitalize(name) %>FormCreate);
