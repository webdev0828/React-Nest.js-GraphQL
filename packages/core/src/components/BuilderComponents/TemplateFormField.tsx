import gql from 'graphql-tag';
import { Model } from 'src/components/BuilderComponents/interfaces';
import { FormFieldType } from 'src/graphql/__generated__/graphql-api';

export interface ITemplateFormField {
  type: FormFieldType;
  name: string;
  placeholder?: string;
  label?: string;
  value?: string;
}

export class TemplateFormField implements Model<ITemplateFormField> {
  public id: string;
  public type: FormFieldType;
  public name: string;
  public placeholder?: string;
  public label?: string;
  public value?: string;
  static fragments = () => gql`
    fragment TemplateFormFieldFragment on TemplateFormField {
      id
      name
      placeholder
      label
      value
      type
    }
  `;

  constructor({
    id,
    type,
    name,
    placeholder = '',
    label = '',
    value = '',
  }: Model<ITemplateFormField>) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.placeholder = placeholder;
    this.label = label;
    this.value = value;
  }

  static mapTemplateFormFields(
    formFields: Model<ITemplateFormField>[] = [],
  ): Model<ITemplateFormField>[] {
    return formFields.map(
      (formField: Model<ITemplateFormField>) =>
        new TemplateFormField(formField),
    );
  }
}
