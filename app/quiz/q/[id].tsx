import { JSX, ReactElement, useEffect, useState } from "react";
import { McqQuestionComponent } from "../../../components/ui/quiz/question/mcqQuestion";
import { Select, VStack, Box, HStack, Heading, CheckIcon } from "native-base";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Answer,
  Question,
  QuestionMcq,
} from "../../../components/quiz/question";
import { useQuizStore } from "../../../components/stores/quizStore";

export default function Page() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [questionComponent, setQuestionComponent] = useState<JSX.Element>(
    <></>
  );
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const {
    setCurrentQuestionIndex,
    currentQuestionIndex,
    questions,
    addAnswer,
  } = useQuizStore();

  function handleAnswer(userAnswer: string) {
    const question = questions[currentQuestionIndex];

    let result: Answer | null = null;
    if (question.getType() === "mcq") {
      const mcqQuestion = question as QuestionMcq;
      if (mcqQuestion.getAnswer() === userAnswer) {
        result = {
          questionId: question.getId(),
          isCorrect: true,
          answer: [userAnswer],
        };
        addAnswer(result);
      }
    } else if (question.getType() === "matching") {
      const matchingQuestion = question as QuestionMcq;

      result = {
        questionId: question.getId(),
        isCorrect: matchingQuestion.getAnswer() === userAnswer,
        answer: [userAnswer],
      };
    }
    if (result == null) return;
    addAnswer(result);

    if (currentQuestionIndex === questions.length - 1) {
    } else {
      // get next question id
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      console.log(currentQuestionIndex); // navigate to next question
      router.push({
        pathname: "/quiz/q/[id]",
        params: { id: questions[currentQuestionIndex + 1].getId() }, // replace with question id
      });
    }
  }

  useEffect(() => {
    const currentQuestion = questions.filter((q) => q.getId() === id)[0];
    setQuestion(currentQuestion);
  }, [id]);

  useEffect(() => {
    if (question == null) return;

    if (question.getType() === "mcq") {
      setQuestionComponent(
        <McqQuestionComponent
          choices={(question as QuestionMcq).getChoices()}
          submitAnswer={(answer: string) => {
            handleAnswer(answer);
          }}
        />
      );
    } else if (question.getType() === "matching") {
      setQuestionComponent(
        <McqQuestionComponent
          choices={["e", "f", "g", "h"]}
          submitAnswer={(answer: string) => {
            handleAnswer(answer);
          }}
        />
      );
    }
  }, [question]);

  return <VStack>{questionComponent}</VStack>;
}
