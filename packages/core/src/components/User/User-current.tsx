import React from 'react';
import { USER_ME_QUERY } from 'src/components/User/User--queries';
import Query from 'src/utils/Query';

const UserCurrent = () => (
  <Query query={USER_ME_QUERY}>
    {({ data }) => {
      console.log(data);
      return (
        <>
          <h1> Current User </h1>
        </>
      );
    }}
  </Query>
);

export default UserCurrent;
