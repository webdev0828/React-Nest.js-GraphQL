import { INPUT_TYPES } from '@codelab/component';
import gql from 'graphql-tag';
import { Model } from 'src/components/BuilderComponents/interfaces';
import { GET_PAGE } from 'src/components/Page/Page--queries';
import { MutationUpdateConfigLinkArgs } from 'src/graphql/__generated__/graphql-api';

export interface IConfigLink {
  href: string;
}

export class ConfigLink implements Model<IConfigLink> {
  public id: string;
  public href: string;
  static fragments = () => gql`
    fragment ConfigLinkFragment on ConfigLink {
      id
      href
    }
  `;

  constructor({ id, href }: Model<IConfigLink>) {
    this.id = id;
    this.href = href;
  }

  public updateLink({ pageSlug, values, mutate }): Promise<any> {
    const variables: MutationUpdateConfigLinkArgs = {
      data: {
        href: values.href,
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
        name: 'href',
        value: this.href,
        validation: [{ required: true, msg: 'Required!!' }],
      },
    ];
  }

  static mapConfigLinks(configs: Model<IConfigLink>[]): Model<IConfigLink>[] {
    return configs.map((config: Model<IConfigLink>) => new ConfigLink(config));
  }
}
