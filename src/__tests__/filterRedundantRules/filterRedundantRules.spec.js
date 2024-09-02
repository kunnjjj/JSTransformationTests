const _cloneDeep = require("lodash").cloneDeep;
const filterRedundantRules = require("../../candidateSolutions/filterRedundantRules");
const {
  MOCK_RULES_0,
  MOCK_RULES_1,
  MOCK_RULES_2,
  RESULT_0,
  RESULT_1,
  RESULT_2,
} = require("./__mocks__");

describe("filterRedundantRules", () => {
  test("test-1", () => {
    // 1 removal + Ordering
    const result = filterRedundantRules({ rules: MOCK_RULES_0 });
    expect(result).toEqual(RESULT_0);
  });

  test("test-2", () => {
    // No removal
    const result = filterRedundantRules({ rules: MOCK_RULES_1 });
    expect(result).toEqual(RESULT_1);
  });

  test("test-3", () => {
    // Multiple removals + Ordering
    const result = filterRedundantRules({ rules: MOCK_RULES_2 });
    expect(result).toEqual(RESULT_2);
  });

  test("test-4", () => {
    // Input & Input Reference should not change (function purity)
    const referenceBefore0 = MOCK_RULES_0,
      referenceBefore1 = MOCK_RULES_1,
      referenceBefore2 = MOCK_RULES_2;

    const clonedRules0 = [...MOCK_RULES_0];
    const clonedRules1 = [...MOCK_RULES_1];
    const clonedRules2 = [...MOCK_RULES_2];

    const deepClone0 = _cloneDeep(MOCK_RULES_0);
    const deepClone1 = _cloneDeep(MOCK_RULES_1);
    const deepClone2 = _cloneDeep(MOCK_RULES_2);

    filterRedundantRules({ rules: MOCK_RULES_0 });
    filterRedundantRules({ rules: MOCK_RULES_1 });
    filterRedundantRules({ rules: MOCK_RULES_2 });

    // Input Reference
    expect(MOCK_RULES_0).toBe(referenceBefore0);
    expect(MOCK_RULES_1).toBe(referenceBefore1);
    expect(MOCK_RULES_2).toBe(referenceBefore2);

    // Input Values
    expect(MOCK_RULES_0).toEqual(deepClone0);
    expect(MOCK_RULES_1).toEqual(deepClone1);
    expect(MOCK_RULES_2).toEqual(deepClone2);

    // Individual Rules Reference(s)
    MOCK_RULES_0.forEach((_, index) => {
      expect(MOCK_RULES_0[index]).toBe(clonedRules0[index]);
    });
    MOCK_RULES_1.forEach((_, index) => {
      expect(MOCK_RULES_1[index]).toBe(clonedRules1[index]);
    });
    MOCK_RULES_2.forEach((_, index) => {
      expect(MOCK_RULES_2[index]).toBe(clonedRules2[index]);
    });

    const result0 = filterRedundantRules({ rules: MOCK_RULES_0 });
    expect(result0).toEqual(RESULT_0);
  });

  test("test-5", () => {
    // Empty Rules
    const result = filterRedundantRules({ rules: [] });
    expect(result).toEqual([]);
  });

  test("test-6", () => {
    // Single Rule
    const MOCK_RULES = [["condition1", "condition2"]],
      RESULT = MOCK_RULES;
    const result = filterRedundantRules({ rules: MOCK_RULES });
    expect(result).toEqual(RESULT);
  });
});
