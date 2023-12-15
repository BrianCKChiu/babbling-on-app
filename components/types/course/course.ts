import { Lesson } from "./lesson";

export interface Course {
  id: string;
  name: string;
  lessons: Lesson[];
}
