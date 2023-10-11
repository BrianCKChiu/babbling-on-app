import {
  Heading,
  Input,
  View,
  VStack,
  Text,
  Button,
  Select,
  Toast,
} from "native-base";
import React, { useState } from "react";
import { auth } from "../../components/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { isValidPassword } from "../../components/auth/validatePassword";
import { useRouter } from "expo-router";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [role, setRole] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const router = useRouter();
  function handleSignUp() {
    setIsSigningUp(true);

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
      .then((userCredential: UserCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        Toast.show({
          title: "Sign up successful",
          bgColor: "green.500",
          placement: "bottom",
        });

        // add user to Prisma
        fetch("http://localhost:8080/user/signUp", {
          method: "POST",
          body: JSON.stringify({
            uid: user?.uid,
            email: email,
            role: role,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        router.push("/home");
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
    <View>
      <VStack
        px={"40px"}
        py={"40px"}
        alignItems={"center"}
        space={5}
        mt={"17%"}
      >
        <Heading mb={"20%"}>Babbling On</Heading>
        <Text w={"100%"}>Sign up to start learning ASL!</Text>
        <Input
          size="lg"
          placeholder="email"
          value={email}
          type="text"
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          size="lg"
          placeholder="password"
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          size="lg"
          placeholder="verify password"
          type="password"
          value={verifyPassword}
          onChangeText={(text) => setVerifyPassword(text)}
        />
        <Select
          size="lg"
          _selectedItem={{
            bg: "cyan.300",
          }}
          width={"100%"}
          selectedValue={role}
          placeholder="Select Role"
          onValueChange={(v) => setRole(v)}
        >
          <Select.Item label="Student" value="student" />
          <Select.Item label="Professor / Teacher" value="teacher" />
        </Select>
        <Text w={"100%"}>
          By signing up, you agree to our Terms and Services
        </Text>
        <Button mt="5" w="full" onPress={handleSignUp} isDisabled={isSigningUp}>
          Sign Up
        </Button>
      </VStack>
    </View>
  );
}
