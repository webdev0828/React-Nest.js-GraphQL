import { Icon } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { Mutation } from 'react-apollo';
import { IRouterPage } from 'src/route/Router';
import { DELETE_ELEMENT } from 'src/state/apollo-local-state/element/elementState';

const ElementIconDelete = ({ element }) => {
  const { query } = useRouter<IRouterPage>();

  return (
    <Mutation mutation={DELETE_ELEMENT}>
      {deleteElement => (
        <Icon
          type="close"
          onClick={() => {
            element.delete({ query, mutate: deleteElement });
          }}
        />
      )}
    </Mutation>
  );
};

export default ElementIconDelete;
