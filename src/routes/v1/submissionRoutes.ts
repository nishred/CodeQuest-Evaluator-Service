import express from "express";
import { addSubmission } from "../../controllers/submissionController";
import { validateCreateSubmissionDto } from "../../validators/validateCreateSubmissionDto";
import { createSubmissionDtoSchema } from "../../dtos/createSubmissionDto";

const submissionRouter = express.Router();



submissionRouter.post("/",validateCreateSubmissionDto(createSubmissionDtoSchema),addSubmission);

export default submissionRouter;

