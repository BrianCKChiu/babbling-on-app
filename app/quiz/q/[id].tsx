import { JSX, useEffect, useState } from "react";
import { McqQuestionComponent } from "../../../components/ui/quiz/question/mcqQuestion";
import { VStack, useToast } from "native-base";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Answer,
  Question,
  QuestionMcq,
} from "../../../components/quiz/question";
import { useQuizStore } from "../../../components/stores/quizStore";

export default function Page() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const toast = useToast();
  const {
    setCurrentQuestionIndex,
    currentQuestionIndex,
    questions,
    addAnswer,
  } = useQuizStore();

  const [question, setQuestion] = useState<Question | null>(null);
  const [questionComponent, setQuestionComponent] = useState<JSX.Element>(
    <></>
  );

  function handleAnswer(userAnswer: string) {
    console.log(userAnswer);
    const question = questions[currentQuestionIndex];

    let result: Answer | null = null;
    if (question.getType() === "mcq") {
      const mcqQuestion = question as QuestionMcq;

      result = {
        questionId: question.getId(),
        isCorrect: mcqQuestion.getAnswer() === userAnswer,
        answer: [userAnswer],
      };
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
    console.log(result);
    toast.show({
      description: result.isCorrect ? "Correct" : "Incorrect",
      duration: 900,
      bgColor: result.isCorrect ? "green.500" : "red.500",
      width: "300px",
      height: "80px",
      alignItems: "center",
      justifyContent: "center",
    });
    setTimeout(() => {
      if (currentQuestionIndex === questions.length - 1) {
        router.replace("/quiz/results");
      } else {
        console.log("next question");
        // get next question id
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        toast.closeAll();
        console.log(currentQuestionIndex); // navigate to next question
        router.replace({
          pathname: "/quiz/q/[id]",
          params: { id: questions[currentQuestionIndex + 1].getId() }, // replace with question id
        });
      }
    }, 1000);
  }

  function nextQuestion() {}

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
