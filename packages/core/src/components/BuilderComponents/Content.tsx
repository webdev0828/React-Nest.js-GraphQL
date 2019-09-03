import { INPUT_TYPES } from '@codelab/component';
import {
  FieldValue,
  IFieldValue,
} from 'src/components/BuilderComponents/FieldValue';
import { Model } from 'src/components/BuilderComponents/interfaces';
import { GET_MODEL_CONTENT } from 'src/components/Model/Model--queries';
import {
  MutationCreateContentArgs,
  MutationDeleteContentArgs,
  MutationUpdateContentArgs,
  Status,
} from 'src/graphql/__generated__/graphql-api';

export interface IContent {
  fieldValues: Model<IFieldValue>[];
}

export class Content implements Model<IContent> {
  public id: string;
  public fieldValues: Model<IFieldValue>[];

  constructor(content: Model<IContent>) {
    this.id = content.id;
    this.fieldValues = FieldValue.mapFieldValues(content.fieldValues);
  }

  static createContent(model, columns, values, { mutate }): Promise<any> {
    const create = columns.map(column => ({
      status: Status.Published,
      key: column.key,
      value: values[column['key']],
    }));

    const variables: MutationCreateContentArgs = {
      data: {
        status: Status.Published,
        model: {
          connect: {
            id: model.id,
          },
        },
        fieldValues: {
          create,
        },
      },
    };

    return new Promise(resolve => {
      mutate({
        variables,
        refetchQueries: [
          {
            query: GET_MODEL_CONTENT,
            variables: {
              where: {
                id: model.id,
              },
            },
          },
        ],
      });
      resolve('Success');
    });
  }

  public editContent(id, values, { mutate }): Promise<any> {
    const updateMany = this.fieldValues.map(fieldValue => ({
      where: {
        id: fieldValue.id,
      },
      data: {
        value: values[fieldValue.key],
      },
    }));

    const variables: MutationUpdateContentArgs = {
      data: {
        fieldValues: {
          updateMany,
        },
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
            query: GET_MODEL_CONTENT,
            variables: {
              where: {
                id,
              },
            },
          },
        ],
      });
      resolve('Success');
    });
  }

  static delete(id, record, mutate) {
    const variables: MutationDeleteContentArgs = {
      where: {
        id: record.key,
      },
    };

    mutate({
      variables,
      refetchQueries: [
        {
          query: GET_MODEL_CONTENT,
          variables: {
            where: {
              id,
            },
          },
        },
      ],
    });
  }

  static getAddContentFormFields(columns) {
    return columns.map(column => ({
      inputType: INPUT_TYPES.Text,
      label: column.key,
      name: column.key,
      validation: [{ required: true, msg: 'Required!!' }],
    }));
  }

  static getEditContentFormFields(columns, record) {
    return columns.map(column => ({
      inputType: INPUT_TYPES.Text,
      label: column.key,
      value: record[column.key],
      name: column.key,
      validation: [{ required: true, msg: 'Required!!' }],
    }));
  }

  static mapContents(contents: Model<IContent>[] = []): Model<IContent>[] {
    return contents.map((content: Model<IContent>) => new Content(content));
  }
}

export default Content;
