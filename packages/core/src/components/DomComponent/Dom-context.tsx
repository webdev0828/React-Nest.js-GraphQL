import React from 'react';

export const modes = {
  READ_ONLY: 'READ_ONLY',
  EDITABLE: 'EDITABLE',
};
export const DomContext = React.createContext(modes.READ_ONLY);

export const DomProvider = ({ mode, children }) => {
  return <DomContext.Provider value={mode}>{children}</DomContext.Provider>;
};

export const DomConsumer = DomContext.Consumer;

// need a way to enbale editing mode, how i can
//
