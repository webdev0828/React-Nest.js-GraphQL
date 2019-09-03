import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

export const ItemTypes = {
  Component: 'component',
  Element: 'element',
  Container: 'container',
  Grid: 'grid',
};

export const WithComponentSource = props => {
  const [{ isDragging }, drag] = useDrag({
    item: { name: props.component.type, type: ItemTypes.Component },
    end: (dropResult, monitor) => {
      // Gets result from source item
      console.log(dropResult);

      // Gets result from target -> drop()
      console.log(monitor.getDropResult());
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return <div ref={drag}>{props.children({ isDragging, drag })}</div>;
};

export const WithComponentTarget = props => {
  const [{ canDrop, isOver, didDrop }, drop] = useDrop({
    accept: ItemTypes.Component,
    drop: (item, monitor) => ({ type: ItemTypes.Container }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      didDrop: monitor.didDrop(),
    }),
  });

  return <div ref={drop}>{props.children({ canDrop, isOver })}</div>;
};
