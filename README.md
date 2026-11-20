Vasna Game Backend
A NestJS-based backend for a multiplayer game. The project is organized into feature modules for player data, matches, clans, progression systems, game content, and real-time communication.
> **Development status:** This repository is a work in progress. Several modules contain placeholder controllers or services, and the current implementation has security and API-design issues that must be addressed before production use. The feature list below describes the modules present in the codebase, not a claim that every feature is complete.
Technology Stack
NestJS 10 and TypeScript
MySQL
TypeORM
Socket.IO
JWT authentication support through `@nestjs/jwt` and Passport
`class-validator` and `class-transformer`
Jest for unit tests
Features and Modules
The source code is divided into the following feature modules:
Module	Responsibility
`users`	Player account and profile data
`matches`	Match records and match results
`moves`	Player move records and move queries
`kills`	Kill records and match/player statistics
`clans`	Clan management, members, invitations, and join requests
`clan-quests`	Clan quests and contribution tracking
`friends`	Player friendship records
`private-messages`	Private messaging
`notifications`	Player notifications
`cards`	Card definitions, unlocked cards, and selected cards
`campaign`	Campaigns and player campaign progress
`quests`	Quest definitions and player quest progress
`news`	News content and player news status
`products`	Product catalog, categories, and player purchase records
`battle-pass`	Battle passes, levels, rewards/inventory, and player progress
`game`	Socket.IO gateway for real-time events
The application also exposes a basic root endpoint:
```http
GET /
```
It currently returns `Hello World!`.
Requirements
Node.js and npm
MySQL server
A MySQL database configured for this application
The repository does not currently include a complete environment-based configuration. Database connection values are hardcoded in `src/app.module.ts`. Review and replace those values before running the application. Do not commit real credentials.
Getting Started
1. Clone the repository
```bash
git clone <repository-url>
cd vasna-game-backend
```
Replace `<repository-url>` with the actual repository URL.
2. Install dependencies
```bash
npm install
```
3. Configure MySQL
Create a MySQL database, then update the TypeORM connection settings in:
```text
src/app.module.ts
```
The current configuration specifies the database host, port, database name, username, and password directly in source code.
For any shared or production deployment, move these values to environment variables and load them through a proper configuration module. Do not use the sample credentials in a deployed environment.
4. Run the application
Development mode:
```bash
npm run start:dev
```
Standard mode:
```bash
npm run start
```
Production mode, after building:
```bash
npm run build
npm run start:prod
```
The application listens on port `3000` by default. The port can be overridden with the `PORT` environment variable.
Available Scripts
Command	Description
`npm run start`	Start the application
`npm run start:dev`	Start in watch mode
`npm run start:debug`	Start in debug/watch mode
`npm run build`	Compile the application
`npm run start:prod`	Run the compiled application
`npm run lint`	Run ESLint with automatic fixes
`npm run format`	Format source and test files with Prettier
`npm run test`	Run unit tests
`npm run test:watch`	Run tests in watch mode
`npm run test:cov`	Run tests with coverage
`npm run test:e2e`	Run end-to-end tests
Test files are present in the repository, but test execution and coverage have not been verified as part of this documentation.
Real-time Communication
The project registers a Socket.IO gateway in `src/game/game.gateway.ts`.
The events currently implemented in the gateway are:
Event	Direction	Current behavior
`ping`	Client → Server	Server responds to the requesting client with `pong`
`pong`	Server → Client	Sent after connection and in response to `ping`
`state`	Client → Server → Other clients	Received state data is broadcast to other connected clients
This is a minimal implementation. It does not currently provide authenticated socket connections, match-scoped rooms, payload validation, or authoritative game-state handling.
Project Structure
```text
src/
├── battle-pass/
├── campaign/
├── cards/
├── clan-quests/
├── clans/
├── friends/
├── game/
├── guards/
├── kills/
├── matches/
├── moves/
├── news/
├── notifications/
├── private-messages/
├── products/
├── quests/
├── users/
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```
Most feature modules follow a similar organization:
`*.module.ts` — NestJS module definition
`*.controller.ts` — HTTP route handlers
`*.service.ts` — business logic
`*.repository.ts` — database access
`dtos/` — request data-transfer objects
`entities/` — TypeORM entities
`*.spec.ts` — unit tests
Not every module currently contains all of these layers or has complete implementations.
Important Development Notes
Before using this backend with real players or deploying it publicly, address at least the following:
Database configuration: Remove hardcoded credentials and use environment-based configuration. Rotate any credentials that have been exposed.
Database schema management: `synchronize` is currently enabled in TypeORM configuration. Disable it for production and manage schema changes with migrations.
Authentication and authorization: Apply authentication consistently and enforce resource ownership and role-based permissions for sensitive operations.
JWT validation: Review the custom JWT guard and its user/admin authorization logic.
WebSocket security: Authenticate socket connections, validate incoming payloads, and scope broadcasts to the appropriate match or room.
Incomplete modules: Users, quests, and private messages contain placeholder implementations. Other modules also have unfinished logic.
API correctness: Review route parameter definitions, GET request bodies, DTO validation, exception handling, and controller return values.
Game economy and progression: Make rewards, purchases, currency changes, and progression updates authoritative and protected against duplicate or unauthorized requests.
Testing: Add integration and end-to-end tests for authentication, permissions, match flows, clan membership, purchases, and progression.
License
No open-source license is currently specified for this repository. Unless a license is added, the project should be treated as having no granted open-source reuse permissions.
