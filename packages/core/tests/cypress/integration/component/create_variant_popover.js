describe('Variant Test', () => {
  before(() => {
  });

  beforeEach(function initial() {
    this.loginMe = {};
    this.menuData = {};
    cy.server();
    cy.fixture('auth/me.json').as('me');
    cy.fixture('views/components/getViewMenuData.json').as('viewMenuData');

    cy.visitStubbed('/codelab/e-commerce-store', {
      loginMe: this.loginMe,
      menuData: this.menuData,
    });
  });

    it('Variant Nav Test', () => {

      const tabsMVC = 'div.ant-tabs-nav-animated div.ant-tabs-tab';
      cy.get(tabsMVC).eq(1).click()


      cy.route('POST', Cypress.env('graphqlUrl'), 'fixture:views/components/getComponents.json').as(
        'getComponents',
      );

      const tabNavScroll = 'div.ant-tabs-nav-scroll';
      cy.get(tabNavScroll)
      .eq(2).find('div.ant-tabs-tab').eq(1).click();

      cy.wait('@getComponents');

      const iconSetting = 'div i.anticon-setting';
      cy.get(iconSetting)
        .eq(2)
        .click();

      const wrapperCreate = 'div.ant-popover div.ant-card-head-wrapper';
      cy.get(wrapperCreate).should($head => {
        expect(
          $head,
          'Select a Variant (Create an Element with Variant)',
        ).to.contain('Select a Variant');
      });

      const iconAddExtra = 'div.ant-popover div.ant-card-head-wrapper .ant-card-extra a';
      cy.get(iconAddExtra).click();

      const headTitle = 'div.ant-card-head-title';
      cy.get(headTitle).should($head => {
        expect($head, 'Create a Variant ').to.contain('Create a Variant');
      });

      const btnAddClass = 'button.ant-btn';
      cy.get(btnAddClass)
        .eq(3)
        .click();
      const inputClasName = 'div.ant-select-selection__rendered';
      cy.get(inputClasName)
        .eq(0)
        .click();
      //Add Item Button(last + button item) on drop box of `Select Class Name`
      const btnAddItem = 'div.ant-select-dropdown';
      cy.get(btnAddItem)
        .contains('Add Item')
        .click();

      const divTitle = 'div.ant-card-head-title';
      cy.get(divTitle).should($head => {
        expect($head, 'Create a Class ').to.contain('Create a Class');
      });

      cy.get(divTitle)
        .find('a')
        .click();

      cy.get(divTitle).should($head => {
        expect($head, 'Create a Variant ').to.contain('Create a Variant');
      });
      cy.get(divTitle)
        .find('a')
        .click();

      cy.get(divTitle).should($head => {
        expect($head, 'Select a Variant ').to.contain('Select a Variant');
      });
    });

});
