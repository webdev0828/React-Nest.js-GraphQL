import { Card } from 'antd';
import { withRouter } from 'next/router';
import React from 'react';
import { ModelT } from 'src/components/BuilderComponents/Model';
import { GET_ONLY_MODELS_NAMES } from 'src/components/Model/Model--queries';
import { Models } from 'src/graphql/modelTypes';
import Link from 'src/route/Link';
import Query from 'src/utils/Query';

const ModelItem = ({ model, username, app }) => {
  return (
    <Link
      route="user.app.content.id"
      params={{
        username,
        app,
        model: model.name,
        id: model.id,
      }}
    >
      <Card hoverable={true}>
        <h2>{model.name}</h2>
      </Card>
    </Link>
  );
};

const ModelList = ({ models, username, app }) => {
  return models.map((model, index) => (
    <ModelItem model={model} username={username} app={app} key={index} />
  ));
};

const ContentModelList = ({ router }) => {
  const {
    query: { username, app },
  } = router;
  return (
    <Query<{ models: ModelT[] }>
      displayName={Models.Models}
      query={GET_ONLY_MODELS_NAMES}
    >
      {({ data }) => {
        const models = data!.models;
        return (
          <>
            <Card>
              <h1>Content</h1>
            </Card>
            <ModelList models={models} username={username} app={app} />
          </>
        );
      }}
    </Query>
  );
};

export default withRouter(ContentModelList);
