# EVFY_BE - Documentation
EVFY_BE is a backend server application for EVFY-FE. This application is built with Node.js and Express.js and provides the API endpoints for the car-sharing platform.

#### Backend deployed URL
#### http://13.233.106.225:8080/

## Table of Contents
### Installation
### Configuration
### API Endpoints
### Users API
### Vehicles API
<br />

### Installation
To install the EVFY_BE application, follow these steps:

Clone the repository from GitHub using the following command:

```bash
git clone https://github.com/FaranGreens/evfy_be.git
```
Change into the cloned repository directory using the following command:

```bash
cd evfy_be
```
Install the dependencies using the following command:
```bash
npm install
```
### Configuration
Before you can use the EVFY_BE application, you will need to set up a few environment variables. These variables can be set in a .env file located in the root of the project. Here is a list of the environment variables that you will need to set:

```makefile

DATABASE_URL=<database_url>
DATABASE_URL: This is the URL for the database server.
```
### API Endpoints
#### Users API
Create a user

Create a new user by sending a POST request to the /user/register endpoint with the following parameters in the request body:

username: Username for the user.

email: The email address of the user.

password: The password for the user account.

```bash
POST /user/register
```
Login
User can login with email and registered password
```bash
POST /user/login
```

Request Reset Link for Password

email: registered email

```bash
POST user/request-reset-link
```

Password update from backend

token generated will be hashed and sent on useremail id.

```bash
GET user/reset-password/userid/token
```

After updating the password, a POST request will be made on the same api. Internally the token is validated.
```bash
POST user/reset-password/userid/token
```

Cars API 

```curl
GET cars?q=sometext&page=2
```
Above api will give respond with JSON data.

```json
{
    "data": [],
    "count": 5,
    "totalPages": 3
}
```

