import gql from 'graphql-tag';

export const UPDATE_CONFIG_GRID = gql`
  mutation updateConfigGrig(
    $data: ConfigGridUpdateInput!
    $where: ConfigGridWhereUniqueInput!
  ) {
    updateConfigGrid(data: $data, where: $where) {
      id
    }
  }
`;
