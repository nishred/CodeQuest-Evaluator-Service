import {Request,Response} from "express";
import {CreateSubmissionDto} from "../dtos/createSubmissionDto";

export function addSubmission(req:Request,res:Response)
{

    const submissionDto = req.body as CreateSubmissionDto;

    res.json({
      success : true,
      message : "The submission has been created successfully",
      error : {},
      data : submissionDto
    });


}