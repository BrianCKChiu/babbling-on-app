import React, { useState } from "react";
import {
  Heading,
  Input,
  View,
  VStack,
  Text,
  Button,
  Select,
  Toast,
  Box,
} from "native-base";
import { AuthLayout } from "../../components/layout/authLayout";
import { useRouter } from "expo-router";

// helpers
import { auth } from "../../components/firebase";
import {
  createUserWithEmailAndPassword,
  UserCredential,
  updateProfile,
} from "firebase/auth";
import { isValidPassword } from "../../components/auth/validatePassword";
import { authInputStyle } from "../../styles/authInputStyle";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [role, setRole] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const router = useRouter();

  function handleSignUp() {
    setIsSigningUp(true);
    if (userName === "") {
      Toast.show({
        title: "Username cannot be empty",
        bgColor: "red.500",
        placement: "bottom",
      });
      setIsSigningUp(false);
      return;
    }

    if (email === "") {
      Toast.show({
        title: "Email cannot be empty",
        bgColor: "red.500",
        placement: "bottom",
      });
      setIsSigningUp(false);
      return;
    }

    if (password === "") {
      Toast.show({
        title: "Password cannot be empty",
        bgColor: "red.500",
        placement: "bottom",
      });
      setIsSigningUp(false);
      return;
    }

    if (verifyPassword === "") {
      Toast.show({
        title: "Please verify password",
        bgColor: "red.500",
        placement: "bottom",
      });
      setIsSigningUp(false);
      return;
    }

    if (password !== verifyPassword) {
      Toast.show({
        title: "Passwords do not match",
        bgColor: "red.500",
        placement: "bottom",
      });
      setIsSigningUp(false);
      return;
    }

    if (role === "") {
      Toast.show({
        title: "Please select a role",
        bgColor: "red.500",
        placement: "bottom",
      });
      setIsSigningUp(false);
      return;
    }

    if (!isValidPassword(password)) {
      Toast.show({
        title:
          "Password must be at least 8 characters long & contain at least one uppercase letter and number",
        bgColor: "red.500",
        placement: "bottom",
      });
      setIsSigningUp(false);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential: UserCredential) => {
        // Signed in
        const user = userCredential.user;
        try {
          await updateProfile(user, {
            displayName: userName,
          }).catch((error) => {
            console.error(error);
          });
          Toast.show({
            title: `Welcome to Babbling On!`,
            bgColor: "green.500",
            placement: "bottom",
          });
          router.push("/home");
          setIsSigningUp(false);
        } catch (e) {
          console.error(e);
        }

        // add user to Prisma
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Toast.show({
            title: "Email already in use",
            bgColor: "red.500",
            placement: "bottom",
          });
          setIsSigningUp(false);
        }
      });

    setIsSigningUp(false);
  }
  return (
    <AuthLayout>
      <View>
        <VStack
          px={"40px"}
          py={"40px"}
          alignItems={"center"}
          space={5}
          mt={"20%"}
        >
          <Box mb={12}>
            <Heading fontSize={44} mb={1}>
              Babbling On
            </Heading>
            <Text color={"black"}>Start Learning ASL!</Text>
          </Box>
          <Input
            size="lg"
            placeholder="Username"
            value={userName}
            type="text"
            onChangeText={(text) => setUserName(text)}
            {...authInputStyle}
          />
          <Input
            size="lg"
            placeholder="Email"
            value={email}
            type="text"
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
          <Input
            size="lg"
            placeholder="Verify Password"
            type="password"
            value={verifyPassword}
            onChangeText={(text) => setVerifyPassword(text)}
            {...authInputStyle}
          />
          <Select
            size="lg"
            _selectedItem={{
              bg: "#FFED4B",
            }}
            width={"100%"}
            h={"55px"}
            selectedValue={role}
            placeholder="Select Role"
            onValueChange={(v) => setRole(v)}
          >
            <Select.Item label="Student" value="student" />
            <Select.Item label="Professor / Teacher" value="teacher" />
          </Select>

          <Button
            w="full"
            h={"55px"}
            mb={2}
            bgColor={"#FFED4B"}
            isDisabled={isSigningUp}
            onPress={handleSignUp}
          >
            <Text color={"black"} fontWeight={"semibold"}>
              {isSigningUp ? "Signing Up" : "Sign Up"}
            </Text>
          </Button>
        </VStack>
      </View>
    </AuthLayout>
  );
}
