import { MockList } from 'graphql-tools';
import casual from 'casual-browserify';

const mocks = props => ({
  Query: () => ({
    models: () => new MockList(props.model || 5),
  }),
  Model: () => ({
    id: () => casual.uuid,
    name: () => casual.name,
  }),
});
export default mocks;
