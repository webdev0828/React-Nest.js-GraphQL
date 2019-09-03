import { ISelectOption } from '@codelab/component';
import gql from 'graphql-tag';
import {
  IVariant,
  IVariantTemplate,
  Model,
} from 'src/components/BuilderComponents/interfaces';
import { Variant } from 'src/components/Variant/Variant';

export class VariantTemplate implements Model<IVariantTemplate> {
  public id: string;
  public name: string;
  public variants: Model<IVariant>[];
  static fragments = () => gql`
    fragment VariantCategoryFragment on VariantTemplate {
      id
      name
    }
  `;

  constructor({ id, name, variants }: Model<IVariantTemplate>) {
    this.id = id;
    this.name = name;
    this.variants = Variant.mapVariants(variants);
  }

  static mapTemplates(
    templates: Model<IVariantTemplate>[] = [],
  ): Model<IVariantTemplate>[] {
    return templates.map(
      (template: Model<IVariantTemplate>) => new VariantTemplate(template),
    );
  }

  static getFilterList(templates: Model<IVariantTemplate>[] = []) {
    return templates.map((template: Model<IVariantTemplate>) => ({
      text: template.name,
      value: template.name,
    }));
  }

  public get variantOptions(): ISelectOption[] {
    return this.variants.map((variant: Model<IVariant>) => ({
      label: variant.name,
      value: variant.id,
    }));
  }
}
