# Project Idea:

essentialCRM is a CRM designed to provide a simple, no frills way to keep track of communications and transactions with your clients. It will store User account information and client contact information with communication and transaction records associated to both the purchasing client and the user responsible for the sale.

# SCRUM Master:

- Rory Ellis

# Frontend - Components:

- Navigation
- Update information
- Search (clients by email, zip(optional))
- Customer Info
- Activity
- Stretch: Analytics Dashboard

# Backend-Models:

- Users
  - First Name
  - Last Name
  - Email
  - Password
  - REF: Communications
  - REF: Transactions
- Clients
  - First Name
  - Last Name
  - Email
  - Address
  - City
  - State
  - Zip
  - Phone
  - REF: Communications
  - REF: Transactions
- Communications
  - Subject
  - Body
  - Date
  - REF: User
  - REF: Client
- Transactions
  - Product
  - Price
  - Date
  - REF: User
  - REF: Client

MVP

User Stories

- As a user, I would be able to search clients.

- As a user, I want to see listings of all clients based on search criteria.

- As a user, I want to be able to update client information.

- As a user, I want to be able to track customers.

- As a user, I want to be able to track sales.

Post MVP Stretch Goal

- As a user, I would like to display an analytics dashboard for sales and clients.

Schema

Sample Schema

{
"Users":
"First Name": "Jo",
Last Name: "abc",
Email: "abc@gmail.com",
Password: "**\*\*\***",

}
"Clients":
"First Name": "Foolan",
Last Name: "xyz",
Email: "xyz@gmail.com",
Password: "**\*\*\***",
Address: "8 west st"
City: "Newark"
State: "NJ"
zip: "413240"
phone: "409-800-008"
}
{
"Communications":
"Subject": "Sales",
Body: "Sales by Country",
Date: "May 15, 2020",
}
]
