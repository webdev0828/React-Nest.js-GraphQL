import { Icon as AntIcon } from 'antd';
import React from 'react';

export default class Icon extends React.Component<any> {
  render() {
    const {
      element: {
        config: {
          icon: { type },
        },
      },
    } = this.props;
    return <AntIcon type={type.toLowerCase()} />;
  }
}
