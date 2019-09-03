import gql from 'graphql-tag';

export const GET_FIELDS_WHERE = gql`
  query modelFields($where: FieldWhereInput!) {
    fields(where: $where) {
      id
      key
      type
      relationship {
        id
      }
    }
  }
`;

export const GET_FIELD = gql`
  query field($where: FieldWhereUniqueInput!) {
    field(where: $where) {
      id
      key
      type
    }
  }
`;

export const ADD_NEW_FIELD = gql`
  mutation createField($data: FieldCreateInput!) {
    createField(data: $data) {
      id
    }
  }
`;

export const DELETE_FIELD = gql`
  mutation deleteField($where: FieldWhereUniqueInput!) {
    deleteField(where: $where) {
      id
    }
  }
`;

export const UPDATE_FIELD = gql`
  mutation updateField(
    $data: FieldUpdateInput!
    $where: FieldWhereUniqueInput!
  ) {
    updateField(data: $data, where: $where) {
      id
    }
  }
`;
