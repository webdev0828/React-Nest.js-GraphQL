import { Card, Col, Icon, Popover, Row } from 'antd';
import React, { useState } from 'react';
import Component from 'src/components/BuilderComponents/Component';
import { GET_COMPONENTS } from 'src/components/BuilderComponents/Component-queries';
import { WithComponentSource } from 'src/components/Draggable/ComponentDraggable';
import VariantPopoverCreate from 'src/components/Variant/Variant-popover--create';
import VariantPopoverCreateClass from 'src/components/Variant/Variant-popover--createClass';
import VariantPopoverSelect from 'src/components/Variant/Variant-popover--select';
import { ModelList } from 'src/graphql/modelTypes';
import { VariantSteps } from 'src/state/apollo-local-state/variant/variantState';
import Query from 'src/utils/Query';

const gridStyle = {
  width: '100%',
  cursor: 'pointer',
  marginBottom: 8,
};

interface IPopoverContainerProps {
  currentStep: string;
  setCurrentStep: any;
  component: any;
}

const PopoverContainer: React.FC<IPopoverContainerProps> = ({
  currentStep,
  setCurrentStep,
  component,
}) => {
  switch (currentStep) {
    case VariantSteps.SelectVariant:
      return (
        <VariantPopoverSelect
          setCurrentStep={setCurrentStep}
          component={component}
        />
      );

    case VariantSteps.CreateVariant:
      return (
        <VariantPopoverCreate
          setCurrentStep={setCurrentStep}
          component={component}
        />
      );

    case VariantSteps.CreateClass:
      return <VariantPopoverCreateClass setCurrentStep={setCurrentStep} />;

    default:
      return null;
  }
};

const ComponentTemplate = ({ component }) => {
  const [currentStep, setCurrentStep] = useState(VariantSteps.SelectVariant);
  return (
    <Card
      style={gridStyle}
      className="Component"
      hoverable={true}
      headStyle={{ border: 0 }}
      bodyStyle={{ marginTop: -32 }}
      extra={
        <Popover
          placement="right"
          content={PopoverContainer({
            currentStep,
            setCurrentStep,
            component,
          })}
          trigger="click"
        >
          <Icon type="setting" />
        </Popover>
      }
    >
      <h3 style={{ textAlign: 'center' }}>{component.type}</h3>
    </Card>
  );
};

const TabViewComponent = () => {
  const mappedComponents = ({ data: { components } }: any) =>
    components.map((component, idx) => (
      <Col span={12} key={idx}>
        <WithComponentSource component={component}>
          {props => {
            return <ComponentTemplate component={component} />;
          }}
        </WithComponentSource>
      </Col>
    ));

  return (
    <section>
      <Row gutter={8}>
        <Query<{ components: Component[] }>
          query={GET_COMPONENTS}
          displayName={ModelList.Components}
        >
          {mappedComponents}
        </Query>
      </Row>
    </section>
  );
};

export default TabViewComponent;
