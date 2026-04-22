# Open Source Web Programming Final

A robust, enterprise-ready RESTful backend API built with **TypeScript**, **Node.js**, **Express**, and **MongoDB**. This project serves as the final submission for the Open Source Web Programming course.

---

## Key Features

- **TypeScript First:** Fully developed in TypeScript for strong static typing and long-term maintainability.
- **Clean Architecture:** Organized structure adhering to Domain-Driven Design principles with clear Application, Domain, and Presentation layers.
- **Authentication:** Secure user authentication flows utilizing JWT (`jsonwebtoken`) and encrypted passwords (`bcryptjs`).
- **Database Integration:** Seamless MongoDB object data modeling via `mongoose`.
- **Automated Testing:** Comprehensive TDD setup running on `jest` and `supertest`, strictly enforcing 80% code coverage across the board.

---

## Tech Stack

- **Runtime Environment:** Node.js
- **Web Framework:** Express.js
- **Language:** TypeScript
- **Database Engine:** MongoDB (Mongoose)
- **Quality Assurance:** Jest, ts-jest, Supertest
- **Development Tools:** Nodemon, ts-node, dotenv

---

## Getting Started

### Prerequisites

Ensure you have the following installed to run this project:
- **Node.js** (v18.x or higher)
- **MongoDB** (running locally via daemon or through MongoDB Atlas)

### Installation

1. Navigate to the core application directory:
   ```bash
   cd my-ts-app
   ```
2. Install all required dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables by creating a `.env` file in the root of the `my-ts-app` folder with the following structural example:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/final-db
   JWT_SECRET=your_super_secret_key_here
   ```

---

## Available Scripts

While in the `my-ts-app` directory, you can run:

- **Development Mode** (Hot-reloading enabled):
  ```bash
  npm run dev
  ```
- **Production Compilation** (Compiles TS to JS into the `/dist` output folder):
  ```bash
  npm run build
  ```
- **Production Start** (Runs the compiled build - ensure you run `build` first):
  ```bash
  npm start
  ```

---

## Testing & Coverage

This project utilizes Jest for all unit and integration testing. Run the test suite using:

```bash
npm run test
```

*Note: There is a strictly enforced global coverage threshold in this codebase (80% statements/functions/lines, 70% branches). The CI/CD pipeline or local scripts will fail if coverage dips below this limit.*

---
**Author:** Final Project Submission for Open Source Web Programming.
