import { useModal } from '@codelab/component';
import { ModalIDs } from '@codelab/system';
import { Button, Icon, Popover } from 'antd';
import React from 'react';
import { IElement } from 'src/components/Element/Element';

const SelectPopoverOnElement = ({ element }) => {
  const { openModal } = useModal(ModalIDs.ElementUpdate);
  return (
    <>
      <Button onClick={openModal({ data: { element } })}>Edit Element</Button>
    </>
  );
};

const ElementPopoverSettings = ({ element }: { element: IElement }) => (
  <Popover
    placement="right"
    content={SelectPopoverOnElement({ element })}
    trigger="click"
  >
    <Icon type="setting" />
  </Popover>
);

export default ElementPopoverSettings;
