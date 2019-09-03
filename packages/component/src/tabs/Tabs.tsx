import { IThemeContext, withTheme } from '@codelab/style';
import styled from '@emotion/styled';
import { Tabs } from 'antd';
import { TabPaneProps, TabsProps } from 'antd/lib/tabs';
import React from 'react';

// type MyTabsProps = TabsProps & {};

const MyTabs = withTheme(styled((props: TabsProps) => {
  return <Tabs {...props} />;
})`
  /**
Modify alignment & width
 */
  .ant-tabs-nav {
    width: 100%;
    > div {
      width: 100%;
      display: flex;
      .ant-tabs-tab {
        flex-grow: 1;
        margin-right: 0;
        width: 100%;
        text-align: center;
      }
    }
  }
  .ant-tabs-bar {
    margin-bottom: ${props => props.theme.padding.sm};
    &.ant-tabs-left-bar,
    &.ant-tabs-right-bar {
      .ant-tabs-nav > div {
        display: block;
      }
    }
  }
  svg {
    margin-right: ${props => props.theme.padding.sm};
  }
  .ant-tabs-tabpane {
    padding: ${(props: IThemeContext) => {
      // return 0;
      return props.theme.padding.sm || 0;
    }};
  }
`);
// padding: ${(props: IThemeContext) => props.theme.padding.md || 0};

type MyTabPaneProps = TabPaneProps & {};

const MyTabPane = styled((props: MyTabPaneProps) => (
  <Tabs.TabPane {...props} />
))``;

export { MyTabs, MyTabPane };
