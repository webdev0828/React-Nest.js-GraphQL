import gql from 'graphql-tag';

export const GET_ALL_RELATIONSHIPS = gql`
  query {
    relationships {
      id
      type
      name
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
`;

export const ADD_NEW_RELATIONSHIP = gql`
  mutation createRelationship($data: RelationshipCreateInput!) {
    createRelationship(data: $data) {
      id
    }
  }
`;
