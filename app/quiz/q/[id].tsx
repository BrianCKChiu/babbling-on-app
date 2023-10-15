import { JSX, useEffect, useState } from "react";
import { McqQuestionComponent } from "../../../components/ui/quiz/question/mcqQuestion";
import { Center, Spinner, VStack, useToast, Text } from "native-base";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Answer,
  Question,
  QuestionMatching,
  QuestionMcq,
} from "../../../components/quiz/question";
import { useQuizStore } from "../../../components/stores/quizStore";
import { getFile } from "../../../components/firebase";
import React from "react";
import { MatchingQuestionComponent } from "../../../components/ui/quiz/question/matchingQuestion";

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
  const [isLoading, setIsLoading] = useState(false);

  function handleAnswer(userAnswer: string | string[]) {
    const question = questions[currentQuestionIndex];

    let result: Answer | null = null;
    if (question.getType() === "mcq") {
      const mcqQuestion = question as QuestionMcq;

      result = {
        questionId: question.getId(),
        isCorrect: mcqQuestion.getAnswer() === userAnswer,
        answer: [userAnswer as string],
      };
    } else if (question.getType() === "matching") {
      const matchingQuestion = question as QuestionMatching;

      result = {
        questionId: question.getId(),
        isCorrect: matchingQuestion
          .getAnswer()
          .every((v, i) => v === userAnswer[i]),
        answer: userAnswer as string[],
      };
    }

    if (result == null) return;
    addAnswer(result);
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
        // get next question id
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        toast.closeAll();
        router.replace({
          pathname: "/quiz/q/[id]",
          params: { id: questions[currentQuestionIndex + 1].getId() }, // replace with question id
        });
      }
    }, 1000);
  }

  async function getMediaLink(ref: string): Promise<string> {
    const url = await getFile(ref);
    return url;
  }

  // generates an array of objects with mediaRef and answer for each gesture in matching question
  async function generateMatchingMediaObj() {
    const gestures = (question as QuestionMatching).getGestures();
    const gestureArr: { mediaRef: string; answer: string }[] = [];
    for (const gesture of gestures) {
      await getMediaLink(gesture.mediaRef).then((url) => {
        gestureArr.push({
          mediaRef: url,
          answer: gesture.answer,
        });
      });
    }
    return gestureArr;
  }

  // set question to current question when id param changes
  useEffect(() => {
    const currentQuestion = questions.filter((q) => q.getId() === id)[0];
    setQuestion(currentQuestion);
  }, [id]);

  // render question component when question changes
  useEffect(() => {
    if (question == null) return;
    setIsLoading(true);
    if (question.getType() === "mcq") {
      renderMcqQuestion().then(() => {
        setIsLoading(false);
      });
    } else if (question.getType() === "matching") {
      renderMatchingQuestion().then(() => {
        setIsLoading(false);
      });
    }
  }, [question]);

  async function renderMcqQuestion() {
    const url = await getMediaLink((question as QuestionMcq).getMediaRef());
    setQuestionComponent(
      <McqQuestionComponent
        mediaRef={url}
        choices={(question as QuestionMcq).getChoices()}
        submitAnswer={(answer: string) => {
          handleAnswer(answer);
        }}
      />
    );
  }

  async function renderMatchingQuestion() {
    await generateMatchingMediaObj().then((choices) => {
      setQuestionComponent(
        <MatchingQuestionComponent
          choices={choices}
          submitAnswer={(answer: string[]) => {
            handleAnswer(answer);
          }}
        />
      );
    });
  }

  return isLoading || questionComponent == null ? (
    <Center w={"full"} h={"full"}>
      <Spinner size="large" mb={3} />
      <Text>Loading Question</Text>
    </Center>
  ) : (
    <VStack>{questionComponent}</VStack>
  );
}
