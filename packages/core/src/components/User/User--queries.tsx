import gql from 'graphql-tag';
import { App } from 'src/components/App/App';

export const USER_APPS_QUERY = () => gql`
  query userAppQuery($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      username
      apps {
        ...AppFragment
      }
    }
  }
  ${App.fragments()}
`;

export const USER_CODELAB_QUERY = gql`
  query user {
    user(where: { username: "Codelab" }) {
      id
      username
      apps {
        name
      }
    }
  }
`;

export const USER_ME_QUERY = gql`
  query me {
    me {
      id
      username
    }
  }
`;

export const MY_APP_QUERY = () => gql`
  query me($where: AppWhereInput!) {
    me {
      id
      username
      apps(where: $where) {
        ...AppFragment
      }
    }
  }
  ${App.fragments()}
`;
