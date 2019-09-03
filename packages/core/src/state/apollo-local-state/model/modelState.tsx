import gql from 'graphql-tag';

export const SET_CURRENT_MODEL = gql`
  mutation setCurrentModel($model: ModelConfig) {
    setCurrentModel(model: $model) @client
  }
`;

export const GET_CURRENT_MODEL = gql`
  query getCurrentModel {
    model @client {
      currentModelID
    }
  }
`;

const MODEL_ID = 'MODELID';

type ModelConfig = {
  defaults: {
    model: {
      __typename: string;
      currentModelID: string;
    };
  };
};

export const modelState = {
  defaults: {
    model: {
      __typename: MODEL_ID,
      currentModelID: '',
    },
  },
  resolvers: {
    Query: {},
    Mutation: {
      setCurrentModel: (_, { model }, { cache }) => {
        const data = {
          model: {
            __typename: MODEL_ID,
            ...model,
          },
        };
        cache.writeData({ data });
        return cache.readQuery({ query: GET_CURRENT_MODEL });
      },
    },
  },
};
