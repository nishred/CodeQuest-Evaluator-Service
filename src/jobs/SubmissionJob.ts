import runJavaDocker from "../containers/runJavaDocker";
import { IJob } from "../types/bullMqJobDefinition";
import { Payload } from "../types/payload";
import { TestCases } from "../types/testCases";


class SubmissionJob implements IJob
{

    name: string;
    payload: Payload;
  
    constructor(payload:Payload)
    {
         this.payload = payload;
         this.name = "SubmissionJob";
    }


    async handle()
    {
       const lang = this.payload.language;

       const testCases: TestCases = this.payload.testCases;


       let result = true;

       let cases = 0;

       switch(lang)
       {

          case "java":

          for(let i=0;i<testCases.length;i++)
          {

              const testCase = testCases[i];

              const output = await runJavaDocker(this.payload.code,testCase.input);

              if(output.stdout.trim() !== testCase.output.trim())
              {
                result = false;
                break;
              }
              else
              cases++;
              
          }

          break;

          case "python":
            break;



       }

       if(result)
        console.log("Successfully passed all the test Cases");
    else
    console.log(`Error: Passed ${cases}/${testCases.length} test cases`);

    }


    failed():void {



    }
}


export default SubmissionJob;