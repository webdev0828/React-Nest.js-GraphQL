import { INPUT_TYPES } from '@codelab/component';
import gql from 'graphql-tag';
import { Model } from 'src/components/BuilderComponents/interfaces';
import { GET_PAGE } from 'src/components/Page/Page--queries';
import {
  HeadingType,
  MutationUpdateConfigHeadingArgs,
} from 'src/graphql/__generated__/graphql-api';

export interface IConfigHeading {
  type: HeadingType;
  text: string;
}

export class ConfigHeading implements Model<IConfigHeading> {
  public id: string;
  public type: HeadingType;
  public text: string;
  static fragments = () => gql`
    fragment ConfigHeadingFragment on ConfigHeading {
      id
      type
      text
    }
  `;

  constructor({ id, type, text }: Model<IConfigHeading>) {
    this.id = id;
    this.type = type;
    this.text = text;
  }

  public getEditFormFields() {
    const headingTypeOptions = Object.keys(HeadingType).map(type => ({
      label: type,
      value: type,
    }));
    return [
      {
        inputType: INPUT_TYPES.Select,
        name: 'type',
        options: headingTypeOptions,
        value: this.type,
        validation: [{ required: true, msg: 'Required!!' }],
      },
      {
        inputType: INPUT_TYPES.Text,
        name: 'text',
        value: this.text,
        validation: [{ required: true, msg: 'Required!!' }],
      },
    ];
  }

  public updateHeading({ pageSlug, values, mutate }): Promise<any> {
    const variables: MutationUpdateConfigHeadingArgs = {
      data: {
        type: values.type,
        text: values.text,
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

  static mapConfigHeadings(
    configs: Model<IConfigHeading>[],
  ): Model<IConfigHeading>[] {
    return configs.map(
      (config: Model<IConfigHeading>) => new ConfigHeading(config),
    );
  }
}
