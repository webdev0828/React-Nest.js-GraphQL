import gql from 'graphql-tag';

export const SET_CURRENT_GRID = gql`
  mutation setCurrentGrid($grid: GridConfig) {
    setCurrentGrid(grid: $grid) @client
  }
`;

export const GET_CURRENT_GRID = gql`
  query getCurrentGrid {
    grid @client {
      currentGridID
    }
  }
`;

type GridConfig = {
  defaults: {
    grid: {
      __typename: string;
      currentGridID: string;
    };
  };
};

export const gridState = {
  defaults: {
    grid: {
      __typename: 'GridID',
      currentGridID: '',
    },
  },
  resolvers: {
    Query: {},
    Mutation: {
      setCurrentGrid: (_, { grid }, { cache }) => {
        const data = {
          grid: {
            __typename: 'GridID',
            ...grid,
          },
        };
        cache.writeData({ data });
        return cache.readQuery({ query: GET_CURRENT_GRID });
      },
    },
  },
};
