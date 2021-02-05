# tweeterBE
This is a Tweet clone user authentication API. Number of different libraries were utilized to develop this API. User can be registered and logged in. Upon registertion, jwt token will be issed, which should be provided to the '/' route along with the content-type, in order to retrieve the user info.

### STACK
* NodeJS
* MondoDB/Mongoose

### Implementation
* express-validator package is used for the user input validation, like: username, email and password. 
* Use of Mocha and Chai for unit testing for user input methods and Routes validation.
* jsonwebtoken for user login management
* mongoose and mongoDB for querying the server.
* Use of POSTMAN for the request and response to the RESTful API's.

### Dependencies
- bcrypt: ^5.0.0
- body-parser: ^1.19.0
- chai-http: ^4.3.0
- dotenv: ^8.2.0
- express: ^4.17.1
- express-validator: ^6.9.2,
- jsonwebtoken": ^8.5.1,
- mongodb: ^3.6.4,
- mongoose: ^5.11.15
- nodemon: ^2.0.7

### Initialize server
```
npm start
```

### Initialize test cases
```
npm test
```
