import React from 'react';
import Draggable from 'react-draggable';
import CustomUI from 'src/components/custom-ui/custom-ui';
import { useCustomUI } from 'src/components/custom-ui/cutom-ui--draggableContext';
import styled from 'styled-components';

const CustomUIWrapper = styled.div`
  max-width: 500px;
  background-color: #fff;
  position: absolute;
  border: 1px solid #00000036;
  z-index: 9999;
  padding: 0.5rem;
`;

const CustomUIDraggable = () => {
  const { visibility, data } = useCustomUI();
  const { position } = data!;
  if (!visibility) return null;
  return (
    <Draggable
      axis="both"
      handle=".handle"
      defaultPosition={{ x: position.left, y: position.top }}
      grid={[25, 25]}
      scale={1}
      bounds="body"
      offsetParent={document.body}
    >
      <CustomUIWrapper>
        <div className="handle">
          <CustomUI />
        </div>
      </CustomUIWrapper>
    </Draggable>
  );
};

export default CustomUIDraggable;
