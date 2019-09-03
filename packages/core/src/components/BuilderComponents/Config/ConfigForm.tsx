import { IFormField, INPUT_TYPES } from '@codelab/component';
import gql from 'graphql-tag';
import { Model } from 'src/components/BuilderComponents/interfaces';
import {
  ITemplateFormField,
  TemplateFormField,
} from 'src/components/BuilderComponents/TemplateFormField';
import { GET_PAGE } from 'src/components/Page/Page--queries';
import {
  FormFieldType,
  MutationUpdateConfigFormArgs,
} from 'src/graphql/__generated__/graphql-api';

export interface IConfigForm {
  name: string;
  fields: Model<ITemplateFormField>[];
}

export class ConfigForm implements Model<IConfigForm> {
  public id: string;
  public name: string;
  public fields: Model<ITemplateFormField>[];
  static fragments = () => gql`
    fragment ConfigFormFragment on ConfigForm {
      id
      name
      fields {
        ...TemplateFormFieldFragment
      }
    }
    ${TemplateFormField.fragments()}
  `;

  constructor({ id, name, fields }: Model<IConfigForm>) {
    this.id = id;
    this.name = name;
    this.fields = TemplateFormField.mapTemplateFormFields(fields);
  }

  public getEditFormFields() {
    const formTypeOptions = Object.keys(FormFieldType).map(type => ({
      label: type,
      value: type,
    }));

    const configFormFields: IFormField[] = [
      {
        inputType: INPUT_TYPES.Text,
        name: 'name',
        value: this.name,
        validation: [{ required: true, msg: 'Required!!' }],
      },
    ];

    // this.fields.map(field => {
    //   const templateField = [
    //     {
    //       inputType: INPUT_TYPES.Select,
    //       fieldArray: {
    //         name: 'FormField',
    //       },
    //       name: 'type',
    //       value: field.type,
    //       options: formTypeOptions,
    //     },
    //     {
    //       inputType: INPUT_TYPES.Text,
    //       fieldArray: {
    //         name: 'FormField',
    //       },
    //       name: 'fieldname',
    //       value: field.name,
    //       placeholder: 'Input Form Field Name',
    //     },
    //     {
    //       inputType: INPUT_TYPES.Text,
    //       fieldArray: {
    //         name: 'FormField',
    //       },
    //       name: 'placeholder',
    //       value: field.placeholder,
    //       placeholder: 'Input Form Field PlaceHolder',
    //     },
    //     {
    //       inputType: INPUT_TYPES.Text,
    //       fieldArray: {
    //         name: 'FormField',
    //       },
    //       name: 'label',
    //       value: field.label,
    //       placeholder: 'Input Form Field Label',
    //     },
    //     {
    //       inputType: INPUT_TYPES.Text,
    //       fieldArray: {
    //         name: 'FormField',
    //       },
    //       name: 'value',
    //       value: field.value,
    //       placeholder: 'Input Form Field Value',
    //     },
    //   ];
    //   configFormFields = [...configFormFields, ...templateField];
    // });

    return configFormFields;
  }

  public updateForm({ pageSlug, values, mutate }): Promise<any> {
    const variables: MutationUpdateConfigFormArgs = {
      data: {
        name: values.name,
      },
      where: {
        id: this.id,
      },
    };

    return new Promise(resolve => {
      mutate({
        variables,
        refetchQueries: [
          {
            query: GET_PAGE(),
            variables: { where: { slug: pageSlug } },
          },
        ],
      });
      resolve('Success');
    });
  }

  static mapConfigForms(configs: Model<IConfigForm>[]): Model<IConfigForm>[] {
    return configs.map((config: Model<IConfigForm>) => new ConfigForm(config));
  }
}
