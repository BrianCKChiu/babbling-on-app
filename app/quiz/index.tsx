import {
  Box,
  Button,
  HStack,
  Heading,
  Text,
  VStack,
  ScrollView,
  Spinner,
  Center,
  View,
} from "native-base";
import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuizStore } from "../../components/stores/quizStore";
import { QuestionMatching, QuestionMcq } from "../../components/quiz/question";

type QuizDataProp = {
  id: string;
  topic: string;
  title: string;
  questionNum: number;
  estTime: number;
  points: number;
  description: string;
};

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [quizData, setQuizData] = useState<QuizDataProp | null>(null);
  const router = useRouter();
  const { setQuestions } = useQuizStore();
  const { type } = useLocalSearchParams<{ type?: string }>();
  const params = useLocalSearchParams();

  useEffect(() => {
    setIsLoading(true);
    // todo: fetch quiz data from node js server via the id
    const quizDetailId = params.id;
    console.log(quizDetailId);
    setTimeout(() => {
      setQuizData({
        id: "aa",
        topic: "daily",
        title: "Daily Quiz",
        questionNum: 10,
        estTime: 5,
        points: 200,
        description: "",
      });
      setIsLoading(false);
    }, 500);
  }, []);

  function startQuiz() {
    // todo: sent request to server to generate quiz
    const a = [
      new QuestionMcq({
        id: "asdas",
        choices: ["a", "b", "c", "d"],
        answer: "a",
        mediaRef: "asdas",
      }),
      new QuestionMcq({
        id: "asdaaas",
        choices: ["e", "f", "h", "g"],
        answer: "f",
        mediaRef: "asdaaaas",
      }),
    ];
    setQuestions(a);
    // set data to quiz router
    router.replace({
      pathname: "/quiz/q/[id]",
      params: { id: a[0].getId() }, // replace with question id
    });
  }

  return (
    <View>
      {!isLoading ? (
        <VStack h={"100%"}>
          <ScrollView
            w="full"
            h={"100%"}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <Box
              w={"full"}
              height={300}
              backgroundColor="violet.600"
              borderRadius={"lg"}
            />
            <VStack
              space="md"
              justifyContent="space-between"
              pb={20}
              paddingX={"45px"}
            >
              <Heading size="xl" mt={3}>
                {quizData?.title}
              </Heading>
              <HStack w={"full"} justifyContent="space-between">
                <QuizDetailTile
                  label={quizData?.questionNum.toString() ?? "0"}
                  heading="Questions"
                />
                <QuizDetailTile
                  label={quizData?.estTime.toString() ?? "0"}
                  heading="Minutes"
                />
                <QuizDetailTile
                  label={quizData?.points.toString() ?? "0"}
                  heading="Points"
                />
              </HStack>
              <VStack>
                <Text fontWeight={"semibold"} mb={2}>
                  Description
                </Text>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam mi sem, ultrices vitae orci egestas, dictum fringilla
                  purus. Phasellus ultricies, velit iaculis euismod finibus,
                  neque risus mattis purus, non auctor turpis nisi vitae leo. In
                  molestie suscipit elit, quis sollicitudin massa aliquet et.
                  Nunc non fermentum massa.
                </Text>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam mi sem, ultrices vitae orci egestas, dictum fringilla
                  purus. Phasellus ultricies, velit iaculis euismod finibus,
                  neque risus mattis purus, non auctor turpis nisi vitae leo. In
                  molestie suscipit elit, quis sollicitudin massa aliquet et.
                  Nunc non fermentum massa.
                </Text>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam mi sem, ultrices vitae orci egestas, dictum fringilla
                  purus. Phasellus ultricies, velit iaculis euismod finibus,
                  neque risus mattis purus, non auctor turpis nisi vitae leo. In
                  molestie suscipit elit, quis sollicitudin massa aliquet et.
                  Nunc non fermentum massa.
                </Text>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam mi sem, ultrices vitae orci egestas, dictum fringilla
                  purus. Phasellus ultricies, velit iaculis euismod finibus,
                  neque risus mattis purus, non auctor turpis nisi vitae leo. In
                  molestie suscipit elit, quis sollicitudin massa aliquet et.
                  Nunc non fermentum massa.
                </Text>
              </VStack>
            </VStack>
          </ScrollView>
          <Box
            paddingBottom={30}
            w={"100%"}
            h={90}
            borderTopWidth={1}
            borderTopColor="gray.300"
            shadow={0.3}
            paddingX={10}
            pt="4"
          >
            <Button
              variant="solid"
              size={"lg"}
              w={"full"}
              backgroundColor="violet.500"
              onPress={() => {
                startQuiz();
              }}
            >
              <Text color="white">Start Quiz!</Text>
            </Button>
          </Box>
        </VStack>
      ) : (
        <Center w={"full"} h={"full"}>
          <Spinner size="large" />
        </Center>
      )}
    </View>
  );
}

function QuizDetailTile({
  label,
  heading,
}: {
  label: string;
  heading: string;
}) {
  return (
    <Center
      borderWidth={1}
      borderColor={"gray.300"}
      w={"25%"}
      h={20}
      borderRadius={"md"}
    >
      <VStack alignItems="center" alignContent="center">
        <Text>{heading}</Text>
        <Text>{label}</Text>
      </VStack>
    </Center>
  );
}
