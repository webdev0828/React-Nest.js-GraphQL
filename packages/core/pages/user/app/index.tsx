import { Button } from 'antd';
import React from 'react';
import { Mutation } from 'react-apollo';
import { WithComponentTarget } from 'src/components/Draggable/ComponentDraggable';
import withPageProps from 'src/hoc/withPageProps';
import {
  SET_SIDEBAR_TAB,
  SidebarPrimaryTab,
} from 'src/state/apollo-local-state/sidebar/sidebarState';

type UrlParams = {
  url: {
    params: {
      username: string;
      app: string;
    };
  };
};

const AppPage = (props: UrlParams) => {
  const {
    url: {
      params: { username, app },
    },
  } = props;

  return (
    <section className="container">
      <h2>App: {app}</h2>
      <h3>Username: {username}</h3>

      <WithComponentTarget>
        {props => {
          return (
            <div
              style={{
                width: '200px',
                height: '200px',
                border: '1px solid black',
                backgroundColor: 'grey',
              }}
            >
              Target
            </div>
          );
        }}
      </WithComponentTarget>

      <Mutation mutation={SET_SIDEBAR_TAB}>
        {setSidebar => {
          return (
            <>
              <Button
                onClick={() =>
                  setSidebar({
                    variables: {
                      sidebar: {
                        currentPrimaryTab: SidebarPrimaryTab.Model,
                      },
                    },
                  })
                }
              >
                Model
              </Button>
              <Button
                onClick={() =>
                  setSidebar({
                    variables: {
                      sidebar: {
                        currentPrimaryTab: SidebarPrimaryTab.View,
                      },
                    },
                  })
                }
              >
                View
              </Button>
              <Button
                onClick={() =>
                  setSidebar({
                    variables: {
                      sidebar: {
                        currentPrimaryTab: SidebarPrimaryTab.Controller,
                      },
                    },
                  })
                }
              >
                Controller
              </Button>
            </>
          );
        }}
      </Mutation>
    </section>
  );
};

export default withPageProps({ hasSidebar: true })(AppPage);
