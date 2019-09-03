import { useRouter } from 'next/router';
import React from 'react';
import ContainerModalCreate from 'src/components/Container/Container-model--create';
import GridModalCreate from 'src/components/Grid/Grid-modal--create';
import GridModalUpdate from 'src/components/Grid/Grid-modal--update';
import { Page } from 'src/components/Page/Page';
import { GET_PAGE } from 'src/components/Page/Page--queries';
import { Models } from 'src/graphql/modelTypes';
import withPageProps from 'src/hoc/withPageProps';
import { IRouterPage } from 'src/route/Router';
import Query from 'src/utils/Query';
import ElementModalCreate from 'src/components/Element/Element-modal--create';
import ConfigComponentModalCreate from 'src/components/Element/ConfigComponent/ConfigComponent-modal--create';
import ElementModalUpdate from 'src/components/Element/Element-modal--update';

const PageWithLayout = () => {
  const { query } = useRouter<IRouterPage>();
  return (
    <Query<{ page: Page }>
      displayName={Models.Page}
      query={GET_PAGE()}
      variables={{ where: { slug: query!.page } }}
    >
      {({ data }) => {
        const page = data!.page;
        return (
          <>
            <section>
              <h2>App: {query!.app}</h2>
              <h3>Username: {query!.username}</h3>
              <h3>Page: {page.title}</h3>
              <Page.render page={page} />
              <ContainerModalCreate />
              <GridModalCreate />
              <GridModalUpdate />
              <ElementModalCreate />
              <ElementModalUpdate />
              <ConfigComponentModalCreate />
            </section>
          </>
        );
      }}
    </Query>
  );
};

export default withPageProps({ hasSidebar: true })(PageWithLayout);
