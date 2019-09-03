import { Model } from 'src/components/BuilderComponents/interfaces';
import { IAction, Action } from 'src/components/BuilderComponents/Action';
import { IEvent, Event } from 'src/components/BuilderComponents/Event';
import { GET_WORKFLOWS } from 'src/state/apollo-local-state/action/actionState';
import {
  MutationCreateWorkflowArgs,
  MutationDeleteEventArgs,
  Status,
} from 'src/graphql/__generated__/graphql-api';

export interface IWorkflow {
  event: Model<IEvent>;
  action: Model<IAction>;
}

export class Workflow implements Model<IWorkflow> {
  public id: string;
  public event: Model<IEvent>;
  public action: Model<IAction>;
  constructor({ id, event, action }: Model<IWorkflow>) {
    this.id = id;
    this.event = new Event(event);
    this.action = new Action(action);
  }

  static createWorkflow(values, { mutate }): Promise<any> {
    const variables: MutationCreateWorkflowArgs = {
      data: {
        status: Status.Published,
        event: { connect: { id: values.event } },
        action: { connect: { id: values.action } },
      },
    };
    return new Promise(resolve => {
      mutate({
        variables,
        refetchQueries: [
          {
            query: GET_WORKFLOWS,
          },
        ],
      });
      resolve('Success');
    });
  }

  public delete(mutate) {
    const variables: MutationDeleteEventArgs = {
      where: {
        id: this.id,
      },
    };

    mutate({
      variables,
      refetchQueries: [
        {
          query: GET_WORKFLOWS,
        },
      ],
    });
  }

  static mapWorkflows(workflows: Model<IWorkflow>[] = []): Model<IWorkflow>[] {
    return workflows.map(
      (workflow: Model<IWorkflow>) => new Workflow(workflow),
    );
  }
}

export default Workflow;
