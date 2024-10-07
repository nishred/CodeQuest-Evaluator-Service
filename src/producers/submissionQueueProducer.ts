import submissionQueue from "../queues/SubmissionQueue";
import { Payload } from "../types/payload";


async function submissionQueueProducer(payload: Payload)
{


     await submissionQueue.add("submissionJob",payload);

}

export default submissionQueueProducer;