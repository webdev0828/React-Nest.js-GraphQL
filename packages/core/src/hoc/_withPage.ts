import { compose } from 'recompose';
import { withApollo } from 'src/hoc/_withApollo';
import { withLoader } from 'src/hoc/_withData';
import { withErrors } from 'src/hoc/_withErrors';

import { withLayout } from 'src/hoc/_withLayout';
import { withProvider } from 'src/hoc/_withProvider';
import { withRoutes } from 'src/hoc/_withRoutes';
import { withStyle } from 'src/hoc/_withStyle';

export const withData = compose(
  /**
   * Binds Apollo to context
   */
  withApollo,
  /**
   * Binds Router
   */
  withRoutes,
  /**
   * Attach custom Context Providers
   */
  withProvider,
  /**
   * Global error handling
   */
  withErrors,
  /**
   * Attaches global loader for data fetching
   */
  withLoader,
);

const withPresentation = compose(
  /**
   * Attaches our CSS styles
   */
  withStyle,
  /**
   * Attaches the layout
   */
  withLayout,
);

const withPage = compose(
  withData,
  withPresentation,
);

export default withPage;
