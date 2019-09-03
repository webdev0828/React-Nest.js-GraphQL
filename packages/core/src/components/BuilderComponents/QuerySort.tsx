import { Model } from 'src/components/BuilderComponents/interfaces';
import { Field } from 'src/components/Field/Field';
import { SortType } from 'src/graphql/__generated__/graphql-api';

export interface IQuerySort {
  field: Field;
  sort?: SortType;
}

export class QuerySort implements Model<IQuerySort> {
  public id: string;
  public field: Field;
  public sort?: SortType;

  constructor({ id, field, sort = SortType.Asc }: Model<IQuerySort>) {
    this.id = id;
    this.field = field;
    this.sort = sort;
  }

  static mapQuerySorts(sorts: Model<IQuerySort>[]): Model<IQuerySort>[] {
    return sorts.map((sort: Model<IQuerySort>) => new QuerySort(sort));
  }
}
