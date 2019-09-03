import { Model } from 'src/components/BuilderComponents/interfaces';
import {
  MutationDeleteEventArgs,
  MutationCreateEventArgs,
  MutationUpdateEventArgs,
  Status,
} from 'src/graphql/__generated__/graphql-api';
import {
  GET_EVENTS,
  INPUT_TYPES,
} from 'src/state/apollo-local-state/action/actionState';

export interface IEvent {
  name: string;
}

export class Event implements Model<IEvent> {
  public id: string;
  public name: string;

  constructor({ id, name }: Model<IEvent>) {
    this.id = id;
    this.name = name;
  }

  static createEvent(values, { mutate }): Promise<any> {
    const variables: MutationCreateEventArgs = {
      data: {
        status: Status.Published,
        name: values.event,
      },
    };
    return new Promise(resolve => {
      mutate({
        variables,
        refetchQueries: [
          {
            query: GET_EVENTS,
          },
        ],
      });
      resolve('Success');
    });
  }

  public editEvent(values, { mutate }): Promise<any> {
    const variables: MutationUpdateEventArgs = {
      data: {
        name: values.event,
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
            query: GET_EVENTS,
          },
        ],
      });
      resolve();
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
          query: GET_EVENTS,
        },
      ],
    });
  }

  public getEditFormFields() {
    return [
      {
        inputType: INPUT_TYPES.Text,
        name: 'event',
        value: this.name,
        placeholder: 'Input new event name',
        validation: [{ required: true, msg: 'Required!!' }],
      },
    ];
  }

  static getCreateFormFields() {
    return [
      {
        inputType: INPUT_TYPES.Text,
        name: 'event',
        placeholder: 'Input new event name',
        validation: [{ required: true, msg: 'Required!!' }],
      },
    ];
  }

  static mapEvents(events: Model<IEvent>[] = []): Model<IEvent>[] {
    return events.map((event: Model<IEvent>) => new Event(event));
  }
}

export default Event;
