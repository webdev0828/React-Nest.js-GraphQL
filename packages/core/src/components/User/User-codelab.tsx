import React from 'react';
import { USER_CODELAB_QUERY } from 'src/components/User/User--queries';
import Query from 'src/utils/Query';

const UserCodelab = () => (
  <Query query={USER_CODELAB_QUERY}>
    {({ data }) => {
      return (
        <>
          <h1> Current User </h1>
        </>
      );
    }}
  </Query>
);

export default UserCodelab;
