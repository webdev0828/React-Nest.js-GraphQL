describe('User Login', () => {
  before(() => {
    cy.visit('/');
  });

  beforeEach(() => {
    cy.server();
  });

  it('Logs a user in.', () => {
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
      assert.equal(localStorage.getItem('token'), null);
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

    cy.wait('@login');

    cy.route('POST', Cypress.env('graphqlUrl'), 'fixture:auth/me.json').as(
      'me',
    );
    cy.wait('@me');
    /**
     * Test for notification
     */
    cy.get('div.ant-notification').should($note => {
      expect($note, 'Login Success Notification').to.contain('Login success!');
    });

    /**
     * Test that profile navigation works
     */
    cy.get('header').should($header => {
      expect($header, 'User Name').to.contain(username);
      assert.isNotNull(localStorage.getItem('token'), 'Token has value now');
    });

    cy.log('Login succeed.');
  });

  it('Logs a user out.', () => {
    cy.get('a.ant-dropdown-link').click();
    cy.get('ul.ant-dropdown-menu').should($link => {
      expect($link, 'Log out button').to.contain('Log Out');
      assert.isNull(localStorage.getItem('token'), 'Token has removed now');
    });
    cy.contains('Log Out').click();
    cy.get('div.ant-notification').should($note => {
      expect($note, 'Log out Success Notification').to.contain(
        'Log out success!',
      );
    });
  });
});
