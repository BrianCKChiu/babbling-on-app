export type QuizDataProp = {
  id: string;
  topic: string;
  title: string;
  numOfQuestion: number;
  estTime: number;
  exp: number;
  description: { [key: string]: string };
};
