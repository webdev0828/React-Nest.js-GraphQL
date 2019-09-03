import gql from 'graphql-tag';
import { ICSSValue, Model } from 'src/components/BuilderComponents/interfaces';

export class CSSValue implements Model<ICSSValue> {
  public id: string;
  public types: any;
  public value: string;
  static fragments = () => gql`
    fragment CssValueFragment on CssValue {
      id
      value
      type
    }
  `;

  constructor({ id, types, value }: Model<ICSSValue>) {
    this.id = id;
    this.types = types;
    this.value = value;
  }

  static mapCssOptions(values: Model<ICSSValue>[]): Model<ICSSValue>[] {
    return values.map((value: Model<ICSSValue>) => new CSSValue(value));
  }
}
