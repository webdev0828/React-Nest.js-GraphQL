import gql from 'graphql-tag';
import {
  IVariant,
  IVariantInstance,
  IVariantTemplate,
  Model,
} from 'src/components/BuilderComponents/interfaces';
import { Variant } from 'src/components/Variant/Variant';

export class VariantInstance implements Model<IVariantInstance> {
  public id: string;
  public template: Model<IVariantTemplate>;
  public variant: Model<IVariant>;

  static fragments = () => gql`
    fragment VaraintInstanceFragment on VariantInstance {
      id
      variant {
        ...VariantFragment
      }
    }
    ${Variant.fragments()}
  `;

  constructor({ id, template, variant }: Model<IVariantInstance>) {
    this.id = id;
    this.template = template;
    this.variant = variant;
  }

  public static mapVariantInstances(
    variantInstances: Model<IVariantInstance>[] = [],
  ) {
    return variantInstances.map((variantInstance: Model<IVariantInstance>) => {
      return new VariantInstance(variantInstance);
    });
  }
}
