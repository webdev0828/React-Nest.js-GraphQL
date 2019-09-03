import { TabPane, Tabs } from '@codelab/component';
import React from 'react';
import Icon from 'src/components/Icon';
import TabControllerWorkflow from 'src/components/Sidebar/Tab-controller/Tab-controller--workflow';
import {
  GET_SIDEBAR,
  SET_SIDEBAR_TAB,
  SidebarSecondaryTab,
} from 'src/state/apollo-local-state/sidebar/sidebarState';
import Query from 'src/utils/Query';
import { Mutation } from 'react-apollo';

const TabController = () => {
  return (
    <Query query={GET_SIDEBAR}>
      {({ data: { sidebar } }) => (
        <Mutation mutation={SET_SIDEBAR_TAB}>
          {setSidebarTab => (
            <Tabs
              defaultActiveKey={SidebarSecondaryTab.Workflow}
              tabPosition="left"
              style={{ height: '100%' }}
              activeKey={sidebar.controllerSubTab}
              onChange={secondaryTab => {
                setSidebarTab({
                  variables: {
                    sidebar: {
                      ...sidebar,
                      currentSecondaryTab: secondaryTab,
                      controllerSubTab: secondaryTab,
                    },
                  },
                });
              }}
            >
              <TabPane
                tab={<Icon icon="tasks" />}
                key={SidebarSecondaryTab.Workflow}
              >
                <TabControllerWorkflow />
              </TabPane>
            </Tabs>
          )}
        </Mutation>
      )}
    </Query>
  );
};

export default TabController;
