import gql from 'graphql-tag';

export const APPS_QUERY = gql`
  query getApps($where: AppWhereUniqueInput!) {
    app(where: $where) {
      id
      name
      pages {
        id
        title
        containers {
          id
          config {
            id
            responsive
          }
          grids {
            id
          }
        }
      }
      global {
        id
        layout {
          id
          screenSize
          breakpoint
        }
      }
    }
  }
`;

export const APP_CREATE_MUTATION = gql`
  mutation createApp($data: AppCreateInput!) {
    createApp(data: $data) {
      id
      name
    }
  }
`;

export const APP_UPDATE_MUTATION = gql`
  mutation updateApp($data: AppUpdateInput!, $where: AppWhereUniqueInput!) {
    updateApp(data: $data, where: $where) {
      id
      name
    }
  }
`;

export const APP_DELETE_MUTATION = gql`
  mutation deleteApp($where: AppWhereUniqueInput!) {
    deleteApp(where: $where) {
      id
    }
  }
`;

export const GET_APPS = gql`
  query userAppQuery($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      username
      apps {
        id
      }
    }
  }
`;
