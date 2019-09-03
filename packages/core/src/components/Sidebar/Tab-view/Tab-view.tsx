import { TabPane, Tabs } from '@codelab/component';
import { withRouter } from 'next/router';
import React from 'react';
import { Mutation } from 'react-apollo';
import Icon from 'src/components/Icon';
import TabViewComponent from 'src/components/Sidebar/Tab-view/Tab-view--component';
import TabViewPages from 'src/components/Sidebar/Tab-view/Tab-view--pages';
import Link from 'src/route/Link';
import {
  GET_SIDEBAR,
  SET_SIDEBAR_TAB,
  SidebarSecondaryTab,
} from 'src/state/apollo-local-state/sidebar/sidebarState';
import Query from 'src/utils/Query';

const TabView = ({ router }) => {
  const {
    query: { username, app },
  } = router;
  return (
    <Query query={GET_SIDEBAR}>
      {({ data: { sidebar } }) => (
        <Mutation mutation={SET_SIDEBAR_TAB}>
          {setSidebarTab => (
            <Tabs
              defaultActiveKey={SidebarSecondaryTab.Component}
              tabPosition="left"
              style={{ height: '100%' }}
              activeKey={sidebar.viewSubTab}
              onChange={secondaryTab => {
                setSidebarTab({
                  variables: {
                    sidebar: {
                      ...sidebar,
                      currentSecondaryTab: secondaryTab,
                      viewSubTab: secondaryTab,
                    },
                  },
                });
              }}
            >
              <TabPane
                tab={<Icon icon="sitemap" />}
                key={SidebarSecondaryTab.Site}
              >
                {/*<TabSiteSub />*/}
              </TabPane>
              <TabPane
                tab={<Icon icon="cubes" />}
                key={SidebarSecondaryTab.Component}
              >
                <TabViewComponent />
              </TabPane>
              <TabPane
                tab={
                  <Link
                    route="user.app.variant"
                    params={{
                      username,
                      app,
                    }}
                  >
                    <span>
                      <Icon icon="edit" />
                    </span>
                  </Link>
                }
                key={SidebarSecondaryTab.Variant}
              />
              <TabPane
                tab={<Icon icon="cubes" />}
                key={SidebarSecondaryTab.Pages}
              >
                <TabViewPages />
              </TabPane>
              <TabPane
                tab={
                  <Link
                    route="user.app.api"
                    params={{
                      username,
                      app,
                    }}
                  >
                    <span>
                      <Icon icon="edit" />
                    </span>
                  </Link>
                }
                key={SidebarSecondaryTab.Api}
              />
            </Tabs>
          )}
        </Mutation>
      )}
    </Query>
  );
};

export default withRouter(TabView);
