import { signInWithEmailAndPassword } from "firebase/auth";
import {
  View,
  Heading,
  Text,
  Input,
  VStack,
  Button,
  useToast,
} from "native-base";
import { useState } from "react";
import { auth } from "../../components/firebase";
import { useRouter } from "expo-router";
import { validateEmail } from "../../components/auth";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toasts = useToast();
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  function handleSignIn() {
    setIsLoggingIn(true);
    if (email === "") {
      toasts.show({
        title: "Email cannot be empty",
        bgColor: "red.500",
        duration: 2000,
      });
      setIsLoggingIn(false);
      return;
    }
    if (!validateEmail(email)) {
      toasts.show({
        title: "Invalid email",
        bgColor: "red.500",
        duration: 2000,
      });
      setIsLoggingIn(false);

      return;
    }
    if (password === "") {
      toasts.show({
        title: "Password cannot be empty",
        bgColor: "red.500",
        duration: 2000,
      });
      setIsLoggingIn(false);

      return;
    }

    signInWithEmailAndPassword(auth, email.toLowerCase(), password)
      .then(() => {
        toasts.show({
          title: "Sign in successful",
          bgColor: "green.500",
          duration: 2000,
        });
        router.replace("/(tabs)/");
        setIsLoggingIn(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        toasts.show({
          title: errorMessage,
          bgColor: "red.500",
          duration: 2000,
        });
        setIsLoggingIn(false);

        return;
      });
    setIsLoggingIn(false);
  }
  return (
    <View>
      <VStack px={"40px"} py={"40px"} alignItems={"center"} space={5}>
        <Heading>Babbling On</Heading>
        <Text>Sign in</Text>
        <Input
          size="lg"
          placeholder="email"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          size="lg"
          placeholder="password"
          type="password"
          value={password}
          onChangeText={setPassword}
        />
        <Button w="full" onPress={handleSignIn} isDisabled={isLoggingIn}>
          Sign in
        </Button>
      </VStack>
    </View>
  );
}
