describe('CRUD Event Test on Controller page', () => {
  before(() => {
    cy.visit('/Codelab/e-commerce-store');
  });

  beforeEach(() => {
    // runs before each test in the block
    cy.server();
  });

  it('Create Event Test', () => {
    cy.route('POST', Cypress.env('graphqlUrl'), 'fixture:controller/event/getList.json')
      .as(
        'getEvents',
      );

    const tabsMVC = 'div.ant-tabs-nav-animated div.ant-tabs-tab';
    cy.get(tabsMVC).eq(2)
      .contains('Controller');

    cy.get(tabsMVC).eq(2).click();
    cy.wait('@getEvents');
    cy.route('POST', Cypress.env('graphqlUrl'), 'fixture:controller/event/create.json')
      .as(
        'createEvent',
      );

    const itemEventList = 'div.ant-tabs-tabpane-active div.ant-card-bordered div.ant-card-body';
    cy.get(itemEventList)
      .find('h3').should($header => {
      expect($header, 'Should have 1 item on event list').have.length(1);
    });

    const inputEventField = '#event';
    cy.get(inputEventField).type('onTestEvent');

    cy.get('div.ant-tabs-content form').eq(1).submit();
    cy.wait('@createEvent');
    cy.route('POST', Cypress.env('graphqlUrl'), 'fixture:controller/event/getListAfterCreate.json')
      .as(
        'updatedCreatedList',
      );
    cy.wait('@updatedCreatedList');
  // });

  // it('Edit Event Test', () => {
    cy.route('POST', Cypress.env('graphqlUrl'), 'fixture:controller/event/update.json')
      .as(
        'update',
      );

    const itemEventListTitle = 'div.ant-tabs-tabpane-active div.ant-card-bordered div.ant-card-body h3';
    cy.get(itemEventListTitle)
      .should($header => {
        expect($header, 'onTestEvent').to.contain('onTestEvent');
      });
    cy.get(itemEventListTitle)
      .should($header => {
        expect($header, 'Should have 2 items on event list').have.length(2);
      });
  });

  it('Edit Event Test', () => {
    cy.route('POST', Cypress.env('graphqlUrl'), 'fixture:controller/event/getUpdatedList.json')
      .as(
        'UpdatedList',
      );

    const iconSetting = 'div.ant-tabs-tabpane-active div.ant-card-bordered div.ant-card-body i.anticon-setting';
    cy.get(iconSetting)
      .eq(1).click();
    const inputEditField = 'input#event'
    cy.get(inputEditField).eq(1).type('Edit');

    const btnEditSubmit = 'div.ant-popover-content button';
    cy.get(btnEditSubmit).click();

    cy.wait('@UpdatedList');
    const itemEventListTitle = 'div.ant-tabs-tabpane-active div.ant-card-bordered div.ant-card-body h3';
    cy.get(itemEventListTitle)
      .should($header => {
        expect($header, 'Change to onTestEventEdit').to
          .contain('onTestEventEdit');
      });
  });

  it('Delete Event Test', () => {
    cy.route('POST', Cypress.env('graphqlUrl'), 'fixture:controller/event/getList.json')
      .as(
        'getList',
      );

    const EventIconDelete = 'div.ant-tabs-tabpane-active div.ant-card-bordered div.ant-card-body i.anticon-close';
    cy.get(EventIconDelete).eq(1).click();

    cy.get(EventIconDelete)
      .eq(1).click();


    cy.wait('@getList');
    const itemEventList = 'div.ant-tabs-tabpane-active div.ant-card-bordered div.ant-card-body';
    cy.get(itemEventList)
      .find('h3').should($header => {
      expect($header, 'Should have 1 item on event list').have.length(1);
    });
  });
});
