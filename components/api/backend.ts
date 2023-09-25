const API_URL = "http://localhost:3000/";

export function POST(endpoint: string, token: string, body = {}) {
  return fetch(API_URL + endpoint, {
    method: "POST",
    body: JSON.stringify({ token: token, ...body }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}
