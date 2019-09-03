import gql from 'graphql-tag';

export const GET_SIDEBAR = gql`
  query getSidebar {
    sidebar @client {
      currentPrimaryTab
      currentSecondaryTab
      modelSubTab
      viewSubTab
      controllerSubTab
    }
  }
`;

export const SET_SIDEBAR_TAB = gql`
  mutation setSidebar($sidebar: SidebarConfig) {
    setSidebar(sidebar: $sidebar) @client
  }
`;

type SidebarConfig = {
  defaults: {
    sidebar: {
      __typename: string;
      currentPrimaryTab: SidebarPrimaryTab;
      currentSecondaryTab: SidebarSecondaryTab;
      modelSubTab: SidebarSecondaryTab;
      viewSubTab: SidebarSecondaryTab;
      controllerSubTab: SidebarSecondaryTab;
    };
  };
};

export enum SidebarPrimaryTab {
  Model = 'MODEL',
  View = 'VIEW',
  Controller = 'CONTROLLER',
}

export enum SidebarSecondaryTab {
  Site = 'SITE',
  Component = 'COMPONENT',
  Variant = 'VARIANT',
  Pages = 'PAGES',
  Schema = 'SCHEMA',
  Content = 'CONTENT',
  Workflow = 'WORKFLOW',
  Form = 'FORM',
  Query = 'QUERY',
  Api = 'API',
}

export const sidebarState = {
  defaults: {
    sidebar: {
      __typename: 'Sidebar',
      currentPrimaryTab: SidebarPrimaryTab.View,
      currentSecondaryTab: '',
      modelSubTab: SidebarSecondaryTab.Schema,
      viewSubTab: SidebarSecondaryTab.Site,
      controllerSubTab: SidebarSecondaryTab.Workflow,
    },
  },
  resolvers: {
    Query: {},
    Mutation: {
      setSidebar: (_, { sidebar }, { cache }) => {
        console.log(sidebar);
        const data = {
          sidebar: {
            __typename: 'Sidebar',
            ...sidebar,
          },
        };

        cache.writeData({ data });
        return cache.readQuery({ query: GET_SIDEBAR });
      },
    },
  },
};
