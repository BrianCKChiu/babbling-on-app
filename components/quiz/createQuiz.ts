import { useQuizStore } from "../stores/quizStore";
import { generateUuid62 } from "../utils/uuid";
import { QuestionMcq } from "./question";

export async function createQuiz(
  topic: string,
  options: quizOptions = { numQuestions: 5 }
) {
  const { setQuizId, setCurrentQuestionIndex, setQuestions, setQuizName } =
    useQuizStore();

  // todo: call backend to create quiz
  // temp, use quiz data generated from backend once backend & data is ready
  setQuizId(generateUuid62());
  setQuizName(topic);
  setCurrentQuestionIndex(1);

  const questionArray = [];
  for (let i = 0; i < options.numQuestions; i++) {
    const q = new QuestionMcq(
      {
        gestureId: generateUuid62(),
        mediaRef: "",
      },
      ["A", "B", "C", "D"]
    );
    questionArray.push(q);
  }

  setQuestions(questionArray);
}

export type quizOptions = {
  numQuestions: number;
};
