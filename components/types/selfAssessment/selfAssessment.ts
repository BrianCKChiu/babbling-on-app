import { User } from "../user/user";

export type SelfAssessment = {
    score: number;
    dateTaken: Date;
    assessmentId: string; 
    userId: string;
    isPractice: boolean;
    user: User;
  }