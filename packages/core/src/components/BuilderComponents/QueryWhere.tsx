import { Model } from 'src/components/BuilderComponents/interfaces';
import { Field } from 'src/components/Field/Field';
import { OperatorType } from 'src/graphql/__generated__/graphql-api';

export interface IQueryWhere {
  field: Field;
  operator?: OperatorType;
  value: string;
}

export class QueryWhere implements Model<IQueryWhere> {
  public id: string;
  public field: Field;
  public operator?: OperatorType;
  public value: string;

  constructor({
    id,
    field,
    operator = OperatorType.Equal,
    value,
  }: Model<IQueryWhere>) {
    this.id = id;
    this.field = field;
    this.operator = operator;
    this.value = value;
  }

  static mapQueryWhere(queries: Model<IQueryWhere>[]): Model<IQueryWhere>[] {
    return queries.map((query: Model<IQueryWhere>) => new QueryWhere(query));
  }
}
