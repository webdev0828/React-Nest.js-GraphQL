import './commands';
import './fetchPolyfill';

Cypress.on('window:before:load', win => {
  win.fetch = null;
});
