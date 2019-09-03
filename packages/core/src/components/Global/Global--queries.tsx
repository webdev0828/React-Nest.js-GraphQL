import gql from 'graphql-tag';

export const CREATE_GLOBAL_MUTATION = gql`
  mutation createGlobal($data: GlobalCreateInput!) {
    createGlobal(data: $data) {
      id
    }
  }
`;

export const UPDATE_CONFIGGLOBAL_MUTATION = gql`
  mutation updateConfigGlobalLayout(
    $where: ConfigGlobalLayoutWhereUniqueInput!
    $data: ConfigGlobalLayoutUpdateInput!
  ) {
    updateConfigGlobalLayout(where: $where, data: $data) {
      id
    }
  }
`;
