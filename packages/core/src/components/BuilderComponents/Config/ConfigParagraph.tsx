import { INPUT_TYPES } from '@codelab/component';
import gql from 'graphql-tag';
import { Model } from 'src/components/BuilderComponents/interfaces';
import { GET_PAGE } from 'src/components/Page/Page--queries';
import { MutationUpdateConfigParagraphArgs } from 'src/graphql/__generated__/graphql-api';

export interface IConfigParagraph {
  text: string;
}

export class ConfigParagraph implements Model<IConfigParagraph> {
  public id: string;
  public text: string;
  static fragments = () => gql`
    fragment ConfigParagraphFragment on ConfigParagraph {
      id
      text
    }
  `;

  constructor({ id, text }: Model<IConfigParagraph>) {
    this.id = id;
    this.text = text;
  }

  public updateParagraph({ pageSlug, values, mutate }): Promise<any> {
    const variables: MutationUpdateConfigParagraphArgs = {
      data: {
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

  public getEditFormFields() {
    return [
      {
        inputType: INPUT_TYPES.Text,
        name: 'text',
        value: this.text,
        validation: [{ required: true, msg: 'Required!!' }],
      },
    ];
  }

  static mapConfigParagraphs(
    configs: Model<IConfigParagraph>[],
  ): Model<IConfigParagraph>[] {
    return configs.map(
      (config: Model<IConfigParagraph>) => new ConfigParagraph(config),
    );
  }
}
