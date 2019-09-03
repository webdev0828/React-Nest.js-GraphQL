import gql from 'graphql-tag';

export const GET_EXAMPLE = gql`
  query getExample {
    example @client {
      fieldA
      screenSize
    }
  }
`;

type ExampleInput = {
  screenSize: string;
};

export const SET_EXAMPLE = gql`
  mutation setExample($example: ExampleInput) {
    setExample(example: $example) @client
  }
`;

const exampleState = {
  defaults: {
    example: {
      __typename: 'Example',
      fieldA: 'Value A',
      screenSize: 'xs',
    },
  },
  resolvers: {
    Query: {},
    Mutation: {
      setExample: (_, { example }, { cache }) => {
        const data = {
          example: {
            __typename: 'Example',
            ...example,
          },
        };
        cache.writeData({ data });
        return cache.readQuery({ query: GET_EXAMPLE });
      },
    },
  },
};

export default exampleState;
