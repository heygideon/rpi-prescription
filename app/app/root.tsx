import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";
import figtree from "@fontsource-variable/figtree?url";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient, client } from "./lib/trpc";
import { Provider } from "@repo/trpc";

import { SafeArea } from "@capacitor-community/safe-area";

export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: figtree },
  { rel: "stylesheet", href: stylesheet },
];

SafeArea.enable({
  config: {
    customColorsForSystemBars: true,
    statusBarColor: "#00000000",
    statusBarContent: "dark",
    navigationBarColor: "#00000000",
    navigationBarContent: "dark",
  },
});

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Provider client={client} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </Provider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
