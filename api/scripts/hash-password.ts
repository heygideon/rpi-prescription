import chalk from "chalk";
import { hash } from "../src/lib/passwords";

const password = process.argv[2];
if (!password) {
  console.error("Usage: tsx hash-password.ts <password>");
  process.exit(1);
}

try {
  console.log(chalk.gray(`${password} ->`));
  const hashed = await hash(password);
  console.log(hashed);
} catch (e) {
  console.error(e);
  process.exit(1);
}
