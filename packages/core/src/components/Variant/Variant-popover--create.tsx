import { Form } from '@codelab/component';
import { Card, Icon } from 'antd';
import React from 'react';
import { Class } from 'src/components/BuilderComponents/Class';
import {
  CREATE_VARIANT,
  GET_CSS_CLASSES,
} from 'src/components/BuilderComponents/Component-queries';
import { Variant } from 'src/components/Variant/Variant';
import { ModelList } from 'src/graphql/modelTypes';
import { VariantSteps } from 'src/state/apollo-local-state/variant/variantState';
import Query from 'src/utils/Query';

const VariantPopoverCreate = ({ setCurrentStep, component }) => {
  return (
    <Query<{ cssClasses: Class[] }>
      query={GET_CSS_CLASSES}
      displayName={ModelList.CSSClasses}
    >
      {({ data }) => {
        const { cssClasses } = data!;
        const variantFields = component.variantFormFields(cssClasses, () => {
          setCurrentStep(VariantSteps.CreateClass);
        });

        return (
          <Card
            title={
              <>
                <a
                  href="javascript:;"
                  style={{ display: 'block', float: 'left' }}
                  onClick={() => {
                    setCurrentStep(VariantSteps.SelectVariant);
                  }}
                >
                  <Icon type="left" />
                  <span> Create a Variant</span>
                </a>
              </>
            }
            bordered={false}
          >
            <Form
              mutation={CREATE_VARIANT}
              fields={variantFields}
              onSubmit={(values, { mutate }) => {
                return Variant.createVariant(values, { mutate });
              }}
            />
          </Card>
        );
      }}
    </Query>
  );
};

export default VariantPopoverCreate;
