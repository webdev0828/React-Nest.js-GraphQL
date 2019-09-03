import React, { useContext, useState } from 'react';

interface IBuilderContext {
  elementID: number;
  setElementID: any;
}

const BuilderContext = React.createContext<IBuilderContext>({
  elementID: 0,
  setElementID: () => {},
});

export const BuilderProvider = ({ children }) => {
  const [elementID, setElementID] = useState(0);
  return (
    <BuilderContext.Provider value={{ elementID, setElementID }}>
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = id => {
  const context = useContext(BuilderContext);

  return {
    setElementID: () => e => {
      context.setElementID(id);
      console.log(context.elementID);
    },
    active: () => {
      return context.elementID === id;
    },
  };
};
