import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { auditsRemaining } from "./credit-math.ts";

describe("auditsRemaining", () => {
  it("returns null for subscribers", () => {
    assert.equal(auditsRemaining(10, true, 0), null);
  });

  it("counts free allotment before any usage", () => {
    assert.equal(auditsRemaining(0, false, 0), 3);
  });

  it("adds paid credits to free allotment", () => {
    assert.equal(auditsRemaining(0, false, 3), 6);
  });

  it("decrements after audits (free + paid shared pool)", () => {
    assert.equal(auditsRemaining(1, false, 3), 5);
  });

  it("does not double-count free when auditCount exceeds FREE_AUDIT_LIMIT", () => {
    assert.equal(auditsRemaining(4, false, 3), 2);
    assert.equal(auditsRemaining(3, false, 2), 2);
  });

  it("floors at zero when exhausted", () => {
    assert.equal(auditsRemaining(6, false, 3), 0);
    assert.equal(auditsRemaining(10, false, 0), 0);
  });
});
