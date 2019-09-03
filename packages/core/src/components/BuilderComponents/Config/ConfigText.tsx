import { INPUT_TYPES } from '@codelab/component';
import gql from 'graphql-tag';
import { Model } from 'src/components/BuilderComponents/interfaces';
import { GET_PAGE } from 'src/components/Page/Page--queries';
import { MutationUpdateConfigTextArgs } from 'src/graphql/__generated__/graphql-api';

export interface IConfigText {
  text: string;
}

export class ConfigText implements Model<IConfigText> {
  public id: string;
  public text: string;
  static fragments = () => gql`
    fragment ConfigTextFragment on ConfigText {
      id
      text
    }
  `;

  constructor({ id, text }: Model<IConfigText>) {
    this.id = id;
    this.text = text;
  }

  public updateText({ pageSlug, values, mutate }): Promise<any> {
    const variables: MutationUpdateConfigTextArgs = {
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

  static mapConfigTexts(configs: Model<IConfigText>[]): Model<IConfigText>[] {
    return configs.map((config: Model<IConfigText>) => new ConfigText(config));
  }
}
