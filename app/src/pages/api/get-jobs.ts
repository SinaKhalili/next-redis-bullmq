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
    const jobs = await queue.getJobs();
    const jobStatuses = await Promise.all(jobs.map((job) => job.getState()));
    const jobData = jobs.map((job) => job.data);
    const jobResults = jobs.map((job, index) => {
      return {
        id: job.id,
        ...jobData[index],
        status: jobStatuses[index],
      };
    });
    res.status(200).json({ jobs: jobResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
