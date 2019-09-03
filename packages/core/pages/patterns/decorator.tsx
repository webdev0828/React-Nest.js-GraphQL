import React from 'react';
import withPageProps from 'src/hoc/withPageProps';

const DecoratorPattern = () => <h1> Decorator Pattern </h1>;

interface IComponent {
  onClick(): void;
}

class Image implements IComponent {
  public onClick(): void {
    throw new Error('Method not implemented.');
  }
}

class Grid implements IComponent {
  public onClick(): void {
    throw new Error('Method not implemented.');
  }
}

abstract class ComponentDecorator implements IComponent {
  protected decoratedComponent: IComponent;

  public onClick(): void {
    throw new Error('Method not implemented.');
  }
}

interface ILayout {}

class LayoutDecorator extends ComponentDecorator {
  private layout: ILayout;

  constructor({ image, layout }: { image: IComponent; layout: ILayout }) {
    super();
    this.decoratedComponent = image;
    this.layout = layout;
  }

  public getLayout(): ILayout {
    return this.layout;
  }
}

// Usage
const image: IComponent = new Image();

/**
 * ILayout is the tree data representation of Container/Grid nesting/index
 * location information.
 */
const layout: ILayout = Object();

/**
 * Image becomes decorated with LayoutDecorator as we drag an Image component
 * to the content area.
 *
 * We use the decorator pattern to add behavior to objects belonging to the
 * same class.
 *
 * This way, we can easily retrieve Layout info from our image, without having
 * to find the image's parent Layout.
 */
const imageWithLayout: IComponent = new LayoutDecorator({ image, layout });

export default withPageProps()(DecoratorPattern);
