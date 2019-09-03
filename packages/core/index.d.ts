// To use non-code assets with TypeScript,
// https://webpack.js.org/guides/typescript/
declare module '*.graphql' {
  const content: any;
  export default content;
}
