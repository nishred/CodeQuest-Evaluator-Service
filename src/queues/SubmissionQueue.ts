import { Queue } from "bullmq";
import redisConnection from "../config/redisConfig";


const submissionQueue = new Queue("submissionQueue",{
    connection: redisConnection
});

export default submissionQueue;
