import { IThemeContext } from '@codelab/style';
import styled from '@emotion/styled';
import { Tabs as AntdTabs } from 'antd';

// const TabPane = AntdTabs.TabPane;

interface ISpacing {
  margin?: string | number;
  padding?: string | number;
}

const TabPane = styled(AntdTabs.TabPane);

export default TabPane;
