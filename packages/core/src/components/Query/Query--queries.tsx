import gql from 'graphql-tag';

export const CREATE_NEW_QUERYMODEL = gql`
  mutation createQueryModel($data: QueryModelCreateInput!) {
    createQueryModel(data: $data) {
      id
      name
    }
  }
`;
