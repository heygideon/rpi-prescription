import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from ".";

export default createTRPCReact<AppRouter>();
