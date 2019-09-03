import React from 'react';

enum Platforms {
  WEB,
  NATIVE,
  DESKTOP,
}

class Component {}

abstract class AbstractPlatformFactory {
  static getFactory(platform: Platforms) {
    const webComponentFactory = new WebComponentFactory();

    switch (platform) {
      case Platforms.WEB:
        return webComponentFactory;

      default:
        return webComponentFactory;
    }
  }

  abstract createGrid(): Component;
}

enum Components {
  GRID,
  CONTAINER,
  ELEMENT,
}

class GridFactory implements AbstractComponentFactory {}

abstract class AbstractComponentFactory {
  static getFactory(component: Components) {
    switch (component) {
      case Components.GRID:
        return new GridFactory();

      default:
        return null;
    }
  }
}

class Grid implements Component {}
class Container implements Component {}

class WebComponentFactory extends AbstractPlatformFactory {
  createGrid() {
    return new Grid();
  }
  createContainer() {
    return new Container();
  }
}

const webComponentFactory = AbstractPlatformFactory.getFactory(Platforms.WEB);
const container = webComponentFactory.createContainer();

export { AbstractPlatformFactory as ComponentFactory };
