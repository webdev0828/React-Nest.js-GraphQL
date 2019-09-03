import { Col, Icon, Row, Tabs } from 'antd';
import React from 'react';
import { CustomUIFactory } from 'src/components/custom-ui/custom-ui--factory';
import { useCustomUI } from 'src/components/custom-ui/cutom-ui--draggableContext';

const TabPane = Tabs.TabPane;

const CustomUI = () => {
  const { data, hideCustomUI } = useCustomUI(); // get hideCustomUI controller
  // and data to show
  const CustomUIComponent = CustomUIFactory(data!.__typename);
  console.log('data of element', data);
  return (
    <div>
      <Row>
        <Col span={16}>
          <h2>{data!.__typename}</h2>
        </Col>
        <Col style={{ textAlign: 'right' }}>
          <Icon
            type="close"
            onClick={e => {
              e.stopPropagation();
              hideCustomUI();
            }}
          />{' '}
        </Col>
      </Row>
      <Tabs defaultActiveKey="1" type="card" size="large">
        <TabPane tab="Tab 1" key="1">
          <CustomUIComponent.AppearanceTab />
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          <CustomUIComponent.ConditionalTab />
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          <CustomUIComponent.TransitionsTab />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default CustomUI;
