import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/figtree/index.css";
import "./index.css";

import { AppRoutes } from "./routes";
import { BrowserRouter } from "react-router";
import { Provider } from "@repo/trpc";
import { QueryClientProvider } from "@tanstack/react-query";
import { client, queryClient } from "./lib/trpc";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider client={client} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
);
