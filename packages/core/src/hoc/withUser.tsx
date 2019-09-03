import React from 'react';
import Query from 'src/utils/Query';
import { USER_ME_QUERY } from 'src/components/User/User--queries';

const withUser = ComposedComponent =>
  class extends React.Component {
    render() {
      return (
        <Query query={USER_ME_QUERY}>
          {({ data: { me } }) => {
            const user = {
              user: me,
            };
            return me ? <ComposedComponent {...this.props} {...user} /> : null;
          }}
        </Query>
      );
    }
  };

export default withUser;
