import express from "express";

import serverConfig from "./config/server.config";
import apiRouter from "./routes";
//mport SampleWorker from "./workers/sampleQueueWorker";
//import sampleQueueProducer from "./producers/sampleQueueProducer";
import bodyParser from "body-parser";
//import runPython from "./containers/runPythonDocker";
//import runJavaDocker from "./containers/runJavaDocker";
import { TestCases } from "./types/testCases";
import submissionQueueProducer from "./producers/submissionQueueProducer";
import submissionQueueWorker from "./workers/submissionQueueWorker";
import serverAdapter from "./config/bullboard.config";

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/api",apiRouter);


app.use("/ui",serverAdapter.getRouter());



app.listen(serverConfig.PORT,async () => {

    console.log(`The app has started running on PORT : ${serverConfig.PORT}`);
    
     const code = `
       
      import java.util.*;

      public class Main 
      {
      
          public static void main(String[] args)
          {
            Scanner sc = new Scanner(System.in);

            int n = sc.nextInt();

            int[] arr = new int[n];

            for(int i=0;i<n;i++)
            {
               arr[i] = sc.nextInt();
             
            }

            int target = sc.nextInt();

            int start = 0;
            int end = n - 1;

            int ans = -1;

            while(start<=end)
            {
            
                int mid = start + (end - start)/2;

                if(arr[mid] >= target)
                {
                    
                      ans = mid;
                      end = mid - 1;
                }
                else
                {
                    start = mid + 1;
                }
                
        
            }


            if(ans != -1)
            {
                if(arr[ans] != target)
                ans = -1;
            }

          
            System.out.println(ans);


          }
      
      }
     
     `;

     const testCases: TestCases = [
        {input:"5\n10 20 30 40 50\n30",output: "2"},
        {input:"4\n10 20 30 40\n25",output: "-1"},
        {input: "3\n1 5 6\n1",output: "0"},
        {input:"4\n10 20 30\n10",output:"-1"}
     ];

     await submissionQueueProducer({
       code,
       language: "java",
       testCases

     });

     
     await submissionQueueWorker();

});