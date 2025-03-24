# 🌐 app

This is the backend API that the app talks to. It can be run anywhere - on the Pi itself, or somewhere in the cloud.

## Core libraries

- **TypeScript**
- Hono
- tRPC
- Drizzle ORM + Postgres DB

## Running

Make sure you have Node.js and pnpm installed, then run:

```sh
# cd api
pnpm install
```

You'll need a Postgres database - this project uses [Neon](https://neon.tech/home), so you should sign up there.

Next, find your connection string starting with `postgresql://` (on Neon, look for a _Connect_ button on the home screen). Then, create a file called `.env` here and add:

```env
# replace with your actual connection string
DATABASE_URL="postgresql://user:password@my-db-somewhere.com/my-db"

# spam letters/numbers/symbols here
JWT_SECRET="something-random"
```

> [!NOTE]
> If you're not using Neon, you'll need to switch the database adapter in `src/db/index.ts` - learn more [here](https://orm.drizzle.team/docs/get-started-postgresql).

Then, run this to set up your database tables and add some sample data:

```
pnpm db:setup
```

Finally, run this to start the server:

```
pnpm dev
```

> [!TIP]
> You can run `pnpm dev` in the root folder to just run everything at once _(excl. Bluetooth server)_.
