// Quick script to migrate the database and seed it with some data

import "dotenv/config";

import chalk from "chalk";
import { spawnSync } from "child_process";
import { hash } from "../src/lib/passwords";
import { init } from "@paralleldrive/cuid2";

// Check if DATABASE_URL and JWT_SECRET are set
if (!process.env.DATABASE_URL || !process.env.JWT_SECRET) {
  console.log("Some environment variables are missing.");
  console.log(
    "Please follow the instructions in README.md to set your database connection string and/or JWT secret."
  );
  console.log("");
  console.log(
    chalk.red(
      `Error: ${
        !process.env.DATABASE_URL ? "DATABASE_URL" : "JWT_SECRET"
      } is missing`
    )
  );
  process.exit(1);
}

// Import database *after* checking for DATABASE_URL
// since Neon will throw an error if it's is not set
const db = await import("../src/db").then((m) => m.default);

try {
  const rows = await db.select().from(db.orders);
  if (rows.length > 0) {
    console.log(chalk.red("Database is already set up, nothing to do"));
    process.exit(0);
  }
} catch (e) {
  // order table does not exist
  console.log("Migrating database...");
  // spawn "pnpm drizzle-kit push" and wait for it to finish
  const result = spawnSync("pnpm", ["drizzle-kit", "push"], {
    stdio: "inherit",
  });
  if (result.status !== 0) {
    console.log(chalk.red("Database migration failed."));
    process.exit(1);
  }
  console.log(chalk.green("Database migration successful."));
  console.log("");
}

const password = init({ length: 12 })();
const passwordHash = await hash(password);

console.log("Admin user created with the following credentials:");
console.log(`Email: ${chalk.bold("joe@example.com")}`);
console.log(`Password: ${chalk.bold(password)}`);
console.log("");

console.log("[1/3] Seeding auth.users...");
const [{ id: userId }] = await db
  .insert(db.users)
  .values({
    title: "Mr",
    firstName: "Joe",
    lastName: "Bloggs",
    email: "joe@example.com",
    passwordHash,
    phoneNumber: "01234567890",
  })
  .returning({ id: db.users.id });
console.log(chalk.green("      Seeded auth.users\n"));

console.log("[2/3] Seeding pharmacies...");
const [{ id: pharmacyId }] = await db
  .insert(db.pharmacies)
  .values({
    name: "Cohens Chemist",
    address: "4 Privet Drive, Little Whinging, Surrey",
  })
  .returning({ id: db.pharmacies.id });
console.log(chalk.green("      Seeded pharmacies\n"));

console.log("[3/3] Seeding orders...");
await db
  .insert(db.orders)
  .values([
    {
      pharmacyId,
      userId,
      status: "checking",
    },
    {
      pharmacyId,
      userId,
      status: "with_gp",
    },
    {
      pharmacyId,
      userId,
      status: "preparing",
    },
    {
      pharmacyId,
      userId,
      status: "ready",
    },
    {
      pharmacyId,
      userId,
      status: "collected",
    },
  ])
  .returning({ id: db.pharmacies.id });
console.log(chalk.green("      Seeded orders\n"));
