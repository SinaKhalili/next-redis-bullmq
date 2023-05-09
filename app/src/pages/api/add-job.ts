import { ConnectionOptions, Queue } from "bullmq";
import { NextApiRequest, NextApiResponse } from "next";

const connectionOptions: ConnectionOptions = {
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT!),
};

const queueName = "myQueue";

const queue = new Queue(queueName, { connection: connectionOptions });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const job = await queue.add("myJob", { data: "some data" });
    console.log("Job added: ", job.id);
    res.status(200).json({ jobId: job.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
