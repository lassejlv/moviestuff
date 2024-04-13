import { ProBun } from "probun";
import { env } from "./env";
import { cors } from "./middleware/cors";

const app = new ProBun({
  port: Number(env.PORT),
  routes: "src/routes",
  logger: env.NODE_ENV === "development" ? true : false,
});

app.definePreMiddleware(cors);

app.start();
