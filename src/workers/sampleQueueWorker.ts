import {Worker,Job} from "bullmq";
import SampleJob from "../jobs/SampleJob";
import redisConnection from "../config/redisConfig";

export default async function(queueName: string)
{

     new Worker(queueName,async (job: Job) => {

         const sampleJob = new SampleJob(job.name,job.data);

         sampleJob.handle();

    }, {
        connection : redisConnection
    });


}