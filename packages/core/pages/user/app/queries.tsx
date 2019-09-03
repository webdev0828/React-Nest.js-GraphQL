import { Form } from '@codelab/component';
import { Select } from 'antd';
import React from 'react';
import { Mutation } from 'react-apollo';
import ModelT from 'src/components/BuilderComponents/Model';
import { QueryModel } from 'src/components/BuilderComponents/QueryModel';
import {
  GET_MODEL,
  GET_ONLY_MODELS_NAMES,
} from 'src/components/Model/Model--queries';
import { CREATE_NEW_QUERYMODEL } from 'src/components/Query/Query--queries';
import { Models } from 'src/graphql/modelTypes';
import withPageProps from 'src/hoc/withPageProps';
import {
  GET_CURRENT_MODEL,
  SET_CURRENT_MODEL,
} from 'src/state/apollo-local-state/model/modelState';
import Query from 'src/utils/Query';

const ModelSelect = ({ models }) => {
  return (
    <Mutation mutation={SET_CURRENT_MODEL}>
      {setCurrentModel => (
        <Select
          style={{ width: '100%' }}
          placeholder="Select Model"
          onChange={value =>
            setCurrentModel({
              variables: {
                model: {
                  currentModelID: value,
                },
              },
            })
          }
        >
          {models.map(model => {
            return (
              <Select.Option value={model.id} key={model.id}>
                {model.name}
              </Select.Option>
            );
          })}
        </Select>
      )}
    </Mutation>
  );
};

const QueryFields = () => {
  return (
    <Query query={GET_CURRENT_MODEL}>
      {({ data: { model } }) => {
        const currentModelID = model.currentModelID;
        if (!currentModelID) return null;
        return (
          <Query<{ model: ModelT }>
            displayName={Models.Model}
            query={GET_MODEL}
            variables={{ where: { id: currentModelID } }}
          >
            {({ data }) => {
              const model = data!.model;
              const fields = model.getQueryFields();
              return (
                <Form
                  fields={fields}
                  submitButton={{ text: 'Create Query' }}
                  mutation={CREATE_NEW_QUERYMODEL}
                  onSubmit={(values, { mutate }) =>
                    QueryModel.createQueryModel({ model, values, mutate })
                  }
                  onComplete={() => Promise.resolve(console.log('onComplete'))}
                />
              );
            }}
          </Query>
        );
      }}
    </Query>
  );
};

const queryPage = () => {
  return (
    <Query<{ models: ModelT[] }>
      displayName={Models.Models}
      query={GET_ONLY_MODELS_NAMES}
    >
      {({ data }) => {
        const models = data!.models;
        return (
          <>
            <h1>Query</h1>
            <ModelSelect models={models} />
            <QueryFields />
          </>
        );
      }}
    </Query>
  );
};

export default withPageProps({ hasSidebar: true })(queryPage);
