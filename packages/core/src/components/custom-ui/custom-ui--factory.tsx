import CustomUIInput from 'src/components/custom-ui/custom-ui--input';
import CustomUIGrid from 'src/components/custom-ui/custom-ui--grid';
import CustomUIContainer from 'src/components/custom-ui/custom-ui--container';
import { ModelTypes } from 'src/graphql/modelTypes';

export const CustomUIFactory = (typeName: string | null) => {
  switch (typeName) {
    case ModelTypes.Grid:
      return CustomUIGrid;
    case ModelTypes.Container:
      return CustomUIContainer;
    default:
      return CustomUIInput;
  }
};
