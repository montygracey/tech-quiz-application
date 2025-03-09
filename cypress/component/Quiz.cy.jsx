import React from 'react';
import Quiz from '../../client/src/components/Quiz';


describe('Quiz Component', () => {
  beforeEach(() => {
    // Stub the getQuestions API call
    cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('getQuestions');
  });

  it('renders the start button initially', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').should('be.visible');
  });

  it('shows questions after clicking start', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getQuestions');
    cy.get('h2').should('exist'); // Check that a question is displayed
    cy.get('h2').should('not.be.empty'); // Check that it has content
    cy.get('.btn-primary').should('have.length.at.least', 3); // Check that answer buttons are displayed
  });

  it('advances to the next question after answering', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getQuestions');
    
    // Click the first answer
    cy.get('.d-flex.align-items-center.mb-2').first().find('button').click();
    
    // Check that we're either on a new question or at the completed screen
    cy.get('body').then(($body) => {
      if ($body.find('h2:contains("Quiz Completed")').length > 0) {
        // We've finished the quiz, which is valid
        cy.get('h2').should('contain', 'Quiz Completed');
      } else {
        // We should still see a question
        cy.get('.d-flex.align-items-center.mb-2').should('exist');
      }
    });
  });

  it('shows the score after completing the quiz', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getQuestions');
    
    // Answer all questions
    cy.get('.d-flex.align-items-center.mb-2').first().find('button').click();
    cy.get('.d-flex.align-items-center.mb-2').first().find('button').click();
    cy.get('.d-flex.align-items-center.mb-2').first().find('button').click();
    
    // Check that the score is displayed
    cy.get('h2').should('contain.text', 'Quiz Completed');
    cy.get('.alert-success').should('contain.text', 'Your score:');
    cy.get('button').contains('Take New Quiz').should('be.visible');
  });

  it('allows starting a new quiz after completion', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getQuestions');
    
    // Answer all questions
    cy.get('.d-flex.align-items-center.mb-2').first().find('button').click();
    cy.get('.d-flex.align-items-center.mb-2').first().find('button').click();
    cy.get('.d-flex.align-items-center.mb-2').first().find('button').click();
    
    // Start a new quiz
    cy.get('button').contains('Take New Quiz').click();
    cy.wait('@getQuestions');
    
    // Check that a new question is displayed
    cy.get('h2').should('not.contain.text', 'Quiz Completed');
    cy.get('.d-flex.align-items-center.mb-2').should('exist');
  });
});