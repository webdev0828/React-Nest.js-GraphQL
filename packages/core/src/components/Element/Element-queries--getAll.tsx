import gql from 'graphql-tag';

export const ELEMENTS_GET_QUERIES = gql`
  query elements {
    elements {
      id
      grid {
        id
      }
      index
      variantInstances {
        id
        variant {
          id
          name
        }
      }
      component {
        id
        type
        templates {
          id
        }
      }
    }
  }
`;

export const UPDATE_BUTTON_MUTATION = gql`
  mutation updateConfigButton(
    $where: ConfigButtonWhereUniqueInput!
    $data: ConfigButtonUpdateInput!
  ) {
    updateConfigButton(where: $where, data: $data) {
      id
    }
  }
`;

export const UPDATE_FORM_MUTATION = gql`
  mutation updateConfigForm(
    $where: ConfigFormWhereUniqueInput!
    $data: ConfigFormUpdateInput!
  ) {
    updateConfigForm(where: $where, data: $data) {
      id
    }
  }
`;

export const UPDATE_HEADING_MUTATION = gql`
  mutation updateConfigHeading(
    $where: ConfigHeadingWhereUniqueInput!
    $data: ConfigHeadingUpdateInput!
  ) {
    updateConfigHeading(where: $where, data: $data) {
      id
    }
  }
`;

export const UPDATE_ICON_MUTATION = gql`
  mutation updateConfigIcon(
    $where: ConfigIconWhereUniqueInput!
    $data: ConfigIconUpdateInput!
  ) {
    updateConfigIcon(where: $where, data: $data) {
      id
    }
  }
`;

export const UPDATE_IMAGE_MUTATION = gql`
  mutation updateConfigImage(
    $where: ConfigImageWhereUniqueInput!
    $data: ConfigImageUpdateInput!
  ) {
    updateConfigImage(where: $where, data: $data) {
      id
    }
  }
`;

export const UPDATE_LINK_MUTATION = gql`
  mutation updateConfigLink(
    $where: ConfigLinkWhereUniqueInput!
    $data: ConfigLinkUpdateInput!
  ) {
    updateConfigLink(where: $where, data: $data) {
      id
    }
  }
`;

export const UPDATE_PARAGRAPH_MUTATION = gql`
  mutation updateConfigParagraph(
    $where: ConfigParagraphWhereUniqueInput!
    $data: ConfigParagraphUpdateInput!
  ) {
    updateConfigParagraph(where: $where, data: $data) {
      id
    }
  }
`;

export const UPDATE_TEXT_MUTATION = gql`
  mutation updateConfigText(
    $where: ConfigTextWhereUniqueInput!
    $data: ConfigTextUpdateInput!
  ) {
    updateConfigText(where: $where, data: $data) {
      id
    }
  }
`;
