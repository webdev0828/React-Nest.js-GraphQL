import gql from 'graphql-tag';

export const GET_COMPONENTS = gql`
  query getComponents {
    components {
      id
      type
      templates {
        id
        name
        variants {
          id
          name
        }
      }
    }
  }
`;

export const GET_FORM_COMPONENTS = gql`
  query {
    components(where: { type_not_in: [CONTAINER, GRID] }) {
      id
      type
    }
  }
`;

export const GET_CSS_CLASSES = gql`
  query getCssClasses {
    cssClasses {
      id
      name
    }
  }
`;

export const GET_CSS_TEMPLATES = gql`
  query getCssTemplates {
    cssTemplates {
      id
      property {
        id
        name
      }
      options {
        id
        value
      }
    }
  }
`;

export const CREATE_VARIANT = gql`
  mutation createVariant($data: VariantCreateInput!) {
    createVariant(data: $data) {
      id
    }
  }
`;

export const CREATE_CSS_CLASS = gql`
  mutation createCssClass($data: CssClassCreateInput!) {
    createCssClass(data: $data) {
      id
    }
  }
`;
