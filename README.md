# Khan Dashboard Backend

A progressive NestJS application serving as the backend for the Khan Admin Dashboard. It manages weddings, assignments, members, calendar views, and provides real-time updates using WebSockets.

## Overview

This project is built using:
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT & Passport
- **Real-time**: Socket.IO for WebSockets

## Features and Modules

- **Authentication & Authorization (`auth`, `users`)**
  - JWT-based authentication with bcrypt hashing.
  - Role-based access control strategies via Passport.
  - User management and secure credentials access for the Admin Dashboard.

- **Weddings Management (`weddings`)**
  - Full CRUD API operations for weddings and bookings.
  - Specific schema structures including fields like `venueName`, `clothingRequirements`, and `totalPrice`.

- **Wedding Assignments (`wedding-assignments`)**
  - Assign team members, staff, and performers to specific weddings.
  - Designed to handle batch assignment capabilites.

- **Calendar Integration (`calendar`)**
  - API endpoints engineered for querying events over specific date ranges.
  - Facilitates visualizing weddings and tasks in the dashboard calendar view.

- **Dashboard Statistics (`dashboard`)**
  - Provides aggregated operational data and business metrics.
  - Returns summarized data on bookings, revenue, and active engagements for instant admin overview.

- **Team Members (`members`)**
  - Extensive management structure for team members, staff, and performers.

- **Real-Time Updates (`websocket`)**
  - Socket.IO-based gateways (`@nestjs/platform-socket.io` & `@nestjs/websockets`).
  - Broadcasts live updates for seamless synchronization between the backend and all connected dashboard clients.

## Project Setup

### Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL database
- Environment configurations (e.g., `.env`)

### Installation

```bash
$ npm install
```

## Running the application

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# production mode
$ npm run start:prod
```

## Database Utilities

- **TypeORM** handles entity migrations and synchronization with the connected PostgreSQL instance.
- **Seeding:** The project contains built-in database seeds (located in `src/database/seeds/seed.ts`).
  Run the seed script specifically with:
  ```bash
  $ npm run seed
  ```

## Code Quality and Tests

Maintain the repository logic using formatting and testing toolings.

```bash
# Format codebase with Prettier
$ npm run format

# Run linter
$ npm run lint

# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

NestJS and this boilerplate structure are [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
