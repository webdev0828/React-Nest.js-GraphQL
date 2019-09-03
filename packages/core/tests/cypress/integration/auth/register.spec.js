import { Component, Module } from '@codelab/system';
import { bemClassName } from '@codelab/utils';
import { ModalIDs } from '../../../../src/state/apollo-local-state/modal/modalState';

describe('User Registration', () => {
  before(() => {
    cy.visit('/');
  });

  beforeEach(() => {
    cy.server();
  });

  it('Registers a user.', () => {
    const username = 'Codelab';
    const password = 'password';

    const registerLink = '.LINK-AUTH--REGISTER';
    const registerModal = bemClassName({
      b: Component.Modal,
      e: Module.Auth,
      m: ModalIDs.Register,
    });

    assert.equal(localStorage.getItem('token'), null);

    cy.route('POST', Cypress.env('graphqlUrl'), 'fixture:auth/register.json')
      .as(
        'register',
      );

    cy.get(registerLink).click();

    // cy.get('div.ant-modal-body h2').should($tag => {
    //   expect($tag, 'Should be Register').to.contain('Register');
    // });

    /**
     * Enter credentials
     */
    cy.log('Entering credentials...');

    cy.get('#username')
      .focus()
      .type(username);
    cy.get('#password').type(password);

    cy.get(registerModal)
      .find('form')
      .submit();

    cy.wait('@register');

    cy.route('POST', Cypress.env('graphqlUrl'), 'fixture:auth/me.json').as(
      'me',
    );

    cy.wait('@me');

    cy.get('div.ant-notification').should($note => {
      expect($note, 'Register Success Notification').to.contain(
        'Register success!',
      );
    });

    cy.get('header').should($header => {
      expect($header, 'User Name').to.contain(username);
    });

    cy.log('Sign up succeed.');
  });

  it('Logs out a user.', () => {
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
