---

# School Management API

## Overview

This project implements a **School Management API** using **Node.js**, **Express.js**, and **MySQL**.

The system allows users to:

* Add new schools to the database
* Retrieve schools sorted by **distance from a user's location**

The APIs are deployed and publicly accessible for testing.

---

# Tech Stack

* **Backend:** Node.js + Express.js
* **Database:** MySQL
* **Hosting:** Railway
* **API Testing:** Postman

---

# Database Setup

The system uses a **MySQL database** with the following table.

### Table: `schools`

| Field     | Type                              | Description               |
| --------- | --------------------------------- | ------------------------- |
| id        | VARCHAR (Primary Key)             | Unique ID for each school |
| name      | VARCHAR                           | Name of the school        |
| address   | VARCHAR                           | School address            |
| latitude  | FLOAT                             | Latitude coordinate       |
| longitude | FLOAT                             | Longitude coordinate      |

### SQL Table Creation

```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  address VARCHAR(255),
  latitude FLOAT,
  longitude FLOAT
);
```

---

# API Endpoints

## 1️⃣ Add School

Adds a new school to the database.

**Endpoint**

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

### Response

```json
{
  "message": "School added successfully"
}
```

### Validation Rules

* All fields must be provided
* `latitude` and `longitude` must be valid numbers
* `name` and `address` cannot be empty

---

# 2️⃣ List Schools

Returns schools sorted by **distance from user location**.

**Endpoint**

```
GET /listSchools
```

### Query Parameters

| Parameter | Description    |
| --------- | -------------- |
| latitude  | User latitude  |
| longitude | User longitude |

### Example Request

```
GET /listSchools?latitude=12.97&longitude=77.59
```

### Example Response

```json
[
  {
    "id": 1,
    "name": "Oxford High School",
    "address": "Bangalore",
    "latitude": 12.9716,
    "longitude": 77.5946,
    "distance": 0.21
  }
]
```

Schools are sorted by **geographical distance from the user**.

---

# Distance Calculation

The system calculates the distance between the user’s coordinates and each school using geographic distance formulas and returns the sorted list based on proximity.

---

# Live API Deployment

The APIs are deployed on **Railway**.

### Base URL

```
https://educase-assignment.up.railway.app
```

### Live Endpoints

Add School

```
POST https://educase-assignment.up.railway.app/addSchool
```

List Schools

```
GET https://educase-assignment.up.railway.app/listSchools?latitude=12.97&longitude=77.59
```

---

# Database Connection

The application connects to MySQL using a **connection URL**.

Example:

```
MYSQL_URL=mysql://username:password@host:port/database
```

The server reads this value from environment variables.

---

# Postman Collection

A **Postman collection** is included for testing the APIs.

Import the provided file into Postman:

```
postman_collection.json
```

Or access the collection via link:

```
https://go.postman.co/collection/49218486-6b673782-4df2-477b-8a9f-6aaafb703997
```

The collection includes:

* Add School API request
* List Schools API request
* Example payloads

---

# Project Setup (Local Development)

Clone the repository:

```bash
git clone <repository-url>
cd educase-assignment
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```
MYSQL_URL=your_mysql_connection_url
PORT=3000
```

Run the server:

```bash
npm start
```

Server will start on:

```
http://localhost:3000
```

---

# Deliverables

This project includes:

* Complete **Node.js API implementation**
* **MySQL database integration**
* **Live deployed APIs**
* **Postman collection for testing**

Repository contains all required files and documentation for easy setup and testing.

---
