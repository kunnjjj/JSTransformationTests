const filterRedundantExclusionGroups = require("../../../candidateSolutions/filterRedundantGroups");
const {
  MOCK_EXCLUSION_GROUPS_0,
  MOCK_EXCLUSION_GROUPS_1,
  MOCK_EXCLUSION_GROUPS_2,
  MOCK_EXCLUSION_GROUPS_2_RESULT,
} = require("./__mocks__");

describe("filterRedundantExclusionGroups", () => {
  test("test-1", () => {
    const result = filterRedundantExclusionGroups({
      exclusionGroups: MOCK_EXCLUSION_GROUPS_0,
    });

    expect(result).toEqual(MOCK_EXCLUSION_GROUPS_0);
  });

  test("test-2", () => {
    const result = filterRedundantExclusionGroups({
      exclusionGroups: MOCK_EXCLUSION_GROUPS_1,
    });
    expect(result).toEqual(MOCK_EXCLUSION_GROUPS_1);
  });

  test("test-3", () => {
    const result = filterRedundantExclusionGroups({
      exclusionGroups: MOCK_EXCLUSION_GROUPS_2,
    });
    expect(result).toEqual(MOCK_EXCLUSION_GROUPS_2_RESULT);
  });
});
