# machine-test-Thomas-joseph

The app has three  api

Authentication - User Login
Endpoint: POST /api/v1/users/auth

This API endpoint allows users to authenticate by providing their email and password.

Request:

{
  "email": "user@example.com",
  "password": "securePassword123"
}
Upon successful authentication, the server will respond with user details and a token.



Get User Profile
Endpoint: GET /api/v1/users/get-profile

Retrieve the user profile information without providing any additional details if you are already logged in.

Request:
No request body required.

Response:
The server will respond with the user's profile details


It seems like you want to improve the description or documentation for your API. Here's a revised version:

Machine Test - Thomas Joseph API
Authentication - User Login
Endpoint: POST /api/v1/users/auth

This API endpoint allows users to authenticate by providing their email and password.

Request:
json
Copy code
{
  "email": "user@example.com",
  "password": "securePassword123"
}
Response:
Upon successful authentication, the server will respond with user details and a token.

Get User Profile
Endpoint: GET /api/v1/users/get-profile

Retrieve the user profile information without providing any additional details if you are already logged in.

Request:
No request body required.

Response:
The server will respond with the user's profile details.

Add User Address
Endpoint: POST /api/v1/users/add-address

Add a new address for the user by providing the place, country, and district in the request body.

Request:
{
  "place": "123 Main Street",
  "district": "Cityville",
  "country": "Countryland"
}
Upon successfully adding the address, the server will respond with a success message.

