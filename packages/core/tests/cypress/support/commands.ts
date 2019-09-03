import stubRoute from './stubRoute';
import visitStubbed from './visitStubbed';
import checkSignin from './signin';
// import visitStubbed from './stubedRoute';

Cypress.Commands.add('visitStubbed', visitStubbed);
Cypress.Commands.add('stubRoute', stubRoute);
Cypress.Commands.add('checkSignin', checkSignin);
// Cypress.Commands.add('visitStubbed', visitStubbed);
