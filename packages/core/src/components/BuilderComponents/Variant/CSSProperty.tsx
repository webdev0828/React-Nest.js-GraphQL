import gql from 'graphql-tag';
import {
  ICSSProperty,
  Model,
} from 'src/components/BuilderComponents/interfaces';

export class CSSProperty implements Model<ICSSProperty> {
  public id: string;
  public name: string;
  public property: string;
  static fragments = () => gql`
    fragment CssPropertyFragment on CssProperty {
      id
      name
    }
  `;

  constructor({ id, name, property }: Model<ICSSProperty>) {
    this.id = id;
    this.name = name;
    this.property = property;
  }

  static mapCssProperties(
    values: Model<ICSSProperty>[],
  ): Model<ICSSProperty>[] {
    return values.map((value: Model<ICSSProperty>) => new CSSProperty(value));
  }
}
