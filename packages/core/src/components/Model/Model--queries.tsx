import gql from 'graphql-tag';

export const GET_MODELS_NAMES_TYPES = gql`
  query models {
    models {
      id
      name
    }
    fieldTypes: __type(name: "FieldType") {
      name
      enumValues {
        name
      }
    }
    relationshipTypes: __type(name: "RelationshipType") {
      name
      enumValues {
        name
      }
    }
  }
`;

export const GET_ALL_MODELS = gql`
  query models {
    models {
      id
      name
      fields {
        id
        key
        type
        relationship {
          id
          type
          name
          subject {
            id
            name
          }
          predicate {
            id
            name
          }
        }
      }
    }
  }
`;

export const GET_ONLY_MODELS_NAMES = gql`
  query models {
    models {
      id
      name
    }
  }
`;

export const GET_MODEL = gql`
  query model($where: ModelWhereUniqueInput!) {
    model(where: $where) {
      id
      name
      fields {
        id
        key
        type
        relationship {
          id
          type
          name
          subject {
            id
            name
          }
          predicate {
            id
            name
            fields {
              id
              key
              type
            }
          }
        }
      }
    }
  }
`;

export const ADD_NEW_MODEL = gql`
  mutation createModel($data: ModelCreateInput!) {
    createModel(data: $data) {
      id
      name
    }
  }
`;

export const DELETE_MODEL = gql`
  mutation deleteModel($where: ModelWhereUniqueInput!) {
    deleteModel(where: $where) {
      id
    }
  }
`;

export const UPDATE_MODEL = gql`
  mutation updateModel(
    $data: ModelUpdateInput!
    $where: ModelWhereUniqueInput!
  ) {
    updateModel(data: $data, where: $where) {
      id
    }
  }
`;

export const GET_MODEL_CONTENT = gql`
  query model($where: ModelWhereUniqueInput!) {
    model(where: $where) {
      id
      name
      fields {
        id
        key
        type
        relationship {
          id
          type
          subject {
            id
            name
          }
          predicate {
            id
            name
          }
        }
      }
      contents {
        id
        fieldValues {
          id
          key
          value
        }
      }
    }
  }
`;
