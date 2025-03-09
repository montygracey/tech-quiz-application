# Tech Quiz

A MERN stack application that tests users' knowledge of programming concepts through an interactive quiz format. The application presents users with random technical questions, tracks their score, and allows them to restart the quiz after completion.

## Video Demo

[Watch the Tech Quiz Application in Action](https://drive.google.com/file/d/1oZyin3BYmQ50_U1JtHIc1F6rCgQcWa4c/view?usp=sharing)

## Features

- Quiz with randomly selected technical questions
- Answer tracking and scoring system
- Responsive UI built with React and Bootstrap
- MongoDB database storage for quiz questions
- API endpoints for retrieving questions
- Comprehensive testing with Cypress

## Technologies

- **Frontend**: React, TypeScript, Bootstrap
- **Backend**: Node.js, Express, MongoDB
- **Testing**: Cypress (component and E2E tests)
- **Build Tools**: Vite, TypeScript

## Setup Instructions

1. Clone the repository
   ```
   git clone 
   cd tech-quiz
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up MongoDB
   - Create a `.env` file in the `server` directory
   - Add your MongoDB connection string:
     ```
     MONGODB_URI='mongodb://127.0.0.1:27017/techquiz'
     ```

4. Seed the database
   ```
   npm run seed
   ```

5. Start the application
   ```
   npm run start:dev
   ```

## Testing

The application uses Cypress for both component and end-to-end testing:

### Component Tests
- Quiz component testing in isolation
- Tests for initial state, question display, navigation, and score display
- File location: `cypress/component/Quiz.cy.jsx`

### End-to-End Tests
- Full application flow testing
- Tests the complete user journey through the application
- File location: `cypress/e2e/quiz.cy.js`

### Running Tests

Run all tests:
```
npm test
```

Run component tests only:
```
npm run test:component
```

Run E2E tests only:
```
npm run test:e2e
```


## Project Structure

```
tech-quiz/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── models/         # TypeScript interfaces
│   │   └── services/       # API service functions
├── cypress/                # Cypress tests
│   ├── component/          # Component tests
│   │   └── Quiz.cy.tsx     # Quiz component test
│   ├── e2e/                # End-to-end tests
│   │   └── quiz.cy.js      # Quiz application flow test
│   ├── fixtures/           # Test data
│   │   └── questions.json  # Mock questions for tests
│   └── support/            # Cypress support files
├── server/                 # Express backend
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API routes
│   │   └── seeds/          # Database seed data
└── package.json            # Project configuration
```
