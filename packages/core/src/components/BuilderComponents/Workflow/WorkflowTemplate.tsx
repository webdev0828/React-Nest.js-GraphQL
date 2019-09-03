import { Model } from 'src/components/BuilderComponents/interfaces';
import { IAction, Action } from 'src/components/BuilderComponents/Action';
import { IEvent, Event } from 'src/components/BuilderComponents/Event';
import { INPUT_TYPES } from 'src/state/apollo-local-state/action/actionState';
export interface IWorkflowTemplate {
  events: Model<IEvent>[];
  actions: Model<IAction>[];
}

export class WorkflowTemplate implements Model<IWorkflowTemplate> {
  id: string;
  events: Model<IEvent>[];
  actions: Model<IAction>[];
  constructor({ events, actions }: Model<IWorkflowTemplate>) {
    this.events = Event.mapEvents(events);
    this.actions = Action.mapActions(actions);
  }

  public getWorkflowFormFields() {
    const actionInputOptions = this.actions.map((action: Model<IAction>) => ({
      label: action.action,
      value: action.id,
    }));

    const eventInputOptions = this.events.map((event: Model<IEvent>) => ({
      label: event.name,
      value: event.id,
    }));

    const workflowInputFields = [
      {
        inputType: INPUT_TYPES.Select,
        name: 'event',
        placeholder: 'Please choose an event',
        options: eventInputOptions,
        validation: [{ required: true, msg: 'Required!!' }],
      },
      {
        inputType: INPUT_TYPES.Select,
        name: 'action',
        placeholder: 'Please choose an action',
        options: actionInputOptions,
        validation: [{ required: true, msg: 'Required!!' }],
      },
    ];

    return workflowInputFields;
  }
}
