import { Course } from "../course/course";
import { SelfAssessment } from "../selfAssessment/selfAssessment";


export type User = {
    id: string; 
    email: string;
    role: string;
    coursesMade: Course[];
    selfAssessments: SelfAssessment[];

    // CoursesToUsers: CoursesToUsers[];
}