import {z} from "zod";

// export default interface CreateSubmissionDto{

//    userId : string;
//    problemId :string;
//    code : string;
//    language : string;

// };


export type CreateSubmissionDto = z.infer<typeof createSubmissionDtoSchema>;

export const createSubmissionDtoSchema = z.object({
     userId : z.string(),
     problemId : z.string(),
     code : z.string(),
     language : z.string()
});


//typeScript only does compile time checking where as zod does run time checking.










