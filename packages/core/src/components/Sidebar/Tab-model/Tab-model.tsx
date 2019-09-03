import { TabPane, Tabs } from '@codelab/component';
import React from 'react';
import { Mutation } from 'react-apollo';
import Icon from 'src/components/Icon';
import TabModelContent from 'src/components/Sidebar/Tab-model/Tab-model--content';
import TabModelModel from 'src/components/Sidebar/Tab-model/Tab-model--model';
import {
  GET_SIDEBAR,
  SET_SIDEBAR_TAB,
  SidebarSecondaryTab,
} from 'src/state/apollo-local-state/sidebar/sidebarState';
import Query from 'src/utils/Query';
import Link from 'src/route/Link';
import { withRouter } from 'next/router';

const TabModel = ({ router }) => {
  const {
    query: { username, app },
  } = router;
  return (
    <Query query={GET_SIDEBAR}>
      {({ data: { sidebar } }) => (
        <Mutation mutation={SET_SIDEBAR_TAB}>
          {setSidebarTab => (
            <Tabs
              defaultActiveKey={SidebarSecondaryTab.Schema}
              tabPosition="left"
              style={{ height: '100%' }}
              activeKey={sidebar.modelSubTab}
              onChange={secondaryTab => {
                setSidebarTab({
                  variables: {
                    sidebar: {
                      ...sidebar,
                      currentSecondaryTab: secondaryTab,
                      modelSubTab: secondaryTab,
                    },
                  },
                });
              }}
            >
              <TabPane
                tab={<Icon icon="cogs" />}
                key={SidebarSecondaryTab.Schema}
              >
                <TabModelModel />
              </TabPane>
              <TabPane
                tab={<Icon icon="cogs" />}
                key={SidebarSecondaryTab.Content}
              >
                <TabModelContent />
              </TabPane>
              <TabPane
                tab={
                  <Link
                    route="user.app.query"
                    params={{
                      username,
                      app,
                    }}
                  >
                    <span>
                      <Icon icon="cogs" />
                    </span>
                  </Link>
                }
                key={SidebarSecondaryTab.Query}
              />
            </Tabs>
          )}
        </Mutation>
      )}
    </Query>
  );
};

export default withRouter(TabModel);
