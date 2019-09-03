import { IActionQueryProps } from 'src/utils/routeHelpers';

export const mockedQueryProps = ({ param, action }: IActionQueryProps) => {
  return {
    router: {
      query: {
        [param]: action,
      },
    },
  };
};
