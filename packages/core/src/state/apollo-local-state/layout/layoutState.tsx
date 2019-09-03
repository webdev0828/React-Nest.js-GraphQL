import gql from 'graphql-tag';
import { default as updateContainer } from 'src/graphql/container--update.graphql';
import { default as updateGrid } from 'src/graphql/grid--update.graphql';
import { default as updatePage } from 'src/graphql/page--update.graphql';

export const MUTATION_UPDATE_PAGE = gql`
  ${updatePage}
`;

export const MUTATION_UPDATE_CONTAINER = gql`
  ${updateContainer}
`;

export const MUTATION_UPDATE_GRID = gql`
  ${updateGrid}
`;

export const GET_SIDEBAR = gql`
  query GetSidebarState {
    sidebar @client {
      show
      activeTab
    }
  }
`;

export const TOGGLE_SIDEBAR = gql`
  mutation ToggleSidebar {
    toggleSidebar @client
  }
`;
const TYPENAME_LAYOUT = 'TYPENAME_LAYOUT';

const layoutState = {
  defaults: {
    sidebar: {
      show: true,
      activeTab: 1,
      __typename: TYPENAME_LAYOUT,
    },
  },
  resolvers: {
    Query: {},
    Mutation: {
      toggleSidebar: (_, variables, { cache }) => {
        const { sidebar } = cache.readQuery({ query: GET_SIDEBAR });
        const newSidebar = {
          ...sidebar,
          show: !sidebar.show,
        };
        const data = {
          sidebar: newSidebar,
        };
        cache.writeQuery({
          data,
          query: GET_SIDEBAR,
        });
        return newSidebar;
      },
      setSidebarActiveTab: (_, { tab }, { cache }) => {
        const { sidebar } = cache.readQuery({ query: GET_SIDEBAR });
        const newSidebar = {
          ...sidebar,
          activeTab: tab,
        };
        const data = {
          sidebar: newSidebar,
        };
        cache.writeQuery({
          data,
          query: GET_SIDEBAR,
        });
        return newSidebar;
      },
    },
  },
};

export default layoutState;
