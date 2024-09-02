const filterRedundantRules = require("../../candidateSolutions/filterRedundantRules");
const {
  SAMPLE_0,
  SAMPLE_1,
  SAMPLE_RESULT_0,
  SAMPLE_RESULT_1,
} = require("./__mocks__");

describe("filterRedundantRules", () => {
  test("sample-test-1", () => {
    const result = filterRedundantRules({ rules: SAMPLE_0 });
    expect(result).toEqual(SAMPLE_RESULT_0);
  });

  test("sample-test-2", () => {
    const result = filterRedundantRules({ rules: SAMPLE_1 });
    expect(result).toEqual(SAMPLE_RESULT_1);
  });
});
