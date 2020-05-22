# essentialCRM - Backend API

# Description

essentialCRM is a Customer Relationship Management tool designed to provide a simple, no frills way to keep track of communications and transactions with your clients. It will store User account information and Client contact information with communication and transaction records associated to both the purchasing client and the user responsible for the sale.

# Deployed Applications

- Backend - https://glacial-sands-49555.herokuapp.com/
- Frontend - https://essentialcrm.herokuapp.com/

# Github Repositories

- Backend - https://github.com/statst/Group-project-CRM-backened
- Frontend - https://github.com/statst/Group-Project-CRM-frontend

# Technologies Used

- express - Node.js framework
- mongoose - MongoDB object modeling
- bcrypt - Password Hashing
- passport - Password authentication
- passport-jwt - Authentication Strategy
- jsonwebtoken - Generating authentication tokens
- nodemon - Running local express application
- MongoDB Atlas/Local MongoDB Community Server - Database

## Testing Technologies

- chai - Testing assertion library
- mocha - Testing framework
- superagent - HTTP request library
- supertest - Testing library

# Getting Started

- If you wish to run this application locally, or make edits to it, you can find instructions for forking and cloning the repository here. https://help.github.com/en/github/getting-started-with-github/fork-a-repo
- You will also need to run a local MongoDB Community Server. https://www.mongodb.com/download-center/community
- Install dependencies in your cloned directory with `npm install`
- Create a .env file in the root directory with a variable JWT_SECRET=anyrandomstring
- Run the application with `npm start`

# Supported Endpoints

- Users
  - /api/users
    - '/signin' - POST with email and password to return an Authorization Bearer Token.
    - '/' - GET all user records, POST a new user record
    - '/:email' - GET user by email, PUT update user record, DELETE user record
    - '/:email/transactions' - GET all transactions by user email
    - '/:email/communications' - GET all communications by user email
- Clients
  - /api/clients
    - '/' - GET all client records, POST a new client record
    - '/:email' - GET client by email, PUT update client record, DELETE client record
    - '/:email/transactions' - GET all transactions by client email
    - '/:email/communications' - GET all communications by client email
- Transactions
  - /api/transactions
    - '/' - GET all transactions, POST a new transaction
    - '/:id' - GET transaction by id, PUT update transaction, DELETE transaction
- Communications
  - /api/communications
    - '/' - GET all communications, POST a new communication
    - '/:id' - GET communication by id, PUT update communication, DELETE communication

# Contribution

- This is a student project presented for evaluation and is not open for outside contributions at this time.

# Contributor Team

- TK Nguyen - https://www.linkedin.com/in/tuongknguyen/
- Rory Ellis - https://www.linkedin.com/in/roryellis/
- Foolan Bhosale - https://www.linkedin.com/in/foolan-bhosale
- Jyoti Shinde - https://www.linkedin.com/in/jyoti-shinde/
