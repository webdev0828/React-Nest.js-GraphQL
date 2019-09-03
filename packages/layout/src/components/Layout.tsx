import { forOwn, mergeWith } from 'lodash';
import { isArray } from 'util';
import { Grid } from './Grid';
import React, { useEffect, useState } from 'react';

class Layout {
  container: Grid[] = [];
  layouts = {};

  addGrid(grid: Grid) {
    this.container.push(grid);
  }

  /**
   * In format of react-grid-layout
   */
  getLayout() {
    // Loop each grid
    // grid -> build layout

    this.container.forEach(grid => {
      this.mapLayout(grid);
    });

    return this.layouts;
  }

  /**
   * Create react-grid-layout format from each grid
   {
      lg: [
        { i: 'a', x: 0, y: 0, w: 4, h: 2 },
      ],
      xxs: [
        { i: "c", x: 8, y: 0, w: 4, h: 2 },
      ],
    };
   */
  private mapLayout(grid: Grid) {
    const { configs } = grid;

    forOwn(configs, (val, key) => {
      /**
       * Add to layout
       */
      const customizer = (obj, src) => {
        if (isArray(obj)) {
          return obj.concat(src);
        }
        return obj;
      };

      this.layouts = mergeWith(this.layouts, { [key]: [val] }, customizer);
    });
  }
}

const getWindowWidth = () => {
  if (typeof window === 'undefined') {
    return 0;
  }

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  let windowSize = '';

  if (width > 1200) {
    windowSize = 'lg';
    // this.setState({ windowSize: 'lg' });
  }
  if (width <= 1200) {
    windowSize = 'md';
    // this.setState({ windowSize: 'md' });
  }
  if (width <= 996) {
    windowSize = 'sm';
    // this.setState({ windowSize: 'sm' });
  }
  if (width <= 768) {
    windowSize = 'xs';
    // this.setState({ windowSize: 'xs' });
  }
  if (width <= 480) {
    windowSize = 'xxs';
    // this.setState({ windowSize: 'xxs' });
  }

  return windowSize;
};

export { Layout, getWindowWidth };
