# Expense Tracker

This is a full-stack expense tracker application that allows users to manage their finances by tracking expenses, categorizing them, and visualizing transactions through charts.

## Features

*   **User Authentication:** Secure user registration and login.
*   **Category Management:** Add, edit, and delete expense categories.
*   **Transaction Management:** Add, edit, and delete transactions with details like amount, description, and category.
*   **Transaction Visualization:** View charts summarizing transaction data.
*   **User Profile:** Manage user profile information and update passwords.

## Technologies Used

**Backend:**

*   Node.js
*   Express
*   (MongoDB)

**Frontend:**

*   React
*   Vite
*   Redux (for state management)
*   Tailwind CSS (for styling)

## Setup

**Prerequisites:**

*   Node.js installed
*   npm or yarn installed
*   

**Backend Setup:**

1.  Navigate to the `backend` directory: `cd backend`
2.  Install dependencies: `npm install` or `yarn install`
3.  Create a `.env` file in the `backend` directory and add necessary environment variables (e.g., database connection string, JWT secret).
4.  Start the backend server: `npm start` or `yarn start`

**Frontend Setup:**

1.  Navigate to the `frontend` directory: `cd frontend`
2.  Install dependencies: `npm install` or `yarn install`
3.  Start the frontend development server: `npm run dev` or `yarn dev`

The frontend application should now be running and accessible in your web browser.

## API Endpoints

Based on the backend routes, the following API endpoints are available:

### User Endpoints:

*   `POST /api/v1/users/register`: Register a new user.
*   `POST /api/v1/users/login`: Log in a user.
*   `GET /api/v1/users/profile`: Get the logged-in user's profile (requires authentication).
*   `PUT /api/v1/users/change-password`: Change the logged-in user's password (requires authentication).
*   `PUT /api/v1/users/update-profile`: Update the logged-in user's profile (requires authentication).

### Category Endpoints:

*   `POST /api/v1/categories/create`: Create a new category (requires authentication).
*   `GET /api/v1/categories/lists`: Get all categories (requires authentication).
*   `PUT /api/v1/categories/update/:categoryId`: Update a category by ID (requires authentication).
*   `DELETE /api/v1/categories/delete/:id`: Delete a category by ID (requires authentication).

### Transaction Endpoints:

*   `POST /api/v1/transactions/create`: Create a new transaction (requires authentication).
*   `GET /api/v1/transactions/lists`: Get all transactions with optional filtering (requires authentication).
*   `PUT /api/v1/transactions/update/:id`: Update a transaction by ID (requires authentication).
*   `DELETE /api/v1/transactions/delete/:id`: Delete a transaction by ID (requires authentication).


## Future Improvements

Here are some potential future features and improvements for this project:

*   **Currency Support:** Allow users to select and manage transactions in different currencies.
*   **Recurring Transactions:** Implement functionality for setting up recurring transactions (e.g., monthly rent, salary).
*   **Advanced Reporting and Visualization:** Generate more detailed financial reports and visualizations (e.g., pie charts of spending by category, trend lines over time).
*   **Budgeting:** Enable users to set budgets for categories and track their spending against those budgets.
*   **Data Import/Export:** Provide options to import transaction data from external sources (e.g., CSV files) and export data.
*   **Improved Error Handling and Validation:** Enhance error handling and input validation on both the frontend and backend for a more robust application.
*   **Testing:** Add comprehensive unit and integration tests to ensure code quality and prevent regressions.
*   **Notifications:** Implement notifications for budget limits, upcoming bills, or other relevant events.
*   **User Interface Enhancements:** Improve the user interface and user experience based on user feedback.
*   **Cloud Deployment:** Provide instructions and configurations for deploying the application to cloud platforms (e.g., Heroku, AWS).
(Optional: List potential future features or improvements)