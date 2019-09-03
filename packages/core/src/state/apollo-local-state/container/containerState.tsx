import gql from 'graphql-tag';

export const GET_CONTAINERS = gql`
  query {
    containers {
      id
      grids {
        id
        index
        name
        config {
          id
          screenSize
          breakpoint
          columns
        }
      }
      config {
        id
        responsive
      }
    }
  }
`;

export const GET_ONLY_CONTAINSERS = gql`
  query page($where: PageWhereUniqueInput!) {
    page(where: $where) {
      containers(orderBy: index_ASC) {
        id
      }
    }
  }
`;

export const CREATE_CONFIGCONTAINER_MUTATION = gql`
  mutation createConfigContainer($data: ConfigContainerCreateInput!) {
    createConfigContainer(data: $data) {
      id
    }
  }
`;

export const UPDATE_CONFIGCONTAINER_MUTATION = gql`
  mutation updateConfigContainer(
    $where: ConfigContainerWhereUniqueInput!
    $data: ConfigContainerUpdateInput!
  ) {
    updateConfigContainer(where: $where, data: $data) {
      id
    }
  }
`;

export const CREATE_CONTAINER_MUTATION = gql`
  mutation createContainer($data: ContainerCreateInput!) {
    createContainer(data: $data) {
      id
    }
  }
`;

export const DELETE_CONTAINER = gql`
  mutation deleteContainer($where: ContainerWhereUniqueInput!) {
    deleteContainer(where: $where) {
      id
    }
  }
`;
