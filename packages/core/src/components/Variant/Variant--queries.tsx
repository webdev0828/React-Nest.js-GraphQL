import gql from 'graphql-tag';
import { Component } from 'src/components/BuilderComponents/Component';
import { VariantTemplate } from 'src/components/BuilderComponents/Variant/VariantTemplate';
import Element from 'src/components/Element/Element';
import { Variant } from 'src/components/Variant/Variant';

export const GET_VARIANT_INSTANCES = () => gql`
  query getVaraintInstances {
    variantInstances {
      id
      variant {
        ...VariantFragment
      }
      element {
        ...ElementFragment
      }
    }
    components {
      ...ComponentFragment
    }
    variantTemplates {
      ...VariantCategoryFragment
    }
  }
  ${Variant.fragments()}
  ${Element.fragments()}
  ${Component.fragments()}
  ${VariantTemplate.fragments()}
`;
