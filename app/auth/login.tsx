import { signInWithEmailAndPassword } from "firebase/auth";
import {
  View,
  Heading,
  Text,
  Input,
  VStack,
  Button,
  useToast,
  Box,
} from "native-base";
import { useState } from "react";
import { auth } from "../../components/firebase";
import { useRouter } from "expo-router";
import { validateEmail } from "../../components/auth";
import React from "react";
import { Link } from "expo-router";
import { isValidPassword } from "../../components/auth/validatePassword";
import { AuthLayout } from "../../components/layout/authLayout";
import { authInputStyle } from "../../styles/authInputStyle";

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
      .then(async () => {
        toasts.show({
          title: "Sign in successful",
          bgColor: "green.500",
          duration: 2000,
        });

        router.push("/(drawer)/home");
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
    <AuthLayout>
      <View>
        <VStack px={"40px"} py={"40px"} alignItems={"center"} mt={"30%"}>
          <Box mb={40}>
            <Heading fontSize={44} mb={1}>
              Babbling On
            </Heading>
            <Text color={"black"}>Start Learning ASL!</Text>
          </Box>

          <VStack space={5} w={"full"}>
            <Text w={"100%"} fontWeight={"bold"} fontSize={16}>
              Login
            </Text>
            <Input
              size="lg"
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              {...authInputStyle}
            />
            <Input
              size="lg"
              placeholder="Password"
              type="password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              {...authInputStyle}
            />
            <Box alignItems={"center"}>
              <Button
                w="full"
                h={"55px"}
                mb={2}
                onPress={handleSignIn}
                isDisabled={isLoggingIn}
                bgColor={"#FFED4B"}
              >
                <Text fontWeight={"semibold"} color={"black"}>
                  Sign in
                </Text>
              </Button>
              <Text>
                Need an account?{" "}
                <Link href="/auth/signUp">
                  <Text color={"blue.400"}>Sign up</Text>
                </Link>
              </Text>
            </Box>
          </VStack>
        </VStack>
      </View>
    </AuthLayout>
  );
}
