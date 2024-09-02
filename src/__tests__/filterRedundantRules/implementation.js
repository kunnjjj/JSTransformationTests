const EMPTY_ARRAY_READONLY = [];

const _keyBy = (array, keyName) =>
  array.reduce((acc, item) => ({ ...acc, [item[keyName]]: item }), {});

const _isEqual = (array1, array2) =>
  array1.length === array2.length &&
  array1.every((_, index) => array2[index] === array1[index]);

const getOriginalContract = (exclusionGroupsResult) =>
  exclusionGroupsResult.map(({ value }) =>
    value.map((item) => ({
      featureID: item.featureID,
      value: item.levelIds[0],
    }))
  );

const getExclusionGroupSize = (exclusionGroup) => exclusionGroup.value.length;

const exclusionGroupSizeComparator = (groupA, groupB) =>
  getExclusionGroupSize(groupA) - getExclusionGroupSize(groupB);

const doExclusionGroupsOverlap = ({ groupA, groupB }) => {
  let parentGroup = groupA,
    childGroup = groupB;
  if (getExclusionGroupSize(groupA) > getExclusionGroupSize(groupB)) {
    [parentGroup, childGroup] = [groupB, groupA];
  }

  const exclusionGroupValuesByFeatureId = _keyBy(childGroup.value, "featureID");

  return parentGroup.value.every(({ featureID: parentFeatureId, levelIds }) => {
    const exclusionGroupValue =
      exclusionGroupValuesByFeatureId[parentFeatureId];

    return (
      !!exclusionGroupValue &&
      _isEqual(
        [...(levelIds ?? EMPTY_ARRAY_READONLY)].sort(),
        [...(exclusionGroupValue.levelIds ?? EMPTY_ARRAY_READONLY)].sort()
      )
    );
  });
};

const getOverlappingGroupIdsWithCurrentGroup = ({ exclusionGroup, groups }) =>
  groups
    .filter((group) =>
      doExclusionGroupsOverlap({ groupA: exclusionGroup, groupB: group })
    )
    .map((group) => group.id);

const matchMainWebContract = ({ baseExclusionGroups }) =>
  baseExclusionGroups.map((value, index) => ({
    id: index,
    value: value.map((item, itemIndex) => ({
      id: itemIndex,
      levelIds: [item.value],
      featureID: item.featureID,
    })),
  }));

/**
 * exclusionGroups:[{featureID:string,value:string}]
 */
const filterRedundantExclusionGroups = ({
  exclusionGroups: baseExclusionGroups,
}) => {
  const necessaryGroupIds = new Set(),
    redundantGroupIds = new Set();

  const exclusionGroups = matchMainWebContract({
    baseExclusionGroups: baseExclusionGroups,
  });

  const exclusionGroupsBySize = exclusionGroups.sort(
    exclusionGroupSizeComparator
  );

  if (exclusionGroups.length && exclusionGroupsBySize[0].value.length < 2) {
    return exclusionGroups; // handling this in validation, case should never exist
  }

  exclusionGroupsBySize.forEach((exclusionGroup, index) => {
    if (redundantGroupIds.has(exclusionGroup.id)) return;

    necessaryGroupIds.add(exclusionGroup.id);
    const overlappingIdsWithCurrentGroup =
      getOverlappingGroupIdsWithCurrentGroup({
        exclusionGroup,
        groups: exclusionGroups.slice(index + 1),
      });

    overlappingIdsWithCurrentGroup.forEach((groupId) =>
      redundantGroupIds.add(groupId)
    );
  });

  const exclusionGroupsResult = exclusionGroups.filter(({ id: groupId }) =>
    necessaryGroupIds.has(groupId)
  );
  const exclusionGroupsWithCorrectContract = getOriginalContract(
    exclusionGroupsResult
  );

  return exclusionGroupsWithCorrectContract;
};

module.exports = filterRedundantExclusionGroups;
