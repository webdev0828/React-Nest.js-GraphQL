import React from 'react';
import { Container } from 'src/components/BuilderComponents/Layout/Container';
import Element from 'src/components/Element/Element';
import { Grid } from 'src/components/Grid/Grid';
import { ModelTypes } from 'src/graphql/modelTypes';

export interface IElementInput {
  element: any;
  type: ModelTypes;
  order: number;
  children?: (any) => React.ReactNode;
  onClick?: (e: React.SyntheticEvent) => void;
}

interface IElement {
  type: ModelTypes;
  order: number;
  elements?: IElement[];
}

/**
 * AbstractFactory
 */
class LayoutFactory extends React.Component<IElementInput> {
  constructor(props) {
    super(props);
  }

  static getFactory(props: IElementInput) {
    const { type, element } = props;
    let ElementComponent: any = null;

    switch (type) {
      case ModelTypes.Container: {
        ElementComponent = Container.render;
        break;
      }
      case ModelTypes.Grid: {
        ElementComponent = Grid.render;
        break;
      }
      case ModelTypes.Element: {
        ElementComponent = Element.render;
        break;
      }
      default:
        return null;
    }

    if (ElementComponent) {
      return <ElementComponent element={element} {...props} />;
    }

    return null;
  }

  render() {
    const { type, order, children, ...props } = this.props;

    return LayoutFactory.getFactory({
      type,
      order,
      children,
      ...props,
    });
  }
}

export { LayoutFactory };
