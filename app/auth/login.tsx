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
import React from "react";
import { Link } from "expo-router";
import { isValidPassword } from "../../components/auth/validatePassword";

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

    if (!isValidPassword(password)) {
      toasts.show({
        title:
          "Password must be at least 8 characters long and contain both letters and numbers",
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

        router.replace("/home");
      })
      .catch((error) => {
        toasts.show({
          title: error.message,
          bgColor: "red.500",
          duration: 2000,
        });
        setIsLoggingIn(false);
      });
  }

  return (
    <View>
      <VStack
        px={"40px"}
        py={"40px"}
        alignItems={"center"}
        space={5}
        mt={"17%"}
      >
        <Heading mb={"20%"}>Babbling On</Heading>
        <Text w={"100%"}>Sign in</Text>
        <Input
          size="lg"
          placeholder="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          size="lg"
          placeholder="password"
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button w="full" onPress={handleSignIn} isDisabled={isLoggingIn}>
          Sign in
        </Button>
        <Text>
          Need an account?{" "}
          <Link href="/auth/signUp">
            <Text color={"blue.400"}>Sign up</Text>
          </Link>
        </Text>
      </VStack>
    </View>
  );
}
