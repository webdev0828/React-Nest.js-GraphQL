import { TabPane, Tabs, useModal } from '@codelab/component';
import { ModalIDs } from '@codelab/system';
import { Dropdown, Icon, Menu } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { Mutation } from 'react-apollo';
import { default as FA } from 'src/components/Icon';
import { Page } from 'src/components/Page/Page';
import { GET_PAGE } from 'src/components/Page/Page--queries';
import PageListSettings from 'src/components/Page/Page-list--settings';
import PageModalCreate from 'src/components/Page/Page-modal--create';
import PageModalUpdate from 'src/components/Page/Page-modal--update';
import TabController from 'src/components/Sidebar/Tab-controller/Tab-controller';
import TabModel from 'src/components/Sidebar/Tab-model/Tab-model';
import TabView from 'src/components/Sidebar/Tab-view/Tab-view';
import { MY_APP_QUERY } from 'src/components/User/User--queries';
import { Models } from 'src/graphql/modelTypes';
import { IRouterPage } from 'src/route/Router';
import { Link } from 'src/route/routes';
import {
  GET_SIDEBAR,
  SET_SIDEBAR_TAB,
  SidebarPrimaryTab,
} from 'src/state/apollo-local-state/sidebar/sidebarState';
import Query from 'src/utils/Query';

const menu = (username, app, openModal) => (
  <Query<{ pages: Page[] }>
    displayName={Models.Pages}
    query={MY_APP_QUERY()}
    variables={{ where: { slug: app } }}
  >
    {({ data }) => {
      const pages = data!.pages;
      return (
        <Menu>
          {pages.map((page, index) => {
            const slug = page.slug;
            return (
              <Menu.Item key={index}>
                <Link
                  route="user.app.page"
                  params={{
                    app,
                    page: slug,
                    username: username.toLowerCase(),
                  }}
                >
                  <span>{page.title}</span>
                </Link>
                <PageListSettings page={page} />
              </Menu.Item>
            );
          })}
          <Menu.Item onClick={openModal()}>
            <span>Add Page</span>
          </Menu.Item>
        </Menu>
      );
    }}
  </Query>
);

const PageDropdown = () => {
  const { query } = useRouter<IRouterPage>();
  const { openModal } = useModal(ModalIDs.PageCreate);
  const username = query!.username;
  const appSlug = query!.app;
  return (
    <Query<{ page: Page }>
      displayName={Models.Page}
      query={GET_PAGE()}
      variables={{ where: { slug: query!.page ? query!.page : 'HOME' } }}
    >
      {({ data }) => {
        const page = data!.page;
        const title = page ? `(${page.title})` : '';

        return (
          <Dropdown
            overlay={menu(username, appSlug, openModal)}
            trigger={['click']}
          >
            <a className="ant-dropdown-link" href="#">
              <span>View{title}</span>
              <Icon type="down" />
            </a>
          </Dropdown>
        );
      }}
    </Query>
  );
};

const SidebarPageBuilder = () => {
  return (
    <Query query={GET_SIDEBAR}>
      {({ data: { sidebar } }) => {
        return (
          <Mutation mutation={SET_SIDEBAR_TAB}>
            {setSidebarTab => (
              <Tabs
                defaultActiveKey={SidebarPrimaryTab.View}
                style={{ height: '100%' }}
                onChange={primaryTab => {
                  setSidebarTab({
                    variables: {
                      sidebar: {
                        currentPrimaryTab: primaryTab,
                        currentSecondaryTab: '',
                      },
                    },
                  });
                }}
                activeKey={sidebar.currentPrimaryTab}
              >
                <TabPane
                  tab={
                    <span>
                      <FA icon="database" />
                      <span>Model</span>
                    </span>
                  }
                  key={SidebarPrimaryTab.Model}
                >
                  <TabModel />
                </TabPane>
                <TabPane
                  tab={
                    <span>
                      <FA icon="cube" />
                      <PageDropdown />
                      <PageModalCreate />
                      <PageModalUpdate />
                    </span>
                  }
                  key={SidebarPrimaryTab.View}
                >
                  <TabView />
                </TabPane>
                <TabPane
                  tab={
                    <span>
                      <FA icon="cogs" />
                      <span>Controller</span>
                    </span>
                  }
                  key={SidebarPrimaryTab.Controller}
                >
                  <TabController />
                </TabPane>
              </Tabs>
            )}
          </Mutation>
        );
      }}
    </Query>
  );
};

export default SidebarPageBuilder;
