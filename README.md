# Backend Project

This project is a backend service built using modern technologies and powerful Node.js libraries. It employs modern architectures such as Dependency Injection and Decorators to ensure clean, maintainable, and scalable code.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [API Documentation](#api-documentation)
- [Logging](#logging)
- [Dependency Injection](#dependency-injection)
- [Routing](#routing)
- [Decorators](#decorators)
- [Running the Project](#running-the-project)

---

## Technologies Used

### Core Dependencies
- **Express.js**: A fast and minimalist web framework for Node.js, used to handle HTTP requests and routing.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB, used to interact with the database.
- **Typegoose**: A wrapper for Mongoose that allows defining models using TypeScript classes and decorators.
- **Inversify**: A powerful dependency injection (DI) container for TypeScript and JavaScript, used to manage dependencies and promote modularity.
- **Zod**: A TypeScript-first schema validation library, used for validating input data.
- **Pino**: A fast and low-overhead logging library, used for structured logging.
- **Swagger UI Express**: A middleware to serve Swagger API documentation.

### Development Dependencies
- **@types/express**: TypeScript definitions for Express.
- **@types/mongoose**: TypeScript definitions for Mongoose.
- **pino-pretty**: A prettifier for Pino logs to make them more readable during development.
- **pino-mongodb**: A transport for Pino to store logs in MongoDB.

---

## Project Structure

The project is organized into modules, with each module containing its own controllers, services, and models. The main components include:

- **`src/index.routes.ts`**: Handles route setup and registration.
- **`src/modules/`**: Contains application modules (e.g., `user` module).
- **`src/common/`**: Shared utilities, configurations, and types.
- **`src/exceptions/`**: Custom exception handlers.
- **`src/configs/`**: Configuration files for MongoDB, logging, etc.
- **`openapi.json`**: OpenAPI specification for API documentation.

---

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```
   PORT=3000
   MONGODB_URI=<your-mongodb-uri>
   MONGODB_DATABASE=<your-database-name>
   ```

4. Start the server:
   ```bash
   npm start
   ```

---

## API Documentation

The API documentation is generated using Swagger and is available at `/api-docs`. The OpenAPI specification is defined in the `openapi.json` file.

To access the documentation:
1. Start the server.
2. Navigate to `http://localhost:<PORT>/api-docs`.

---

## Logging

The project uses **Pino** for structured logging. Logs are output in JSON format and can be prettified during development using `pino-pretty`. Additionally, logs can be stored in MongoDB using `pino-mongodb`.

Example log output:
```json
{
  "level": "info",
  "time": 1633024800000,
  "msg": "Request received: GET /api/v1/users"
}
```

---

## Dependency Injection

Dependency Injection (DI) is implemented using **Inversify**. This allows for better modularity and testability by decoupling dependencies.

Example of DI setup:
```typescript
import { Container } from 'inversify';
import { UserService } from '@modules/user/user.service';
import { UserController } from '@modules/user/user.controller';

const container = new Container();
container.bind<UserService>(UserService).toSelf();
container.bind<UserController>(UserController).toSelf();

export default container;
```

---

## Routing

Routes are dynamically registered using decorators and metadata reflection. The `setupRoutes` function scans controllers and registers routes based on the metadata.

Example route registration:
```typescript
@Controller('/users')
class UserController {
  @Get('/')
  getUsers() {
    // Handle GET /api/v1/users
  }

  @Post('/')
  createUser() {
    // Handle POST /api/v1/users
  }
}
```

---

## Decorators

Custom decorators are used to define routes and metadata for controllers and methods. These decorators simplify route registration and make the code more declarative.

Example decorators:
```typescript
@Controller('/users')
class UserController {
  @Get('/')
  getUsers() {
    // Handle GET /api/v1/users
  }

  @Post('/')
  @Middleware(someMiddleware)
  createUser() {
    // Handle POST /api/v1/users
  }
}
```

---

## Running the Project

1. Ensure MongoDB is running and accessible.
2. Start the server:
   ```bash
   npm start
   ```
3. The server will be available at `http://localhost:<PORT>`.
