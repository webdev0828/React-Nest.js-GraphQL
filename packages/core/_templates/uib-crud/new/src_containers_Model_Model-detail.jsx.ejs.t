---
to: src/containers/<%= h.capitalize(name) %>/<%= h.capitalize(name) %>-detail.jsx
---
import React from 'react';
import { compose, branch, renderComponent, withState } from 'recompose';
import withLifecycle from '@hocs/with-lifecycle';
import { withModelDetail } from 'src/containers/<%= h.capitalize(name) %>//<%= h.capitalize(name) %>-container';
import Loader from 'src/components/snippets/Loader';

const <%= h.capitalize(name) %>Detail = (props) => {
  console.log(props);
  return (
    <div>
      <%= h.capitalize(name) %>:
      <p>{props.<%= name.toLowerCase() %>.name}</p>
      <p>{props.<%= name.toLowerCase() %>.id}</p>
    </div>
  );
};


export default compose(
  withState('loading', 'setLoading', true),
  withLifecycle({
    onDidMount: (props) => {
      setTimeout(() => {
        props.setLoading(false);
      }, 2000);
    },
  }),
  withModelDetail,
  branch(
    props => (props.<%= name.toLowerCase() %> == null) || props.loading,
    renderComponent(
      () => (<Loader />),
    ),
  ),
)(<%= h.capitalize(name) %>Detail);
