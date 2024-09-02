// 1 removal + Ordering
const MOCK_RULES_0 = [
  ["condition3", "condition7", "condition4"],
  ["condition3", "condition4"],
  ["condition1", "condition2"],
];

const RESULT_0 = [
  ["condition3", "condition4"],
  ["condition1", "condition2"],
];

// No removal
const MOCK_RULES_1 = [
  ["condition1", "condition2", "condition3"],
  ["condition4", "condition5"],
  ["condition6", "condition1", "condition4"],
  ["condition6", "condition3", "condition4"],
];

const RESULT_1 = MOCK_RULES_1;

// Multiple removals + Ordering
const MOCK_RULES_2 = [
  ["condition4", "condition5", "condition1"],
  ["condition2", "condition3", "condition6"],
  ["condition1", "condition2", "condition3"],
  ["condition5", "condition1"],
  ["condition9", "condition10", "condition11"],
  ["condition3", "condition6"],
];

const RESULT_2 = [
  ["condition1", "condition2", "condition3"],
  ["condition5", "condition1"],
  ["condition9", "condition10", "condition11"],
  ["condition3", "condition6"],
];

// const MOCK_RE

module.exports = {
  MOCK_RULES_0,
  MOCK_RULES_1,
  MOCK_RULES_2,
  RESULT_0,
  RESULT_1,
  RESULT_2,
};
