import { INPUT_TYPES } from '@codelab/component';
import { Screen } from '@codelab/layout';
import { APPS_QUERY } from 'src/components/App/App--queries';
import { Model } from 'src/components/BuilderComponents/interfaces';
import { MutationUpdateConfigGlobalLayoutArgs } from 'src/graphql/__generated__/graphql-api';

export interface IConfigGlobalLayout {
  screenSize: string;
  breakpoint: string;
}

export class ConfigGlobalLayout implements Model<IConfigGlobalLayout> {
  public id: string;
  public screenSize: string;
  public breakpoint: string;

  constructor({ id, screenSize, breakpoint }: Model<IConfigGlobalLayout>) {
    this.id = id;
    this.screenSize = screenSize;
    this.breakpoint = breakpoint;
  }

  public updateConfig({ app, values, mutate }): Promise<any> {
    const variables: MutationUpdateConfigGlobalLayoutArgs = {
      data: {
        breakpoint: parseInt(values.breakpoint, 10),
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
            query: APPS_QUERY,
            variables: { where: { slug: app } },
          },
        ],
      });
      resolve('Success');
    });
  }

  public getUpdateFormFieldsForConfigGrid() {
    const breakpointOptions: any[] = [];
    const widths = Screen.Width.Base;

    for (const width in widths) {
      const isValueProperty = parseInt(width, 10) >= 0;
      if (isValueProperty) {
        const option = {
          label: `${width}px`,
          value: width,
        };
        breakpointOptions.push(option);
      }
    }

    return [
      {
        inputType: INPUT_TYPES.Select,
        name: 'breakpoint',
        value: this.breakpoint,
        options: breakpointOptions,
      },
    ];
  }

  static mapConfigGlobalLayouts(
    configGrids: Model<IConfigGlobalLayout>[] = [],
  ): Model<IConfigGlobalLayout>[] {
    return configGrids.map(
      (config: Model<IConfigGlobalLayout>) => new ConfigGlobalLayout(config),
    );
  }
}

export default ConfigGlobalLayout;
