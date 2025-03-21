# Customer Management Application - EuCorretor

## Overview
This is a full-stack application for managing customers. The project consists of a React frontend and a Spring Boot backend using PostgreSQL for data persistence.

## Demo
![App Screenshot](https://i.postimg.cc/Cx98zTfG/Screenshot-2025-03-20-at-21-23-13.png)
## Stack 

### Frontend:
- React.js
- Tailwind CSS
- Axios (for API calls)

### Backend:
- Java Spring Boot
- PostgreSQL
- Spring Data JPA
- H2 DB for tests

## API

| Type   | Path       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `GET` | `customers` | Fetch all customers |
| `POST` | `customers` | Create a new customer |
| `PUT` | `customers/{id}` | Update customer data |
| `DELETE` | `customers/{id}` | Delete a customer |

## Features
- List customers with basic details
- Add new customers
- Edit customer details
- Delete customers
- View detailed customer information

## Next
- Add fields to customer registration (Frontend)
- Add reminder features and automation (e.g. birthday)
- 

