const getValidProductsCount = require("../candidateSolutions/getValidProductsCount");

describe("getValidProductsCount", () => {
  test("when any feature has zero levels, zero combinations are possible", () => {
    expect(
      getValidProductsCount({
        features: [
          { featureID: "f1", values: ["l1", "l2", "l3", "l4", "l5"] },
          {
            featureID: "f2",
            values: [],
          },
          {
            featureID: "f3",
            values: ["l6"],
          },
        ],
        exclusionGroups: [],
      })
    ).toEqual(0);
  });

  test("when there are no exclusion groups, should return the count of all combinations", () => {
    expect(
      getValidProductsCount({
        features: [
          { featureID: "f1", values: ["l1-1", "l2-1", "l3-1", "l4-1", "l5-1"] },
          {
            featureID: "f2",
            values: ["l1-2", "l2-2", "l3-2", "l4-2", "l5-2", "l6-2", "l7-2"],
          },
          {
            featureID: "f3",
            values: ["l1-3", "l1-4"],
          },
        ],
        exclusionGroups: [],
      })
    ).toEqual(70);
  });

  test("when exclusion groups are present, all possible combinations as per exclusion groups should be removed from all combinations", () => {
    expect(
      getValidProductsCount({
        features: [
          { featureID: "f1", values: ["l1-1", "l2-1", "l3-1", "l4-1", "l5-1"] },
          {
            featureID: "f2",
            values: ["l1-2", "l2-2", "l3-2", "l4-2", "l5-2", "l6-2", "l7-2"],
          },
          {
            featureID: "f3",
            values: ["l1-3", "l1-4"],
          },
        ],
        exclusionGroups: [
          [
            { featureID: "f1", value: "l1-1" },
            { featureID: "f3", value: "l1-3" },
          ],
        ],
      })
    ).toEqual(63);
  });

  test("when multiple exclusion groups are present, extra combinations should not be removed from the total combinations", () => {
    expect(
      getValidProductsCount({
        features: [
          { featureID: "f1", values: ["l1-1", "l2-1", "l3-1", "l4-1", "l5-1"] },
          {
            featureID: "f2",
            values: ["l1-2", "l2-2", "l3-2", "l4-2", "l5-2", "l6-2", "l7-2"],
          },
          {
            featureID: "f3",
            values: ["l1-3", "l1-4"],
          },
        ],
        exclusionGroups: [
          [
            { featureID: "f1", value: "l1-1" },
            { featureID: "f3", value: "l1-3" },
          ],
          [
            { featureID: "f2", value: "l1-2" },
            { featureID: "f3", value: "l1-3" },
          ],
        ],
      })
    ).toEqual(59);
  });

  test("overflow test for max possible use case", () => {
    const featureIDVsLevelIds = {
      f1: ["l1-1", "l2-1", "l3-1", "l4-1", "l5-1"],
      f2: ["l1-2", "l2-2", "l3-2", "l4-2", "l5-2"],
      f3: ["l1-3", "l2-3", "l3-3", "l4-3", "l5-3"],
      f4: ["l1-4", "l2-4", "l3-4", "l4-4", "l5-4"],
      f5: ["l1-5", "l2-5", "l3-5", "l4-5", "l5-5"],
      f6: ["l1-6", "l2-6", "l3-6", "l4-6", "l5-6"],
      f7: ["l1-7", "l2-7", "l3-7", "l4-7", "l5-7"],
    };

    expect(
      getValidProductsCount({
        features: [
          { featureID: "f1", values: ["l1-1", "l2-1", "l3-1", "l4-1", "l5-1"] },
          { featureID: "f2", values: ["l1-2", "l2-2", "l3-2", "l4-2", "l5-2"] },
          { featureID: "f3", values: ["l1-3", "l2-3", "l3-3", "l4-3", "l5-3"] },
          { featureID: "f4", values: ["l1-4", "l2-4", "l3-4", "l4-4", "l5-4"] },
          { featureID: "f5", values: ["l1-5", "l2-5", "l3-5", "l4-5", "l5-5"] },
          { featureID: "f6", values: ["l1-6", "l2-6", "l3-6", "l4-6", "l5-6"] },
          { featureID: "f7", values: ["l1-7", "l2-7", "l3-7", "l4-7", "l5-7"] },
        ],
        exclusionGroups: [],
      })
    ).toEqual(78125);
  });
});
