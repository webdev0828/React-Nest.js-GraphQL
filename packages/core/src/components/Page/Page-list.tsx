import { Card } from 'antd';
import { withRouter } from 'next/router';
import React from 'react';
import { Page } from 'src/components/Page/Page';
import { MY_APP_QUERY } from 'src/components/User/User--queries';
import { Models } from 'src/graphql/modelTypes';
import Query from 'src/utils/Query';

const PageList = ({ router }) => {
  const {
    query: { username, app },
  } = router;
  return (
    <Query<{ pages: Page[] }>
      displayName={Models.Pages}
      query={MY_APP_QUERY()}
      variables={{ where: { slug: app } }}
    >
      {({ data }) => {
        const pages = data!.pages;
        return pages.map((page, idx) => {
          return (
            <Card key={idx}>
              <h2>{page.title}</h2>
            </Card>
          );
        });
      }}
    </Query>
  );
};

export default withRouter(PageList);
