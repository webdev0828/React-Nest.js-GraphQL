import { INPUT_TYPES } from '@codelab/component';
import styled from '@emotion/styled';
import gql from 'graphql-tag';
import { isEqual } from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';
import { withApollo, WithApolloClient } from 'react-apollo';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { useBuilder } from 'src/components/Builder/Builder--context';
import BuilderIconSettings from 'src/components/Builder/Builder-icon--settings';
import { UPDATE_CONFIG_GRID } from 'src/components/BuilderComponents/Config/Config-queries';
import {
  ConfigContainer,
  IConfigContainer,
} from 'src/components/BuilderComponents/Config/ConfigContainer';
import { Model } from 'src/components/BuilderComponents/interfaces';
import { Grid, IGrid } from 'src/components/Grid/Grid';
import { StyleGrid } from 'src/components/Grid/Grid--style';
import { Page } from 'src/components/Page/Page';
import { GET_PAGE } from 'src/components/Page/Page--queries';
import {
  MutationCreateContainerArgs,
  MutationDeleteContainerArgs,
  Status,
} from 'src/graphql/__generated__/graphql-api';
import { IRouterPage } from 'src/route/Router';

const ResponsiveGridLayout = WidthProvider(Responsive);

const ContainerStyle = styled.div<{ active: boolean }>`
  border: ${props => `2px dashed ${props.active ? 'blue' : 'black'} `};
`;
const GridBlock = styled.div`
  overflow-x: scroll;
`;

export interface IContainer {
  title: string;
  index: number;
  grids: Model<IGrid>[];
  config: Model<IConfigContainer>;
  __typename: string;
}

type ContainerRendererProps = {
  grids?: Grid[];
  children?: any;
  element?: any;
  page?: Page;
} & WithApolloClient<any>;

export class Container implements Model<IContainer> {
  id: string;
  title: string;
  index: number;
  grids: Model<IGrid>[];
  config: Model<IConfigContainer>;
  // tslint:disable-next-line:variable-name
  __typename: string;

  static fragments = () => gql`
    fragment ContainerFragment on Container {
      id
      index
      grids(orderBy: index_ASC) {
        ...GridFragment
      }
      config {
        id
        responsive
      }
    }
    ${Grid.fragments()}
  `;

  constructor(container: Model<IContainer>) {
    this.id = container.id;
    this.title = container.title;
    this.index = container.index;
    this.grids = Grid.mapGrids(container.grids);
    this.config = new ConfigContainer(container.config);
    this.__typename = container.__typename!;
  }

  static createContainer({ values, mutate }): Promise<any> {
    const { query } = useRouter<IRouterPage>();

    const variables: MutationCreateContainerArgs = {
      data: {
        status: Status.Published,
        index: parseInt(values.index, 10),
        page: {
          connect: {
            slug: query!.page,
          },
        },
        config: {
          create: {
            status: Status.Published,
            responsive: values.responsive,
          },
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
    return [
      {
        inputType: INPUT_TYPES.Text,
        name: 'index',
        value: '0',
        validation: [{ required: true, msg: 'Required!!' }],
      },
      {
        inputType: INPUT_TYPES.Checkbox,
        name: 'responsive',
        value: false,
      },
    ];
  }

  public getUpdateFormFieldsForContainer() {
    return [
      {
        inputType: INPUT_TYPES.RadioButton,
        name: 'responsive',
        value: this.config.responsive ? 2 : 1,
        options: [
          {
            label: 'Default',
            value: 1,
          },
          {
            label: 'Responsive',
            value: 2,
          },
        ],
      },
    ];
  }

  public delete({ mutate }) {
    const { query } = useRouter<IRouterPage>();

    const variables: MutationDeleteContainerArgs = {
      where: {
        id: this.id,
      },
    };

    mutate({
      variables,
      refetchQueries: [
        {
          query: GET_PAGE(),
          variables: { where: { slug: query!.page } },
        },
      ],
    });
  }

  static mapContainers(
    containers: Model<IContainer>[] = [],
  ): Model<IContainer>[] {
    return containers.map(
      (container: Model<IContainer>) => new Container(container),
    );
  }

  static activeBreakpoint: string = '';

  static render = withApollo<ContainerRendererProps>(
    ({ grids, children, element, client }: ContainerRendererProps) => {
      const layouts = Grid.generateLayout(grids);
      // Use context here
      const { setElementID, active } = useBuilder(element.id);
      const { query } = useRouter<IRouterPage>();

      // create mutual handler for dragging and resizing
      const resizeAndDragHandler = (
        layout,
        oldItem,
        newItem,
        placeholder,
        e,
        element,
      ) => {
        // No change
        if (isEqual(oldItem, newItem)) return;

        const configGrid = Grid.pluckGridWithId({
          grids,
          id: newItem.i,
        }).getConfigByScreenSize(Container.activeBreakpoint);

        configGrid.updateConfig({
          query,
          values: newItem,
          mutate: ({ variables, ...otherOptions }) =>
            client.mutate({
              variables,
              mutation: UPDATE_CONFIG_GRID,
              ...otherOptions,
            }),
        });
      };

      // to let react-grid-layout inject DraggabeCoreAPI
      const gridBlocks = children!({ elements: grids }).map(child => {
        return <StyleGrid key={child.key}>{child}</StyleGrid>;
      });

      return (
        <ContainerStyle onClick={setElementID()} active={active()}>
          <BuilderIconSettings element={element} />
          <ResponsiveGridLayout
            className="layout"
            style={{
              backgroundColor: 'pink',
            }}
            layouts={layouts as any}
            width={800}
            breakpoints={{
              lg: 1200,
              md: 996,
              sm: 768,
              xs: 480,
              xxs: 0,
            }}
            cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
            rowHeight={120}
            onDragStop={resizeAndDragHandler}
            onResizeStop={resizeAndDragHandler}
            onBreakpointChange={breakpoint => {
              Container.activeBreakpoint = breakpoint;
            }}
          >
            {gridBlocks}
          </ResponsiveGridLayout>
        </ContainerStyle>
      );
    },
  );
}
