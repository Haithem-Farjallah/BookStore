#Bookstore Web Application
This is a bookstore web application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). It incorporates JWT authentication for user authentication, Nodemailer for sending emails, and Redux Toolkit for state management.

#Features
User authentication using JWT
Account creation with email confirmation
Password recovery functionality
Account confirmation after login
CRUD operations for books
Add books to cart
User-friendly interface
Email notifications using Nodemailer
State management with Redux Toolkit
Technologies Used
MongoDB: A NoSQL database used to store book and user data.
Express.js: A web application framework for Node.js used for building RESTful APIs.
React.js: A JavaScript library for building user interfaces.
Node.js: A JavaScript runtime used for server-side logic.
JWT (JSON Web Tokens): Used for user authentication.
Nodemailer: A module for Node.js applications used to send emails.
Redux Toolkit: A library for managing global state in React applications.
Setup Instructions
Clone the repository: git clone https://github.com/your-username/bookstore-web-app.git
Navigate to the project directory: cd bookstore-web-app
Install dependencies: npm install
Create a .env file in the root directory and add the following environment variables:
makefile
Copy code
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
Start the development server: npm start
Usage
Register a new account with a valid email address.
Confirm your account by clicking on the confirmation link sent to your email.
Log in using your credentials.
Recover your password in case you forget it.
Browse the bookstore, add books to your cart, and proceed to checkout.
Receive email notifications for account confirmation, order confirmation, and updates.
Manage your profile, orders, and cart.
