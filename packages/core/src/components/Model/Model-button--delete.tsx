import { Button } from 'antd';
import React from 'react';
import { Mutation } from 'react-apollo';
import { DELETE_MODEL } from 'src/components/Model/Model--queries';

export const ModelButtonDelete = ({ model, username, appName }) => {
  return (
    <Mutation mutation={DELETE_MODEL}>
      {deleteModel => (
        <Button
          id="btnModelDel"
          onClick={() =>
            model.delete({
              username,
              appName,
              mutate: deleteModel,
            })
          }
        >
          Delete Model
        </Button>
      )}
    </Mutation>
  );
};
