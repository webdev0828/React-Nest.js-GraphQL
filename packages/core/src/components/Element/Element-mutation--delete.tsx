import gql from 'graphql-tag';

export const ELEMENT_DELETE_MUTATION = gql`
  mutation deleteElement($where: ElementWhereUniqueInput!) {
    deleteElement(where: $where) {
      id
    }
  }
`;

export const ELEMENT_UPDATE_MUTATION = gql`
  mutation updateElement(
    $data: ElementUpdateInput!
    $where: ElementWhereUniqueInput!
  ) {
    updateElement(data: $data, where: $where) {
      id
    }
  }
`;
