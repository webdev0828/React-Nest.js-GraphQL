import gql from 'graphql-tag';

export const ADD_WORKFLOW = gql`
  mutation createWorkflow($data: WorkflowCreateInput!) {
    createWorkflow(data: $data) {
      id
    }
  }
`;

export const DELETE_WORKFLOW = gql`
  mutation deleteWorkflow($where: WorkflowWhereUniqueInput!) {
    deleteWorkflow(where: $where) {
      id
    }
  }
`;

export const GET_WORKFLOWS = gql`
  query getFlowList {
    workflows(orderBy: createdAt_DESC) {
      id
      event {
        id
        name
      }
      action {
        id
        action
      }
    }
  }
`;

export const GET_ACTIONS = gql`
  query actions {
    actions {
      id
      action
    }
  }
`;

export const ADD_ACTION = gql`
  mutation createAction($data: ActionCreateInput!) {
    createAction(data: $data) {
      id
    }
  }
`;

export const DELETE_ACTION = gql`
  mutation deleteAction($where: ActionWhereUniqueInput!) {
    deleteAction(where: $where) {
      id
    }
  }
`;

export const UPDATE_ACTION = gql`
  mutation updateAction(
    $data: ActionUpdateInput!
    $where: ActionWhereUniqueInput!
  ) {
    updateAction(data: $data, where: $where) {
      id
    }
  }
`;

export const GET_EVENTS = gql`
  query events {
    events {
      id
      name
    }
  }
`;

export const ADD_EVENT = gql`
  mutation createEvent($data: EventCreateInput!) {
    createEvent(data: $data) {
      id
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation deleteEvent($where: EventWhereUniqueInput!) {
    deleteEvent(where: $where) {
      id
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation updateEvent(
    $data: EventUpdateInput!
    $where: EventWhereUniqueInput!
  ) {
    updateEvent(data: $data, where: $where) {
      id
    }
  }
`;

export const GET_WORKFLOWTEMPLATES = gql`
  query getWorkflowTemplate {
    events {
      id
      name
    }
    actions {
      id
      action
    }
  }
`;

export enum INPUT_TYPES {
  Text = 'text',
  Password = 'password',
  Textarea = 'textarea',
  Select = 'select',
  Checkbox = 'checkbox',
  Radio = 'radio',
  Datetime = 'datetime',
  Slider = 'slider',
  Cascader = 'cascader',
  RadioButton = 'radioButton',
  Color = 'color',
  Number = 'number',
}
