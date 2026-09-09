import test from "node:test";
import assert from "node:assert/strict";
import { enquirySchema, toLeadRecord, budgetOptions } from "../src/lib/enquiry.ts";
const valid = {
  intent: "employment",
  name: " Test ",
  email: "test@example.invalid",
  message: "A data analyst opportunity.",
};
test("employment enquiries exclude freelance-only details", () => {
  const form = enquirySchema.parse({
    ...valid,
    budget: "under_5k",
    service: "Dashboard",
    role: "Analyst",
  });
  const row = toLeadRecord(form);
  assert.equal(row.name, "Test");
  assert.equal(row.budget, null);
  assert.match(row.message, /Role: Analyst/);
  assert.doesNotMatch(row.message, /Dashboard/);
  assert.equal(row.source, undefined);
});
test("all displayed budget options map to database-compatible values", () => {
  for (const { value } of budgetOptions) {
    const form = enquirySchema.parse({ ...valid, intent: "freelance", budget: value });
    assert.equal(toLeadRecord(form).budget, value);
  }
});
test("invalid email, blank message and malformed URLs are rejected", () => {
  for (const extra of [
    { email: "bad" },
    { message: " " },
    { jobUrl: "https://" },
    { jobUrl: "javascript:alert(1)" },
    { budget: "Under €5,000" },
  ])
    assert.equal(enquirySchema.safeParse({ ...valid, ...extra }).success, false);
});
