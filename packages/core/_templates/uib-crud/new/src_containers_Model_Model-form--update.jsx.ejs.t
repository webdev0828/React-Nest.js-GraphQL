---
to: src/containers/<%= h.capitalize(name) %>/<%= h.capitalize(name) %>-form--update.jsx
---
import React from 'react';
import { compose, withHandlers, withState, defaultProps } from 'recompose';
import { Button, Modal } from 'antd';
import { Form } from '@codelab/component';
import withLifecycle from '@hocs/with-lifecycle';
import { Persist } from 'react-persist';
import { BehaviorSubject } from 'rxjs';
import { withModelCreate, withModelList, withModelDetail, withModelUpdate } from './<%= h.capitalize(name) %>-container';
import Breadcrumb from '../../components/snippets/Breadcrumb';
import <%= h.capitalize(name) %>Links from './<%= h.capitalize(name) %>-links';
import Router from '../../universal/Router';


const <%= h.capitalize(name) %>FormUpdate = ({ updateModel, handleOk, handleCancel, ...props }) => (
  <Modal
    title="Basic Modal"
    visible
    onOk={handleOk}
    onCancel={handleCancel}
  >
    {console.log(props)}
    <Form
      // field={
      //   {
      //     type: 'textarea',
      //     name: 'name',
      //     value: 'Menu',
      //     placeholder: '<%= h.capitalize(name) %> Name',
      //   }
      // }
      create={updateModel}
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
  withModelDetail,
  withModelUpdate,
)(<%= h.capitalize(name) %>FormUpdate);
