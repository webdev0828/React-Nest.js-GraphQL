import gql from 'graphql-tag';

export const ELEMENT_CREATE_MUTATION = gql`
  mutation createElement($data: ElementCreateInput!) {
    createElement(data: $data) {
      id
    }
  }
`;
