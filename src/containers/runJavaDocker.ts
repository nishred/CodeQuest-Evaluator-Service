import DockerStreamOutput from "../types/DockerStreamOutput";
import createContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelpter";


async function runJavaDocker(code: string,testCases: string): Promise<DockerStreamOutput>
{

     const runCommand: string = `echo '${code}' > Main.java && javac Main.java && echo '${testCases}' | java Main`;

       const javaContainer = await createContainer("openjdk",[
          "/bin/sh",
          "-c",
          runCommand

       ]);

       await javaContainer.start();
       const readStream = await javaContainer.logs({

           stdout : true,
           stderr : true,
           follow : true,
           timestamps : false
       });

       const bufferArray:Buffer[] = [];


      return new Promise((resolve,reject) => {

       readStream.on("data",(chunk) => {
           bufferArray.push(chunk);
       });


       readStream.on("end",async () => {
          const bufferConcat:Buffer =  Buffer.concat(bufferArray);
          const output = decodeDockerStream(bufferConcat);
          await javaContainer.remove();

          resolve(output);
       });


       readStream.on("error",(err) => {

            reject(err);

       });

    });



}


export default runJavaDocker;