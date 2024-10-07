//import Docker from "dockerode"
import createContainer from "./containerFactory";
//import { TestCases } from "../types/testCases";
import { PYTHON_IMAGE } from "../utils/constants";
import decodeDockerStream from "./dockerHelpter";



async function runPython(code: string,inputTestCase: string)
{
   const rawLogBuffer: Buffer[] = [];
   let combinedBuffer: Buffer;

   const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > test.py && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | python3 test.py`;

   const pythonDockerContainer = await createContainer(PYTHON_IMAGE,[
       "/bin/sh",
       "-c",
        runCommand   
   ]);
   //starting the container
   await pythonDockerContainer.start();

   const loggerStream = await pythonDockerContainer.logs({
        stdout : true,
        stderr : true,
        timestamps : false,
        follow : true
    });

    //attach events on the stream objects to start and stop reading

    loggerStream.on("data",(chunk) => {
       rawLogBuffer.push(chunk);
    });

         loggerStream.on("end",async () => {
            combinedBuffer = Buffer.concat(rawLogBuffer);
            const output = decodeDockerStream(combinedBuffer);
            console.log(output.stdout);

            await pythonDockerContainer.remove();
           

         });
}

export default runPython;
