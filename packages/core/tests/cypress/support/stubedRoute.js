const visitStubbed = (url, operations = {}) => {

  function responseStub(result) {
    return {
      json() {
        return Promise.resolve(result);
      },
      text() {
        return Promise.resolve(JSON.stringify(result));
      },
      ok: true,
    };
  }


  // function serverStub(path, req) {
  //   const { operationName } = JSON.parse(req.body);
  //   alert('operationName')
  //   if (Object.keys(operations).indexOf(operationName) !== false) {
  //     return Promise.resolve(responseStub(operations[operationName]));
  //   }

  //   return Promise.reject(new Error(`Not found: ${path}`));
  // }

  // cy.visit(url, {
  //   onBeforeLoad: (win) => {
  //     cy.stub(win, 'fetch')
  //     .withArgs('http://localhost:4000/graphql')
  //     .callsFake(serverStub).as('fetch stub');
  //   },
  // });

  function serverStub(_, req) {
    // parse the request
    const { operationName, query, variables } = JSON.parse(req.body)
    console.log('opera === ', operationName);
    // return the stub if it was provided
    const resultStub = operations[operationName]
    if (resultStub) {
      return Promise.resolve(responseStub(resultStub))
    }
    // else {
    //   return {}
    // }

    // If you want, fallback to default mock data if stub for operation is not specified (optional)
    return runQuery(query, variables).then(responseStub)
  }

  cy.visit(url, {
    onBeforeLoad: win => {
      console.log('stubedRoute')
      cy
        // stub `fetch`
        .stub(win, 'fetch')

        // your graphql endpoint
        // .withArgs('/graphql')

        // call our stub
        .callsFake(serverStub)
    },
  })


};

export default visitStubbed;
