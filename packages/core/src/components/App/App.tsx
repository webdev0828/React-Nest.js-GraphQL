import { INPUT_TYPES } from '@codelab/component';
import { Screen } from '@codelab/layout';
import gql from 'graphql-tag';
import slugify from 'slugify';
import { Global, IGlobal } from 'src/components/BuilderComponents/Global';
import { Model } from 'src/components/BuilderComponents/interfaces';
import { IPage, Page } from 'src/components/Page/Page';
import { USER_APPS_QUERY } from 'src/components/User/User--queries';
import {
  ConfigGlobalLayoutCreateWithoutGlobalInput,
  GlobalCreateWithoutAppInput,
  MutationCreateAppArgs,
  MutationDeleteAppArgs,
  MutationUpdateAppArgs,
  Status,
} from 'src/graphql/__generated__/graphql-api';

interface ICRUD {
  create: (username, { mutate }) => void;
  update: (username, { mutate }) => void;
  delete: (username, { mutate }) => void;
}

export interface IApp {
  name: string;
  slug?: string;
  pages: Model<IPage>[];
  global?: Model<IGlobal>;
}

export class App implements Model<IApp>, ICRUD {
  id: string;
  name: string;
  pages: Model<IPage>[];
  global?: Model<IGlobal>;

  static fragments = () => gql`
    fragment AppFragment on App {
      id
      name
      pages {
        ...PageFragment
      }
    }
    ${Page.fragments()}
  `;

  constructor({ id, name, pages, global }: Model<IApp>) {
    this.id = id;
    this.name = name;
    this.pages = Page.mapPages(pages);
    if (global) {
      this.global = new Global(global);
    }
  }

  public create(username, { mutate }): Promise<any> {
    const layout: ConfigGlobalLayoutCreateWithoutGlobalInput[] = Object.keys(
      Screen.Size,
    ).map(size => ({
      status: Status.Published,
      screenSize: Screen.Size[size],
      breakpoint: Screen.Width.Base[size],
    }));

    const global: GlobalCreateWithoutAppInput = {
      status: Status.Published,
      layout: {
        create: layout,
      },
    };

    const variables: MutationCreateAppArgs = {
      data: {
        status: Status.Published,
        userId: username,
        name: this.name,
        slug: this.slug,
        global: {
          create: global,
        },
      },
    };

    const refetchVariables = {
      where: {
        username,
      },
    };
    return new Promise(resolve => {
      mutate({
        variables,
        refetchQueries: [
          {
            query: USER_APPS_QUERY(),
            variables: refetchVariables,
          },
        ],
      });
      resolve();
    });
  }

  public update(username, { mutate }): Promise<any> {
    const variables: MutationUpdateAppArgs = {
      where: {
        id: this.id,
      },
      data: {
        slug: this.slug,
        name: this.name,
      },
    };

    return new Promise(resolve => {
      mutate({
        variables,
      });
      resolve();
    });
  }

  public delete(username, mutate) {
    const variables: MutationDeleteAppArgs = {
      where: {
        id: this.id,
      },
    };

    const refetchVariables = {
      where: {
        username,
      },
    };

    mutate({
      variables,
      refetchQueries: [
        {
          query: USER_APPS_QUERY(),
          variables: refetchVariables,
        },
      ],
    });
  }

  static getCreateAppFormFields() {
    return [
      {
        name: 'name',
        inputType: INPUT_TYPES.Text,
        value: 'My App',
        type: 'string',
        validation: [
          { required: true, msg: 'Required!!' },
          { min: 2, msg: 'Too Short!' },
          { max: 30, msg: 'Too Long!' },
        ],
      },
    ];
  }

  static mapApps(apps: Model<IApp>[] = []) {
    return apps ? apps.map((app: Model<IApp>) => new App(app)) : [];
  }

  get slug() {
    return slugify(this.name, {
      replacement: '-',
      lower: true,
    });
  }
}
