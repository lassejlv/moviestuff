import { env } from "../env";

export async function cors(req: Request, props: any): Promise<void> {
  // Allow requests from any origin
  props.headers.set("Access-Control-Allow-Origin", env.CORS_ORIGIN);

  return;
}
