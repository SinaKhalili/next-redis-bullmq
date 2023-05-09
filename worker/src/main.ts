import { ConnectionOptions, Queue, Worker } from "bullmq";
import { config } from "dotenv";
config();

const connectionOptions: ConnectionOptions = {
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT!),
};

const queue = new Queue("myQueue", { connection: connectionOptions });

const worker = new Worker(
  "myQueue",
  async (job) => {
    console.log(`Processing job ${job.id}...`);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log(`Job ${job.id} complete!`);
  },
  { connection: connectionOptions }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed!`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed: ${err}`);
});

console.log("Worker started!");
