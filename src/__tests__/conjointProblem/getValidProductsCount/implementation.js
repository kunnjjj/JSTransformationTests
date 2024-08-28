const getTotalCombinations = (featureIdVsLevelIds) =>
  Object.keys(featureIdVsLevelIds).reduce(
    (product, featureID) => product * featureIdVsLevelIds[featureID].length,
    1
  );

const getExcludedCombinationsForGroup = ({
  exclusionGroup,
  featureIdVsLevelIds,
}) =>
  Object.keys(featureIdVsLevelIds).reduce(
    (excludeCount, featureID) =>
      excludeCount *
      (exclusionGroup[featureID] ? 1 : featureIdVsLevelIds[featureID].length),
    1
  );

const matchMainWebContract = ({ baseExclusionGroups }) =>
  baseExclusionGroups?.map((value) =>
    value.map((item) => ({
      levelIds: [item.value],
      featureID: item.featureID,
    }))
  );

const getFeatureIdVsLevelIds = ({ features }) =>
  features.reduce(
    (acc, { featureID, values }) => ({
      ...acc,
      [featureID]: values,
    }),
    {}
  );

/**
 *
 * @param
 * features: {featureID:string, values:string[]}[]
 * exclusionGroups:({featureID:string; value:string}[])[]
 * @returns
 */

const getValidProductsCount = ({
  features,
  exclusionGroups: baseExclusionGroups,
}) => {
  const featureIdVsLevelIds = getFeatureIdVsLevelIds({ features });
  const exclusionGroups = matchMainWebContract({ baseExclusionGroups });

  const adaptedExclusionGroups =
    exclusionGroups?.map((group) =>
      group.reduce(
        (acc, { featureID, levelIds }) => ({
          ...acc,
          // currently we only have one level corresponding to a feature in an exclusion group
          [featureID]: levelIds[0],
        }),
        {}
      )
    ) ?? [];

  const totalCombinations = getTotalCombinations(featureIdVsLevelIds);

  if (!exclusionGroups?.length) {
    return totalCombinations;
  }

  // Inclusion - exclusion
  const exclusionGroupCount = exclusionGroups?.length ?? 0;
  let totalExclusions = 0;

  // Generate all subsets of exclusion groups
  // eslint-disable-next-line no-bitwise -- valid use case
  for (let r = 1; r < 1 << exclusionGroupCount; r++) {
    const subset = [];
    for (let j = 0; j < exclusionGroupCount; j++) {
      // eslint-disable-next-line no-bitwise -- valid use case
      if (r & (1 << j)) {
        subset.push(adaptedExclusionGroups[j]);
      }
    }

    const exclusionGroupsIntersection = subset.reduce(
      (intersectionGroup, exclusionGroup) => {
        const updatedAcc = { ...intersectionGroup };

        Object.keys(exclusionGroup).forEach((featureID) => {
          if (updatedAcc[featureID]) {
            updatedAcc[featureID].add(exclusionGroup[featureID]);
          } else {
            updatedAcc[featureID] = new Set([exclusionGroup[featureID]]);
          }
        });

        return updatedAcc;
      },
      {}
    );

    const isValidIntersection = Object.keys(exclusionGroupsIntersection).every(
      (featureID) => exclusionGroupsIntersection[featureID].size === 1
    );

    if (!isValidIntersection) {
      // eslint-disable-next-line no-continue -- valid use case
      continue;
    }

    const adaptedExclusionGroupIntersection = Object.keys(
      exclusionGroupsIntersection
    ).reduce(
      (acc, featureID) => ({
        ...acc,
        [featureID]: Array.from(exclusionGroupsIntersection[featureID])[0],
      }),
      {}
    );

    const intersectionCount = getExcludedCombinationsForGroup({
      featureIdVsLevelIds,
      exclusionGroup: adaptedExclusionGroupIntersection,
    });

    totalExclusions += (subset.length % 2 === 0 ? -1 : 1) * intersectionCount;
  }

  return totalCombinations - totalExclusions;
};

module.exports = getValidProductsCount;
