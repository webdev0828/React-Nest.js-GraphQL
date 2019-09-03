import { INPUT_TYPES } from '@codelab/component';
import gql from 'graphql-tag';
import { Model } from 'src/components/BuilderComponents/interfaces';
import { GET_PAGE } from 'src/components/Page/Page--queries';
import {
  IconType,
  MutationUpdateConfigIconArgs,
} from 'src/graphql/__generated__/graphql-api';

export interface IConfigIcon {
  type: IconType;
}

export class ConfigIcon implements Model<IConfigIcon> {
  public id: string;
  public type: IconType;
  static fragments = () => gql`
    fragment ConfigIconFragment on ConfigIcon {
      id
      type
    }
  `;

  constructor({ id, type }: Model<IConfigIcon>) {
    this.id = id;
    this.type = type;
  }

  public getEditFormFields() {
    const iconTypeOptions = Object.keys(IconType).map(type => ({
      label: type,
      value: type,
    }));
    return [
      {
        inputType: INPUT_TYPES.Select,
        name: 'type',
        options: iconTypeOptions,
        value: this.type,
        validation: [{ required: true, msg: 'Required!!' }],
      },
    ];
  }

  public updateIcon({ pageSlug, values, mutate }): Promise<any> {
    const variables: MutationUpdateConfigIconArgs = {
      data: {
        type: values.type,
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

  static mapConfigIcons(configs: Model<IConfigIcon>[]): Model<IConfigIcon>[] {
    return configs.map((config: Model<IConfigIcon>) => new ConfigIcon(config));
  }
}
