import {
  hash as _hash,
  verify as _verify,
  type Options,
} from "@node-rs/argon2";

const options: Options = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

export const hash = async (password: string) => _hash(password, options);
export const verify = async (hash: string, password: string) =>
  _verify(hash, password);
