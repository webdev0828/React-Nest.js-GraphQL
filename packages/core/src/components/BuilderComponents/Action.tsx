import { Model } from 'src/components/BuilderComponents/interfaces';
import {
  MutationDeleteActionArgs,
  MutationCreateActionArgs,
  MutationUpdateActionArgs,
  Status,
} from 'src/graphql/__generated__/graphql-api';
import {
  GET_ACTIONS,
  INPUT_TYPES,
} from 'src/state/apollo-local-state/action/actionState';

export interface IAction {
  action: string;
}

export class Action implements Model<IAction> {
  public id: string;
  public action: string;

  constructor({ id, action }: Model<IAction>) {
    this.id = id;
    this.action = action;
  }

  static createAction(values, { mutate }): Promise<any> {
    const variables: MutationCreateActionArgs = {
      data: {
        status: Status.Published,
        action: values.action,
      },
    };
    return new Promise(resolve => {
      mutate({
        variables,
        refetchQueries: [
          {
            query: GET_ACTIONS,
          },
        ],
      });
      resolve('Success');
    });
  }

  public editAction(values, { mutate }): Promise<any> {
    const variables: MutationUpdateActionArgs = {
      data: {
        action: values.action,
      },
      where: {
        id: this.id,
      },
    };
    return new Promise(resolve => {
      mutate({
        variables,
        refetchQueries: [
          {
            query: GET_ACTIONS,
          },
        ],
      });
      resolve('Success');
    });
  }

  public delete(mutate) {
    const variables: MutationDeleteActionArgs = {
      where: {
        id: this.id,
      },
    };

    mutate({
      variables,
      refetchQueries: [
        {
          query: GET_ACTIONS,
        },
      ],
    });
  }

  static getCreateFormFields() {
    return [
      {
        inputType: INPUT_TYPES.Text,
        name: 'action',
        placeholder: 'Input new action name',
        validation: [{ required: true, msg: 'Required!!' }],
      },
    ];
  }

  public getEditFormFields() {
    return [
      {
        inputType: INPUT_TYPES.Text,
        name: 'action',
        value: this.action,
        placeholder: 'Input new action name',
        validation: [{ required: true, msg: 'Required!!' }],
      },
    ];
  }

  static mapActions(actions: Model<IAction>[] = []): Model<IAction>[] {
    return actions.map((action: Model<IAction>) => new Action(action));
  }
}

export default Action;
