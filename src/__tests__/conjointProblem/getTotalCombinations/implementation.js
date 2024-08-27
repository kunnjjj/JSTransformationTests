const getTotalCombinations = (featuresList) => {
  return featuresList.reduce((acc, feature) => acc * feature.values.length, 1);
};

module.exports = getTotalCombinations;
