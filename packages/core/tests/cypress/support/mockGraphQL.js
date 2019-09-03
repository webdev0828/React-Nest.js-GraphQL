// --------------------------------------
// Mock GraphQL requests with stubs.
// --------------------------------------
const mockGraphQL = stubs => {
  cy.on('window:before:load', win => {
    cy.stub(win, 'fetch', (...args) => {
      console.log('Handling fetch stub', args);
      const [url, request] = args;
      const postBody = JSON.parse(request.body);
      let promise;

      if (url.indexOf('sync.ts') !== -1) {
        stubs.some(stub => {
          if (postBody.operationName === stub.operation) {
            console.log('STUBBING', stub.operation);
            promise = Promise.resolve({
              ok: true,
              text() {
                return Promise.resolve(JSON.stringify(stub.response));
              },
            });
            return true;
          }
          return false;
        });
      }

      if (promise) {
        return promise;
      }

      console.log('Could not find a stub for the operation.');
      return false;
    });
  });
};

export default mockGraphQL;
