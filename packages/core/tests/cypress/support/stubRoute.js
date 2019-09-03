const stubRoute = ({ fixture, alias = 'getData', method = 'POST' }) => {
  cy.server();
  cy.fixture(fixture).as('data');
  cy.route({
    method,
    url:
      'https://z5355a6d4fc6rgh6woieapm35y.appsync-api.us-west-2.amazonaws.com/graphql',
    response: '@data',
    onRequest: xhr => {
      console.log(xhr);
    },
    onResponse: xhr => {
      const responseBody = xhr.response.body;
      let reader = new FileReader();
      reader.addEventListener('loadend', function() {
        const data = reader.result;
        let decodedString = String.fromCharCode.apply(
          null,
          new Uint8Array(data),
        );
        const obj = JSON.parse(decodedString);
        xhr.response.body = obj;
      });
      reader.readAsArrayBuffer(responseBody);
    },
  }).as(alias);
};

export default stubRoute;
