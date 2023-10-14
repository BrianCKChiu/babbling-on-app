import { User } from "firebase/auth";

const isDev = true;

export const API_URL = isDev ? "http://localhost:8080/" : "";

export function post({
  endpoint,
  body,
}: {
  endpoint: string;
  body: any;
}): Promise<Response> {
  return fetch(API_URL + endpoint, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
export function checkUserIsInDB(token: string) {
  console.log(token);
  return fetch(`${API_URL}user/`, {
    method: "POST",
    body: JSON.stringify({ token: token }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}
