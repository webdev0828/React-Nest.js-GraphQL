import { Button, Modal as AntModal } from 'antd';
import { includes } from 'lodash';
import React, { ComponentType } from 'react';
import { Component } from 'src';
import { useModal } from 'src/modal/Modal-context';
import styled from 'styled-components';

type ModalProps = {
  noFooter?: boolean;
  noHeader?: boolean;
};

const DefaultModal = styled(AntModal)<ModalProps>`
  .ant-modal-header {
    display: ${props => (props.noHeader ? 'none' : '')};
  }
  .ant-modal-footer {
    display: ${props => (props.noFooter ? 'none' : '')};
  }
`;

interface IModalContainerProps {
  id: string;
  children: any;
  title?: string;
  className?: string;
  OkButton?: ComponentType;
  footer?: any;
  width?: string | number; // Default: 520px
  visibleIds?: string[];
  module?: any;
}

let bemName = (b, e, m) => {};

export const setBem = myBemName => {
  bemName = myBemName;
};

const Modal = ({
  id,
  children,
  title = 'Title',
  className = '',
  OkButton,
  footer,
  width,
  module,
}: IModalContainerProps) => {
  const { isVisible, closeModal } = useModal(id);

  const modalClassName = `${className} ${bemName(
    Component.Modal,
    module,
    id,
  )}`.trim();

  const noFooter = !footer || footer.length === 0;
  const footerComp = footer
    ? footer
    : [
        <Button key="back" onClick={closeModal()}>
          Return
        </Button>,
        OkButton ? (
          <OkButton key="submit" />
        ) : (
          <Button key="submit" type="primary" onClick={closeModal()}>
            Default Submit
          </Button>
        ),
      ];

  return (
    <DefaultModal
      noFooter={noFooter}
      noHeader={true}
      title={title}
      width={width ? width : 520}
      visible={isVisible}
      onOk={closeModal()}
      onCancel={closeModal()}
      className={modalClassName}
      footer={footerComp}
      wrapProps={{
        onMouseDown: e => {
          const targetClass = e.target.getAttribute('class');
          if (targetClass && includes(targetClass, 'ant-modal-wrap')) {
            closeModal()(e);
          }
        },
      }}
    >
      {children}
    </DefaultModal>
  );
};

export { Modal };
