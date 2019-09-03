import React from 'react';
import { ModelT } from 'src/components/BuilderComponents/Model';
import { FieldButtonAdd } from 'src/components/Field/Field-button--add';
import { FieldList } from 'src/components/Field/Field-list';
import FieldModalEdit from 'src/components/Field/Field-modal--edit';
import { GET_MODEL } from 'src/components/Model/Model--queries';
import { ModelButtonDelete } from 'src/components/Model/Model-button--delete';
import { ModelButtonEdit } from 'src/components/Model/Model-button--edit';
import { Models } from 'src/graphql/modelTypes';
import withPageProps from 'src/hoc/withPageProps';
import { StyleButtonContainer } from 'src/style/container/Container-button';
import Query from 'src/utils/Query';

type UrlParams = {
  url: {
    params: {
      username: string;
      app: string;
      model: string;
      id: string;
    };
  };
};

const modelPage = (props: UrlParams) => {
  const {
    url: {
      params: { username, app: appName, id },
    },
  } = props;

  const variables = {
    where: {
      id,
    },
  };

  return (
    <>
      <Query<{ model: ModelT }>
        displayName={Models.Model}
        query={GET_MODEL}
        variables={variables}
      >
        {({ data }) => {
          const model = data!.model;
          return (
            <>
              <h1>{model.name}</h1>
              <StyleButtonContainer>
                <ModelButtonEdit model={model} />
                <ModelButtonDelete
                  model={model}
                  username={username}
                  appName={appName}
                />
                <FieldButtonAdd model={model} />
              </StyleButtonContainer>
              <FieldList fields={model.fields} model={model} />
              <FieldModalEdit />
            </>
          );
        }}
      </Query>
    </>
  );
};

export default withPageProps({ hasSidebar: true })(modelPage);
