export enum ModelTypes {
  Grid = 'GRID',
  Container = 'CONTAINER',
  Element = 'ELEMENT',
  Workflow = 'WORKFLOW',
  Component = 'COMPONENT',
  Action = 'ACTION',
  Event = 'EVENT',
  WorkflowTemplate = 'WORKFLOWTEMPLATE',
  Models = 'MODELS',
  Model = 'MODEL',
  Field = 'FIELD',
  Fields = 'FIELDS',
  AppID = 'APP_ID',
  FileType = 'FIEL_TYPE',
  RelationshipAndModels = 'RELATIONSHIPSANDMODELS',
  Content = 'CONTENT',
  Pages = 'PAGES',
  Page = 'Page',
  Containers = 'CONTAINERS',
  Global = 'GLOBAL',
}

export enum SystemTypes {
  User = 'USER',
  App = 'APP',
}

export const Models = {
  ...ModelTypes,
  ...SystemTypes,
};

export enum ComponentListTypes {
  Grids = 'GRIDS',
  Containers = 'CONTAINERS',
  Elements = 'ELEMENTS',
  Components = 'COMPONENTS',
  Variants = 'VARIANTS',
  CSSClasses = 'CSSCLASSES',
  CSSTemplates = 'CSSTEMPLATES',
}

export const ModelList = {
  ...ComponentListTypes,
};
