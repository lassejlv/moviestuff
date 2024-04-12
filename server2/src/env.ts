import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    PORT: z.string(),
    API_KEY: z.string(),
    CORS_ORIGIN: z.string(),
  },
  runtimeEnv: Bun.env,
});
