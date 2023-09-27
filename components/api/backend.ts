import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const isDev = true;

const API_URL = isDev ? "http://localhost:8080/" : "";
const [user] = useAuthState(auth);
export const post = async (
  endpoint: string,
  body = {}
): Promise<any | undefined> => {
  try {
    const token = await user?.getIdToken();
    const response = await fetch(API_URL + endpoint, {
      method: "POST",
      body: JSON.stringify({ token: token, ...body }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return JSON.stringify(await response.json());
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
