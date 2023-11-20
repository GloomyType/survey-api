markdown
Copy code
# Nest GraphQL Survey API

This project sets up a Nest.js project with GraphQL for building a survey API.

## Getting Started

To get started, create a Nest project and install the necessary dependencies:

```bash
npm install --save @nestjs/graphql apollo-server-express graphql
npm install --save @nestjs/apollo
Folder Structure
plaintext
Copy code
src/
├── api/
│   └── survey/
│       ├── dto/
│       │   └── create-survey.dto.ts
│       ├── entities/
│       │   └── survey.entity.ts
│       ├── survey.module.ts
│       ├── survey.resolver.ts
│       └── survey.service.ts
├── commons/
│   └── graphql/
│       └── schema.gql
├── app.module.ts
└── main.ts
Database Design
Question Table

Columns: PK, Question, Content
Choice Table

Columns: PK, Question Table PK (1:N relationship), Choice Content, Score, Order
Survey Table

Columns: PK, Survey Name, Survey Description, Array of Question PKs
Answer Table

Columns: PK, Survey Table PK, User Table PK, Array of Choice PKs, Total Score
API Design
CRUD Operations
Implement basic CRUD operations for each table.
Fetching Survey Questions
Use the getQuestionsBySurveyId method in the SurveyResolver to retrieve questions and choices for a specific survey.
Example Response:

json
Copy code
{
  "data": {
    "getQuestionsBySurveyId": [
      {
        "content": "Where would you like to go?",
        "choices": ["Seoul", "New York", "Paris", "Shanghai", "Apple"]
      },
      {
        "content": "What do you want to eat?",
        "choices": ["Apple", "Kale", "Kiwi", "Grapes"]
      }
    ]
  }
}
Answering Surveys
Utilize the AnswerResolver to handle user responses and calculate total scores.
Error Handling
Error and log handling is centralized in commons/filters/custom-exception.filter.ts for consistent handling of GraphQL and 404 errors.

Running the Server
bash
Copy code
npm start
Visit http://localhost:4000/graphql to interact with the API.

Enjoy your Nest GraphQL Survey API!
