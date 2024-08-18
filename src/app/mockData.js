// mockData.js
import { faker } from "@faker-js/faker";

export function createRandomTransaction() {
  const currentDate = new Date();
  const monthOffset = Math.floor(Math.random() * 4);
  const monthOffsetaccount= Math.floor(Math.random()*9);
  const transactionDateAccount = new Date(currentDate.getFullYear(), currentDate.getMonth() - monthOffsetaccount, Math.floor(Math.random() * 28) + 1);
  const transactionDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - monthOffset, Math.floor(Math.random() * 28) + 1);

  const isIncome = Math.random() > 0.5;
  return {
    transactionDate: transactionDate.toLocaleDateString(), 
    transactionDateAccount: transactionDateAccount.toLocaleDateString(),
    transactionId: faker.string.uuid(),
    description: faker.lorem.sentence(),
    amount: parseFloat((Math.random() * (900000) + 100000).toFixed(2)) * (isIncome ? 1 : -1),
    category: faker.helpers.arrayElement([
      "Income",
      "Groceries",
      "Utilities",
      "Entertainment",
      "Travel",
      "Miscellaneous",
    ]),
    status: "Completed",
    actions: "Actions",
  };
}

export const TRANSACTIONS = Array.from(
  { length: 30 },
  createRandomTransaction 
);




