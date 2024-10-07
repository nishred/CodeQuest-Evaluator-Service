import {Job} from "bullmq";
import { Payload } from "./payload";


export interface IJob 
{
   name : string
   payload? : Payload
   handle : (job?: Job) => void
   failed : (job? :Job) => void
}

