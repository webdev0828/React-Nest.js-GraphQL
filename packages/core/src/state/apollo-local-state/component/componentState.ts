import gql from 'graphql-tag';
import { ComponentType } from 'src/graphql/__generated__/graphql-api';

export const SET_CURRENT_COMPONENT = gql`
  mutation setCurrentComponent($component: ComponentConfig) {
    setCurrentComponent(component: $component) @client
  }
`;

export const GET_CURRENT_COMPONENT = gql`
  query getCurrentComponent {
    component @client {
      currentComponentType
      currentComponentID
    }
  }
`;

type ComponentConfig = {
  defaults: {
    component: {
      __typename: string;
      currentComponentType: ComponentType;
      currentComponentID: string;
    };
  };
};

export const componentState = {
  defaults: {
    component: {
      __typename: 'ComponentName',
      currentComponentType: ComponentType.Button,
      currentComponentID: 'cjtqs0p4q1ryf0848apf3rk5g',
    },
  },
  resolvers: {
    Query: {},
    Mutation: {
      setCurrentComponent: (_, { component }, { cache }) => {
        console.log(component);
        const data = {
          component: {
            __typename: 'ComponentName',
            ...component,
          },
        };
        cache.writeData({ data });
        return cache.readQuery({ query: GET_CURRENT_COMPONENT });
      },
    },
  },
};
