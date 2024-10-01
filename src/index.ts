import express from "express";

import serverConfig from "./config/server.config";
import apiRouter from "./routes";

import SampleWorker from "./workers/sampleQueueWorker";

import sampleQueueProducer from "./producers/sampleQueueProducer";

const app = express();

app.use("/api",apiRouter);

app.listen(serverConfig.PORT,async () => {

    console.log(`The app has started running on PORT : ${serverConfig.PORT}`);


     await SampleWorker("SampleQueue");

    

    await sampleQueueProducer("SampleJob",{
         name : "Nishanth",
         age : 25,
         college : "CBIT"
    },2);
      
     
});