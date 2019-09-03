import { INPUT_TYPES } from '@codelab/component';
import styled from '@emotion/styled';
import gql from 'graphql-tag';
import React from 'react';
import slugify from 'slugify';
import { BuilderProvider } from 'src/components/Builder/Builder--context';
import { Model } from 'src/components/BuilderComponents/interfaces';
import {
  Container,
  IContainer,
} from 'src/components/BuilderComponents/Layout/Container';
import { LayoutFactory } from 'src/components/Element/LayoutFactory';
import { MY_APP_PAGES } from 'src/components/Page/Page--queries';
import {
  MutationCreatePageArgs,
  MutationDeletePageArgs,
  MutationUpdatePageArgs,
  Status,
} from 'src/graphql/__generated__/graphql-api';
import { ModelTypes } from 'src/graphql/modelTypes';

export interface IPage {
  title: string;
  slug?: string;
  containers: Model<IContainer>[];
}

const PageStyle = styled.div`
  min-height: 300px;
  position: relative;
  margin-top: 30px;
`;

export class Page implements Model<IPage> {
  containers: Model<IContainer>[];
  id: string;
  title: string;
  // tslint:disable-next-line: variable-name
  __typename: string;

  static fragments = () => gql`
    fragment PageFragment on Page {
      id
      title
      __typename
      containers(orderBy: index_ASC) {
        ...ContainerFragment
      }
    }
    ${Container.fragments()}
  `;

  constructor({
    id = '',
    title = '',
    containers = [],
    typename = '',
  }: Model<IPage>) {
    this.id = id;
    this.title = title;
    this.__typename = typename!;
    this.containers = Container.mapContainers(containers);
  }

  public createPage({ pageSlug, mutate, appSlug }): Promise<any> {
    const variables: MutationCreatePageArgs = {
      data: {
        status: Status.Published,
        title: this.title,
        slug: pageSlug,
        app: {
          connect: {
            slug: appSlug,
          },
        },
      },
    };
    return new Promise(resolve => {
      mutate({
        variables,
        refetchQueries: [
          {
            query: MY_APP_PAGES(),
            variables: { where: { slug: appSlug } },
          },
        ],
      });
      resolve('Success');
    });
  }

  public updatePage({ values, mutate, appSlug }): Promise<any> {
    const variables: MutationUpdatePageArgs = {
      data: {
        title: values.title,
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
            query: MY_APP_PAGES(),
            variables: { where: { slug: appSlug } },
          },
        ],
      });
      resolve('Success');
    });
  }

  static getCreatPageFields() {
    return [
      {
        inputType: INPUT_TYPES.Text,
        name: 'title',
        placeholder: 'Please Input Title',
        validation: [{ required: true, msg: 'Required!!' }],
      },
    ];
  }

  public getUpdatePageFields() {
    return [
      {
        inputType: INPUT_TYPES.Text,
        name: 'title',
        value: this.title,
        validation: [{ required: true, msg: 'Required' }],
      },
    ];
  }

  public delete(appSlug, mutate) {
    const variables: MutationDeletePageArgs = {
      where: {
        id: this.id,
      },
    };

    mutate({
      variables,
      refetchQueries: [
        {
          query: MY_APP_PAGES(),
          variables: { where: { slug: appSlug } },
        },
      ],
    });
  }

  static mapPages(pages: Model<IPage>[] = []) {
    return pages.map((page: Model<IPage>) => new Page(page));
  }

  get slug() {
    return slugify(this.title, {
      replacement: '-',
      lower: true,
    });
  }

  static render: React.FC<{ page: Page }> = ({ page }) => {
    const { containers } = page;
    return (
      <PageStyle>
        <BuilderProvider>
          <Elements elements={containers} />
        </BuilderProvider>
      </PageStyle>
    );
  };
}

const Elements = ({ elements }) => {
  return elements.map(element => {
    const { id, __typename, index, ...restProps } = element;
    const type = ModelTypes[__typename as string];
    return (
      <Element
        element={element}
        key={id}
        type={type}
        index={index}
        {...restProps}
      />
    );
  });
};

const Element = ({ element, index, type, ...restProps }) => {
  return (
    <LayoutFactory element={element} type={type} order={index} {...restProps}>
      {Elements}
    </LayoutFactory>
  );
};
