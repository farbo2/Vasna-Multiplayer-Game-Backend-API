# Vasna Game Backend

A NestJS and TypeScript backend for a multiplayer game. It provides modular HTTP APIs for player data, matches, clans, progression systems, game content, and private messaging, with Socket.IO support for real-time events.

> **Status:** Development project. Authentication, account handling, selected clan workflows, private messaging, quests, database configuration, and socket authentication have been strengthened. The project has not yet passed a clean dependency installation, compilation, database migration, or end-to-end test run in this revision. Do not treat it as production-ready until those checks and the remaining game-economy/security reviews are complete.

## Technology stack

- NestJS 10 and TypeScript
- MySQL and TypeORM
- Socket.IO
- JWT authentication
- bcrypt password hashing
- class-validator and class-transformer
- Jest

## Modules

| Module | Responsibility |
| --- | --- |
| `users` | Account registration, login, and player profile data |
| `matches` | Match records and results |
| `moves` | Player move records and date/type queries |
| `kills` | Kill records and player/match statistics |
| `clans` | Clan management, membership, invitations, and join requests |
| `clan-quests` | Clan quests and contribution tracking |
| `friends` | Player friendship records |
| `private-messages` | Authenticated private conversations and message state |
| `notifications` | Player notifications |
| `cards` | Card definitions, unlocked cards, and selected cards |
| `campaign` | Campaigns and player campaign progress |
| `quests` | Quest definitions and player quest progress |
| `news` | News content and player news status |
| `products` | Product catalog, categories, and purchase records |
| `battle-pass` | Battle passes, levels, rewards, inventory, and player progress |
| `game` | Authenticated Socket.IO connection and real-time events |

The root route is `GET /` and returns the default NestJS greeting. The root route and account registration/login are public; all other HTTP API routes require a JWT bearer token.

## Requirements

- Node.js compatible with the TypeScript/NestJS toolchain in `package.json`
- npm
- MySQL 8 or a compatible MySQL server

## Configuration

Set the following environment variables before starting the application:

| Variable | Description |
| --- | --- |
| `NODE_ENV` | `development` or `production` |
| `PORT` | HTTP port; defaults to `3000` |
| `CORS_ORIGINS` | Comma-separated allowed browser origins |
| `JWT_SECRET` | Secret used to sign and verify access tokens; use a long random value in production |
| `DB_HOST` | MySQL hostname |
| `DB_PORT` | MySQL port; defaults to `3306` |
| `DB_NAME` | Database name |
| `DB_USER` | Database username |
| `DB_PASSWORD` | Database password |
| `DB_SYNCHRONIZE` | Set to `true` for local development schema sync only; production always disables synchronization |

A template is provided in `.env.example`. The application does not load `.env` automatically; export the variables in your shell or configure them through your process manager/container environment. Never commit real credentials.

## Getting started

```bash
git clone <repository-url>
cd vasna-game-backend
npm ci
```

Create a MySQL database and configure the environment variables. For local development, schema synchronization is enabled by default when `NODE_ENV` is not `production`. To test the production configuration, set `NODE_ENV=production`, provide all required variables, and run migrations against a database whose base schema already exists.

Start in development mode:

```bash
npm run start:dev
```

Build and run:

```bash
npm run build
npm run start:prod
```

## Authentication

Registration and login are public:

```http
POST /users
Content-Type: application/json

{
  "username": "player1",
  "deviceId": "device-identifier",
  "password": "a-strong-password",
  "email": "player@example.com"
}
```

```http
POST /users/login
Content-Type: application/json

{
  "username": "player1",
  "password": "a-strong-password"
}
```

Login returns an access token. Send it with protected HTTP requests:

```http
Authorization: Bearer <access-token>
```

The same token can be supplied to Socket.IO in the handshake auth payload:

```ts
io(SERVER_URL, {
  auth: { token: accessToken },
});
```

The JWT payload uses `sub` for the user ID and includes the user's role. New accounts receive the `user` role. Administrator accounts must be provisioned through a trusted administrative process; public registration and profile updates cannot set a role. For an existing, verified administrator account, role assignment can be performed directly by a trusted database operator, for example: `UPDATE \`user\` SET role = 'admin' WHERE username = 'trusted-admin';`.

## Real-time events

| Event | Direction | Behavior |
| --- | --- | --- |
| `ping` | Client → Server | Authenticated client receives `pong` |
| `pong` | Server → Client | Connection/ping acknowledgement |
| `state` | Client → Server → Other clients | Broadcasts the authenticated user ID and a size-limited state payload |

Socket connections without a valid JWT are disconnected. The current gateway is still a basic broadcast mechanism: it does not implement match-scoped rooms, authoritative simulation, per-event schemas, or game-specific anti-cheat validation. Do not use client-submitted state as authoritative game state.

## Database migrations

TypeORM schema synchronization is disabled in production. Migrations are stored in `src/migrations` and the CLI data source is `src/data-source.ts`.

```bash
npm run migration:generate -- src/migrations/DescribeChange
npm run migration:run
npm run migration:revert
```

The included migration adds the `role` column to an existing `user` table. A fresh production database still needs the initial schema created through a reviewed baseline migration before deploying this application. Do not enable `synchronize` in production.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run start` | Start the application |
| `npm run start:dev` | Start in watch mode |
| `npm run start:debug` | Start with debugger and watch mode |
| `npm run build` | Compile the application |
| `npm run start:prod` | Run the compiled application |
| `npm run lint` | Run ESLint with automatic fixes |
| `npm run format` | Format TypeScript source and tests |
| `npm test` | Run unit tests |
| `npm run test:cov` | Run tests with coverage |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run migration:run` | Apply pending migrations |
| `npm run migration:revert` | Revert the last migration |

## Project layout

```text
src/
├── auth/                 # JWT module and public-route metadata
├── battle-pass/
├── campaign/
├── cards/
├── clan-quests/
├── clans/
├── friends/
├── game/
├── guards/               # JWT authentication and administrator authorization
├── kills/
├── matches/
├── migrations/
├── moves/
├── news/
├── notifications/
├── private-messages/
├── products/
├── quests/
├── users/
├── app.module.ts
├── data-source.ts
└── main.ts
```

## Known limitations before production

- The included migration is incremental, not a complete initial schema migration. Existing deployments must back up the database and validate the migration before applying it.
- Match, kill, card, campaign, battle-pass, product, purchase, notification, and clan-quest workflows still need a dedicated authorization and transaction review. Authentication alone does not prove ownership of every referenced resource.
- Product purchase-management endpoints are administrator-only placeholders. There is no payment-provider verification or player-facing purchase fulfillment flow. Purchase fulfillment, currency/reward grants, quest completion, and battle-pass progression must be made server-authoritative and idempotent before real-money or competitive use.
- Socket.IO state messages are authenticated and size-limited, but remain untrusted client data and are not validated against a match simulation.
- Quest progress mutation is currently administrator-only; connect it to trusted server-side gameplay events before enabling player-driven progression.
- Legacy plaintext passwords are upgraded to bcrypt hashes on a successful login, but all legacy accounts should be reviewed and forced through a password reset if their provenance is uncertain.
- Rate limiting, account recovery, email/device verification, refresh-token rotation, audit logging, and operational monitoring are not implemented here.
- Add integration tests for login, authorization boundaries, clan membership races, private messaging, purchases, and progression before production deployment.

