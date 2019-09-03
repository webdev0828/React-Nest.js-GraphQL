import { INPUT_TYPES } from '@codelab/component';
import gql from 'graphql-tag';
import { Model } from 'src/components/BuilderComponents/interfaces';
import { GET_PAGE } from 'src/components/Page/Page--queries';
import { MutationUpdateConfigImageArgs } from 'src/graphql/__generated__/graphql-api';

export interface IConfigImage {
  src: string;
  responsive: boolean;
}

export class ConfigImage implements Model<IConfigImage> {
  public id: string;
  public src: string;
  public responsive: boolean;
  static fragments = () => gql`
    fragment ConfigImageFragment on ConfigImage {
      id
      src
      responsive
    }
  `;

  constructor({ id, src, responsive }: Model<IConfigImage>) {
    this.id = id;
    this.src = src;
    this.responsive = responsive;
  }

  public updateImage({ pageSlug, values, mutate }): Promise<any> {
    const variables: MutationUpdateConfigImageArgs = {
      data: {
        src: values.src,
        responsive: values.responsive,
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
        name: 'src',
        value: this.src,
        validation: [{ required: true, msg: 'Required!!' }],
      },
      {
        inputType: INPUT_TYPES.Checkbox,
        name: 'responsive',
        value: this.responsive,
      },
    ];
  }

  static mapConfigImages(
    configs: Model<IConfigImage>[],
  ): Model<IConfigImage>[] {
    return configs.map(
      (config: Model<IConfigImage>) => new ConfigImage(config),
    );
  }
}
