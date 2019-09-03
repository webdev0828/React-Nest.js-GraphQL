import { Icon } from 'antd';
import React from 'react';
import { Mutation } from 'react-apollo';
import { DELETE_CONTAINER } from 'src/state/apollo-local-state/container/containerState';

const ContainerIconDelete = ({ container }) => (
  <Mutation mutation={DELETE_CONTAINER}>
    {deleteContainer => (
      <Icon
        type="close"
        onClick={() => {
          container.delete({ deleteContainer });
        }}
      />
    )}
  </Mutation>
);

export default ContainerIconDelete;
