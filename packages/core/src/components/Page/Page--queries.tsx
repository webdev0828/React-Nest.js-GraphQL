import gql from 'graphql-tag';
import { Container } from 'src/components/BuilderComponents/Layout/Container';
import { Page } from 'src/components/Page/Page';

export const GET_PAGE = () => gql`
  query page($where: PageWhereUniqueInput!) {
    page(where: $where) {
      id
      title
      slug
      containers(orderBy: index_ASC) {
        ...ContainerFragment
      }
    }
  }
  ${Container.fragments()}
`;

export const CREATE_PAGE_MUTATION = gql`
  mutation createPage($data: PageCreateInput!) {
    createPage(data: $data) {
      id
    }
  }
`;

export const DELETE_PAGE_MUTATION = gql`
  mutation deletePage($where: PageWhereUniqueInput!) {
    deletePage(where: $where) {
      id
    }
  }
`;

export const UPDATE_PAGE_MUTATION = gql`
  mutation updatePage($where: PageWhereUniqueInput!, $data: PageUpdateInput!) {
    updatePage(where: $where, data: $data) {
      id
    }
  }
`;

export const MY_APP_PAGES = () => gql`
  query me($where: AppWhereInput!) {
    me {
      id
      username
      apps(where: $where) {
        id
        name
        pages {
          ...PageFragment
        }
      }
    }
  }
  ${Page.fragments()}
`;
