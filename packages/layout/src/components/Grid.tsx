import { Screen } from './Screen';

// github.com/Microsoft/TypeScript/issues/5683
interface Grid {
  id: string;
  configs?: RglLayout;
}

type RglLayout = { [key in Screen.Size]?: Dimension[] };

type Dimension = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

class Grid {
  id: string;
  configs?: Grid['configs'] = {};

  constructor(id: string) {
    this.id = id;
    // this.config = { i: id, x: 0, y: 0, w: 4, h: 2 };
  }

  setDimension(size: Screen.Size, x: number, y: number, w: number, h: number) {
    Object.assign(this.configs, {
      [size]: {
        x,
        y,
        w,
        h,
        i: this.id,
        static: true,
      },
    });
  }
}

export { Grid };
