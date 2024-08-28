const filterRedundantExclusionGroups = require("../candidateSolutions/filterRedundantGroups");
const {
  MOCK_EXCLUSION_GROUPS_0,
  MOCK_EXCLUSION_GROUPS_1,
  MOCK_EXCLUSION_GROUPS_2,
  MOCK_EXCLUSION_GROUPS_2_RESULT,
} = require("./__mocks__");

describe("filterRedundantExclusionGroups", () => {
  test("should return same groups if no overlap", () => {
    const result = filterRedundantExclusionGroups({
      exclusionGroups: MOCK_EXCLUSION_GROUPS_0,
    });

    expect(result).toEqual(MOCK_EXCLUSION_GROUPS_0);
  });

  test("should return same groups if there is partial overlap", () => {
    const result = filterRedundantExclusionGroups({
      exclusionGroups: MOCK_EXCLUSION_GROUPS_1,
    });
    expect(result).toEqual(MOCK_EXCLUSION_GROUPS_1);
  });

  test("should filter redundant groups when overlapping groups present", () => {
    const result = filterRedundantExclusionGroups({
      exclusionGroups: MOCK_EXCLUSION_GROUPS_2,
    });
    expect(result).toEqual(MOCK_EXCLUSION_GROUPS_2_RESULT);
  });
});
