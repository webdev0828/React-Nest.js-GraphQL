describe('Create App Test', () => {
  before(() => {
    cy.visit('/Codelab/e-commerce-store');
  });

  beforeEach(() => {
    cy.server();
  });

//Create
  it('Create new model', () => {
    cy.route('POST',Cypress.env('graphqlUrl'), 'fixture:model/create.json').as(
      'createModel',
    );
    const headTitle1 = 'section.ant-layout h2';
    cy.get(headTitle1).should($head => {
      expect(
        $head,
        'e-commerce-store',
      ).to.contain('e-commerce-store');
    })

    const addIcon = 'i.anticon-plus';
    cy.get(addIcon).click();

    const inputModelName = 'input#name';
    cy.get(inputModelName).focus().type('testModel');

    const headTitle2 = 'section.ant-layout h2';
    cy.get(headTitle2).should($head => {
      expect(
        $head,
        'e-commerce-store',
      ).to.contain('e-commerce-store');
    })

    const btnNewModel = 'button.ant-btn-primary';
    cy.get(btnNewModel).should($label => {
      expect(
        $label,
        'Create New Model',
      ).to.contain('Create New Model');
    })

    const addForm = 'div.MODAL--MODEL_CREATE form';
    cy.get(addForm).submit();
    cy.wait('@createModel');
    cy.route('POST',Cypress.env('graphqlUrl'), 'fixture:model/getNewList.json'
    ).as(
      'getNewList',
    );
    cy.wait('@getNewList');
    //cy.get('div.ant-card h2').should('have.length', 5);

    cy.route('POST',Cypress.env('graphqlUrl'), 'fixture:model/selectedModel.json'
    ).as(
      'selectedModel',
    );
    cy.wait('@selectedModel');

    const modelTitle = 'main h1';
    cy.get(modelTitle).should($label => {
      expect(
        $label,
        'Contains text `testModel`',
      ).to.contain('testModel');
    })

  })
//Edit
  it('Edit model', () => {
    cy.route('POST',Cypress.env('graphqlUrl'), 'fixture:model/update.json'
    ).as(
      'update',
    );

    const btnEdit = "#btnModelEdit";
    cy.get(btnEdit)
    .click({force: true});

    const inputModelEditName = 'input#name';
    cy.get(inputModelEditName)
      .focus()
      .clear()
      .type('TestModelEdited');

    const editForm = 'div.MODAL--MODEL_EDIT form';
    cy.get(editForm).should($label => {
      expect(
        $label,
        'OK',
      ).to.contain('OK');
    })
    cy.get(editForm).submit();
    cy.wait('@update');

    cy.route('POST',Cypress.env('graphqlUrl'), 'fixture:model/updatedModel.json'
    ).as(
      'updatedModel',
    );
    const modelTitle = 'main h1';
    cy.get(modelTitle).should($label => {
      expect(
        $label,
        'Contains text `testModelEdit`',
      ).to.contain('testModelEdit');
    })

    cy.wait('@updatedModel');
  })
  //Delete
  it('Delete model', () => {
    // cy.route('POST',Cypress.env('graphqlUrl'), 'fixture:model/delete.json'
    //     ).as(
    //       'delete',
    //     );
    cy.route('POST',Cypress.env('graphqlUrl'), 'fixture:model/getListAfterdeleted.json'
    ).as(
      'getListAfterdeleted',
    );

    const btnDel = '#btnModelDel';
    cy.get(btnDel).should($label => {
      expect(
        $label,
        'Contains text `Delete Model`',
      ).to.contain('Delete Model');
    })

    cy.get(btnDel)
    .click({force: true});
    // cy.wait('@delete');

    cy.wait('@getListAfterdeleted');

    const headTitle3 = 'main h2';
    cy.get(headTitle3).should($label => {
      expect(
        $label,
        'Contains text `e-commerce-store`',
      ).to.contain('e-commerce-store');
    })

  });


});
