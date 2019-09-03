import { execute, GraphQLRequest, makePromise } from 'apollo-link';
import gql from 'graphql-tag';
import { link } from 'src/config/apollo-client';

export type Relationship = {
  subject: {
    name: string;
  };
  predicate: {
    name: string;
  };
  type: 'MANY_TO_ONE' | 'ONE_TO_MANY' | string;
};

export type ModelField = {
  id: string;
  key: string;
  type: string;
  relationship: Relationship | null;
};

export type JsonModel = {
  id: string;
  name: string;
  fields: ModelField[];
  contents: any;
};

/**
 * GraphQL model response
 */
export type ModelsQueryRes = {
  data: {
    models: JsonModel[];
  };
};

export const modelsQuery = (
  models?: String[], // List of models to query
): Promise<ModelsQueryRes> => {
  const operation: GraphQLRequest = {
    query: gql`
      query ModelsRelations($modelInput: [String!]) {
        models(where: { name_in: $modelInput }) {
          id
          name
          fields {
            id
            key
            type
            relationship {
              id
              type
              subject {
                id
                name
              }
              predicate {
                id
                name
              }
            }
          }
          contents {
            id
            fieldValues {
              id
              key
              value
            }
          }
        }
      }
    `,
    variables: models,
  };
  return makePromise<ModelsQueryRes>(execute(link, operation) as any);
};
