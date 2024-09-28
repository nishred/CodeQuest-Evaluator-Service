import express from "express";

import serverConfig from "./config/server.config";
import apiRouter from "./routes";

const app = express();

app.use("/api",apiRouter);

app.listen(serverConfig.PORT,() => {

    console.log(`The app has started running on PORT : ${serverConfig.PORT}`);

});