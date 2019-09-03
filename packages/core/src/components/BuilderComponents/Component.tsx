import { IFormField, INPUT_TYPES } from '@codelab/component';
import { ISelectOption } from '@codelab/component/src/components/Input/Input--select';
import gql from 'graphql-tag';
import { map } from 'lodash';
import { Class } from 'src/components/BuilderComponents/Class';
import {
  IClass,
  IComponent,
  ICSSTemplate,
  IVariantTemplate,
  Model,
} from 'src/components/BuilderComponents/interfaces';
import { CSSTemplate } from 'src/components/BuilderComponents/Variant/CSSTemplate';
import { VariantTemplate } from 'src/components/BuilderComponents/Variant/VariantTemplate';
import { ELEMENTS_GET_QUERIES } from 'src/components/Element/Element-queries--getAll';
import {
  ComponentType,
  MutationCreateElementArgs,
  Scalars,
  VariantInstanceCreateWithoutElementInput,
} from 'src/graphql/__generated__/graphql-api';

/**
 * Create type that merges Entity logic with DB fields.
 */

export class Component implements Model<IComponent> {
  public id: Scalars['ID'];
  public type: ComponentType;
  public templates: Model<IVariantTemplate>[];
  static fragments = () => gql`
    fragment ComponentFragment on Component {
      id
      type
    }
  `;

  constructor({ id, templates = [], type }: Model<IComponent>) {
    this.id = id;
    this.type = type;
    this.templates = VariantTemplate.mapTemplates(templates);
  }

  static mapComponents(
    components: Model<IComponent>[] = [],
  ): Model<IComponent>[] {
    return components.map(
      (component: Model<IComponent>) => new Component(component),
    );
  }

  static getFilterList(components: Model<IComponent>[] = []) {
    return components.map((component: Model<IComponent>) => ({
      text: component.type,
      value: component.type,
    }));
  }

  public get variantTemplateOptions(): ISelectOption[] {
    return this.templates.map((variantTemplate: Model<IVariantTemplate>) => ({
      label: variantTemplate.name,
      value: variantTemplate.id,
    }));
  }

  /**
   * Get all variant categories and their variants.
   */
  public get variantTemplateFormFields(): IFormField[] {
    return this.templates.map((template: VariantTemplate) => {
      return {
        label: template.name,
        name: template.id,
        value: template.variants[0].id, // Set default value as first
        options: template.variantOptions,
        inputType: INPUT_TYPES.RadioButton,
      };
    });
  }

  public variantFormFields(
    classes: Model<IClass>[],
    handleCreate: CallableFunction,
  ): IFormField[] {
    return [
      {
        inputType: INPUT_TYPES.Hidden,
        name: 'ComponentID',
        value: this.id,
      },
      {
        inputType: INPUT_TYPES.Text,
        name: 'name',
        placeholder: 'Variant Name',
        validation: [{ required: true }],
      },
      {
        inputType: INPUT_TYPES.Select,
        name: 'category',
        placeholder: 'Category',
        options: this.variantTemplateOptions,
        validation: [{ required: true }],
      },
      {
        inputType: INPUT_TYPES.Select,
        fieldArray: {
          name: 'cssClasses',
          buttonText: 'Add Class',
        },
        options: Class.getOptions(classes),
        name: 'class',
        placeholder: 'Select Class Name',
        isCreatable: true,
        onCreate: handleCreate,
        // type: 'Object',
      },
    ];
  }

  public static classCreateFormFields(
    cssTemplates: Model<ICSSTemplate>[] = [],
  ): IFormField[] {
    return [
      {
        inputType: INPUT_TYPES.Text,
        name: 'className',
        placeholder: 'Class Name',
        validation: [{ required: true }],
      },
      {
        inputType: INPUT_TYPES.Select,
        fieldArray: {
          name: 'cssTemplates',
          buttonText: 'Add CSS Template',
        },
        options: CSSTemplate.getCssTemplatePropertyOptions(cssTemplates),
        name: 'cssProperty',
        placeholder: 'Select CSS Property',
      },
      {
        inputType: INPUT_TYPES.Select,
        fieldArray: {
          name: 'cssTemplates',
          buttonText: 'Add CSS Template',
        },
        name: 'cssOption',
        placeholder: 'Select CSS Option',
        options: CSSTemplate.getCssTemplateOptionOptions(cssTemplates),
        // type: 'Object',
        value: 'cjtm2pqvtbat10854lwhxysoo',
        sync: 'cssProperty',
        // values: {
        //   options: _.reduce(
        //     cssTemplates,
        //     (option, cssTemplate: Model<ICSSTemplate>) => {
        //       option[cssTemplate.property.id] =
        // cssTemplate.cssTemplateOptions; return option; }, {}, ), },
      },
    ];
  }

  public createElement(values, { mutate }): Promise<any> {
    const variantInstances: VariantInstanceCreateWithoutElementInput[] = map(
      values,
      (variantID, variantTemplateID) => {
        return {
          variantTemplate: {
            connect: {
              id: variantTemplateID,
            },
          },
          variant: {
            connect: {
              id: variantID,
            },
          },
        };
      },
    );

    const variables: MutationCreateElementArgs = {
      data: {
        component: {
          connect: {
            id: this.id,
          },
        },
        variantInstances: {
          create: variantInstances,
        },
      },
    };

    return new Promise(resolve => {
      mutate({
        variables,
        refetchQueries: [
          {
            query: ELEMENTS_GET_QUERIES,
          },
        ],
      });
      resolve('Success');
    });
  }
}

export default Component;
