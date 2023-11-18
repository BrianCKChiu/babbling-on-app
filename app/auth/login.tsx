import { UserCredential, signInWithEmailAndPassword } from "firebase/auth";
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
import React from "react";
import { Link } from "expo-router";
import { AuthLayout } from "../../components/layout/authLayout";
import { authInputStyle } from "../../styles/authInputStyle";
import { validateSignIn } from "../../components/utils/validateSignIn";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toasts = useToast();
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  function handleSignIn() {
    setIsLoggingIn(true);
    const results = validateSignIn(email, password);
    if (!results.valid) {
      toasts.show({
        title: results.message,
        bgColor: "red.500",
        duration: 2000,
      });
      setIsLoggingIn(false);
      return;
    }

    signInWithEmailAndPassword(auth, email.toLowerCase(), password)
      .then(async (userCredential: UserCredential) => {
        const user = userCredential.user;
        toasts.show({
          title: user.displayName
            ? `Welcome back ${user.displayName}`
            : "Login Successful",
          bgColor: "green.500",
          duration: 2000,
        });

        router.push("/(drawer)/home");
      })
      .catch((error) => {
        console.log(error);
        toasts.show({
          title: "Something went wrong, please try again later!",
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
