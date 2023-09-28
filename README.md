# Task Manager App

This is a simple task manager app built with Node.js, Express, and MongoDB.

Installation

- Clone the repository: git clone https://github.com/mushtaque87/airtribe_taskmanager.git
- Install the dependencies: npm install or yarn install
- Set the environment variables: cp .env.example .env and update the values in the .env file
- Start the server: npm server or yarn server

## API Endpoints

### GET /tasks

_Retrieve all tasks._

**Request**
`GET /tasks`

**Response**

```
[
  {
    "id": "1",
    "title": "Task 1",
    "description": "Description of Task 1",
    "completed": false,
    "createdAt": "2021-10-01T00:00:00.000Z",
    "updatedAt": "2021-10-01T00:00:00.000Z"
  },
  {
    "id": "2",
    "title": "Task 2",
    "description": "Description of Task 2",
    "completed": true,
    "createdAt": "2021-10-02T00:00:00.000Z",
    "updatedAt": "2021-10-02T00:00:00.000Z"
  }
]
```

### GET /tasks/:id

_Retrieve a single task by its ID._

**Request**
`GET /tasks/1`

**Response**

```
{
  "id": "1",
  "title": "Task 1",
  "description": "Description of Task 1",
  "completed": false,
  "createdAt": "2021-10-01T00:00:00.000Z",
  "updatedAt": "2021-10-01T00:00:00.000Z"
}
```

### POST /tasks

_Create a new task._

**Request**

```
POST /tasks Content-Type: application/json

{
  "title": "New Task",
  "description": "Description of New Task",
  "completed": false
}

```

**Response**

```
{
  "id": "3",
  "title": "New Task",
  "description": "Description of New Task",
  "completed": false,
  "createdAt": "2021-10-03T00:00:00.000Z",
  "updatedAt": "2021-10-03T00:00:00.000Z"
}
```

### PUT /tasks/:id

_Update an existing task by its ID._

**Request**

```
PUT /tasks/1
Content-Type: application/json

{
  "title": "Updated Task",
  "description": "Description of Updated Task",
  "completed": true
}
```

**Response**

```
{
  "id": "1",
  "title": "Updated Task",
  "description": "Description of Updated Task",
  "completed": true,
  "createdAt": "2021-10-01T00:00:00.000Z",
  "updatedAt": "2021-10-04T00:00:00.000Z"
}
```

### DELETE /tasks/:id

_Delete a task by its ID._

**Request**
`DELETE /tasks/1`

**Response**
"Task deleted successfully"

**Postman collection Included in the project repo**
_airtribe_taskmanager.json_

![Postman Collection]
(/assets/request_collection.png)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
