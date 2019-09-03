import { Form } from '@codelab/component';
import { Card, Col, Icon, Popover, Row } from 'antd';
import React from 'react';
import { Mutation } from 'react-apollo';
import { Action } from 'src/components/BuilderComponents/Action';
import { Models } from 'src/graphql/modelTypes';
import {
  ADD_ACTION,
  DELETE_ACTION,
  GET_ACTIONS,
  UPDATE_ACTION,
} from 'src/state/apollo-local-state/action/actionState';
import Query from 'src/utils/Query';

const EditPopoverContainer = ({ action }) => {
  const actionObj = new Action(action);
  const actionEditFields = actionObj.getEditFormFields();

  return (
    <Form
      fields={actionEditFields}
      mutation={UPDATE_ACTION}
      submitButton={{ text: 'Edit Event' }}
      onSubmit={(values, { mutate }) =>
        actionObj.editAction(values, { mutate })
      }
      onComplete={() => Promise.resolve(console.log('onComplete'))}
    />
  );
};

const ActionItem = ({ action }) => {
  return (
    <Col span={24}>
      <Card>
        <Mutation mutation={DELETE_ACTION}>
          {deleteAction => (
            <Icon
              type="close"
              onClick={() => {
                action.delete(deleteAction);
              }}
            />
          )}
        </Mutation>
        <Popover
          placement="right"
          content={EditPopoverContainer({ action })}
          trigger="click"
        >
          <Icon type="setting" />
        </Popover>
        <h3>{action.action}</h3>
      </Card>
    </Col>
  );
};

const ActionList = ({ actions }) => {
  return actions.map((action, idx) => <ActionItem action={action} key={idx} />);
};

const AddAction = () => {
  return (
    <Query<{ actions: Action[] }>
      displayName={Models.Action}
      query={GET_ACTIONS}
    >
      {({ data }) => {
        const actions = data!.actions;
        const actionCreateFormFields = Action.getCreateFormFields();
        return (
          <Row gutter={10}>
            <Form
              fields={actionCreateFormFields}
              mutation={ADD_ACTION}
              submitButton={{ text: 'New Action' }}
              onSubmit={(values, { mutate }) =>
                Action.createAction(values, { mutate })
              }
              onComplete={() => Promise.resolve(console.log('onComplete'))}
            />
            <ActionList actions={actions} />
          </Row>
        );
      }}
    </Query>
  );
};

export default AddAction;
