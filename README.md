

# toDoer

toDoer is a task app manager API.

## Table of Contents

- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Technologies

- Node.js
- Express.js
- Mongoose.js
- bcryptjs
- cors
- dotenv
- helmet
- nodemon
- mongoDB

## Installation

1. Clone the repository: `git clone https://github.com/jesusfvj/toDoer-back.git`
2. Install the dependencies: `npm install`

## Usage

1. Start the server: `npm start`
2. Find the .env example file and create your own .env with your own variables
3. Connect to MongoDB
4. Access the API at `http://localhost:4001/api-endpoints`

## API Endpoints

### User Endpoints

| Endpoint | Method | Description |
| -------- | ------ | ----------- |
| /api/user/register | POST | Register a new user |
| /api/user/login | POST | Authenticate a user |
| /api/user/delete | DELETE | Delete a user |

### Task Endpoints

| Endpoint | Method | Description |
| -------- | ------ | ----------- |
| /api/todo/register | POST | Create a new task |
| /api/todo/get/:userId | GET | Get all tasks for a specific user |
| /api/todo/delete/:todoId | DELETE | Delete a specific task |
| /api/todo/update/:todoId | PUT | Update a specific task |
| /api/todo/changestate/:todoId | PUT | Change the state of a specific task |

## Environment Variables

In order to use MongoDB with the toDoer Backend, you need to set up a MongoDB database and obtain the necessary URL key. You can check the file named `.env example` at the root of the project which provides a layout for the environment variables that need to be added.

The `.env example` file should look like this:

```
PORT=4001
MONGODB_URL=YOUR_MONGODB_CONNECTION_URL
NODE_ENV="development"
TOKEN_SECRET="STRING_OF_YOUR_CHOICE"
```

Make sure to replace MONGODB_URL with the actual URL connection to MongoDB and TOKEN_SECRET with a string of your choice. You can then rename the file to `.env` and add it to your `.gitignore` file so that it is not included in version control.

## Contributing

1. Fork the project.
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request.
