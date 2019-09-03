import { Button } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { Mutation } from 'react-apollo';
import { DELETE_GRID } from 'src/components/Grid/Grid--queries';
import { IRouterPage } from 'src/route/Router';

const GridButtonDelete = ({ grid }) => {
  const { query } = useRouter<IRouterPage>();
  const slug = query!.page;
  return (
    <Mutation mutation={DELETE_GRID}>
      {deleteGrid => (
        <Button
          onClick={() => {
            grid.delete(slug, deleteGrid);
          }}
        >
          {' '}
          Delete Grid{' '}
        </Button>
      )}
    </Mutation>
  );
};

export default GridButtonDelete;
