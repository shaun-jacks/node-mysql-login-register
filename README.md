 # node-mysql-login-register
User Login Register with JWT- React front-end and Node and MySQL REST API back-end

## Features
- User Registration
- User login and authentication via Json Web Tokens (JWT)
- Password Reset via email using one-time use expired link via JWTs

### Config
In config/config.json:
- Set your database connection parameters

In .env file:
- NODE_ENV=<your node env>,
- EMAIL_LOGIN=<your email for password reset>
- EMAIL_PASSWORD=<email password>
- jwtPrivateKey=<your  jwt  private key>

## Usage

### Install
- `npm install && npm run client-install`

### Test
- `npm run test`

### Run
- `npm run dev`




