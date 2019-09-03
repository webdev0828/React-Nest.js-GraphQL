import {
  Component,
  Form,
  INPUT_TYPES,
  Modal,
  useModal,
} from '@codelab/component';
import { Auth, ModalIDs, ModelType } from '@codelab/system';
import gql from 'graphql-tag';
import React from 'react';
import { default as AuthRegisterMutation } from 'src/components/Auth/Auth-register--mutation.graphql';
import { User } from 'src/components/User/User';
import { bem } from 'src/utils';

const bemName = bem(Component.Link, ModelType.Auth, Auth.Register).bemName;

const registerFields = [
  {
    inputType: INPUT_TYPES.Text,
    name: 'username',
    placeholder: 'Email:',
    validation: [{ required: true, msg: 'Required!!' }],
  },
  {
    inputType: INPUT_TYPES.Password,
    name: 'password',
    placeholder: 'Password:',
    validation: [{ required: true, msg: 'Required!!' }],
  },
];

const AUTH_REGISTER_MUTATION = gql`
  ${AuthRegisterMutation}
`;

const LinkAuthRegister = () => {
  const modalID = ModalIDs.Register;
  const { toggleModal, closeModal } = useModal(modalID);
  return (
    <>
      <a className={bemName} onClick={toggleModal()}>
        Register
      </a>
      <Modal id={modalID} module={ModelType.Auth}>
        <h2> Register </h2>
        <Form
          fields={registerFields}
          mutation={AUTH_REGISTER_MUTATION}
          onSubmit={(data, { mutate, client }) =>
            User.register(data, {
              mutate,
              client,
            })
          }
          onComplete={closeModal()}
          // bem={{ e: ModelType.Auth, m: Auth.Register }}
        />
      </Modal>
    </>
  );
};

export default LinkAuthRegister;
