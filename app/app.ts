import { IncomingMessage, ServerResponse } from "http";
import { routes } from "./routes/userRoutes";
import { getBaseUrl, getUserIdFromUrl } from "./utils/utils";

export const app = (req: IncomingMessage, res: ServerResponse) => {
  let url = req.url ? req.url : '';
  const id = getUserIdFromUrl(url);
  if (id) url = getBaseUrl(url);
  let routePath = id ? url + '{userId}' : url;
  const route = routes.find((route) => route.method === req.method && route.path === routePath)
  try {
    if (route) {
      route.handler(req, res)
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: 'Route does not exist' }));
    }
  } catch (error) {
    if (error instanceof Error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: error.message }));
    }
  }
};