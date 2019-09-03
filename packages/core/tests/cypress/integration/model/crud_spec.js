describe('The Model Create Page', () => {
  before(() => {
    cy.stubRoute({ fixture: 'models/listModels.json' });
    cy.visit('/model');
  });

  it('displays a list of models', () => {
    cy.get('a.Link-model--detail').should('have.length', 2);
  });

  it('create modal should not exist by default', () => {
    cy.get('.Modal-model--create').should('not.exist');
  });

  it('create modal opens on click', () => {
    cy.get('.Button-model--create').click();

    cy.get('.Modal-model--create').should('be.visible');
  });

  it('creates a new model', () => {
    cy.stubRoute({ fixture: 'models/createModel.json' });

    cy.get('input[name=name]').type('Test');

    cy.get('button[type=submit]').click();

    cy.get('a.Link-model--detail').should('have.length', 3);
  });

  it('deletes a model', () => {
    cy.stubRoute({ fixture: 'models/deleteModel.json' });

    cy.get('.Button-model--delete')
      .first()
      .click();

    cy.get('.Button-model--confirmDelete').click();

    cy.get('a.Link-model--detail').should('have.length', 2);
  });

  it('updates a model', () => {
    cy.stubRoute({ fixture: 'models/getModel.json' });

    cy.get('ul li.List-model--items')
      .contains('a', 'Menu')
      .parent('li')
      .find('.Button-model--edit')
      .click();

    cy.stubRoute({ fixture: 'models/updateModel.json', alias: 'updateModel' });

    cy.get('form.Form-model--update input[name=name]')
      .clear()
      .type('Menu Updated');

    cy.get('form.Form-model--update button[type=submit]').click();

    // Wait twice, 1 for updateModel, 1 for listModels
    cy.wait('@updateModel');
    cy.wait('@updateModel');

    cy.get('.Link-model--detail')
      .contains('Menu Updated')
      .should('have.length', 1);
  });
});
