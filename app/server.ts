import "dotenv/config";
import http from "node:http";
import { app } from "./app";

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});