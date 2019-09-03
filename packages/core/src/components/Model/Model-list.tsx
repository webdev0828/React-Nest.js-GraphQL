import { useModal } from '@codelab/component';
import { ModalIDs } from '@codelab/system';
import { Card, Icon } from 'antd';
import { withRouter } from 'next/router';
import React from 'react';
import { ModelT } from 'src/components/BuilderComponents/Model';
import { GET_MODELS_NAMES_TYPES } from 'src/components/Model/Model--queries';
import ModelListItem from 'src/components/Model/Model-listItem';
import ModelModalCreate from 'src/components/Model/Model-modal--create';
import { Models } from 'src/graphql/modelTypes';
import Query from 'src/utils/Query';

const ModelList = ({ models, username, app }) => {
  return models.map((model, index) => (
    <ModelListItem model={model} username={username} app={app} key={index} />
  ));
};

const ModelListContainer = ({
  router: {
    query: { username, app },
  },
}) => {
  const { openModal } = useModal(ModalIDs.ModelCreate);

  return (
    <Query<{ models: ModelT[] }>
      displayName={Models.Models}
      query={GET_MODELS_NAMES_TYPES}
    >
      {({ data }) => {
        const models = data!.models;
        return (
          <>
            <Card>
              <h1>
                Model
                <Icon
                  style={{ float: 'right' }}
                  type="plus"
                  onClick={openModal({ data: { username, app } })}
                />
              </h1>
            </Card>
            <ModelList models={models} username={username} app={app} />
            <ModelModalCreate />
          </>
        );
      }}
    </Query>
  );
};

export default withRouter(ModelListContainer);
