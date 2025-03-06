// Import commands.js using ES2015 syntax:
import './commands';

// Import the mount function for component testing
import { mount } from 'cypress/react';

// Add the mount command
Cypress.Commands.add('mount', mount);

// Declare the mount command for TypeScript
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}