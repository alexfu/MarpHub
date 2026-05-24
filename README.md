# MarpHub

A place to host and share your [Marp](https://marp.app) slides.

## Getting Started

These steps will get the project running locally against a Postgres instance in Docker.

### Prerequisites

- [Node.js](https://nodejs.org) (see `@types/node` in `package.json` for the major version)
- [pnpm](https://pnpm.io)
- [Docker](https://www.docker.com) (for the local Postgres container)

### 1. Install dependencies

```sh
pnpm install
```

### 2. Start Postgres

```sh
docker compose up -d
```

This runs Postgres 18 on `localhost:5432` with user `marphub`, password `123`, and database `marphub`.

### 3. Configure environment

A `.env` file at the project root is used for `DATABASE_URL`. It should already be present with:

```
DATABASE_URL="postgres://marphub:123@localhost:5432/marphub"
```

`prisma.config.ts` loads this via `dotenv/config`, so the Prisma CLI picks it up automatically.

### 4. Apply migrations

```sh
pnpm dlx prisma migrate dev
```

This applies migrations from `prisma/migrations/` and generates the Prisma client into `generated/prisma/`.

### 5. Run the dev server

```sh
pnpm dev
```

## Working with the database

The schema lives at `prisma/schema.prisma` and migrations are tracked under `prisma/migrations/`. The generated Prisma client is emitted to `generated/prisma/` — import it from there rather than `@prisma/client`:

```ts
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();
```

### Changing the schema

1. Edit `prisma/schema.prisma`.
2. Create a migration and apply it locally:

   ```sh
   pnpm dlx prisma migrate dev --name <describe-your-change>
   ```

3. Commit both the schema change and the new directory under `prisma/migrations/`.

### Common Prisma commands

Run via `pnpm dlx prisma <command>`:

- `migrate dev --name <name>` — create a new migration from schema changes and apply it locally. Also regenerates the client.
- `migrate deploy` — apply pending migrations without prompting. Use in CI/production.
- `migrate reset` — drop the database, re-apply all migrations, and regenerate the client. Destructive; local dev only.
- `generate` — regenerate the client into `generated/prisma/` after pulling schema changes without new migrations.
- `studio` — open the Prisma Studio GUI to browse and edit data.
- `db push` — sync the schema to the database without creating a migration. Useful for quick prototyping; prefer `migrate dev` for tracked changes.
