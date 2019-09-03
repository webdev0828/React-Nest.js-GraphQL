import { Icon } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { Mutation } from 'react-apollo';
import { DELETE_GRID } from 'src/components/Grid/Grid--queries';
import { IRouterPage } from 'src/route/Router';

const GridIconDelete = ({ grid }) => {
  const { query } = useRouter<IRouterPage>();
  const slug = query!.page;
  return (
    <Mutation mutation={DELETE_GRID}>
      {deleteGrid => (
        <Icon
          type="close"
          onClick={() => {
            grid.delete(slug, deleteGrid);
          }}
        />
      )}
    </Mutation>
  );
};

export default GridIconDelete;
