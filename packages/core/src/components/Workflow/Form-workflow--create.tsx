import { Form } from '@codelab/component';
import { Card, Col, Icon } from 'antd';
import React from 'react';
import { Mutation } from 'react-apollo';
import { Workflow } from 'src/components/BuilderComponents/Workflow/Workflow';
import { WorkflowTemplate } from 'src/components/BuilderComponents/Workflow/WorkflowTemplate';
import { Models } from 'src/graphql/modelTypes';
import {
  ADD_WORKFLOW,
  DELETE_WORKFLOW,
  GET_WORKFLOWS,
  GET_WORKFLOWTEMPLATES,
} from 'src/state/apollo-local-state/action/actionState';
import Query from 'src/utils/Query';

const WorkflowItem = ({ workflow }) => {
  return (
    <section>
      <Col>
        <Card>
          <Mutation mutation={DELETE_WORKFLOW}>
            {deleteWorkflow => (
              <Icon
                type="close"
                onClick={() => {
                  workflow.delete(deleteWorkflow);
                }}
              />
            )}
          </Mutation>
          <h3> {workflow.event.name}</h3>
        </Card>
      </Col>
      <Col span={2}>
        <span> </span>
        {/* hakuna revewing to remove ==> */}
      </Col>
      <Col span={11}>
        <Card>
          <h3>{workflow.action.action}</h3>
        </Card>
      </Col>
    </section>
  );
};

const WorkflowList = ({ workflows }) => {
  return workflows.map((workflow, idx) => (
    <WorkflowItem workflow={workflow} key={idx} />
  ));
};

const AddWorkflow = () => {
  return (
    <>
      <Query<{ workflowTemplate: WorkflowTemplate }>
        displayName={Models.WorkflowTemplate}
        query={GET_WORKFLOWTEMPLATES}
      >
        {({ data }) => {
          const workflowTemplate = data!.workflowTemplate;
          const workflowFormFields = workflowTemplate.getWorkflowFormFields();
          return (
            <Form
              fields={workflowFormFields}
              mutation={ADD_WORKFLOW}
              submitButton={{ text: 'Add Workflow' }}
              onSubmit={(values, { mutate }) =>
                Workflow.createWorkflow(values, { mutate })
              }
              onComplete={() => Promise.resolve(console.log('onComplete'))}
            />
          );
        }}
      </Query>

      <Query<{ workflows: Workflow[] }>
        displayName={Models.Workflow}
        query={GET_WORKFLOWS}
      >
        {({ data }) => {
          const workflows = data!.workflows;
          return <WorkflowList workflows={workflows} />;
        }}
      </Query>
    </>
  );
};

export default AddWorkflow;
