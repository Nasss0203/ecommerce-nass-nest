import { genSaltSync, hashSync } from 'bcrypt';

export const getHashPassword = (password: string) => {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);
  return hash;
};
