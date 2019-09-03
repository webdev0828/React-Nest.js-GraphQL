// https://github.com/cypress-io/cypress-documentation/issues/122
import { find, merge, extend } from 'lodash';

// Keep track how many times listModels has been called
let listModelsCounter = 0;
let createModelCounter = 0;

const visitStubbed = (url, operations = {}) => {
  cy.visit(url, {
    onBeforeLoad: win => {
      cy
        // stub `fetch`
        .stub(win, 'fetch')
        // your graphql endpoint
        .withArgs(
          'https://z5355a6d4fc6rgh6woieapm35y.appsync-api.us-west-2.amazonaws.com/graphql',
        )
        // call our stub
        .callsFake(serverStub)
        .as('fetch stub');
    },
  });

  const serverStub = (path, req) => {
    const { operationName } = JSON.parse(req.body);
    /**
     * Keep track of how many times each query has been called
     */
    if (operationName === 'ListModels') {
      listModelsCounter++;
    }
    if (operationName == 'CreateModel') {
      createModelCounter++;
    }

    // console.log(operations);
    // console.log(operationName);
    let resultStub = operations[operationName];

    /**
     * If CreateModel has been called before, and it's our second time calling ListModels, we return the combined data
     */
    if (createModelCounter > 0 && listModelsCounter > 1) {
      // Get our query results for each operation
      const ListModels = operations['ListModels'];
      const CreateModel = operations['CreateModel'];

      // Extract and combine the items
      const oldItems = ListModels.data.listModels.items;
      const itemToAdd = CreateModel.data.createModel;
      const newItems = [...oldItems, itemToAdd];
      console.log('newItems', newItems);

      // Set the new data
      ListModels.data.listModels.items = newItems;
      resultStub = ListModels;
    }

    if (resultStub) {
      // console.log('operationName', operationName);
      // console.log('resultStub', resultStub);
      return Promise.resolve(responseStub(resultStub));
    }

    return Promise.reject(new Error(`Not found: ${path}`));
  };

  const responseStub = result => {
    return {
      json() {
        return Promise.resolve(result);
      },
      text() {
        return Promise.resolve(JSON.stringify(result));
      },
      ok: true,
    };
  };
};

export default visitStubbed;
