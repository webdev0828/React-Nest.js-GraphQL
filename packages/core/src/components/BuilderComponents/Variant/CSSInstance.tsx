import gql from 'graphql-tag';
import {
  ICSSInstance,
  ICSSProperty,
  ICSSValue,
  Model,
} from 'src/components/BuilderComponents/interfaces';
import { CSSProperty } from 'src/components/BuilderComponents/Variant/CSSProperty';
import { CSSValue } from 'src/components/BuilderComponents/Variant/CSSValue';

export class CSSInstance implements Model<ICSSInstance> {
  public id: string;
  public option: Model<ICSSValue>;
  public property: Model<ICSSProperty>;
  static fragments = () => gql`
    fragment CssInstanceFragment on CssInstance {
      id
      name
      option {
        ...CssValueFragment
      }
      property {
        ...CssPropertyFragment
      }
    }
    ${CSSValue.fragments()}
    ${CSSProperty.fragments()}
  `;

  constructor({ option, property }: Model<ICSSInstance>) {
    this.option = new CSSValue(option);
    this.property = new CSSProperty(property);
  }

  static mapCssInstances(
    cssInstances: Model<ICSSInstance>[],
  ): Model<ICSSInstance>[] {
    return cssInstances.map(
      (cssInstance: Model<ICSSInstance>) => new CSSInstance(cssInstance),
    );
  }
}
