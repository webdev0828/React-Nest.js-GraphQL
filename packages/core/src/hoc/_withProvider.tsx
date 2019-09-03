import { ModalProvider } from '@codelab/component';
import { ModalIDs } from '@codelab/system';
import React, { Component } from 'react';
import { DragDropContextProvider } from 'react-dnd';
import { default as HTML5Backend } from 'react-dnd-html5-backend';

/**
 * This file loads data
 */
export const withProvider = ComposedComponent =>
  class extends Component {
    render() {
      return (
        <ModalProvider ModalIDs={ModalIDs}>
          <DragDropContextProvider backend={HTML5Backend}>
            <ComposedComponent {...this.props} />
          </DragDropContextProvider>
        </ModalProvider>
      );
    }
  };
