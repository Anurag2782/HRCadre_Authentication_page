# HRCadre consultant Assignment -- Login/signup

## Description
This project is a Node.js and MongoDB application that utilizes various technologies such as Express, EJS, Mongoose, Passport, Google OAuth authentication, Express-session, salting, and hashing. The application aims to provide a secure and efficient authentication system using Google as the authentication provider.

## Installation
1. Clone the repository: `git clone https://github.com/your/repo.git`
2. Navigate to the project directory: `cd project-directory`
3. Install dependencies: `npm install`

## Configuration
1. Create a `.env` file in the project root directory.
2. Provide the following environment variables in the `.env` file:

```plaintext
DB_CONNECTION_STRING=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=your_google_callback_url
```

## Usage
1. Start the application: `npm start`
2. Open your browser and visit: `http://localhost:3000`

## Dependencies
- express: ^4.17.1
- ejs: ^3.1.6
- mongoose: ^6.0.10
- passport: ^0.4.1
- passport-google-oauth20: ^2.0.0
- express-session: ^1.17.2
- bcrypt: ^5.0.1


## Acknowledgements
- [Express](https://expressjs.com/)
- [EJS](https://ejs.co/)
- [Mongoose](https://mongoosejs.com/)
- [Passport](http://www.passportjs.org/)
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)
- [Express Session](https://github.com/expressjs/session)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)

## Contact
For any inquiries or questions, you can reach out to [anuragsharma2782@gmail.com].