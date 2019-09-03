import { Form } from '@codelab/component';
import { Card, Icon, Popover } from 'antd';
import React from 'react';
import { Mutation } from 'react-apollo';
import { Event } from 'src/components/BuilderComponents/Event';
import { Models } from 'src/graphql/modelTypes';
import {
  ADD_EVENT,
  DELETE_EVENT,
  GET_EVENTS,
  UPDATE_EVENT,
} from 'src/state/apollo-local-state/action/actionState';
import Query from 'src/utils/Query';

const EditPopoverContainer = ({ event }) => {
  const eventObj = new Event(event);
  const eventEditFields = eventObj.getEditFormFields();
  return (
    <Form
      fields={eventEditFields}
      mutation={UPDATE_EVENT}
      submitButton={{ text: 'Edit Event' }}
      onSubmit={(values, { mutate }) => eventObj.editEvent(values, { mutate })}
      onComplete={() => Promise.resolve(console.log('onComplete'))}
    />
  );
};

const EventItem = ({ event }) => {
  return (
    <Card>
      <Mutation mutation={DELETE_EVENT}>
        {deleteEvent => (
          <Icon
            type="close"
            onClick={() => {
              event.delete(deleteEvent);
            }}
          />
        )}
      </Mutation>
      <Popover
        placement="right"
        content={EditPopoverContainer({ event })}
        trigger="click"
      >
        <Icon type="setting" />
      </Popover>
      <h3>{event.name}</h3>
    </Card>
  );
};

const EventList = ({ events }) => {
  return events.map((event, index) => <EventItem event={event} key={index} />);
};

const AddEvent = () => {
  return (
    <Query<{ events: Event[] }> displayName={Models.Event} query={GET_EVENTS}>
      {({ data }) => {
        const events = data!.events;
        const eventCreateFormFields = Event.getCreateFormFields();
        return (
          <>
            <Form
              fields={eventCreateFormFields}
              mutation={ADD_EVENT}
              submitButton={{ text: 'Add Event' }}
              onSubmit={(values, { mutate }) =>
                Event.createEvent(values, { mutate })
              }
            />
            <EventList events={events} />
          </>
        );
      }}
    </Query>
  );
};

export default AddEvent;
