# 💻 admin

This is the (work-in-progress) admin app, for use in pharmacies.

## Core libraries

- **TypeScript**
- React
- Tailwind CSS
- tRPC
- _font:_ Figtree
- _icons:_ Phosphor Icons

## Running

Make sure you have Node.js and pnpm installed, then run:

```
pnpm install
pnpm dev
```

You'll also want to run `🌐 api` so your app has somewhere to talk to. If it's on another device, create a file called `.env` here and add:

```env
# replace these with your actual server

PUBLIC_RENDER_API_URL="http://192.168.0.1:3000"
# or
PUBLIC_RENDER_API_URL="http://my-api-somewhere.com"
```

> [!TIP]
> You can run `pnpm dev` in the root folder to just run everything at once.
