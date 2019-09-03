import { useModal } from '@codelab/component';
import { ModalIDs } from '@codelab/system';
import { Button, Icon, Popover } from 'antd';
import React from 'react';
import { IElement } from 'src/components/Element/Element';
import GridButtonDelete from 'src/components/Grid/Grid-button--delete';

const SelectPopoverOnGrid = grid => {
  const modalIDForGrid = ModalIDs.GridUpdate;
  const { openModal: openEditGridModal } = useModal(modalIDForGrid);
  const modalIDForElement = ModalIDs.ElementCreate;
  const { openModal: openCreateElementModal } = useModal(modalIDForElement);
  const gridID = grid.id;
  return (
    <>
      <Button onClick={openEditGridModal({ data: { grid } })}>Edit Grid</Button>
      <Button onClick={openCreateElementModal({ data: { gridID } })}>
        Create Element
      </Button>
      <GridButtonDelete grid={grid} />
    </>
  );
};

const GridPopoverSettings = ({ grid }: { grid: IElement }) => (
  <Popover
    placement="right"
    content={SelectPopoverOnGrid(grid)}
    trigger="click"
  >
    <Icon type="setting" />
  </Popover>
);

export default GridPopoverSettings;
