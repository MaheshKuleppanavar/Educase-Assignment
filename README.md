````markdown
# School Management API (Node.js Assignment)

## Objective
This project implements REST APIs using **Node.js**, **Express.js**, and **MySQL** to manage school data.  
The system allows users to **add new schools** and **retrieve schools sorted by proximity to a user's location**.

---

## Tech Stack
- Node.js
- Express.js
- MySQL
- dotenv
- mysql2

---

## Database Setup

Create the database and table in MySQL.

```sql
CREATE DATABASE schooldb;

USE schooldb;

CREATE TABLE school(
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(30),
    address VARCHAR(30),
    latitude FLOAT,
    longitude FLOAT
);
````

---

## Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/yourusername/school-management-api.git
cd school-management-api
```

### 2. Install dependencies

```
npm install
```

### 3. Create `.env` file

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=schooldb
PORT=3000
```

### 4. Start the server

```
npm start
```

Server will run on:

```
http://localhost:3000
```

---

# API Endpoints

## 1. Add School API

### Endpoint

```
POST /addSchool
```

### Request Body

```json
{
  "name": "Oxford High School",
  "address": "Bangalore",
  "latitude": 12.9716,
  "longitude": 77.5946
}
```

### Validation

The API validates:

* All fields must be provided
* Name and address must be strings
* Latitude and longitude must be numbers

### Example Response

```json
{
  "message": "School added successfully"
}
```

---

# 2. List Schools API

### Endpoint

```
GET /listSchools
```

### Query Parameters

```
latitude
longitude
```

### Example Request

```
/listSchools?latitude=12.9716&longitude=77.5946
```

### Functionality

* Fetch all schools from database
* Calculate distance between user and each school
* Sort schools based on nearest distance

Distance is calculated using the formula:

```
distance = √((lat1 - lat2)² + (lon1 - lon2)²)
```

### Example Response

```json
[
  {
    "id": "123",
    "name": "Oxford High School",
    "address": "Bangalore",
    "latitude": 12.9716,
    "longitude": 77.5946,
    "distance": 0
  }
]
```

---

# Hosting

The API can be deployed using cloud hosting platforms such as:

* Render

Example live endpoint:

```
https://school-api.onrender.com
```

---

# Testing

The APIs were tested using **Postman**.

### Postman Collection

The collection contains:

1. Add School API request
2. List Schools API request
3. Example request bodies
4. Expected responses

The collection can be shared via:

* Postman public link
* Exported JSON file

---

# Deliverables

This project submission includes:

### 1. Source Code Repository

Complete API implementation hosted on GitHub.

### 2. Live API Endpoints

Deployed APIs accessible for testing.

### 3. Postman Collection

Shared collection containing example requests and responses for both APIs.

---

# Author

Mahesh Kudleppanavar

```


