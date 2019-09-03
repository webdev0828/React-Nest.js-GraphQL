import gql from 'graphql-tag';

export const GET_GRIDS = gql`
  query {
    grids {
      id
      name
    }
  }
`;

export const CREATE_GRID_MUTATION = gql`
  mutation createGrid($data: GridCreateInput!) {
    createGrid(data: $data) {
      id
    }
  }
`;

export const UPDATE_GRID_MUTATION = gql`
  mutation updateGrid($where: GridWhereUniqueInput!, $data: GridUpdateInput!) {
    updateGrid(where: $where, data: $data) {
      id
    }
  }
`;

export const CREATE_CONFIGGRID_MUTATION = gql`
  mutation createConfigGrid($data: ConfigGridCreateInput!) {
    createConfigGrid(data: $data) {
      id
    }
  }
`;

export const UPDATE_CONFIGGRID_MUTATION = gql`
  mutation updateConfigGrid(
    $where: ConfigGridWhereUniqueInput!
    $data: ConfigGridUpdateInput!
  ) {
    updateConfigGrid(where: $where, data: $data) {
      id
    }
  }
`;

export const DELETE_GRID = gql`
  mutation deleteGrid($where: GridWhereUniqueInput!) {
    deleteGrid(where: $where) {
      id
    }
  }
`;
