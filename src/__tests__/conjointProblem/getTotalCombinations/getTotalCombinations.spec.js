const getTotalCombinations = require("../../../candidateSolutions/getTotalCombinations");
const {
  MOCK_FEATURES_1,
  MOCK_FEATURES_2,
  MOCK_FEATURES_3,
  MOCK_FEATURES_4,
  MOCK_FEATURES_5,
  MOCK_ANS_1,
  MOCK_ANS_2,
  MOCK_ANS_3,
  MOCK_ANS_4,
  MOCK_ANS_5,
} = require("./__mock__");

describe("getTotalCombinations", () => {
  test("test with 3 features, 2 values each", () => {
    expect(getTotalCombinations(MOCK_FEATURES_1)).toBe(MOCK_ANS_1);
  });

  test("test2", () => {
    expect(getTotalCombinations(MOCK_FEATURES_2)).toBe(MOCK_ANS_2);
  });

  test("test3", () => {
    expect(getTotalCombinations(MOCK_FEATURES_3)).toBe(MOCK_ANS_3);
  });

  test("test4", () => {
    expect(getTotalCombinations(MOCK_FEATURES_4)).toBe(MOCK_ANS_4);
  });

  test("test5", () => {
    expect(getTotalCombinations(MOCK_FEATURES_5)).toBe(MOCK_ANS_5);
  });
});
