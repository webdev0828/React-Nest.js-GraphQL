describe('CRUD App Test', () => {
  before(() => {

  });

  beforeEach(function initial() {
    cy.server();
    cy.route('POST', Cypress.env('graphqlUrl'), 'fixture:auth/me.json').as('authMe');
    cy.visit('/Codelab/');
  });

  it('Create App Test', () => {
    cy.wait('@authMe')
    cy.route('POST', Cypress.env('graphqlUrl'), 'fixture:apps/getApp.json').as('getAppLists');
    cy.wait('@getAppLists')

    // check if there is only one app in the list
    const itemAppList = 'main section div.ant-row';
    cy.get(itemAppList)
      .find('h3')
      .should('have.length', 1);

    const btnCreateApp = 'main button.ant-btn-primary';
    cy.get(btnCreateApp).should($btn => {
      expect($btn, 'Create App').to.contain('Create App');
    });

    cy.route(
      'POST',
      Cypress.env('graphqlUrl'),
      'fixture:apps/getUpdatedApp.json',
    ).as('getUpdatedApps');

    cy.get(btnCreateApp).click();

    const inputName = 'input#name';
    cy.get(inputName)
      .clear()
      .type('My New App');


    const modalCreateForm = 'div.ant-modal-content form';
    cy.get(modalCreateForm).submit();
    cy.wait('@getUpdatedApps');

    cy.get(itemAppList)
      .find('h3')
      .should('have.length', 2);
  })

  it('Edit App Test', ()=>{
    cy.route(
      'POST',
      Cypress.env('graphqlUrl'),
      'fixture:apps/getUpdatedApp.json',
    ).as('getUpdatedApps');
    cy.wait('@getUpdatedApps');

    cy.route(
      'POST',
      Cypress.env('graphqlUrl'),
      'fixture:apps/getEditedApp.json',
    ).as('getEditedApp');
    const itemAppList2 = 'main section div div div';
    cy.get(itemAppList2)
      .last()
      .find('i')
      .click();

    const btnGroup = 'div.ant-dropdown button';
    cy.get(btnGroup)
      .first()
      .click();

    const inputNameOfUpdateForm = 'div.MODAL--APP_UPDATE form input#name';
    cy.get(inputNameOfUpdateForm)
      .clear()
      .type('My New App Edit');

    const btnUpdateFormSubmit = 'div.MODAL--APP_UPDATE form button';
    cy.get(btnUpdateFormSubmit).click();
    cy.wait('@getEditedApp');

    cy.get(itemAppList2)
      .last()
      .should($text => {
        expect($text, 'My New App Edit').to.contain('My New App Edit');
      });
  });

  it('Delete App Test', ()=>{
    cy.route(
      'POST',
      Cypress.env('graphqlUrl'),
      'fixture:apps/getPreDelApp.json',
    ).as('getPreDelApp');
    cy.wait('@getPreDelApp');

    cy.route('POST', Cypress.env('graphqlUrl'), 'fixture:apps/getApp.json').as(
      'getApps',
    );

    const itemAppList3 = 'main section div div';
    cy.get(itemAppList3)
      .last()
      .find('i')
      .click();

    const btnGroup = 'div.ant-dropdown button';
    cy.get(btnGroup)
      .last()
      .click();
    cy.wait('@getApps');

    const itemAppList = 'main section div.ant-row';
    cy.get(itemAppList)
      .find('h3')
      .should('have.length', 1);
  });
});
