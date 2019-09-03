import { Model } from 'src/components/BuilderComponents/interfaces';
import { Field, IField } from 'src/components/Field/Field';
import { IModel } from 'src/components/BuilderComponents/Model';
import {
  IQueryWhere,
  QueryWhere,
} from 'src/components/BuilderComponents/QueryWhere';
import {
  IQuerySort,
  QuerySort,
} from 'src/components/BuilderComponents/QuerySort';
import {
  MutationCreateQueryModelArgs,
  Status,
  FieldType,
  OperatorType,
} from 'src/graphql/__generated__/graphql-api';

export interface IQueryModel {
  name: string;
  model: Model<IModel>;
  fields: Model<IField>[];
  where: Model<IQueryWhere>[];
  sort: Model<IQuerySort>[];
}

export class QueryModel implements Model<IQueryModel> {
  public id: string;
  public name: string;
  public model: Model<IModel>;
  public fields: Model<IField>[];
  public where: Model<IQueryWhere>[];
  public sort: Model<IQuerySort>[];

  constructor({ id, name, fields, where, sort }: Model<IQueryModel>) {
    this.id = id;
    this.name = name;
    this.fields = Field.mapFields(fields);
    this.where = QueryWhere.mapQueryWhere(where);
    this.sort = QuerySort.mapQuerySorts(sort);
  }

  static createQueryModel({ model, values, mutate }): Promise<any> {
    const fields = model.fields;
    const queryFields: any[] = [];
    const queryWhere: any[] = [];
    fields.map(field => {
      if (field.type === FieldType.Relationship) {
        const predicateModel = field!.relationship!.predicate;
        predicateModel.fields.map(field => {
          if (field.type !== FieldType.Relationship) {
            fields.push(field);
          }
        });
      }
    });
    fields.map(field => {
      if (values[`include_${field.id}`]) {
        queryFields.push({ id: field.id });
        queryWhere.push({
          status: Status.Published,
          operator: OperatorType[values[`operator_${field.id}`]],
          value: values[`value_${field.id}`],
          field: {
            connect: {
              id: field.id,
            },
          },
        });
      }
    });
    const variables: MutationCreateQueryModelArgs = {
      data: {
        status: Status.Published,
        name: values.name,
        model: {
          connect: {
            id: model.id,
          },
        },
        fields: {
          connect: queryFields,
        },
        where: {
          create: queryWhere,
        },
      },
    };
    return new Promise(resolve => {
      mutate({
        variables,
      });
      resolve('Success');
    });
  }

  static mapQueryModels(models: Model<IQueryModel>[]): Model<IQueryModel>[] {
    return models.map((model: Model<IQueryModel>) => new QueryModel(model));
  }
}
