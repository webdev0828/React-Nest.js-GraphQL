import { merge } from 'lodash';
import { componentState } from 'src/state/apollo-local-state/component/componentState';
import configState from 'src/state/apollo-local-state/config/configState';
import exampleState from 'src/state/apollo-local-state/example/exampleState';
import { gridState } from 'src/state/apollo-local-state/grid/gridState';
import layoutState from 'src/state/apollo-local-state/layout/layoutState';
import { modelState } from 'src/state/apollo-local-state/model/modelState';
import { sidebarState } from 'src/state/apollo-local-state/sidebar/sidebarState';

const apolloLocalState = merge(
  sidebarState,
  exampleState,
  configState,
  layoutState,
  gridState,
  componentState,
  modelState,
);

export { apolloLocalState };
