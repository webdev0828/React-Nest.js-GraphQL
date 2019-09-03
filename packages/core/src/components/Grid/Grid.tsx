import { IFormField, INPUT_TYPES } from '@codelab/component';
import { Screen } from '@codelab/layout';
import gql from 'graphql-tag';
import _, { find } from 'lodash';
import React from 'react';
import BuilderIconSettings from 'src/components/Builder/Builder-icon--settings';
import ConfigGrid, {
  IConfigGrid,
} from 'src/components/BuilderComponents/Config/ConfigGrid';
import { Model } from 'src/components/BuilderComponents/interfaces';
import Element, { IElement } from 'src/components/Element/Element';
import { GET_PAGE } from 'src/components/Page/Page--queries';
import {
  ConfigGridCreateWithoutGridInput,
  ConfigGridUpdateWithWhereUniqueWithoutGridInput,
  MutationCreateGridArgs,
  MutationDeleteGridArgs,
  MutationUpdateGridArgs,
  Status,
} from 'src/graphql/__generated__/graphql-api';

export interface IGrid {
  id: string;
  index: number;
  name: string;
  config: Model<IConfigGrid>[];
  elements: Model<IElement>[];
  __typename: string;
}

export class Grid implements Model<IGrid> {
  public id: string;
  public name: string;
  public index: number;
  public config: Model<IConfigGrid>[];
  public elements: Model<IElement>[];
  // tslint:disable-next-line: variable-name
  public __typename: string;

  static fragments = () => gql`
    fragment GridFragment on Grid {
      id
      index
      name
      __typename
      grids
      elements(orderBy: index_ASC) {
        ...ElementFragment
      }
      config {
        ...ConfigGridFragment
      }
    }
    ${Element.fragments()}
    ${ConfigGrid.fragments()}
  `;

  constructor({ id, index, name, config, elements, __typename }: Model<IGrid>) {
    this.id = id;
    this.index = index;
    this.name = name;
    this.__typename = __typename;
    this.config = ConfigGrid.mapConfigGrids(config);
    this.elements = Element.mapElements(elements);
  }

  static pluckGridWithId({ id, grids }) {
    return find(grids, {
      id,
    });
  }

  static createGrid({ containerId, pageSlug, values, mutate }): Promise<any> {
    const configs: ConfigGridCreateWithoutGridInput[] = Object.keys(
      Screen.Size,
    ).map(size => ({
      status: Status.Published,
      screenSize: Screen.Size[size],
      x: values[`x_${size}`],
      y: values[`y_${size}`],
      w: values[`w_${size}`],
      h: values[`h_${size}`],
    }));

    const variables: MutationCreateGridArgs = {
      data: {
        status: Status.Published,
        index: parseInt(values.index, 10),
        name: values.name,
        container: {
          connect: {
            id: containerId,
          },
        },
        config: {
          create: configs,
        },
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

  public getConfigByScreenSize(screenSize: string = ''): ConfigGrid {
    const config: any = find(this.config, {
      screenSize: screenSize.toUpperCase(),
    });
    return new ConfigGrid(config);
  }

  public updateGrid({ values, mutate, containerID, pageSlug }): Promise<any> {
    const configs = this.config;
    const updateConfigs: ConfigGridUpdateWithWhereUniqueWithoutGridInput[] = configs.map(
      config => {
        return {
          data: {
            x: values[`x_${config.screenSize}`],
            y: values[`y_${config.screenSize}`],
            w: values[`w_${config.screenSize}`],
            h: values[`h_${config.screenSize}`],
          },
          where: {
            id: config.id,
          },
        };
      },
    );

    const variables: MutationUpdateGridArgs = {
      data: {
        config: {
          update: updateConfigs,
        },
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

  static getCreateFormFields() {
    const fields: IFormField[] = [
      {
        inputType: INPUT_TYPES.Text,
        name: 'index',
        label: 'Index',
        value: '0',
        placeholder: 'Input Grid Index',
        validation: [{ required: true, msg: 'Required!!' }],
      },
      {
        inputType: INPUT_TYPES.Text,
        label: 'Name',
        name: 'name',
        placeholder: 'Inpute Grid Name',
        validation: [{ required: true, msg: 'Required!!' }],
      },
    ];

    Object.keys(Screen.Size).map((size, index) => {
      const xField: IFormField = {
        inputType: INPUT_TYPES.Number,
        label: `${size}-X`,
        name: `x_${size}`,
        value: index + 3,
        min: 0,
        max: 12,
        key: `tab-${size}`,
      };

      const yField: IFormField = {
        inputType: INPUT_TYPES.Number,
        label: `${size}-Y`,
        name: `y_${size}`,
        value: index + 3,
        min: 0,
        max: 12,
        key: `tab-${size}`,
      };

      const wField: IFormField = {
        inputType: INPUT_TYPES.Number,
        label: `${size}-W`,
        name: `w_${size}`,
        value: index + 3,
        min: 0,
        max: 12,
        key: `tab-${size}`,
      };

      const hField: IFormField = {
        inputType: INPUT_TYPES.Number,
        label: `${size}-H`,
        name: `h_${size}`,
        value: index + 3,
        min: 0,
        max: 12,
        key: `tab-${size}`,
      };

      fields.push(xField);
      fields.push(yField);
      fields.push(wField);
      fields.push(hField);
    });

    return fields;
  }

  public getUpdateFormFields() {
    const fields: IFormField[] = [];
    const configs = this.config;
    configs.map(config => {
      const xField: IFormField = {
        inputType: INPUT_TYPES.Number,
        label: `${config.screenSize}-X`,
        name: `x_${config.screenSize}`,
        value: config.x,
        min: 0,
        max: 12,
        key: `tab-${config.screenSize}`,
      };

      const yField: IFormField = {
        inputType: INPUT_TYPES.Number,
        label: `${config.screenSize}-Y`,
        name: `y_${config.screenSize}`,
        value: config.y,
        min: 0,
        max: 12,
        key: `tab-${config.screenSize}`,
      };

      const wField: IFormField = {
        inputType: INPUT_TYPES.Number,
        label: `${config.screenSize}-W`,
        name: `w_${config.screenSize}`,
        value: config.w,
        min: 0,
        max: 12,
        key: `tab-${config.screenSize}`,
      };

      const hField: IFormField = {
        inputType: INPUT_TYPES.Number,
        label: `${config.screenSize}-H`,
        name: `h_${config.screenSize}`,
        value: config.h,
        min: 0,
        max: 12,
        key: `tab-${config.screenSize}`,
      };

      fields.push(xField);
      fields.push(yField);
      fields.push(wField);
      fields.push(hField);
    });

    return fields;
  }

  static mapGrids(grids: Model<IGrid>[] = []): Model<IGrid>[] {
    return grids.map((grid: Model<IGrid>) => new Grid(grid));
  }

  public mapping() {
    return this.config.map(({ id, x, y, h, w, screenSize }: IConfigGrid) => {
      return {
        x,
        y,
        h,
        w,
        screenSize: screenSize.toLowerCase(),
        i: this.id,
        configId: id,
      };
    });
  }

  public delete(slug, mutate) {
    const variables: MutationDeleteGridArgs = {
      where: {
        id: this.id,
      },
    };

    mutate({
      variables,
      refetchQueries: [
        {
          query: GET_PAGE(),
          variables: { where: { slug } },
        },
      ],
    });
  }

  public static generateLayout(grids: Model<IGrid>[] = []) {
    return _(grids)
      .map((grid: Grid) => grid.mapping())
      .flatten()
      .groupBy('screenSize')
      .value();
  }

  public static render: React.FC<any> = ({
    id,
    children,
    elements,
    element,
    type,
    order,
    name,
    style,
    ...otherProps
  }) => {
    return (
      <>
        <BuilderIconSettings element={element} />
        {/*Type: {type} <br />*/}
        {/*Order: {order} <br />*/}
        {/*Name: {name}*/}
        {children && children({ elements })}
      </>
    );
  };
}
