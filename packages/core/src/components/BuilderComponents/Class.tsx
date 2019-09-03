import { ISelectOption } from '@codelab/component/src/components/Input/Input--select';
import gql from 'graphql-tag';

import { GET_CSS_CLASSES } from 'src/components/BuilderComponents/Component-queries';
import {
  IClass,
  ICSSInstance,
  Model,
} from 'src/components/BuilderComponents/interfaces';
import { CSSInstance } from 'src/components/BuilderComponents/Variant/CSSInstance';
import {
  CssInstanceCreateWithoutClassesInput,
  MutationCreateCssClassArgs,
} from 'src/graphql/__generated__/graphql-api';

export class Class implements Model<IClass> {
  public id: string;
  public css: Model<ICSSInstance>[];
  public name: string;
  static fragments = () => gql`
    fragment ClassFragment on CssClass {
      id
      name
      css {
        ...CssInstanceFragment
      }
    }
    ${CSSInstance.fragments()}
  `;

  constructor({ id, css = [], name }: Model<IClass>) {
    this.id = id;
    this.name = name;
    this.css = CSSInstance.mapCssInstances(css);
  }

  static mapClasses(classes: Model<IClass>[] = []): Model<IClass>[] {
    return classes.map((cls: Model<IClass>) => new Class(cls));
  }

  public static getOptions(classes: Model<IClass>[]): ISelectOption[] {
    return classes.map((cls: Model<IClass>) => ({
      label: cls.name,
      value: cls.id,
    }));
  }

  static createClass(values, { mutate }): Promise<any> {
    const cssIntances: CssInstanceCreateWithoutClassesInput[] = values.cssTemplates.map(
      template => ({
        option: { connect: { id: template.cssOption } },
        property: { connect: { id: template.cssProperty } },
      }),
    );

    const variables: MutationCreateCssClassArgs = {
      data: {
        name: values.className,
        css: { create: cssIntances },
      },
    };

    return new Promise(resolve => {
      mutate({
        variables,
        refetchQueries: [
          {
            query: GET_CSS_CLASSES,
          },
        ],
      });
      resolve('Success');
    });
  }
}
