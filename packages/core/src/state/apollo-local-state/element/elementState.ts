import gql from 'graphql-tag';

export const CREATE_ELEMENT_MUTATION = gql`
  mutation createElement($data: ElementCreateInput!) {
    createElement(data: $data) {
      id
    }
  }
`;
export const GET_COMPONENTS = gql`
  query {
    components(where: { type_not_in: [CONTAINER, GRID] }) {
      id
      type
    }
  }
`;

export const DELETE_ELEMENT = gql`
  mutation deleteElement($where: ElementWhereUniqueInput!) {
    deleteElement(where: $where) {
      id
    }
  }
`;

export const GET_ELEMENT = gql`
  query element($where: ElementWhereUniqueInput!) {
    field(where: $where) {
      id
      key
      type
    }
  }
`;
