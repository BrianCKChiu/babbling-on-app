export const isValidPassword = (pass: string) => {
  const hasNumber = /\d/;
  const hasLetter = /[a-zA-Z]/;
  return pass.length >= 8 && hasNumber.test(pass) && hasLetter.test(pass);
};
