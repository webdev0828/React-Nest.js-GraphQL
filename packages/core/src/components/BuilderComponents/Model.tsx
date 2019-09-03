import { INPUT_TYPES, useModal } from '@codelab/component';
import { ModalIDs } from '@codelab/system';
import { Button, Popconfirm } from 'antd';
import React from 'react';
import { Mutation } from 'react-apollo';
import { Content, IContent } from 'src/components/BuilderComponents/Content';
import { Model } from 'src/components/BuilderComponents/interfaces';
import { Field, IField } from 'src/components/Field/Field';
import { GET_ALL_MODELS, GET_MODEL } from 'src/components/Model/Model--queries';
import {
  FieldType,
  MutationCreateModelArgs,
  MutationDeleteModelArgs,
  MutationUpdateModelArgs,
  Status,
} from 'src/graphql/__generated__/graphql-api';
import Router from 'src/route/Router';
import { USER_APP_ROUTE } from 'src/route/routes';
import { DELETE_CONTENT } from 'src/state/apollo-local-state/content/contentState';

const EditButton = ({ id, content, columns, record }) => {
  const modalID = ModalIDs.ContentEdit;
  const { toggleModal } = useModal(modalID);
  return (
    <Button
      type="link"
      onClick={toggleModal({ data: { id, content, columns, record } })}
    >
      Edit
    </Button>
  );
};

const DeleteButton = ({ id, record }) => {
  return (
    <Mutation mutation={DELETE_CONTENT}>
      {deleteContent => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => {
            Content.delete(id, record, deleteContent);
          }}
        >
          <Button type="link">Delete</Button>
        </Popconfirm>
      )}
    </Mutation>
  );
};

export interface IModel {
  name: string;
  fields: Model<IField>[];
  contents: Model<IContent>[];
}

export class ModelT implements Model<IModel> {
  public id: string;
  public name: string;
  public fields: Model<IField>[];
  public contents: Model<IContent>[];

  constructor(model: Model<IModel>) {
    this.id = model.id;
    this.name = model.name;
    this.fields = Field.mapFields(model.fields);
    this.contents = Content.mapContents(model.contents);
  }

  static modelFieldOptions(models) {
    return models.map(model => ({
      label: model.name,
      value: model.id,
    }));
  }

  static createModel(slug, params, values, { mutate }): Promise<any> {
    const variables: MutationCreateModelArgs = {
      data: {
        status: Status.Published,
        name: values.name,
        app: {
          connect: {
            slug,
          },
        },
      },
    };

    return new Promise(resolve => {
      mutate({
        variables,
        refetchQueries: [
          {
            query: GET_ALL_MODELS,
          },
        ],
      }).then(data => {
        const result = data.data.createModel;
        const route = `/${params.username}/${params.app}/models/${
          result.name
        }/${result.id}`;
        Router.pushRoute(route);
      });
      resolve('Success');
    });
  }

  public editModel(values, { mutate }): Promise<any> {
    const variables: MutationUpdateModelArgs = {
      data: {
        name: values.name,
      },
      where: {
        id: this.id,
      },
    };
    return new Promise(resolve => {
      mutate({
        variables,
        refetchQueries: [
          {
            query: GET_MODEL,
            variables: {
              where: {
                id: this.id,
              },
            },
          },
        ],
      });
      resolve('Success');
    });
  }

  public delete({ mutate, username, appName }): Promise<any> {
    const variables: MutationDeleteModelArgs = {
      where: {
        id: this.id,
      },
    };
    return new Promise(resolve => {
      mutate({
        variables,
        refetchQueries: [
          {
            query: GET_ALL_MODELS,
          },
        ],
      }).then(() => {
        Router.pushRoute(USER_APP_ROUTE, { username, app: appName });
      });
      resolve('Success');
    });
  }

  public editModelFormFields() {
    return [
      {
        inputType: INPUT_TYPES.Text,
        name: 'name',
        value: this.name,
        validation: [{ required: true, msg: 'Required!!' }],
      },
    ];
  }

  static createModelFormField() {
    return [
      {
        inputType: INPUT_TYPES.Text,
        name: 'name',
        value: '',
        validation: [{ required: true, msg: 'Required!!' }],
      },
    ];
  }

  public getTableColumns() {
    const normalColumns = this.fields.map(field => ({
      title: field['key'],
      dataIndex: field['key'],
      key: field['key'],
    }));

    const editColumn = [
      {
        title: 'Edit',
        dataIndex: 'edit',
        key: 'edit',
        render: (text, record) => {
          let selectedContent;
          this.contents.map(content => {
            if (content.id === record.key) {
              selectedContent = content;
            }
          });
          return (
            <EditButton
              id={this.id}
              content={selectedContent}
              columns={normalColumns}
              record={record}
            />
          );
        },
      },
    ];

    const deleteColumn = [
      {
        title: 'Delete',
        dataIndex: 'delete',
        key: 'delete',
        render: (text, record) => <DeleteButton id={this.id} record={record} />,
      },
    ];
    return [...normalColumns, ...editColumn, ...deleteColumn];
  }

  public getTableColumnsWithoutButtons() {
    return this.fields.map(field => ({
      title: field['key'],
      dataIndex: field['key'],
      key: field['key'],
    }));
  }

  public getSourceData() {
    return this.contents.map((content, idx) => {
      const data = {};
      data['key'] = content.id;
      content.fieldValues.map(fieldValue => {
        data[fieldValue.key] = fieldValue.value;
      });
      return data;
    });
  }

  public getQueryFields() {
    let queryFields: any[] = [];
    const queryNameField = [
      {
        inputType: INPUT_TYPES.Text,
        name: 'name',
        placeholder: 'Please Input Query Name',
        layout: {
          wrapperLayout: {
            xs: 24,
            sm: 24,
          },
          labelLayout: {
            xs: 24,
            sm: 24,
          },
        },
        validation: [{ required: true, msg: 'Required!!' }],
      },
    ];
    queryFields = [...queryFields, ...queryNameField];
    this.fields.map(field => {
      const queryField = new Field(field).getQueryField();
      queryFields = [...queryFields, ...queryField];
      if (field.type === FieldType.Relationship) {
        const predicateModel = field!.relationship!.predicate;
        predicateModel.fields.map(field => {
          if (field.type !== FieldType.Relationship) {
            const predicateQueryField = new Field(field).getQueryField();
            queryFields = [...queryFields, ...predicateQueryField];
          }
        });
      }
    });
    return queryFields;
  }

  static mapModels(models: Model<IModel>[] = []): Model<IModel>[] {
    return models.map((model: Model<IModel>) => new ModelT(model));
  }
}

export default ModelT;
