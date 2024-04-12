import { ProBun } from "probun";
import { env } from "./env";
import { cors } from "./middleware/cors";

const app = new ProBun({
  port: Number(env.PORT),
  routes: "src/routes",
  logger: true,
});

app.definePreMiddleware(cors);

app.start();
