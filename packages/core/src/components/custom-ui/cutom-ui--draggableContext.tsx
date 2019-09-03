import React, { useContext, useState } from 'react';
import CustomUIDraggable from 'src/components/custom-ui/custom-ui--draggable';

interface ICustomUIData {
  __typename: string;
  position: {
    top: number;
    left: number;
    [propName: string]: any;
  };

  [propName: string]: any;
}

interface ICustomUIContext {
  data?: ICustomUIData;
  visibility: boolean;
  toggleCustomUI: (data?: ICustomUIData) => void;
  showCustomUI: (data?: ICustomUIData) => void;
  hideCustomUI: () => void;
}

export const CustomUIDraggableContext = React.createContext<ICustomUIContext>({
  visibility: false,
  toggleCustomUI: (data: ICustomUIData) => {},
  showCustomUI: (data: ICustomUIData) => {},
  hideCustomUI: () => {},
});

// export const CustomUIDraggableConsumner = CustomUIDraggableContext.Consumer;

// export const CustomUIDraggableController = ({ children }) => (
//   <CustomUIDraggableConsumner>
//     {({ toggleCustomUI, showCustomUI, hideCustomUI }) =>
//       children({ toggleCustomUI, showCustomUI, hideCustomUI })
//     }
//   </CustomUIDraggableConsumner>
// );

// export const CustomUIDraggableSubcriber = ({ children }) => (
//   <CustomUIDraggableConsumner>
//     {({ visibility, data }) => children({ visibility, data })}
//   </CustomUIDraggableConsumner>
// );

const useCustomUIState = () => {
  const [state, setState] = useState({
    visibility: false,
    data: {
      __typename: '',
      position: {
        top: 0,
        left: 0,
      },
    },
  });
  const toggleCustomUI = (data: any) => {
    setState({
      data,
      visibility: !state.visibility,
    });
  };

  const showCustomUI = data => {
    setState({
      data,
      visibility: true,
    });
  };

  const hideCustomUI = () => {
    setState({
      visibility: false,
      data: state.data,
    });
  };

  return {
    state,
    toggleCustomUI,
    showCustomUI,
    hideCustomUI,
  };
};

export const CustomUIDraggableProvider = props => {
  const {
    state,
    toggleCustomUI,
    showCustomUI,
    hideCustomUI,
  } = useCustomUIState();
  return (
    <CustomUIDraggableContext.Provider
      value={{
        ...state,
        toggleCustomUI,
        showCustomUI,
        hideCustomUI,
      }}
    >
      {/* <DragContainer>{props.children}</DragContainer> */}
      <CustomUIDraggable />
      {props.children}
    </CustomUIDraggableContext.Provider>
  );
};

export const useCustomUI = () => {
  const {
    visibility,
    data,
    toggleCustomUI,
    showCustomUI,
    hideCustomUI,
  } = useContext(CustomUIDraggableContext);
  return {
    data,
    visibility,
    toggleCustomUI,
    showCustomUI,
    hideCustomUI,
  };
};
