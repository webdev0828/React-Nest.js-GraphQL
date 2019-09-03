import { Dropdown, Icon } from 'antd';
import React from 'react';
import AppDropdownActions from 'src/components/App/App-dropdown--actions';
import { AppProps, UserProps } from 'src/components/App/App-list';

const AppActions: React.FC<AppProps & UserProps> = ({ app, user }) => {
  return (
    <Dropdown
      overlay={<AppDropdownActions app={app} user={user} />}
      trigger={['click']}
    >
      <Icon type="ellipsis" />
    </Dropdown>
  );
};

export default AppActions;
