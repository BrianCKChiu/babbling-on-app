import { McqQuestion } from "../../../components/ui/quiz/question/mcqQuestion";
import { VStack } from "native-base";

export default function Page() {
  return (
    <VStack>
      <McqQuestion
        submitAnswer={(answer) => {
          console.log(answer);
        }}
        choices={["a", "b", "c", "d"]}
      />
      {/* <MatchingQuestion /> */}
    </VStack>
  );
}
