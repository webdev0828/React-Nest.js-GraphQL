describe('CRUD Event Test on Controller page', () => {
  before(() => {
    cy.visit('/Codelab/e-commerce-store/product-listing');
  });

  beforeEach(() => {
    // runs before each test in the block
    cy.server();
    cy.route('POST', Cypress.env('graphqlUrl'), 'fixture:views/containers/getApp.json').as(
      'getPage',
    );
  });

  it('Create Container Test', () => {
    cy.wait('@getPage');

    const mainHeader = 'main h3';
    cy.get(mainHeader)
      .eq(1)
      .should($header => {
        expect($header, 'Should contains Page: Product Listing').to.contain('Page: Product Listing');
      });

    cy.route('POST', Cypress.env('graphqlUrl'), 'fixture:views/containers/createContainer.json').as(
      'createCon',
    );

    const btnCreateContainer = 'main.container button';
    cy.get(btnCreateContainer).eq(0).click();

    const btnSubmit2CreateContainer = 'div.ant-modal-content form button';
    cy.get(btnSubmit2CreateContainer).click();
    cy.wait('@createCon')
    cy.route('POST', Cypress.env('graphqlUrl'), 'fixture:views/containers/getPageAfterCreate.json').as(
      'createApp',
    );
    cy.wait('@createApp')

    const itemContainerList = 'main > div.ant-col.ant-col-16 > div.ant-card > div.ant-card-body';
    cy.get(itemContainerList)
    .find('h3').should($header => {
      expect($header, 'Should have 3 item on container list').have.length(3);
    });

  })
  it('Edit Container Test', () => {

    cy.route('POST', Cypress.env('graphqlUrl'), 'fixture:views/containers/containersAfterUpdate.json').as(
      'updateApp',
    );

    const iconContainerSetting = 'main > div.ant-col.ant-col-16 > div.ant-card > div.ant-card-body i';
    cy.get(iconContainerSetting).eq(1).trigger('mouseover');//click({ force: true });

    const btnEdit = 'div.ant-popover div.ant-popover-inner-content button';
    cy.get(btnEdit).eq(0).click();

    const labelResponsiveProp = 'form.ant-form div.ant-radio-group-outline>div.ant-row >label';
    const selectorRadioBtnChecked = 'ant-radio-button-wrapper-checked';
    cy.get(labelResponsiveProp).eq(0).should('have.class', selectorRadioBtnChecked)

    cy.get(labelResponsiveProp).eq(1).click();
    const  btnEditFormSubmit = 'div.ant-popover form.ant-form button';
    cy.get(btnEditFormSubmit).click();
    cy.wait('@updateApp');

    cy.get(iconContainerSetting).eq(1).trigger('mouseover');//click({ force: true });
    cy.get(btnEdit).eq(0).click();
    cy.get(labelResponsiveProp).eq(1).should('have.class', selectorRadioBtnChecked)
  })

  it('Delete Container Test', () => {

    cy.route('POST', Cypress.env('graphqlUrl'), 'fixture:views/containers/containersAfterDelete.json').as(
      'deletedApp',
    );
    const iconContainerDelete = 'main > div.ant-col.ant-col-16 > div.ant-card > div.ant-card-body i.anticon-close';
    cy.get(iconContainerDelete).eq(0).click({ force: true });

    cy.wait('@deletedApp');

    const itemContainerList = 'main > div.ant-col.ant-col-16 > div.ant-card > div.ant-card-body';
    cy.get(itemContainerList)
    .find('h3').should($header => {
      expect($header, 'Should have 2 item on container list').have.length(2);
    });

  })

})
