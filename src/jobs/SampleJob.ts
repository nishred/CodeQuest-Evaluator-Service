import { IJob } from "../types/bullMqJobDefinition";


class SampleJob implements IJob {
  
    name: string;
    payload: Record<string,unknown>;

    constructor(name: string,payload: Record<string,unknown>)
    {
       this.name = name;
       this.payload = payload;
    }

    handle(): void
    {
        console.log(this.payload.name);
    
    }


    failed()
    {
      console.log("Job failed");

    }


}

export default SampleJob;