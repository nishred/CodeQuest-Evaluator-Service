import { Request,Response } from "express";

export function pingCheck(req: Request,res : Response)
{
    console.log(req.url);

    res.json({
        msg : "ping check successfull"
    });


}