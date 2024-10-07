import { ZodSchema } from "zod";
import { CreateSubmissionDto } from "../dtos/createSubmissionDto";

import {NextFunction, Request, Response} from "express";


export function validateCreateSubmissionDto(schema: ZodSchema<CreateSubmissionDto>)
{

    return function(req: Request,res: Response,next: NextFunction)
    {
        
         try {

            console.log(req.body);

              schema.parse({
                ...req.body
              });

              next();
              
         }
         catch(err)
         { 
            console.log(err);
            res.status(404).json({
              success : false,
              messsage : "Something went wrong"
            });

         }
         

    };


}