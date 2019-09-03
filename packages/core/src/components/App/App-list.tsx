import { Col, Row } from 'antd';
import React from 'react';
import { IApp } from 'src/components/App/App';
import AppListItem from 'src/components/App/App-listItem';
import { Model } from 'src/components/BuilderComponents/interfaces';
import { IUser, User } from 'src/components/User/User';
import { USER_APPS_QUERY } from 'src/components/User/User--queries';
import { Models } from 'src/graphql/modelTypes';
import Query from 'src/utils/Query';

export type AppProps = {
  app: Model<IApp>;
};

export type UserProps = {
  user: Model<IUser>;
};

type AppListProps = {
  AppActions: React.FC<AppProps & UserProps>;
  username: string;
};

const AppList: React.FC<AppListProps> = ({ username }) => (
  <section>
    <h1>Apps for {username}</h1>
    <Query<{ user: User }>
      displayName={Models.User}
      query={USER_APPS_QUERY()}
      variables={{ where: { username } }}
    >
      {({ data }) => {
        const user = data!.user;
        const apps = user.apps;
        return (
          <>
            <Row style={{ margin: '0 -5px' }}>
              {apps.map((app, index) => (
                <Col key={index} xs={12} md={8} style={{ padding: '5px' }}>
                  <AppListItem app={app} user={user} />
                </Col>
              ))}
            </Row>
          </>
        );
      }}
    </Query>
  </section>
);

export default AppList;
