import { Screen } from '@codelab/layout';
import { Layout } from 'antd';
import React, { Component } from 'react';
import Header from 'src/components/sections/Header';
import SidebarPageBuilder from 'src/components/Sidebar/Sidebar--pageBuilder';
import { GET_CONFIG } from 'src/state/apollo-local-state/config/configState';
import Query from 'src/utils/Query';
import styled from 'styled-components';

const { Content } = Layout;
const LayoutHeader = Layout.Header;
const LayoutFooter = Layout.Footer;
const Sider = Layout.Sider;

const Sidebar = styled(Sider)`
  &.ant-layout-sider-dark {
    .ant-radio-wrapper span {
      color: white;
    }
  }
  .ant-tabs {
    color: white;
  }
`;
const ContentLayout = styled(Layout)`
   {
    flex-direction: row;
  }
`;

export const withLayout = ComposedComponent =>
  class WithLayout extends Component<{
    url: any;
    hasSidebar: boolean;
    screenSize?: Screen.Size;
  }> {
    private getContentStyle(config) {
      const width = `${Screen.Width.Base[config.screenSize]}px`;

      return {
        width: '100%',
        maxWidth: width,
      };
    }

    render() {
      // const route = this.props.url.route;
      //
      let contentClassName = 'container';
      if (this.props.screenSize) {
        contentClassName += ` Container--${this.props.screenSize}`;
      }

      return (
        <Layout>
          <LayoutHeader>
            <Header {...this.props} />
          </LayoutHeader>
          <ContentLayout>
            {/*Sidebar*/}
            {this.props.hasSidebar ? (
              <Sidebar theme="dark" width={400}>
                <style>
                  {`
                      .antd-layout-sider.ant-layout-sider-dark .ant-radio-wrapper span {
                        color: white;
                      }
                    `}
                </style>
                <SidebarPageBuilder />
              </Sidebar>
            ) : null}
            {/*Main Content*/}
            <Layout>
              <Query query={GET_CONFIG}>
                {({ data: { config } }) => {
                  return (
                    <Content
                      className={contentClassName}
                      // style={this.getContentStyle(config)}
                    >
                      {/* <Breadcrumb links={modelLinks} route={route} /> */}
                      <ComposedComponent {...this.props} />
                    </Content>
                  );
                }}
              </Query>
              {/*<LayoutFooter>*/}
              {/*  <Footer />*/}
              {/*</LayoutFooter>*/}
            </Layout>
          </ContentLayout>
        </Layout>
      );
    }
  };
