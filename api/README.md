# 🌐 app

This is the backend API that the app talks to. It can be run anywhere - on the Pi itself, or somewhere in the cloud.

## Core libraries

- **TypeScript**
- Hono
- tRPC
- Drizzle ORM + Postgres DB

## Running

Make sure you have Node.js and pnpm installed, then run:

```
pnpm install
```

You'll need a Postgres database - if you don't have one already, [Neon](https://neon.tech/home) is free and works well.
Next, find your connection string starting with `postgresql://` (for Neon, look for a _Connect_ button). Then, create a file called `.env` here and add:

```env
# replace with your actual connection string
DATABASE_URL="postgresql://user:password@my-db-somewhere.com/my-db"

# spam letters/numbers/symbols here
JWT_SECRET="something-random"
```

Then, run this to set up your db:

```
pnpm db:push
```

_TODO: seed sample data_

Finally, run this to start the server:

```
pnpm dev
```

> [!TIP]
> You can run `pnpm dev` in the root folder to just run everything at once.
