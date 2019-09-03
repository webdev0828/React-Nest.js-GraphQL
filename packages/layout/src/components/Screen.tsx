export namespace Screen {
  export enum Size {
    XXS = 'XXS',
    XS = 'XS',
    SM = 'SM',
    MD = 'MD',
    LG = 'LG',
  }
  export namespace Width {
    export enum Base {
      XXS = 480,
      XS = 576,
      SM = 768,
      MD = 992,
      LG = 1200,
      XL = 1600,
    }
    export enum Max {
      XXS = Screen.Width.Base.XS - 1,
      XS = Screen.Width.Base.SM - 1,
      SM = Screen.Width.Base.MD - 1,
      MD = Screen.Width.Base.LG - 1,
      LG = Screen.Width.Base.XL - 1,
    }
  }
}
