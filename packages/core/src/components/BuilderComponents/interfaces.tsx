import { Scalars, ComponentType } from 'src/graphql/__generated__/graphql-api';

export type Model<T> = {
  // Destructure type T
  [P in keyof T]: T[P]
  // Add common DB fields
} & { id: Scalars['ID']; typename?: string };

export type IComponent = {
  type: ComponentType;
  templates: Model<IVariantTemplate>[];
};

export interface IVariantTemplate {
  name: string;
  variants: Model<IVariant>[];
}

export interface IVariant {
  name: string;
  classes: Model<IClass>[];
}

export interface IVariantInstance {
  variant: Model<IVariant>;
  template: Model<IVariantTemplate>;
}

export interface IClass {
  name: string;
  css: Model<ICSSInstance>[];
}

export interface ICSSInstance {
  property: Model<ICSSProperty>;
  option: Model<ICSSValue>;
}

export interface ICSSTemplate {
  name: string;
  property: Model<ICSSProperty>;
  options: Model<ICSSValue>[];
}

export interface ICSSProperty {
  name: string;
  property: string;
}

export interface ICSSValue {
  value: string;
  types: any; // CSS
}
