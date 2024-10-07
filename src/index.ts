import express from "express";

import serverConfig from "./config/server.config";
import apiRouter from "./routes";

import { createBullBoard } from "bull-board";

import {BullMQAdapter} from "bull-board/bullMQAdapter";

import SampleQueue from "./queues/SampleQueue";

//mport SampleWorker from "./workers/sampleQueueWorker";

//import sampleQueueProducer from "./producers/sampleQueueProducer";


import bodyParser from "body-parser";
//import runPython from "./containers/runPythonDocker";
import runJavaDocker from "./containers/runJavaDocker";

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const { router} = createBullBoard([ new BullMQAdapter(SampleQueue)]);

app.use("/api",apiRouter);
app.use('/admin/queues', router);

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

            if(ans == -1)
            {
            
                System.out.println("The target is not found");
            
            }
                else
                System.out.println("The target is found at index: " + ans);
          
          }
      
      }
     
     `;

     const testCases = `5\n10 20 30 50 50\n25`;


     const output = await runJavaDocker(code,testCases);

     console.log(output.stdout);
  


});