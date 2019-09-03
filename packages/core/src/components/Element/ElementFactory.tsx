import { Button, Form, Icon, Image, Link, Paragraph } from '@codelab/component';
import React from 'react';
import { ComponentType } from 'src/graphql/__generated__/graphql-api';

interface IElementInput {
  element: any;
}

/**
 * AbstractFactory
 */
class ElementFactory extends React.Component<IElementInput> {
  constructor(props) {
    super(props);
  }

  static getFactory(props: IElementInput) {
    const { element } = props;
    let ElementComponent: any = null;

    const componentType = element.component.type;

    switch (componentType) {
      case ComponentType.Image: {
        ElementComponent = Image;
        break;
      }
      case ComponentType.Link: {
        ElementComponent = Link;
        break;
      }
      case ComponentType.Heading: {
        // ElementComponent = Image.render;
        break;
      }
      case ComponentType.Paragraph: {
        ElementComponent = Paragraph;
        break;
      }
      case ComponentType.Icon: {
        ElementComponent = Icon;
        break;
      }
      case ComponentType.Menu: {
        // ElementComponent = Image.render;
        break;
      }
      case ComponentType.Text: {
        // ElementComponent = Image.render;
        break;
      }
      case ComponentType.Button: {
        ElementComponent = Button;
        break;
      }
      case ComponentType.Form: {
        ElementComponent = Form;
        break;
      }

      default:
        return null;
    }

    if (ElementComponent) {
      return <ElementComponent element={element} />;
    }

    return null;
  }

  render() {
    const { element } = this.props;

    return ElementFactory.getFactory({
      element,
    });
  }
}

export { ElementFactory };
