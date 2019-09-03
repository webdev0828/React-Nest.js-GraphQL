import React from 'react';
import AppButtonCreate from 'src/components/App/App-button--create';
import AppList from 'src/components/App/App-list';
import AppActions from 'src/components/App/App-listItem--actions';
import AppModalCreate from 'src/components/App/App-modal--create';
import AppModalUpdate from 'src/components/App/App-modal--update';
import withPageProps from 'src/hoc/withPageProps';
import withUser from 'src/hoc/withUser';

const AppModals = () => (
  <>
    <AppModalCreate />
    <AppModalUpdate />
  </>
);

const Apps = withUser(({ user }) => {
  return (
    <>
      <AppButtonCreate />
      <AppList AppActions={AppActions} username={user.username} />
      <AppModals />
    </>
  );
});

export default withPageProps()(Apps);
