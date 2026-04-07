import { prisma } from "./lib/prisma";

async function main() {
  // Create multiple sample users
  const users = await prisma.user.createMany({
    data: [
      {
        name: "Alice",
        email: "alice@example.com",
      },
      {
        name: "Bob",
        email: "bob@example.com",
      },
      {
        name: "Charlie",
        email: "charlie@example.com",
      },
    ],
    skipDuplicates: true, // avoids crashing if emails already exist
  });

  console.log("Users created:", users);

  // Fetch all users
  const allUsers = await prisma.user.findMany();

  console.log("All users:");
  console.log(JSON.stringify(allUsers, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
