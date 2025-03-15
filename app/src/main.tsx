import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/figtree";
import "./index.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient, client } from "./lib/trpc";
import { Provider } from "@repo/trpc";

import "./app.css";

import "./init.client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
