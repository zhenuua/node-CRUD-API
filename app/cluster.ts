import "dotenv/config";
import cluster from 'node:cluster';
import http from 'node:http';
import { availableParallelism } from 'node:os';
import process from 'node:process';
import { app } from "./app";


const numCPUs = availableParallelism();
const PORT = process.env.CLUSTER_PORT ? parseInt(process.env.CLUSTER_PORT) : 4000;
let numWorker = 1;

if (cluster.isPrimary) {
  for (let i = 1; i < numCPUs; i++) {
    cluster.fork();
  }

  const worker = cluster.fork();
  worker.on('exit', (code, signal) => {
    if (signal) {
      console.log(`worker was killed by signal: ${signal}`);
    } else if (code !== 0) {
      console.log(`worker exited with error code: ${code}`);
    } else {
      console.log('worker success!');
    }
  });

  const server = http.createServer((req, res) => {
    const workerPort = PORT + numWorker;
    req.pipe(http.request(
      {
        host: 'localhost',
        path: req.url,
        method: req.method,
        headers: req.headers,
        port: workerPort,
      },
      (workerResp) => {
        res.writeHead(workerResp.statusCode || 302, workerResp.headers);
        workerResp.pipe(res);
      },
    ),
    );
    numWorker >= numCPUs ? numWorker = 1 : numWorker += 1
    console.log(`load balancer sends request to ${workerPort}`);
  })
  server.listen(PORT, () => {
    console.log(`Load balancer is listening on port ${PORT}`);
  });
}
else {
  const server = http.createServer(app);
  const worker = cluster?.worker?.id || 0

  server.listen(PORT + worker, () => {
    console.log(`Worker ${worker} listening on port ${PORT + worker}`);
  });
}