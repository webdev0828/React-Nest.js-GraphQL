import { INPUT_TYPES } from '@codelab/component';
import { Screen } from '@codelab/layout';
import gql from 'graphql-tag';
import React from 'react';
import { Model } from 'src/components/BuilderComponents/interfaces';
import { GET_PAGE } from 'src/components/Page/Page--queries';
import { MutationUpdateConfigGridArgs } from 'src/graphql/__generated__/graphql-api';

export interface IConfigGrid {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  screenSize: string;
  breakpoint: string;
  columns: number;
}

export class ConfigGrid implements Model<IConfigGrid> {
  public id: string;
  public screenSize: string;
  public breakpoint: string;
  public x: number;
  public y: number;
  public w: number;
  public h: number;
  public columns: number;

  static fragments = () => gql`
    fragment ConfigGridFragment on ConfigGrid {
      id
      screenSize
      breakpoint
      columns
      x
      y
      w
      h
    }
  `;

  constructor({ id, screenSize, x, y, h, w }: Model<IConfigGrid>) {
    this.id = id;
    this.screenSize = screenSize;
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
  }

  public updateConfig({ query, values, mutate }): Promise<any> {
    const variables: MutationUpdateConfigGridArgs = {
      data: {
        breakpoint: String(values.breakpoint).toUpperCase(),
        columns: values.columns,
        x: values.x,
        y: values.y,
        w: values.w,
        h: values.h,
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
            variables: { where: { slug: query!.page } },
          },
        ],
      });
      resolve('Success');
    });
  }

  public getUpdateFormFieldsForConfigGrid() {
    const breakpointOptions: any[] = [];
    const widths = Screen.Width.Base;

    console.log(this);

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
      {
        inputType: INPUT_TYPES.Slider,
        name: 'columns',
        min: 1,
        max: 12,
        included: false,
        value: this.columns,
        step: 1,
      },
      {
        inputType: INPUT_TYPES.Number,
        label: 'X',
        name: 'x',
        value: this.x,
        min: 0,
        max: 12,
      },
      {
        inputType: INPUT_TYPES.Number,
        label: 'Y',
        name: 'y',
        value: this.y,
        min: 0,
        max: 12,
      },
      {
        inputType: INPUT_TYPES.Number,
        label: 'W',
        name: 'w',
        value: this.w,
        min: 0,
        max: 12,
      },
      {
        inputType: INPUT_TYPES.Number,
        label: 'H',
        name: 'h',
        value: this.h,
        min: 0,
        max: 12,
      },
    ];
  }

  static mapConfigGrids(
    configGrids: Model<IConfigGrid>[] = [],
  ): Model<IConfigGrid>[] {
    return configGrids.map(
      (config: Model<IConfigGrid>) => new ConfigGrid(config),
    );
  }
}

export default ConfigGrid;
