import { MockList } from 'graphql-tools';
import casual from 'casual-browserify';

const mocks = props => ({
  ModelModelConnection: () => ({
    items: () => new MockList(props.model || 5),
  }),
  Model: () => ({
    id: () => casual.uuid,
    name: () => casual.title,
    fields: () => ({
      items: () => new MockList(props.field || 3),
    }),
  }),
  Field: () => ({
    id: () => casual.uuid,
    name: () => casual.title,
  }),
  // String: () => casual.name,
});

export default mocks;
