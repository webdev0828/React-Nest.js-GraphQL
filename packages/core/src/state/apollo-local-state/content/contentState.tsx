import gql from 'graphql-tag';

export const ADD_NEW_CONTENT = gql`
  mutation createContent($data: ContentCreateInput!) {
    createContent(data: $data) {
      id
    }
  }
`;

export const DELETE_CONTENT = gql`
  mutation deleteContent($where: ContentWhereUniqueInput!) {
    deleteContent(where: $where) {
      id
    }
  }
`;

export const UPDATE_CONTENT = gql`
  mutation updateContent(
    $data: ContentUpdateInput!
    $where: ContentWhereUniqueInput!
  ) {
    updateContent(data: $data, where: $where) {
      id
    }
  }
`;
