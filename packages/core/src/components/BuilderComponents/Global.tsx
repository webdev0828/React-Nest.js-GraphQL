import { INPUT_TYPES } from '@codelab/component';
import { Screen } from '@codelab/layout';
import {
  ConfigGlobalLayout,
  IConfigGlobalLayout,
} from 'src/components/BuilderComponents/Config/ConfigGlobalLayout';
import { Model } from 'src/components/BuilderComponents/interfaces';
import { GET_PAGE } from 'src/components/Page/Page--queries';
import {
  ConfigGlobalLayoutCreateWithoutGlobalInput,
  MutationCreateGlobalArgs,
  ScreenSize,
  Status,
} from 'src/graphql/__generated__/graphql-api';

export interface IGlobal {
  id: string;
  layout: Model<IConfigGlobalLayout>[];
}

export class Global implements Model<IGlobal> {
  public id: string;
  public layout: Model<IConfigGlobalLayout>[];

  constructor({ id, layout }: Model<IGlobal>) {
    this.id = id;
    this.layout = ConfigGlobalLayout.mapConfigGlobalLayouts(layout);
  }

  static createGlobal({ query, values, mutate }): Promise<any> {
    const layout: ConfigGlobalLayoutCreateWithoutGlobalInput[] = Object.keys(
      ScreenSize,
    ).map((size: ScreenSize) => ({
      status: Status.Published,
      screenSize: size,
      breakpoint: parseInt(values[`breakpoint_${size}`], 10),
    }));

    const variables: MutationCreateGlobalArgs = {
      data: {
        status: Status.Published,
        app: {
          connect: { slug: query!.app },
        },
        layout: {
          create: layout,
        },
      },
    };

    return new Promise(resolve => {
      mutate({
        variables,
        refetchQueries: [
          {
            query: GET_PAGE(),
            variables: { where: { slug: query!.page } },
          },
        ],
      });
      resolve('Success');
    });
  }

  static getCreateFormFields() {
    const widths = Screen.Width.Base;
    const breakpointOptions: any[] = [];

    Object.keys(widths).map(width => {
      const isValueProperty = parseInt(width, 10) >= 0;
      if (isValueProperty) {
        const option = {
          label: `${width}px`,
          value: width,
        };
        breakpointOptions.push(option);
      }
    });

    return Object.keys(ScreenSize).map(size => ({
      inputType: INPUT_TYPES.Select,
      label: `${size}-BP`,
      name: `breakpoint_${size}`,
      value: `${widths[size]}`,
      options: breakpointOptions,
    }));
  }

  static mapGlobals(globals: Model<IGlobal>[] = []): Model<IGlobal>[] {
    return globals.map((global: Model<IGlobal>) => new Global(global));
  }
}
