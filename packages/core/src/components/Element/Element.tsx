import { INPUT_TYPES } from '@codelab/component';
import gql from 'graphql-tag';
import React from 'react';
import BuilderIconSettings from 'src/components/Builder/Builder-icon--settings';
import Component from 'src/components/BuilderComponents/Component';
import {
  IComponent,
  IVariantInstance,
  Model,
} from 'src/components/BuilderComponents/interfaces';
import { VariantInstance } from 'src/components/BuilderComponents/Variant/VariantInstance';
import {
  ConfigComponent,
  IConfigComponent,
} from 'src/components/Element/ConfigComponent/ConfigComponent';
import ElementItem from 'src/components/Element/Element-item';
import { IGrid } from 'src/components/Grid/Grid';
import { GET_PAGE } from 'src/components/Page/Page--queries';
import {
  ComponentType,
  ConfigComponentCreateWithoutElementInput,
  MutationCreateElementArgs,
  MutationDeleteElementArgs,
  Status,
  TemplateFormFieldCreateWithoutConfigFormInput,
} from 'src/graphql/__generated__/graphql-api';

export interface IElement {
  index: number;
  // grid: Model<IGrid>;
  variantInstances?: Model<IVariantInstance>[];
  // type: string;
  component?: Model<IComponent>;
  __typename: string;
  config: Model<IConfigComponent>;
  // render: () => ReactElement;
  // [propName: string]: any;
}

/**
 * Create type that merges Entity logic with DB fields.
 */

export class Element implements Model<IElement> {
  grid: Model<IGrid>;
  id: string;
  index: number;
  variantInstances: Model<IVariantInstance>[];
  component: Model<IComponent>;
  config: Model<IConfigComponent>;
  // tslint:disable-next-line: variable-name
  __typename: string;

  static fragments = () => gql`
    fragment ElementFragment on Element {
      id
      index
      component {
        ...ComponentFragment
      }
      config {
        ...ConfigComponentFragment
      }
    }
    ${Component.fragments()}
    ${ConfigComponent.fragments()}
  `;

  constructor({
    // grid,
    id,
    index,
    variantInstances,
    component,
    __typename,
    config,
  }: Model<IElement>) {
    // this.grid = grid;
    this.id = id;
    this.index = index;
    this.__typename = __typename;
    this.component = new Component(component!);
    this.variantInstances = VariantInstance.mapVariantInstances(
      variantInstances,
    );
    if (config) this.config = new ConfigComponent(config);
  }

  static createElement({
    pageSlug,
    gridID,
    component,
    values,
    mutate,
  }): Promise<any> {
    let config: ConfigComponentCreateWithoutElementInput = {};

    switch (component.currentComponentType) {
      case ComponentType.Form:
        const fields: TemplateFormFieldCreateWithoutConfigFormInput[] = values.FormField.map(
          field => ({
            status: Status.Published,
            name: field.fieldname,
            placeholder: field.placeholder,
            label: field.label,
            value: field.value,
            type: field.type,
          }),
        );
        config = {
          status: Status.Published,
          type: component.currentComponentType,
          form: {
            create: {
              status: Status.Published,
              name: values.name,
              fields: {
                create: fields,
              },
            },
          },
        };
        break;
      case ComponentType.Button:
        config = {
          status: Status.Published,
          type: component.currentComponentType,
          button: {
            create: {
              status: Status.Published,
              type: values.type,
              size: values.size,
              ghost: values.ghost,
              block: values.block,
            },
          },
        };
        break;
      case ComponentType.Menu:
        break;
      case ComponentType.Icon:
        config = {
          status: Status.Published,
          type: component.currentComponentType,
          icon: {
            create: {
              status: Status.Published,
              type: values.type,
            },
          },
        };
        break;
      case ComponentType.Heading:
        config = {
          status: Status.Published,
          type: component.currentComponentType,
          heading: {
            create: {
              status: Status.Published,
              type: values.type,
              text: values.text,
            },
          },
        };
        break;
      case ComponentType.Paragraph:
        config = {
          status: Status.Published,
          type: component.currentComponentType,
          paragraph: {
            create: {
              status: Status.Published,
              type: values.type,
              text: values.text,
            },
          },
        };
        break;
      case ComponentType.Image:
        config = {
          status: Status.Published,
          type: component.currentComponentType,
          image: {
            create: {
              status: Status.Published,
              src: values.src,
              responsive: values.responsive,
            },
          },
        };
        break;
      case ComponentType.Link:
        config = {
          status: Status.Published,
          type: component.currentComponentType,
          link: {
            create: {
              status: Status.Published,
              href: values.href,
            },
          },
        };
        break;
      case ComponentType.Text:
        config = {
          status: Status.Published,
          type: component.currentComponentType,
          text: {
            create: {
              status: Status.Published,
              text: values.text,
            },
          },
        };
        break;
    }

    const variables: MutationCreateElementArgs = {
      data: {
        status: Status.Published,
        index: 1,
        component: {
          connect: {
            id: component.currentComponentID,
          },
        },
        grid: {
          connect: {
            id: gridID,
          },
        },
        config: {
          create: config,
        },
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

  static getCreateFormFields(components) {
    const componentOptions = components.map(component => ({
      label: component.type,
      value: component.id,
    }));
    return [
      {
        inputType: INPUT_TYPES.RadioButton,
        name: 'component',
        value: componentOptions[0].value,
        options: componentOptions,
      },
    ];
  }

  public delete({ mutate, query }) {
    const variables: MutationDeleteElementArgs = {
      where: {
        id: this.id,
      },
    };

    mutate({
      variables,
      refetchQueries: [
        {
          query: GET_PAGE(),
          variables: { where: { slug: query!.page } },
        },
      ],
    });
  }

  static mapElements(elements: Model<IElement>[] = []): Model<IElement>[] {
    return elements.map((element: Model<IElement>) => new Element(element));
  }

  static render: React.FC<any> = ({ element, id }) => {
    return (
      <div style={{ position: 'relative' }}>
        <BuilderIconSettings element={element} />
        <ElementItem key={id} element={element} />
      </div>
    );
  };
}

export default Element;
