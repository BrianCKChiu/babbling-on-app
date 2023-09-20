import { View } from "react-native";
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
} from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

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

  useEffect(() => {
    setIsLoading(true);
    // todo: fetch quiz data
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
    }, 2000);
  }, []);

  function startQuiz() {
    router.push({
      pathname: "/quiz/q/[id]",
      params: { id: quizData?.id ?? "a" },
    });
  }

  return (
    <View>
      {!isLoading ? (
        <VStack width={"$full"} h={"$full"}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Box
              width={"$full"}
              height={250}
              backgroundColor="$violet600"
              borderRadius={"$xl"}
            />
            <VStack
              space="md"
              justifyContent="space-between"
              pb={20}
              paddingHorizontal={45}
            >
              <Heading size="xl">{quizData?.title}</Heading>
              <HStack w={"$full"} justifyContent="space-between">
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
            w={"$full"}
            backgroundColor="$secondary0"
            py={20}
            borderTopWidth={1}
            borderTopColor="$secondary200"
            shadowOffset={{ width: 0, height: -3 }}
            shadowOpacity={0.3}
            shadowRadius={8}
            shadowColor="$secondary200"
            paddingHorizontal={"$5"}
          >
            <Button
              variant="solid"
              size="xl"
              width={"$full"}
              backgroundColor="$violet600"
              onPress={() => {
                startQuiz();
              }}
            >
              <Text color="$textLight0">Start Quiz!</Text>
            </Button>
          </Box>
        </VStack>
      ) : (
        <Box w={"$full"} h={"$full"}>
          <Spinner size="large" />
        </Box>
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
      borderWidth={"$1"}
      borderColor={"$secondary200"}
      w={"$1/4"}
      h={"$20"}
      borderRadius={"$md"}
    >
      <VStack alignItems="center" alignContent="center">
        <Text>{heading}</Text>
        <Text>{label}</Text>
      </VStack>
    </Center>
  );
}
