const checkSignin = () => {

  const username = 'Codelab';
  const password = 'password';

  cy.route('POST', Cypress.env('graphqlUrl'), 'fixture:auth/login.json').as(
    'login',
  );

  cy.get('.Link-auth--login').should($link => {
    expect($link, 'Should be Login').to.contain('Login');
  });
  cy.get('.Link-auth--login').click();

  cy.get('div.ant-modal-body h2').should($tag => {
    expect($tag, 'Should be Login').to.contain('Login');
  });

  cy.log('user typing..');

  cy.get('#username')
    .focus()
    .type(username);
  cy.get('#password').type(password);

  cy.get('.ant-modal-body')
    .contains('Login')
    .next()
    .find('form')
    .submit();
//
  cy.wait('@login');

  cy.route('POST', Cypress.env('graphqlUrl'), 'fixture:auth/me.json').as('me');
  cy.wait('@me');


  cy.get('header').should($header => {
    expect($header, 'User Name').to.contain(username);
  });

};

export default checkSignin;
