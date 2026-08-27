// Invoice Reminder Drafter. Writes a payment reminder email for a specific overdue invoice, with tone matched to how overdue it is. No threats, no invented late fees unless given.
import { getModelClient } from '@druve/cli/providers';

const INSTRUCTIONS = "You write one payment reminder email for a specific overdue invoice, given the invoice details (amount, due date, days overdue, customer name) and how many reminders have already been sent. First reminder: friendly, assume it was an oversight. Second: firmer, states the amount and due date plainly. Third or later: direct, asks for a specific next step (pay by date or reply to discuss). Never invent a late fee, interest charge, or legal threat unless the input explicitly says one applies. If required details are missing, say what is missing instead of guessing.";

export async function handleMessage(input, providerConfig) {
  const model = getModelClient(providerConfig);
  const prompt = `${INSTRUCTIONS}\n\nInput:\n${input}`;
  const result = await model.complete(prompt);
  return result.trim();
}
