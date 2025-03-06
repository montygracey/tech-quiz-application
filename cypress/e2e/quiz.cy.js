describe('Tech Quiz Application', () => {
  beforeEach(() => {
    // Visit the application before each test
    cy.visit('/');
  });

  it('displays the start quiz button initially', () => {
    cy.get('button').contains('Start Quiz').should('be.visible');
  });

  it('starts the quiz when the start button is clicked', () => {
    cy.get('button').contains('Start Quiz').click();
    
    // Wait for questions to load
    cy.get('.card').should('exist');
    cy.get('h2').should('exist');
    cy.get('.btn-primary').should('have.length.at.least', 3);
  });

  it('advances after answering a question', () => {
    cy.get('button').contains('Start Quiz').click();
    
    // Wait for first question to load
    cy.get('h2').should('exist');
    
    // Get the initial number of questions answered (0 at start)
    const initialIndex = 0;
    
    // Click the first answer
    cy.get('.d-flex.align-items-center.mb-2').first().find('button').click();
    
    // After answering, either we should see a new question or the completion screen
    cy.get('body').then($body => {
      if ($body.find('h2:contains("Quiz Completed")').length > 0) {
        // If we've reached the end (with only 3 mock questions), that's valid
        cy.get('h2').should('contain.text', 'Quiz Completed');
      } else {
        // Otherwise, we should still be on a question screen
        cy.get('.d-flex.align-items-center.mb-2').should('exist');
      }
    });
  });

  it('completes the full quiz flow', () => {
    cy.get('button').contains('Start Quiz').click();
    
    // Answer 10 questions (or however many are available)
    for (let i = 0; i < 10; i++) {
      // Check if we're still on a question or if we've reached the end
      cy.get('body').then($body => {
        if ($body.find('h2:contains("Quiz Completed")').length === 0 &&
            $body.find('.d-flex.align-items-center.mb-2 button').length > 0) {
          // Still on questions, click an answer
          cy.get('.d-flex.align-items-center.mb-2').first().find('button').click();
        }
      });
    }
    
    // Check that we've reached the end
    cy.get('h2').should('contain.text', 'Quiz Completed');
    cy.get('.alert-success').should('contain.text', 'Your score:');
    
    // Start a new quiz
    cy.get('button').contains('Take New Quiz').click();
    
    // Verify we're back to questions
    cy.get('h2').should('exist');
    cy.get('.d-flex.align-items-center.mb-2').should('exist');
  });
});