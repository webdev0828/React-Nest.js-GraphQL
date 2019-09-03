export default {
  Node: {
    // https://github.com/apollographql/apollo-server/issues/1075
    /* tslint:disable-next-line */
    __resolveType() {
      return null;
    },
  },
};
