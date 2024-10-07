import { Job, Worker } from "bullmq";
import redisConnection from "../config/redisConfig";
import SubmissionJob from "../jobs/SubmissionJob";

async function submissionQueueWorker()
{
 
     new Worker("submissionQueue",async (job: Job) => {

         const submissionJob = new SubmissionJob(job.data);

         await submissionJob.handle();



     },{connection: redisConnection});   


}

export default submissionQueueWorker;