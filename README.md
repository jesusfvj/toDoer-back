

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

## Installation

1. Clone the repository: `git clone https://github.com/jesusfvj/toDoer-back.git`
2. Install the dependencies: `npm install`

## Usage

1. Start the server: `npm start`
3. Find the .env example file and create your own .env following the indications.
2. Access the API at `http://localhost:your-chosen-port/api-endpoints`

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

## Contributing

1. Fork the project.
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request.