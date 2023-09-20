import { Question } from "../quiz/question";
import { create } from "zustand";

interface QuizState {
  questions: Array<Question>;
  currentQuestionIndex: number;
  quizId: string;
  quizName: string;
  quizTopic: string;
}
interface QuizAction {
  setQuizId: (quizId: string) => void;
  setQuizName: (quizName: string) => void;
  setQuestions: (questions: Array<Question>) => void;
  setCurrentQuestionIndex: (index: number) => void;
  setCurrentQuestion: (question: Question) => void;
  setQuizTopic: (topic: string) => void;
  clearQuiz: () => void;
}

const init = {
  questions: [],
  currentQuestionIndex: 0,
  quizId: "",
  quizName: "",
  quizTopic: "",
};

export const useQuizStore = create<QuizState & QuizAction>((set) => ({
  questions: [],
  currentQuestionIndex: 0,
  quizId: "",
  quizName: "",
  quizTopic: "",
  setQuizId: (quizId: string) => set({ quizId }),
  setQuizName: (quizName: string) => set({ quizName }),
  setQuestions: (questions: Question[]) => set({ questions }),
  setCurrentQuestionIndex: (index: number) =>
    set({ currentQuestionIndex: index }),
  setCurrentQuestion: (question: Question) => set({ questions: [question] }),
  setQuizTopic: (topic: string) => set({ quizTopic: topic }),
  clearQuiz: () => set(init),
}));
