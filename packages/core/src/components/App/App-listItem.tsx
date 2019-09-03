import styled from '@emotion/styled';
import React from 'react';
import { AppProps, UserProps } from 'src/components/App/App-list';
import AppActions from 'src/components/App/App-listItem--actions';
import { Link, USER_APP_PAGE_ROUTE, USER_APP_ROUTE } from 'src/route/routes';

const AppItemStyle = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 100px;
  border: 1px solid #000;
  padding: 15px;
  h3 {
    text-align: center;
    i {
      float: right;
    }
    :after {
      content: '';
      clear: both;
    }
  }
`;

const AppLink = ({ app, user }) => {
  const pages = app.pages;
  const hasPage = pages.length !== 0;

  const linkProps = hasPage
    ? {
        route: USER_APP_PAGE_ROUTE,
        params: {
          app: app.slug,
          page: pages[0].slug,
          username: user.username.toLowerCase(),
        },
      }
    : {
        route: USER_APP_ROUTE,
        params: {
          app: app.slug,
          username: user.username.toLowerCase(),
        },
      };

  return (
    <Link {...linkProps}>
      <a>{app.name}</a>
    </Link>
  );
};

const AppListItem: React.FC<AppProps & UserProps> = ({ app, user }) => (
  <AppItemStyle>
    <h3>
      <AppLink app={app} user={user} />
      <AppActions app={app} user={user} />
    </h3>
  </AppItemStyle>
);

export default AppListItem;
